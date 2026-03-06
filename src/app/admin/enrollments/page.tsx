"use client";

import React from "react";
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
  Download as ExportIcon, 
  Plus, 
  MoreVertical 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const enrollments = [
  { id: "ENR-001", name: "Sarah Chen", email: "sarah@email.com", course: "Advanced React", date: "2026-03-01", progress: 72, status: "Active" },
  { id: "ENR-002", name: "James Wilson", email: "james@email.com", course: "Data Science 101", date: "2026-02-28", progress: 45, status: "Active" },
  { id: "ENR-003", name: "Emma Davis", email: "emma@email.com", course: "UX Design Pro", date: "2026-02-25", progress: 0, status: "Pending" },
  { id: "ENR-004", name: "Raj Patel", email: "raj@email.com", course: "Machine Learning", date: "2026-02-20", progress: 88, status: "Active" },
  { id: "ENR-005", name: "Lisa Park", email: "lisa@email.com", course: "Flutter Dev", date: "2026-02-18", progress: 100, status: "Completed" },
  { id: "ENR-006", name: "Tom Brown", email: "tom@email.com", course: "Node.js Backend", date: "2026-02-15", progress: 60, status: "Active" },
  { id: "ENR-007", name: "Anna Kim", email: "anna@email.com", course: "Python Basics", date: "2026-02-10", progress: 15, status: "Dropped" },
  { id: "ENR-008", name: "Mike Ross", email: "mike@email.com", course: "AWS Cloud", date: "2026-02-05", progress: 33, status: "Active" },
];

const statusStyles: Record<string, string> = {
  Active: "bg-indigo-100 text-indigo-600",
  Pending: "bg-gray-100 text-gray-500",
  Completed: "bg-emerald-100 text-emerald-600",
  Dropped: "bg-rose-100 text-rose-600",
};

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search students..." 
            className="pl-10 h-12 bg-white border-gray-200 rounded-xl focus-visible:ring-indigo-500 shadow-sm"
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 px-5 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 gap-2">
            <Filter className="w-4 h-4" /> Filter
          </Button>
          <Button variant="outline" className="h-12 px-5 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 gap-2">
            <ExportIcon className="w-4 h-4" /> Export
          </Button>
          <Button className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 gap-2">
            <Plus className="w-5 h-5" /> Add Enrollment
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-gray-100 hover:bg-transparent">
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">ID</TableHead>
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Student</TableHead>
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Course</TableHead>
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Date</TableHead>
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Progress</TableHead>
              <TableHead className="px-8 py-5 text-[11px] font-black uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="px-8 py-5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => (
              <TableRow key={enrollment.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <TableCell className="px-8 py-6 font-bold text-gray-400 text-sm">{enrollment.id}</TableCell>
                <TableCell className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{enrollment.name}</span>
                    <span className="text-[11px] font-medium text-gray-400">{enrollment.email}</span>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-6">
                  <span className="font-bold text-gray-700">{enrollment.course}</span>
                </TableCell>
                <TableCell className="px-8 py-6">
                  <span className="font-bold text-gray-400 text-sm">{enrollment.date}</span>
                </TableCell>
                <TableCell className="px-8 py-6 min-w-[180px]">
                  <div className="flex items-center gap-4">
                    <Progress 
                      value={enrollment.progress} 
                      className="h-2 flex-1 bg-gray-100" 
                      style={{ 
                        '--progress-foreground': '#6366f1' 
                      } as any}
                    />
                    <span className="font-bold text-gray-900 text-xs w-8">{enrollment.progress}%</span>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-6">
                  <Badge className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border-none shadow-none",
                    statusStyles[enrollment.status]
                  )}>
                    {enrollment.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-8 py-6 text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:bg-gray-100 rounded-lg">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
