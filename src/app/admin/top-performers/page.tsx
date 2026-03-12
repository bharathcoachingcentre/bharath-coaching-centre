
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Trophy, 
  MoreVertical,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  Settings2,
  ListOrdered,
  GraduationCap
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, where, addDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function TopPerformersManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [isYearDialogOpen, setIsYearDialogOpen] = useState(false);
  const [newYear, setNewYear] = useState("");
  const [isAddingYear, setIsAddingYear] = useState(false);

  // 1. Fetch Years from the dedicated 'years' collection
  const yearsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'years'), orderBy('year', 'desc'));
  }, [firestore]);
  const { data: yearsList, loading: yearsLoading } = useCollection(yearsQuery);

  const availableYears = useMemo(() => {
    if (!yearsList) return [];
    return yearsList.map(y => y.year);
  }, [yearsList]);

  // 2. Constructed filtered query for the main list
  const performersQuery = useMemo(() => {
    if (!firestore) return null;
    const baseRef = collection(firestore, 'top-performers');
    
    if (yearFilter !== "all") {
      return query(
        baseRef, 
        where('year', '==', yearFilter)
      );
    }
    
    return query(baseRef);
  }, [firestore, yearFilter]);

  const { data: performers, loading } = useCollection(performersQuery);

  const filteredPerformers = useMemo(() => {
    if (!performers) return [];
    const lower = searchTerm.toLowerCase();
    return performers
      .filter(p => {
        const matchesSearch = !searchTerm || 
          p.name?.toLowerCase().includes(lower) || 
          p.grade?.toLowerCase().includes(lower);
        return matchesSearch;
      })
      .sort((a, b) => (a.rankOrder || 999) - (b.rankOrder || 999));
  }, [performers, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to remove this top performer? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'top-performers', id);
    deleteDoc(docRef)
      .then(() => {
        toast({ title: "Performer Removed", description: "The record has been permanently deleted." });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: "destructive",
          title: "Delete Failed",
          description: error.message || "Could not delete record.",
        });
      });
  };

  const handleAddYear = async () => {
    if (!firestore || !newYear.trim()) return;
    if (availableYears.includes(newYear.trim())) {
      toast({ variant: "destructive", title: "Year Exists", description: "This year is already in the list." });
      return;
    }

    setIsAddingYear(true);
    try {
      await addDoc(collection(firestore, 'years'), {
        year: newYear.trim(),
        createdAt: serverTimestamp()
      });
      toast({ title: "Year Added", description: `${newYear} is now available for selection.` });
      setNewYear("");
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    } finally {
      setIsAddingYear(false);
    }
  };

  const handleDeleteYear = async (id: string, yearValue: string) => {
    if (!firestore || !confirm(`Remove ${yearValue} from year list? This will not delete students from this year but will remove it from filters.`)) return;
    try {
      await deleteDoc(doc(firestore, 'years', id));
      toast({ title: "Year Removed" });
    } catch (e: any) {
      toast({ variant: "destructive", title: "Error", description: e.message });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 max-w-2xl text-left">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by student name or class..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
            />
          </div>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-44 h-14 bg-white border-none rounded-2xl shadow-sm focus:ring-blue-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="Filter Year" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
              <SelectItem value="all">All Years</SelectItem>
              {availableYears.map(y => (
                <SelectItem key={y} value={y}>Year {y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-3">
          <Dialog open={isYearDialogOpen} onOpenChange={setIsYearDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-14 px-6 rounded-2xl border-gray-200 font-bold text-gray-600 hover:bg-gray-50 gap-2">
                <Settings2 className="w-5 h-5" /> Manage Years
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-[2rem]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight text-left">Academic Years</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter year (e.g. 2027)" 
                    value={newYear} 
                    onChange={(e) => setNewYear(e.target.value)}
                    className="h-12 rounded-xl bg-gray-50 border-gray-100"
                  />
                  <Button onClick={handleAddYear} disabled={isAddingYear} className="h-12 bg-blue-600 rounded-xl px-6 font-bold border-none">
                    {isAddingYear ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest px-1">Active Years</p>
                  <div className="max-h-60 overflow-y-auto space-y-2 no-scrollbar">
                    {yearsList?.map((y) => (
                      <div key={y.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="font-bold text-gray-700">{y.year}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDeleteYear(y.id, y.year)}
                          className="h-8 w-8 text-gray-300 hover:text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    {yearsList?.length === 0 && (
                      <p className="text-center py-4 text-xs text-gray-400 italic">No years added yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base border-none transition-all active:scale-95">
            <Link href="/admin/top-performers/create">
              <Plus className="w-6 h-6" /> Add Performer
            </Link>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Records List...</p>
        </div>
      ) : filteredPerformers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No performers found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Student records will appear here once they are added.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/top-performers/create">Add First Performer</Link>
          </Button>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Rank</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Student</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Class / Board</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Marks</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400 text-left">Year</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerformers.map((p) => (
                  <TableRow key={p.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex items-center gap-3">
                        <Badge className={cn(
                          "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                          p.badgeColor || "bg-blue-100 text-blue-600"
                        )}>
                          {p.rank}
                        </Badge>
                        <span className="text-[10px] font-bold text-gray-300">#{p.rankOrder || '-'}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex-shrink-0">
                          <img 
                            src={p.imageUrl || "https://placehold.co/400x400.png?text=No+Photo"} 
                            alt={p.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-bold text-gray-900">{p.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <span className="font-medium text-gray-500">{p.grade}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <span className={cn("font-black text-lg tracking-tight", p.marksColor || "text-blue-600")}>
                        {p.marks}
                      </span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <Badge variant="outline" className="rounded-lg border-gray-200 text-gray-500 font-bold px-3">
                        {p.year}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                          <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                            <Link href={`/admin/top-performers/${p.id}`} className="flex items-center w-full">
                              <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                              <span className="font-bold text-xs text-gray-700">Edit Details</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(p.id)}
                            className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-bold text-xs">Delete Record</span>
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
    </div>
  );
}
