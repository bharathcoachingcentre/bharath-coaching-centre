
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  School,
  GripVertical
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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, deleteDoc, doc, addDoc, updateDoc, serverTimestamp, writeBatch } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Reorder } from "framer-motion";

export default function ClassesManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingClass, setEditingClass] = useState<any | null>(null);
  const [newClass, setNewClass] = useState({ name: "", board: "cbse" });
  
  const [localClasses, setLocalClasses] = useState<any[]>([]);

  const classesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'classes'));
  }, [firestore]);

  const { data: classes, loading } = useCollection(classesQuery);

  useEffect(() => {
    if (classes) {
      const sorted = [...classes].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      setLocalClasses(sorted);
    }
  }, [classes]);

  // Fix for unclickable UI
  useEffect(() => {
    if (!isDialogOpen) {
      const cleanup = () => {
        document.body.style.pointerEvents = 'auto';
        document.body.style.overflow = 'auto';
        document.querySelectorAll('[data-radix-dialog-overlay]').forEach(el => (el as HTMLElement).remove());
      };
      const timer = setTimeout(cleanup, 100);
      return () => clearTimeout(timer);
    }
  }, [isDialogOpen]);

  const handleSave = async () => {
    if (!firestore || !newClass.name) return;
    
    setIsSaving(true);
    try {
      const data = {
        name: newClass.name,
        board: newClass.board,
        updatedAt: serverTimestamp(),
      };

      if (editingClass) {
        await updateDoc(doc(firestore, 'classes', editingClass.id), data);
        toast({ title: "Class Updated", description: `${data.name} has been updated successfully.` });
      } else {
        const nextOrder = localClasses.length;
        await addDoc(collection(firestore, 'classes'), {
          ...data,
          order: nextOrder,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Class Added", description: `${data.name} has been created.` });
      }
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ 
        variant: "destructive", 
        title: "Save Failed", 
        description: error.message || "Could not save the class." 
      });
    } finally {
      setIsSaving(false);
      setIsDialogOpen(false);
      setEditingClass(null);
      setNewClass({ name: "", board: "cbse" });
      setTimeout(() => {
        document.body.style.pointerEvents = "auto";
      }, 150);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Delete this class? This will affect schedules linked to it.")) return;
    try {
      await deleteDoc(doc(firestore, 'classes', id));
      toast({ title: "Class Deleted" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Delete Failed", description: e.message });
    }
  };

  const handleReorder = async (reorderedList: any[]) => {
    setLocalClasses(reorderedList);
    if (!firestore) return;

    try {
      const batch = writeBatch(firestore);
      reorderedList.forEach((item, index) => {
        const ref = doc(firestore, 'classes', item.id);
        batch.update(ref, { order: index });
      });
      await batch.commit();
    } catch (error) {
      console.error("Failed to save new order:", error);
      toast({ variant: "destructive", title: "Order Sync Failed", description: "Could not save the new order." });
    }
  };

  const openEditDialog = (c: any) => {
    setEditingClass(c);
    setNewClass({ name: c.name, board: c.board });
    setTimeout(() => setIsDialogOpen(true), 50);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-2xl font-black text-gray-900">Manage Classes & Sections</h2>
          <p className="text-sm text-gray-500">Define and rearrange the active classes for each education board.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingClass(null);
            setNewClass({ name: "", board: "cbse" });
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 border-none"
        >
          <Plus className="w-6 h-6 mr-2" /> Define Class
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Class Registry...</p>
        </div>
      ) : localClasses.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2rem] shadow-sm border border-dashed border-gray-200">
          <School className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold">No classes defined yet.</p>
          <Button variant="link" onClick={() => setIsDialogOpen(true)} className="text-blue-600 font-bold">Add your first class</Button>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="w-[50px] px-4"></TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-left">Board</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-left">Class Name</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <Reorder.Group 
                as="tbody" 
                axis="y" 
                values={localClasses} 
                onReorder={handleReorder}
                className="divide-y divide-gray-50"
              >
                {localClasses.map((c) => (
                  <Reorder.Item 
                    key={c.id} 
                    value={c} 
                    as="tr"
                    className="hover:bg-gray-50/50 cursor-default group"
                  >
                    <TableCell className="px-4 text-center">
                      <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 transition-colors py-5">
                        <GripVertical className="w-5 h-5" />
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <Badge className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                        c.board?.toLowerCase() === "cbse" ? "bg-blue-100 text-blue-600" : "bg-teal-100 text-teal-600"
                      )}>
                        {c.board}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <span className="font-bold text-gray-900">{c.name}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl p-1">
                          <DropdownMenuItem 
                            onSelect={(e) => {
                              e.preventDefault();
                              openEditDialog(c);
                            }}
                            className="p-2.5 cursor-pointer rounded-lg"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Class</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onSelect={() => handleDelete(c.id)}
                            className="p-2.5 cursor-pointer text-rose-600 rounded-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-bold text-xs">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">{editingClass ? "Edit Class" : "Define New Class"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-black uppercase text-gray-400">Board</label>
              <Select value={newClass.board} onValueChange={(val) => setNewClass({ ...newClass, board: val })}>
                <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-100">
                  <SelectValue placeholder="Select board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cbse">CBSE</SelectItem>
                  <SelectItem value="samacheer">Samacheer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 text-left">
              <label className="text-xs font-black uppercase text-gray-400">Class Name</label>
              <Input 
                value={newClass.name} 
                onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                placeholder="e.g. Class 10"
                className="h-12 rounded-xl bg-gray-50 border-gray-100"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white rounded-xl px-8 h-12 font-bold shadow-lg transition-all active:scale-95 border-none">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Class"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
