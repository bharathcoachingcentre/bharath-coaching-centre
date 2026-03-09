
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  CalendarClock,
  Filter,
  UserCheck
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

export default function TimetableManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [boardFilter, setBoardFilter] = useState<string>("all");

  const timetableQuery = useMemo(() => {
    if (!firestore) return null;
    // Simplify query to avoid missing composite index errors.
    // Filtering by board and search term is handled client-side for better reliability.
    return query(collection(firestore, 'timetables'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: entries, loading } = useCollection(timetableQuery);

  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    const lower = searchTerm.toLowerCase();
    return entries.filter(e => {
      const matchesSearch = !searchTerm || 
        e.subject?.toLowerCase().includes(lower) || 
        e.teacher?.toLowerCase().includes(lower) ||
        e.grade?.toLowerCase().includes(lower);
      
      const matchesBoard = boardFilter === "all" || e.board?.toLowerCase() === boardFilter.toLowerCase();
      
      return matchesSearch && matchesBoard;
    });
  }, [entries, searchTerm, boardFilter]);

  const handleDelete = async (entryId: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this schedule entry?")) return;

    const docRef = doc(firestore, 'timetables', entryId);
    deleteDoc(docRef)
      .then(() => {
        toast({ title: "Entry Deleted", description: "Schedule has been removed." });
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
          description: error.message || "Could not delete entry.",
        });
      });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-4 max-w-2xl">
          <div className="relative flex-1 text-left">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by subject, teacher or class..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
            />
          </div>
          <Select value={boardFilter} onValueChange={setBoardFilter}>
            <SelectTrigger className="w-44 h-14 bg-white border-none rounded-2xl shadow-sm focus:ring-blue-600">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <SelectValue placeholder="All Boards" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Boards</SelectItem>
              <SelectItem value="cbse">CBSE</SelectItem>
              <SelectItem value="samacheer">Samacheer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base border-none transition-all active:scale-95">
          <Link href="/admin/timetable/add">
            <Plus className="w-6 h-6" /> Add Schedule
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Loading Schedules...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarClock className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">added schedule not displaying here</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Create class schedules to display them on the homepage timetable.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/timetable/add">Add First Entry</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map((entry) => (
            <Card key={entry.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
              <div className={cn(
                "h-1.5 w-full",
                entry.board?.toLowerCase() === "cbse" ? "bg-blue-500" : "bg-teal-500"
              )}></div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-left">
                    <Badge className={cn(
                      "px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border-none shadow-none mb-2",
                      entry.board?.toLowerCase() === "cbse" ? "bg-blue-50 text-blue-600" : "bg-teal-50 text-teal-600"
                    )}>
                      {entry.board}
                    </Badge>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{entry.subject}</h3>
                    <p className="text-xs font-bold text-blue-600 mt-1">{entry.grade}</p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                      <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                        <Link href={`/admin/timetable/${entry.id}`} className="flex items-center w-full">
                          <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="font-bold text-xs text-gray-700">Edit Details</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-50" />
                      <DropdownMenuItem 
                        onClick={() => handleDelete(entry.id)}
                        className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span className="font-bold text-xs">Delete Entry</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-50 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <CalendarClock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Schedule</p>
                      <p className="text-xs font-bold text-gray-700">{entry.day} • {entry.timeSlot}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Teacher</p>
                      <p className="text-xs font-bold text-gray-700">{entry.teacher || "Not assigned"}</p>
                    </div>
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
