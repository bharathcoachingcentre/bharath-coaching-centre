
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
  MoreVertical,
  Eye,
  Pencil,
  Trash2
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

const enrollments = [
  { id: "ENR-001", name: "Ananya Krishnan", email: "ananya@email.com", course: "Class 10 CBSE Maths", date: "2025-03-01", progress: 72, status: "Active" },
  { id: "ENR-002", name: "Arjun Mehta", email: "arjun@email.com", course: "Class 12 Samacheer Physics", date: "2025-02-28", progress: 45, status: "Active" },
  { id: "ENR-003", name: "Divya Nair", email: "divya@email.com", course: "Class 9 CBSE Science", date: "2025-02-25", progress: 0, status: "Pending" },
  { id: "ENR-004", name: "Rohan Kapoor", email: "rohan@email.com", course: "NEET Crash Course", date: "2025-02-20", progress: 88, status: "Active" },
  { id: "ENR-005", name: "Sanya Gupta", email: "sanya@email.com", course: "Class 11 Samacheer Chemistry", date: "2025-02-18", progress: 100, status: "Completed" },
  { id: "ENR-006", name: "Vikram Malhotra", email: "vikram@email.com", course: "Class 12 CBSE Maths", date: "2025-02-15", progress: 60, status: "Active" },
  { id: "ENR-007", name: "Nisha Reddy", email: "nisha@email.com", course: "Class 8 CBSE Foundation", date: "2025-02-10", progress: 15, status: "Dropped" },
  { id: "ENR-008", name: "Kabir Singh", email: "kabir@email.com", course: "JEE Advanced Prep", date: "2025-02-05", progress: 33, status: "Active" },
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
          <Button asChild className="h-12 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 gap-2 cursor-pointer">
            <Link href="/admin/enrollments/add">
              <Plus className="w-5 h-5" /> Add Enrollment
            </Link>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-xl border-gray-100 p-1">
                      <DropdownMenuItem className="p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                        <Eye className="mr-2 h-4 w-4 text-blue-500" />
                        <span className="font-bold text-xs">View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                        <Pencil className="mr-2 h-4 w-4 text-indigo-500" />
                        <span className="font-bold text-xs">Edit Info</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-50" />
                      <DropdownMenuItem className="p-2 cursor-pointer hover:bg-red-50 text-red-600 rounded-lg">
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
      </div>
    </div>
  );
}
