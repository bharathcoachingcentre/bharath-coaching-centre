
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { collection, query, where, deleteDoc, doc, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function TeachersRegistryPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<any | null>(null);
  const [teacherName, setTeacherName] = useState("");

  const teachersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'), where('role', '==', 'teacher'));
  }, [firestore]);

  const { data: teachers, loading } = useCollection(teachersQuery);

  const handleSave = async () => {
    if (!firestore || !teacherName) return;
    
    setIsSaving(true);
    try {
      if (editingTeacher) {
        await updateDoc(doc(firestore, 'users', editingTeacher.id), {
          displayName: teacherName,
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Teacher Updated" });
      } else {
        const safeName = teacherName.toLowerCase().replace(/[^a-z0-9]/g, '.');
        const generatedEmail = `${safeName}.${Math.floor(Math.random() * 1000)}@bharath.edu`;

        await addDoc(collection(firestore, 'users'), {
          displayName: teacherName,
          email: generatedEmail,
          role: "teacher",
          status: "active",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast({ title: "Teacher Added to Registry" });
      }
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setIsSaving(false);
      setEditingTeacher(null);
      setTeacherName("");
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Remove this teacher from registry? This may affect schedules assigned to them.")) return;
    try {
      await deleteDoc(doc(firestore, 'users', id));
      toast({ title: "Teacher Removed" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Delete Failed", description: e.message });
    }
  };

  const openEditDialog = (t: any) => {
    setEditingTeacher(t);
    setTeacherName(t.displayName);
    // Use timeout to allow DropdownMenu to close before Dialog opens to prevent lockups
    setTimeout(() => setIsDialogOpen(true), 150);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-2xl font-black text-gray-900">Faculty Registry</h2>
          <p className="text-sm text-gray-500">Manage teachers available for the class timetable scheduling.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingTeacher(null);
            setTeacherName("");
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 border-none"
        >
          <Plus className="w-6 h-6 mr-2" /> Add Teacher
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Faculty List...</p>
        </div>
      ) : !teachers || teachers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[2rem] shadow-sm border border-dashed border-gray-200">
          <UserCheck className="w-12 h-12 text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 font-bold">No teachers registered for the timetable yet.</p>
          <Button variant="link" onClick={() => setIsDialogOpen(true)} className="text-blue-600 font-bold">Add your first teacher</Button>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-left">Teacher Name</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.map((t) => (
                  <TableRow key={t.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="px-8 py-5 text-left">
                      <span className="font-bold text-gray-900">{t.displayName}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl p-1 border-gray-100">
                          <DropdownMenuItem 
                            onSelect={() => openEditDialog(t)}
                            className="p-2.5 cursor-pointer rounded-lg"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Name</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem 
                            onSelect={() => handleDelete(t.id)}
                            className="p-2.5 cursor-pointer text-rose-600 rounded-lg hover:bg-rose-50"
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
        <DialogContent className="rounded-3xl max-w-md border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">
              {editingTeacher ? "Edit Faculty Name" : "Register New Faculty"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2 text-left">
              <label className="text-xs font-black uppercase text-gray-400">Full Name</label>
              <Input 
                value={teacherName} 
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="e.g. Mr. Rajesh Kumar"
                className="h-12 rounded-xl bg-gray-50 border-gray-100 focus:border-blue-500 shadow-sm"
              />
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isSaving} className="font-bold">Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Teacher"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
