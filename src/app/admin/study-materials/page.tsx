
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
  BookOpen
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
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

  const materialsQuery = useMemo(() => {
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
      m.subject?.toLowerCase().includes(lower)
    );
  }, [realMaterials, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this study material? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'study-materials', id);
    
    // Non-blocking deletion
    deleteDoc(docRef)
      .then(() => {
        toast({ 
          title: "Resource Deleted", 
          description: "The material has been permanently removed from the system." 
        });
      })
      .catch(async (error) => {
        console.error("Delete error:", error);
        
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
          description: "You do not have permission to delete this file or a network error occurred.",
        });
      });
  };

  const handlePreview = (url?: string) => {
    if (url && url !== "#") {
      window.open(url, '_blank');
    } else {
      toast({ title: "No Preview", description: "This resource does not have a valid URL associated with it." });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md text-left">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search materials..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
          />
        </div>
        <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base cursor-pointer border-none transition-all active:scale-95">
          <Link href="/admin/study-materials/upload">
            <Plus className="w-6 h-6" /> Upload Material
          </Link>
        </Button>
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
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Link your first academic resource to make it available for students.</p>
          <Button asChild className="mt-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-xl font-bold border-none h-12 px-8">
            <Link href="/admin/study-materials/upload">Get Started</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMaterials.map((item) => {
            const Icon = getMaterialIcon(item.category);
            const colors = getMaterialColors(item.category);
            return (
              <Card key={item.id} className="group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colors.bg)}>
                      <Icon className={cn("w-7 h-7", colors.text)} />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-gray-100 p-1">
                        <DropdownMenuItem 
                          onSelect={() => handlePreview(item.pdfUrl)}
                          className="p-2 cursor-pointer hover:bg-gray-50 rounded-lg"
                        >
                          <Eye className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-bold text-xs">Preview File</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/study-materials/${item.id}`} className="flex items-center w-full">
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs">Edit Metadata</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-50" />
                        <DropdownMenuItem 
                          onSelect={() => handleDelete(item.id)}
                          className="p-2 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
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
                        onClick={() => handlePreview(item.pdfUrl)}
                      >
                        <Eye className="w-5 h-5" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                        disabled={!item.pdfUrl}
                        asChild
                      >
                        <a href={item.pdfUrl} download target="_blank" rel="noopener noreferrer">
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
