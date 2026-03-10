
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Book,
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
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

export default function SubjectsManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingSubject, setEditingSubject] = useState<any | null>(null);
  const [newSubject, setNewSubject] = useState({ name: "", code: "" });

  // Safety fix for Radix UI body lock issues
  useEffect(() => {
    if (!isDialogOpen) {
      document.body.style.pointerEvents = 'auto';
    }
  }, [isDialogOpen]);

  const subjectsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'subjects'), orderBy('name', 'asc'));
  }, [firestore]);

  const { data: subjects, loading } = useCollection(subjectsQuery);

  const filteredSubjects = useMemo(() => {
    if (!subjects) return [];
    const lower = searchTerm.toLowerCase();
    return subjects.filter(s => 
      s.name?.toLowerCase().includes(lower) || 
      s.code?.toLowerCase().includes(lower)
    );
  }, [subjects, searchTerm]);

  const handleSave = async () => {
    if (!firestore || !newSubject.name) return;
    setIsSaving(true);

    try {
      if (editingSubject) {
        await updateDoc(doc(firestore, 'subjects', editingSubject.id), {
          ...newSubject,
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Subject Updated" });
      } else {
        await addDoc(collection(firestore, 'subjects'), {
          ...newSubject,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Subject Added" });
      }
      setIsDialogOpen(false);
      setEditingSubject(null);
      setNewSubject({ name: "", code: "" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Delete this subject?")) return;
    deleteDoc(doc(firestore, 'subjects', id))
      .then(() => toast({ title: "Subject Deleted" }))
      .catch((e) => toast({ variant: "destructive", title: "Delete Failed", description: e.message }));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md text-left">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
          />
        </div>
        <Button 
          onClick={() => {
            setEditingSubject(null);
            setNewSubject({ name: "", code: "" });
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 border-none"
        >
          <Plus className="w-6 h-6 mr-2" /> Add Subject
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Subjects...</p>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400">Subject Name</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400">Code</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((s) => (
                  <TableRow key={s.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="px-8 py-5">
                      <span className="font-bold text-gray-900">{s.name}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-gray-500 font-medium">
                      {s.code || "N/A"}
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
                            onSelect={(e) => {
                              e.preventDefault();
                              setEditingSubject(s);
                              setNewSubject({ name: s.name, code: s.code || "" });
                              setIsDialogOpen(true);
                            }}
                            className="p-2.5 cursor-pointer rounded-lg"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Subject</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(s.id)}
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
            <DialogTitle className="text-2xl font-black text-gray-900">{editingSubject ? "Edit Subject" : "Add New Subject"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400">Subject Name</label>
              <Input 
                value={newSubject.name} 
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
                placeholder="e.g. Mathematics"
                className="h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black uppercase text-gray-400">Subject Code (Optional)</label>
              <Input 
                value={newSubject.code} 
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                placeholder="e.g. MATH101"
                className="h-12 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white rounded-xl px-8 h-12 font-bold">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Subject"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
