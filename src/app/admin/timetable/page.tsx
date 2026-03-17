
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  MoreVertical,
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
import { collection, query, orderBy, deleteDoc, doc, where } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function TimetableManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [boardFilter, setBoardFilter] = useState<string>("all");
  const [selectedScheduleClass, setSelectedScheduleClass] = useState<string>("all");

  const timetableQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'timetables'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: entries, loading: timetableLoading } = useCollection(timetableQuery);

  // Master Data Lookups (for supporting both legacy ID records and new Name-based records)
  const { data: classes } = useCollection(useMemo(() => firestore ? query(collection(firestore, 'classes')) : null, [firestore]));
  const { data: subjects } = useCollection(useMemo(() => firestore ? query(collection(firestore, 'subjects')) : null, [firestore]));
  const { data: periods } = useCollection(useMemo(() => firestore ? query(collection(firestore, 'periods')) : null, [firestore]));
  const { data: teachers } = useCollection(useMemo(() => firestore ? query(collection(firestore, 'users'), where('role', '==', 'teacher')) : null, [firestore]));

  const loading = timetableLoading || !classes || !subjects || !periods || !teachers;

  const resolvedEntries = useMemo(() => {
    if (!entries) return [];
    if (!classes || !subjects || !periods || !teachers) return entries;

    return entries.map(e => ({
      ...e,
      // Robust lookup handles cases where DB stores ID (legacy) or Name (new)
      gradeName: classes.find(c => c.id === e.grade)?.name || e.grade,
      subjectName: subjects.find(s => s.id === e.subject)?.name || e.subject,
      timeSlotLabel: periods.find(p => p.id === e.timeSlot)?.label || e.timeSlot,
      teacherName: teachers.find(t => t.id === e.teacher)?.displayName || e.teacher,
    }));
  }, [entries, classes, subjects, periods, teachers]);

  const filteredEntries = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return resolvedEntries.filter(e => {
      const matchesSearch = !searchTerm || 
        e.subjectName?.toLowerCase().includes(lower) || 
        e.teacherName?.toLowerCase().includes(lower) ||
        e.gradeName?.toLowerCase().includes(lower);
      
      const matchesBoard = boardFilter === "all" || e.board?.toLowerCase() === boardFilter.toLowerCase();
      const matchesClass = selectedScheduleClass === "all" || e.grade === selectedScheduleClass || e.gradeName === selectedScheduleClass;
      
      return matchesSearch && matchesBoard && matchesClass;
    });
  }, [resolvedEntries, searchTerm, boardFilter, selectedScheduleClass]);

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
        <div className="flex flex-1 flex-col md:flex-row items-center gap-4 w-full md:max-w-3xl text-left">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search by subject, teacher or class..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600 w-full"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={boardFilter} onValueChange={(val) => {
              setBoardFilter(val);
              setSelectedScheduleClass("all");
            }}>
              <SelectTrigger className="w-full md:w-44 h-14 bg-white border-none rounded-2xl shadow-sm focus:ring-blue-600">
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

            <Select value={selectedScheduleClass} onValueChange={setSelectedScheduleClass}>
              <SelectTrigger className="w-full md:w-44 h-14 bg-white border-none rounded-2xl shadow-sm focus:ring-blue-600">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                <SelectItem value="all">All Classes</SelectItem>
                {[...new Set((classes || [])
                  .filter(c => boardFilter === "all" || c.board?.toLowerCase() === boardFilter.toLowerCase())
                  .map(c => c.name))]
                  .sort((a, b) => (parseInt(a.replace(/\D/g, '')) || 0) - (parseInt(b.replace(/\D/g, '')) || 0))
                  .map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button asChild className="h-14 w-full md:w-auto px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 text-base border-none transition-all active:scale-95">
          <Link href="/admin/timetable/add">
            <Plus className="w-6 h-6" /> Add Schedule
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Schedule Database...</p>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarClock className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No schedules found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Create class schedules to display them on the homepage timetable.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/timetable/add">Add First Entry</Link>
          </Button>
        </div>
      ) : (
        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow className="hover:bg-transparent border-gray-100">
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400">Board</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400">Class</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400">Subject</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400">Schedule</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-black uppercase tracking-wider text-gray-400">Teacher</TableHead>
                  <TableHead className="px-8 py-5"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <TableCell className="px-8 py-5 text-left">
                      <Badge className={cn(
                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border-none shadow-none",
                        entry.board?.toLowerCase() === "cbse" 
                          ? "bg-blue-100 text-blue-600" 
                          : "bg-teal-100 text-teal-600"
                      )}>
                        {entry.board || "N/A"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <span className="font-bold text-gray-900">{entry.gradeName}</span>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{entry.subjectName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarClock className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-bold">{entry.day} • {entry.timeSlotLabel}</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-8 py-5 text-left">
                      <div className="flex items-center gap-2 text-gray-600">
                        <UserCheck className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-medium">{entry.teacherName || "Not assigned"}</span>
                      </div>
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
                            <Link href={`/admin/timetable/${entry.id}`} className="flex items-center w-full">
                              <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                              <span className="font-bold text-xs text-gray-700">Edit Entry</span>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-50" />
                          <DropdownMenuItem 
                            onClick={() => handleDelete(entry.id)}
                            className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span className="font-bold text-xs">Delete Schedule</span>
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
