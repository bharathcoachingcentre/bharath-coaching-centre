
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Trophy, 
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  Star,
  Calendar,
  Medal
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function TopPerformersManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState<string>("all");

  const performersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'top-performers'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: performers, loading } = useCollection(performersQuery);

  const years = useMemo(() => {
    if (!performers) return [];
    return [...new Set(performers.map(p => p.year))].sort((a, b) => b.localeCompare(a));
  }, [performers]);

  const filteredPerformers = useMemo(() => {
    if (!performers) return [];
    const lower = searchTerm.toLowerCase();
    return performers.filter(p => {
      const matchesSearch = !searchTerm || p.name?.toLowerCase().includes(lower) || p.grade?.toLowerCase().includes(lower);
      const matchesYear = yearFilter === "all" || p.year === yearFilter;
      return matchesSearch && matchesYear;
    });
  }, [performers, searchTerm, yearFilter]);

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
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {years.map(y => (
                <SelectItem key={y} value={y}>{y}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base border-none transition-all active:scale-95">
          <Link href="/admin/top-performers/create">
            <Plus className="w-6 h-6" /> Add Performer
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Hall of Fame...</p>
        </div>
      ) : filteredPerformers.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Medal className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No performers found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Add your top students to display them on the homepage success section.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/top-performers/create">Add First Performer</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPerformers.map((p) => (
            <Card key={p.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 text-left">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={p.imageUrl || "https://placehold.co/400x400.png?text=No+Photo"} 
                  alt={p.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={cn("absolute top-4 right-4 px-3 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-widest shadow-lg", p.badgeColor || "bg-blue-600")}>
                  {p.rank}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                      {p.grade} • {p.year}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
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
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-gray-50">
                  <div className="space-y-0.5">
                    <div className={cn("text-2xl font-black tracking-tighter", p.marksColor || "text-blue-600")}>
                      {p.marks}
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</div>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg", p.iconColor || "bg-blue-600")}>
                    <Star className="w-5 h-5 fill-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
