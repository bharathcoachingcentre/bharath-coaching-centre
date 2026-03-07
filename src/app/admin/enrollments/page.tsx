
"use client";

import React, { useMemo, useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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

const statusStyles: Record<string, string> = {
  Active: "bg-blue-600/10 text-blue-600",
  approved: "bg-blue-600/10 text-blue-600",
  pending: "bg-gray-100 text-gray-500",
  Pending: "bg-gray-100 text-gray-500",
  Completed: "bg-emerald-100 text-emerald-600",
  Dropped: "bg-rose-100 text-rose-600",
};

export default function EnrollmentsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const enrollmentsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: enrollments, loading } = useCollection(enrollmentsQuery);

  const filteredEnrollments = useMemo(() => {
    if (!enrollments) return [];
    if (!searchTerm) return enrollments;
    const lowerSearch = searchTerm.toLowerCase();
    return enrollments.filter(e => 
        e.firstName?.toLowerCase().includes(lowerSearch) || 
        e.lastName?.toLowerCase().includes(lowerSearch) || 
        e.email?.toLowerCase().includes(lowerSearch) ||
        e.admissionNo?.toLowerCase().includes(lowerSearch)
    );
  }, [enrollments, searchTerm]);

  const handleDelete = async (enrollmentId: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this enrollment? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'enrollments', enrollmentId);
    
    deleteDoc(docRef)
      .then(() => {
        toast({
          title: "Record Deleted",
          description: "The enrollment record has been removed successfully.",
        });
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
          description: error.message || "Could not delete the record.",
        });
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md text-left">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-blue-600 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-5 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button asChild className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 gap-2 cursor-pointer border-none transition-all hover:scale-[1.02] active:scale-95">
            <Link href="/admin/enrollments/add">
              <Plus className="w-5 h-5" /> Add Enrollment
            </Link>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden text-left">
        <Table>
          <TableHeader className="bg-gray-50/80 border-b border-gray-100">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">ID</TableHead>
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Student</TableHead>
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Course / Board</TableHead>
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Date</TableHead>
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Progress</TableHead>
              <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Status</TableHead>
              <TableHead className="px-8 py-5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12">
                  <div className="flex items-center justify-center gap-2 text-gray-400 font-medium">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Loading enrollments...
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredEnrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-gray-400 font-medium">
                  {searchTerm ? "No students match your search." : "No enrollments found in the database."}
                </TableCell>
              </TableRow>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <TableRow key={enrollment.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                  <TableCell className="px-8 py-6 font-bold text-gray-400 text-sm">{enrollment.admissionNo || "N/A"}</TableCell>
                  <TableCell className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-900">{enrollment.firstName} {enrollment.lastName}</span>
                      <span className="text-[11px] font-medium text-gray-400">{enrollment.email || enrollment.whatsappNo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <span className="font-bold text-gray-700 capitalize">
                        {enrollment.course?.replace(/-/g, ' ') || enrollment.board || enrollment.standard}
                    </span>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <span className="font-bold text-gray-400 text-sm">
                        {enrollment.admissionDate ? (
                            typeof enrollment.admissionDate === 'string' ? enrollment.admissionDate.split('T')[0] : 'N/A'
                        ) : 'Not Set'}
                    </span>
                  </TableCell>
                  <TableCell className="px-8 py-6 min-w-[180px]">
                    <div className="flex items-center gap-4">
                      <Progress 
                        value={enrollment.progress || 0} 
                        className="h-2 flex-1 bg-gray-100" 
                      />
                      <span className="font-bold text-gray-900 text-xs w-8">{enrollment.progress || 0}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <Badge className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-none shadow-none",
                      statusStyles[enrollment.status] || statusStyles.pending
                    )}>
                      {enrollment.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-8 py-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-600/10 rounded-lg">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                        <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/enrollments/${enrollment.id}`} className="flex items-center w-full">
                            <Eye className="mr-2 h-4 w-4 text-blue-500" />
                            <span className="font-bold text-xs text-gray-700">View Profile</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/enrollments/${enrollment.id}?edit=true`} className="flex items-center w-full">
                            <Pencil className="mr-2 h-4 w-4 text-blue-600" />
                            <span className="font-bold text-xs text-gray-700">Edit Info</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-50" />
                        <DropdownMenuItem 
                            onClick={() => handleDelete(enrollment.id)}
                            className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span className="font-bold text-xs">Delete Record</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
