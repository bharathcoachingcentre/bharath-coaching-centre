
"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  Clock
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

export default function PeriodsManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<any | null>(null);
  
  const [newPeriod, setNewPeriod] = useState({ 
    startTime: "09:00",
    endTime: "10:30"
  });

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

  const periodsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'periods'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: periods, loading } = useCollection(periodsQuery);

  const handleSave = async () => {
    if (!firestore || !newPeriod.startTime || !newPeriod.endTime) return;
    
    setIsSaving(true);
    try {
      const to12h = (t: string) => {
        if (!t) return "";
        let [h, m] = t.split(":");
        let hh = parseInt(h);
        const ampm = hh >= 12 ? "PM" : "AM";
        hh = hh % 12 || 12;
        return `${hh}:${m} ${ampm}`;
      };

      const startTimeFormatted = to12h(newPeriod.startTime);
      const endTimeFormatted = to12h(newPeriod.endTime);
      const constructedLabel = `${startTimeFormatted} - ${endTimeFormatted}`;

      const [h, m] = newPeriod.startTime.split(":").map(Number);
      const calculatedOrder = h * 60 + m;

      const data = {
        label: constructedLabel,
        startTime: newPeriod.startTime,
        endTime: newPeriod.endTime,
        order: calculatedOrder,
        updatedAt: serverTimestamp(),
      };

      if (editingPeriod) {
        await updateDoc(doc(firestore, 'periods', editingPeriod.id), data);
        toast({ title: "Period Updated" });
      } else {
        await addDoc(collection(firestore, 'periods'), {
          ...data,
          createdAt: serverTimestamp(),
        });
        toast({ title: "Period Added" });
      }
    } catch (error: any) {
      console.error("Save error:", error);
      toast({ variant: "destructive", title: "Save Failed", description: error.message });
    } finally {
      setIsSaving(false);
      setIsDialogOpen(false);
      setEditingPeriod(null);
      setNewPeriod({ startTime: "09:00", endTime: "10:30" });
      setTimeout(() => {
        document.body.style.pointerEvents = 'auto';
      }, 150);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore || !confirm("Delete this period?")) return;
    try {
      await deleteDoc(doc(firestore, 'periods', id));
      toast({ title: "Period Deleted" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Delete Failed", description: e.message });
    }
  };

  const openEditDialog = (p: any) => {
    setEditingPeriod(p);
    setNewPeriod({ 
      startTime: p.startTime || "09:00",
      endTime: p.endTime || "10:30"
    });
    // Use timeout to allow DropdownMenu to close before Dialog opens
    setTimeout(() => setIsDialogOpen(true), 50);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-2xl font-black text-gray-900">Manage Class Periods</h2>
          <p className="text-sm text-gray-500">Define the standard time slots. These are sorted automatically by start time.</p>
        </div>
        <Button 
          onClick={() => {
            setEditingPeriod(null);
            setNewPeriod({ startTime: "09:00", endTime: "10:30" });
            setIsDialogOpen(true);
          }}
          className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-95 border-none"
        >
          <Plus className="w-6 h-6 mr-2" /> Define Period
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Periods...</p>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase text-gray-400 text-left">Time Slot / Label</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {periods?.map((p) => (
                  <TableRow key={p.id} className="border-gray-50 hover:bg-gray-50/50">
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                          <Clock className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-gray-900">{p.label}</span>
                      </div>
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
                            onSelect={(e) => {
                              e.preventDefault();
                              openEditDialog(p);
                            }}
                            className="p-2.5 cursor-pointer rounded-lg"
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Timing</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onSelect={() => handleDelete(p.id)}
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
        <DialogContent className="rounded-3xl max-w-md border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">{editingPeriod ? "Edit Timing" : "Define Timing"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 text-left">
                <label className="text-xs font-black uppercase text-gray-400">Start Time</label>
                <Input 
                  type="time"
                  value={newPeriod.startTime} 
                  onChange={(e) => setNewPeriod({ ...newPeriod, startTime: e.target.value })}
                  className="h-12 rounded-xl bg-gray-50 border-gray-100"
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="text-xs font-black uppercase text-gray-400">End Time</label>
                <Input 
                  type="time"
                  value={newPeriod.endTime} 
                  onChange={(e) => setNewPeriod({ ...newPeriod, endTime: e.target.value })}
                  className="h-12 rounded-xl bg-gray-50 border-gray-100"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="gap-3">
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>Cancel</Button>
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 text-white rounded-xl px-8 h-12 font-bold shadow-lg transition-all active:scale-95 border-none">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Period"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
