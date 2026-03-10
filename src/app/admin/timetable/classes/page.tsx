"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  School,
  Filter
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
import { collection, query, orderBy, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ClassesManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingClass, setEditingClass] = useState<any | null>(null);
  const [newClass, setNewClass] = useState({ name: "", board: "cbse" });

  const classesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'classes'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: classes, loading } = useCollection(classesQuery);

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
        toast({ title: "Class Updated" });
      } else {
        await addDoc(collection(firestore, 'classes'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Class Added" });
      }
      setIsDialogOpen(false);
      setEditingClass(null);
      setNewClass({ name: "", board: "cbse" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Delete this class? This will affect schedules linked to it.")) return;
    await deleteDoc(doc(firestore, 'classes', id));
    toast({ title: "Class Deleted" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-2xl font-black text-gray-900">Manage Classes & Sections</h2>
          <p className="text-sm text-gray-500">Define the active classes for each education board.</p>
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
      ) : !classes?.length ? (
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
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400">Board</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400">Class Name</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes?.map((c) => (
                  <TableRow key={c.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="px-8 py-5">
                      <Badge className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                        c.board?.toLowerCase() === "cbse" ? "bg-blue-100 text-blue-600" : "bg-teal-100 text-teal-600"
                      )}>
                        {c.board}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5">
                      <span className="font-bold text-gray-900">{c.name}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl p-1">
                          <DropdownMenuItem 
                            onClick={() => {
                              setEditingClass(c);
                              setNewClass({ name: c.name, board: c.board });
                              setIsDialogOpen(true);
                            }}
                            className="p-2.5 cursor-pointer rounded-lg"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Class</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(c.id)}
                            className="p-2.5 cursor-pointer text-rose-600 rounded-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-bold text-xs">Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">{editingClass ? "Edit Class" : "Define New Class"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-black uppercase text-gray-400">Board</label>
              <Select value={newClass.board} onValueChange={(val) => setNewClass({ ...newClass, board: val })}>
                <SelectTrigger className="h-12 rounded-xl">
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
                className="h-12 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white rounded-xl px-8 h-12 font-bold">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Class"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
