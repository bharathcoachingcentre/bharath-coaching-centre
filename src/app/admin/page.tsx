"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { format } from "date-fns";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  RefreshCcw,
  FileText,
  Plus
} from "lucide-react";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const firestore = useFirestore();
  
  // Real-time collections
  const enrollmentsQuery = React.useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "enrollments"), orderBy("createdAt", "desc"));
  }, [firestore]);

  const materialsQuery = React.useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "study-materials"));
  }, [firestore]);

  const performersQuery = React.useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "top-performers"));
  }, [firestore]);

  const { data: enrollments, loading: loadingEnrollments } = useCollection(enrollmentsQuery);
  const { data: materials, loading: loadingMaterials } = useCollection(materialsQuery);
  const { data: performers, loading: loadingPerformers } = useCollection(performersQuery);

  const handleDelete = async (coll: string, id: string) => {
    if (!firestore) return;
    deleteDoc(doc(firestore, coll, id))
      .catch((err) => {
        const permissionError = new FirestorePermissionError({
          path: `${coll}/${id}`,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    if (!firestore) return;
    updateDoc(doc(firestore, "enrollments", id), { status })
      .catch((err) => {
        const permissionError = new FirestorePermissionError({
          path: `enrollments/${id}`,
          operation: 'update',
          requestResourceData: { status },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#182d45] tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 font-medium">Manage your academy data from one place.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold">
            <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="enrollments" className="space-y-8">
        <TabsList className="bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
          <TabsTrigger value="enrollments" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-[#182d45] data-[state=active]:text-white transition-all">
            <Users className="mr-2 h-4 w-4" /> Enrollments
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-[#182d45] data-[state=active]:text-white transition-all">
            <BookOpen className="mr-2 h-4 w-4" /> Study Materials
          </TabsTrigger>
          <TabsTrigger value="results" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-[#182d45] data-[state=active]:text-white transition-all">
            <Trophy className="mr-2 h-4 w-4" /> Top Performers
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrollments">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-200 overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Applications</CardTitle>
                  <CardDescription>Manage incoming student registrations</CardDescription>
                </div>
                <Badge variant="secondary" className="rounded-full px-4 py-1 font-bold">
                  {enrollments?.length || 0} Total
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="px-8 py-4 font-bold text-[#182d45]">Student</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Standard</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Admission No</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Status</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Date</TableHead>
                    <TableHead className="px-8 py-4 text-right font-bold text-[#182d45]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingEnrollments ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400">Loading...</TableCell></TableRow>
                  ) : enrollments?.length === 0 ? (
                    <TableRow><TableCell colSpan={6} className="text-center py-10 text-gray-400">No applications found.</TableCell></TableRow>
                  ) : enrollments?.map((enrollment) => (
                    <TableRow key={enrollment.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-8 py-4">
                        <div className="font-bold text-[#182d45]">{enrollment.firstName} {enrollment.lastName}</div>
                        <div className="text-xs text-gray-500">{enrollment.board?.toUpperCase()}</div>
                      </TableCell>
                      <TableCell className="py-4 font-medium">{enrollment.standard}</TableCell>
                      <TableCell className="py-4 font-mono font-bold text-blue-600 text-xs">{enrollment.admissionNo}</TableCell>
                      <TableCell className="py-4">
                        <Badge className={cn(
                          "rounded-full px-3 py-0.5 font-bold uppercase text-[10px]",
                          enrollment.status === 'pending' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" :
                          enrollment.status === 'approved' ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                          "bg-rose-100 text-rose-700 hover:bg-rose-100"
                        )}>
                          {enrollment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4 text-gray-500 text-xs">
                        {enrollment.createdAt?.toDate ? format(enrollment.createdAt.toDate(), "MMM dd, yyyy") : "N/A"}
                      </TableCell>
                      <TableCell className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                            onClick={() => handleStatusUpdate(enrollment.id, 'approved')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-rose-600 hover:bg-rose-50 rounded-lg"
                            onClick={() => handleStatusUpdate(enrollment.id, 'rejected')}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            onClick={() => handleDelete('enrollments', enrollment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-200 overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Study Resources</CardTitle>
                  <CardDescription>Manage downloadable PDFs and books</CardDescription>
                </div>
                <Button className="bg-[#182d45] hover:bg-[#0d4f5c] rounded-xl font-bold">
                  <Plus className="mr-2 h-4 w-4" /> Add Material
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="px-8 py-4 font-bold text-[#182d45]">Title</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Grade</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Category</TableHead>
                    <TableHead className="px-8 py-4 text-right font-bold text-[#182d45]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingMaterials ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-400">Loading...</TableCell></TableRow>
                  ) : materials?.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-400">No study materials found.</TableCell></TableRow>
                  ) : materials?.map((material) => (
                    <TableRow key={material.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-8 py-4 font-bold text-[#182d45]">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-500" />
                          {material.title}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 font-medium">{material.grade}</TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="rounded-full px-3 py-0.5 font-bold uppercase text-[10px] text-gray-500 border-gray-200">
                          {material.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          onClick={() => handleDelete('study-materials', material.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card className="rounded-[2rem] border-none shadow-xl shadow-gray-200 overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Student Achievements</CardTitle>
                  <CardDescription>Manage top performers gallery</CardDescription>
                </div>
                <Button className="bg-[#182d45] hover:bg-[#0d4f5c] rounded-xl font-bold">
                  <Plus className="mr-2 h-4 w-4" /> Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow>
                    <TableHead className="px-8 py-4 font-bold text-[#182d45]">Name</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Marks</TableHead>
                    <TableHead className="py-4 font-bold text-[#182d45]">Rank/Year</TableHead>
                    <TableHead className="px-8 py-4 text-right font-bold text-[#182d45]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loadingPerformers ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-400">Loading...</TableCell></TableRow>
                  ) : performers?.length === 0 ? (
                    <TableRow><TableCell colSpan={4} className="text-center py-10 text-gray-400">No performers found.</TableCell></TableRow>
                  ) : performers?.map((performer) => (
                    <TableRow key={performer.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="px-8 py-4 font-bold text-[#182d45]">{performer.name}</TableCell>
                      <TableCell className="py-4 font-black text-blue-600">{performer.marks}</TableCell>
                      <TableCell className="py-4">
                        <div className="text-sm font-bold text-gray-700">{performer.rank}</div>
                        <div className="text-xs text-gray-400">{performer.year}</div>
                      </TableCell>
                      <TableCell className="px-8 py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          onClick={() => handleDelete('top-performers', performer.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
