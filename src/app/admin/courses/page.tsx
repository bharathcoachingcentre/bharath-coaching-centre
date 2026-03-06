
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Rocket, 
  Atom, 
  BookOpen, 
  Bot, 
  Calculator, 
  Globe, 
  Layers, 
  Terminal,
  Users,
  Clock,
  Star,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Link from "next/link";

const courses = [
  { 
    id: 1, 
    title: "Class 10 CBSE Mathematics", 
    category: "CBSE Curriculum", 
    students: "342", 
    lessons: "48", 
    duration: "Full Year", 
    rating: "4.9", 
    status: "Active",
    icon: Calculator,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50"
  },
  { 
    id: 2, 
    title: "Class 12 Samacheer Physics", 
    category: "State Board", 
    students: "891", 
    lessons: "64", 
    duration: "Full Year", 
    rating: "4.8", 
    status: "Active",
    icon: Atom,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50"
  },
  { 
    id: 3, 
    title: "NEET Crash Course 2025", 
    category: "Competitive", 
    students: "567", 
    lessons: "36", 
    duration: "3 Months", 
    rating: "4.7", 
    status: "Active",
    icon: Rocket,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50"
  },
  { 
    id: 4, 
    title: "Class 9 CBSE Science", 
    category: "CBSE Curriculum", 
    students: "1203", 
    lessons: "80", 
    duration: "Full Year", 
    rating: "4.9", 
    status: "Active",
    icon: Bot,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50"
  },
  { 
    id: 5, 
    title: "JEE Main Preparation", 
    category: "Competitive", 
    students: "456", 
    lessons: "52", 
    duration: "2 Years", 
    rating: "4.6", 
    status: "Active",
    icon: Layers,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50"
  },
  { 
    id: 6, 
    title: "Class 11 Samacheer Chemistry", 
    category: "State Board", 
    students: "234", 
    lessons: "32", 
    duration: "Full Year", 
    rating: "4.5", 
    status: "Draft",
    icon: Globe,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50"
  },
  { 
    id: 7, 
    title: "Class 8 CBSE Foundation", 
    category: "Foundation", 
    students: "623", 
    lessons: "44", 
    duration: "Full Year", 
    rating: "4.8", 
    status: "Active",
    icon: BookOpen,
    iconColor: "text-violet-500",
    iconBg: "bg-violet-50"
  },
  { 
    id: 8, 
    title: "Class 10 Samacheer Tamil", 
    category: "Language", 
    students: "1580", 
    lessons: "28", 
    duration: "Full Year", 
    rating: "4.7", 
    status: "Active",
    icon: Terminal,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50"
  },
];

export default function CoursesManagementPage() {
  return (
    <div className="space-y-8">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search courses..." 
            className="pl-12 h-14 bg-white border-none rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-indigo-500"
          />
        </div>
        <Button asChild className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[18px] shadow-lg shadow-indigo-200 gap-2 text-base cursor-pointer">
          <Link href="/admin/courses/create">
            <Plus className="w-6 h-6" /> Create Course
          </Link>
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
            <div className="h-1.5 w-full bg-gradient-to-r from-purple-500 to-indigo-600"></div>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-6 gap-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 flex-shrink-0", course.iconBg)}>
                    <course.icon className={cn("w-6 h-6", course.iconColor)} />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-indigo-600 transition-colors truncate">
                      {course.title}
                    </h3>
                    <p className="text-[10px] font-medium text-gray-400 mt-0.5 truncate">
                      {course.category}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg flex-shrink-0">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>

              {/* Internal stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-6 bg-gray-50/50 rounded-2xl p-3 border border-gray-50">
                <div className="flex flex-col items-center text-center space-y-0.5 min-w-0">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-black text-gray-900 truncate w-full">{course.students}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">Students</span>
                </div>
                <div className="flex flex-col items-center text-center space-y-0.5 border-x border-gray-100 min-w-0">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[11px] font-black text-gray-900 truncate w-full">{course.lessons}</span>
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
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-black text-gray-900">{course.rating}</span>
                </div>
                <Badge className={cn(
                  "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border-none shadow-none",
                  course.status === "Active" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                )}>
                  {course.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
