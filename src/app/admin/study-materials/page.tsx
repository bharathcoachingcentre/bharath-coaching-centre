"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  File, 
  Download, 
  Eye,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  BookOpen,
  FileUp,
  X,
  AlertCircle,
  Eraser
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, updateDoc, increment, writeBatch, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const getMaterialIcon = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("pdf")) return FileText;
  if (t.includes("video")) return Video;
  if (t.includes("image")) return ImageIcon;
  return File;
};

const getMaterialColors = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("pdf")) return { bg: "bg-purple-100", text: "text-purple-600" };
  if (t.includes("video")) return { bg: "bg-blue-100", text: "text-blue-600" };
  if (t.includes("image")) return { bg: "bg-orange-100", text: "text-orange-600" };
  return { bg: "bg-emerald-100", text: "text-emerald-600" };
};

export default function StudyMaterialsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importJson, setImportJson] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const materialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'study-materials'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: realMaterials, loading } = useCollection(materialsQuery);

  const filteredMaterials = useMemo(() => {
    if (!realMaterials) return [];
    if (!searchTerm) return realMaterials;
    const lower = searchTerm.toLowerCase();
    return realMaterials.filter(m => 
      m.title?.toLowerCase().includes(lower) || 
      m.grade?.toLowerCase().includes(lower) ||
      m.subject?.toLowerCase().includes(lower) ||
      m.board?.toLowerCase().includes(lower)
    );
  }, [realMaterials, searchTerm]);

  const handleTrackDownload = async (id: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'study-materials', id);
    updateDoc(docRef, {
      downloads: increment(1)
    }).catch(err => console.error("Failed to track download:", err));
  };

  const handlePreview = async (url: string, id: string) => {
    handleTrackDownload(id);
    if (url.startsWith('data:')) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (error) {
        console.error("Blob preview failed:", error);
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this study material? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'study-materials', id);
    deleteDoc(docRef)
      .then(() => {
        toast({ 
          title: "Resource Deleted", 
          description: "The material has been permanently removed from the system." 
        });
      })
      .catch(async (error) => {
        if (error.code === 'permission-denied') {
          const permissionError = new FirestorePermissionError({
            path: docRef.path,
            operation: 'delete',
          });
          errorEmitter.emit('permission-error', permissionError);
        }
        toast({
          variant: "destructive",
          title: "Deletion Failed",
          description: error.message || "An error occurred.",
        });
      });
  };

  const handleDeleteAll = async () => {
    if (!firestore || !realMaterials || realMaterials.length === 0) return;
    
    setIsProcessing(true);
    try {
      const batch = writeBatch(firestore);
      realMaterials.forEach((item) => {
        batch.delete(doc(firestore, 'study-materials', item.id));
      });
      await batch.commit();
      toast({ 
        title: "Library Cleared", 
        description: "All study materials have been permanently removed." 
      });
    } catch (e: any) {
      toast({ 
        variant: "destructive", 
        title: "Operation Failed", 
        description: e.message 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBulkImport = async () => {
    if (!firestore || !importJson.trim()) return;
    
    setIsProcessing(true);
    try {
      const data = JSON.parse(importJson);
      if (!Array.isArray(data)) throw new Error("Input must be a JSON array of objects.");

      const batch = writeBatch(firestore);
      const materialsRef = collection(firestore, 'study-materials');

      data.forEach((item: any) => {
        const docRef = doc(materialsRef);
        batch.set(docRef, {
          title: item.title || "Untitled Resource",
          grade: item.grade || "General",
          board: item.board || "General",
          subject: item.subject || "Other",
          category: item.category || "pdf",
          description: item.description || "",
          pdfUrl: item.pdfUrl || "",
          downloads: 0,
          allowDownloads: item.allowDownloads !== undefined ? item.allowDownloads : true,
          isVisible: item.isVisible !== undefined ? item.isVisible : true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      });

      await batch.commit();
      toast({ title: "Bulk Import Successful", description: `${data.length} resources have been added.` });
      setImportJson("");
      setIsImportOpen(false);
    } catch (e: any) {
      toast({ variant: "destructive", title: "Import Failed", description: e.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search by title, class, board or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {realMaterials && realMaterials.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="h-14 px-6 border-red-100 rounded-2xl font-bold text-red-500 hover:bg-red-50 gap-2">
                  <Eraser className="w-5 h-5" /> Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2.5rem] p-8 border-none shadow-2xl">
                <AlertDialogHeader className="text-left">
                  <AlertDialogTitle className="text-2xl font-black text-gray-900 tracking-tight">Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-500 font-medium text-base pt-2">
                    This action will permanently delete all {realMaterials.length} study materials from the database. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-6 gap-3 sm:justify-end">
                  <AlertDialogCancel className="h-12 px-6 rounded-xl font-bold border-gray-100 text-gray-500 bg-gray-50">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAll}
                    className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl border-none shadow-lg shadow-red-500/20 transition-all active:scale-95"
                  >
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          <Dialog open={isImportOpen} onOpenChange={setIsImportOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-14 px-6 border-gray-200 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 gap-2">
                <FileUp className="w-5 h-5" /> Bulk Import
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl rounded-[2rem] p-8 border-none shadow-2xl">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight">Bulk Import Materials</DialogTitle>
                <DialogDescription className="text-gray-500 font-medium">
                  Paste a JSON array of material objects to add multiple resources at once.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-xs text-blue-800 leading-relaxed font-medium">
                    Expected format: <code className="bg-white/50 px-1.5 py-0.5 rounded">{"[{\"title\": \"...\", \"grade\": \"...\"}]"}</code>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">JSON Content</label>
                  <Textarea 
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder="[ { ... }, { ... } ]"
                    className="min-h-[250px] font-mono text-xs bg-gray-50 border-gray-100 rounded-xl p-4 focus:ring-blue-500"
                  />
                </div>
              </div>
              <DialogFooter className="gap-3 sm:justify-end pt-4">
                <Button variant="ghost" onClick={() => setIsImportOpen(false)} disabled={isProcessing} className="font-bold">Cancel</Button>
                <Button onClick={handleBulkImport} disabled={isProcessing} className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-xl border-none shadow-lg transition-all active:scale-95">
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileUp className="w-4 h-4 mr-2" />}
                  Import Resources
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base cursor-pointer border-none transition-all active:scale-95">
            <Link href="/admin/study-materials/upload">
              <Plus className="w-6 h-6" /> Upload Single
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Materials Hub...</p>
        </div>
      ) : filteredMaterials.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Materials Found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Link your academic resources or use the bulk import tool to get started.</p>
          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={() => setIsImportOpen(true)} className="rounded-xl font-bold border-gray-200 h-12 px-8">Bulk Import</Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-bold border-none h-12 px-8 shadow-lg">
              <Link href="/admin/study-materials/upload">Upload File</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((item) => {
            const Icon = getMaterialIcon(item.category);
            const colors = getMaterialColors(item.category);
            return (
              <Card key={item.id} className="group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300">
                <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 to-teal-500"></div>
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colors.bg)}>
                      <Icon className={cn("w-7 h-7", colors.text)} />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-gray-100 p-1">
                        <DropdownMenuItem 
                          onSelect={() => item.pdfUrl && handlePreview(item.pdfUrl, item.id)}
                          className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg"
                        >
                          <Eye className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-bold text-xs text-gray-700">Preview File</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/study-materials/${item.id}`} className="flex items-center w-full">
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Metadata</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-50" />
                        <DropdownMenuItem 
                          onSelect={() => handleDelete(item.id)}
                          className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span className="font-bold text-xs">Delete File</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-1 mb-6 text-left">
                    <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">{item.title}</h3>
                    <p className="text-sm font-medium text-gray-400">{item.grade} • {item.board}</p>
                    {item.subject && (
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-1">{item.subject}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <Badge variant="secondary" className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border-none">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <div className={cn("w-1.5 h-1.5 rounded-full", item.isVisible ? "bg-emerald-500" : "bg-gray-300")} />
                      <span className="text-[10px] font-bold uppercase">{item.isVisible ? "Published" : "Hidden"}</span>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-bold">{item.downloads || 0}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                        onClick={() => item.pdfUrl && handlePreview(item.pdfUrl, item.id)}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                        asChild
                      >
                        <a href={item.pdfUrl} download={item.title} onClick={() => item.pdfUrl && handleTrackDownload(item.id)}>
                          <Download className="w-5 h-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
