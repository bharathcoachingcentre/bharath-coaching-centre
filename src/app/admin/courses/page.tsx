
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Rocket, 
  Atom, 
  BookOpen, 
  Calculator, 
  Terminal,
  Users,
  Clock,
  Star,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Loader2
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
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const categoryIconMap: Record<string, any> = {
  "CBSE Curriculum": Calculator,
  "State Board": Atom,
  "Competitive": Rocket,
  "Foundation": BookOpen,
  "Language": Terminal,
};

export default function CoursesManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const coursesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: realCourses, loading } = useCollection(coursesQuery);

  const filteredCourses = useMemo(() => {
    if (!realCourses) return [];
    const lower = searchTerm.toLowerCase();
    return realCourses.filter(c => 
      c.title?.toLowerCase().includes(lower) || 
      c.category?.toLowerCase().includes(lower)
    );
  }, [realCourses, searchTerm]);

  const handleDelete = async (courseId: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;

    const docRef = doc(firestore, 'courses', courseId);
    deleteDoc(docRef)
      .then(() => {
        toast({ title: "Course Deleted", description: "The course has been permanently removed." });
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
          description: error.message || "Could not delete the course record.",
        });
      });
  };

  return (
    <div className="space-y-8">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search courses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-[#35a3be]"
          />
        </div>
        <Button asChild className="h-14 px-8 bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold rounded-[18px] shadow-lg shadow-[#35a3be]/20 gap-2 text-base cursor-pointer border-none">
          <Link href="/admin/courses/create">
            <Plus className="w-6 h-6" /> Create Course
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-[#35a3be]" />
          <p className="font-bold">Syncing Courses Catalog...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Course Catalog Empty</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Publish your first course to populate your academy's offerings.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/courses/create">Add New Course</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => {
            const Icon = course.icon || categoryIconMap[course.category] || BookOpen;
            return (
              <Card key={course.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#14b8a6] to-[#35a3be]"></div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6 gap-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0 text-left">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0", course.iconBg || "bg-blue-50")}>
                        <Icon className={cn("w-6 h-6", course.iconColor || "text-blue-500")} />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-[#35a3be] transition-colors truncate">
                          {course.title}
                        </h3>
                        <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate uppercase tracking-tighter">
                          {course.category}
                        </p>
                      </div>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-[#35a3be] hover:bg-[#35a3be]/5 rounded-lg flex-shrink-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 rounded-xl shadow-xl border-gray-100 p-1">
                        <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/courses/${course.id}`} className="flex items-center w-full">
                            <Eye className="mr-2 h-4 w-4 text-blue-500" />
                            <span className="font-bold text-xs text-gray-700">View Course</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg">
                          <Link href={`/admin/courses/${course.id}?edit=true`} className="flex items-center w-full">
                            <Pencil className="mr-2 h-4 w-4 text-[#35a3be]" />
                            <span className="font-bold text-xs text-gray-700">Edit Details</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-50" />
                        <DropdownMenuItem 
                          onClick={() => handleDelete(course.id)}
                          className="p-2.5 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span className="font-bold text-xs">Delete Course</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-50/50 rounded-2xl p-3 border border-gray-50">
                    <div className="flex flex-col items-center text-center space-y-0.5 min-w-0">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-black text-gray-900 truncate w-full">{course.students || 0}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Students</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-0.5 border-x border-gray-100 min-w-0">
                      <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-black text-gray-900 truncate w-full">{course.modules?.length || 0}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Lessons</span>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-0.5 min-w-0">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-[11px] font-black text-gray-900 truncate w-full">{course.duration}</span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Term</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#fbbf24] fill-[#fbbf24]" />
                      <span className="text-xs font-black text-gray-900">{course.rating || 5.0}</span>
                    </div>
                    <Badge className={cn(
                      "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border-none shadow-none",
                      course.status === "Active" ? "bg-[#35a3be]/10 text-[#35a3be]" : "bg-gray-100 text-gray-500"
                    )}>
                      {course.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
