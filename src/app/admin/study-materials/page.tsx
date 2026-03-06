
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  File, 
  Download, 
  Eye,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const materials = [
  { 
    id: 1, 
    title: "React Fundamentals Guide", 
    course: "Advanced React", 
    type: "PDF", 
    size: "2.4 MB", 
    downloads: 342, 
    icon: FileText, 
    iconColor: "text-purple-600", 
    iconBg: "bg-purple-100" 
  },
  { 
    id: 2, 
    title: "Data Structures Video Series", 
    course: "Data Science 101", 
    type: "Video", 
    size: "1.2 GB", 
    downloads: 891, 
    icon: Video, 
    iconColor: "text-blue-600", 
    iconBg: "bg-blue-100" 
  },
  { 
    id: 3, 
    title: "UI/UX Design Principles", 
    course: "UX Design Pro", 
    type: "PDF", 
    size: "5.8 MB", 
    downloads: 567, 
    icon: FileText, 
    iconColor: "text-indigo-600", 
    iconBg: "bg-indigo-100" 
  },
  { 
    id: 4, 
    title: "ML Algorithm Cheatsheet", 
    course: "Machine Learning", 
    type: "Image", 
    size: "800 KB", 
    downloads: 1203, 
    icon: ImageIcon, 
    iconColor: "text-orange-600", 
    iconBg: "bg-orange-100" 
  },
  { 
    id: 5, 
    title: "API Development Workshop", 
    course: "Node.js Backend", 
    type: "Video", 
    size: "890 MB", 
    downloads: 456, 
    icon: Video, 
    iconColor: "text-sky-600", 
    iconBg: "bg-sky-100" 
  },
  { 
    id: 6, 
    title: "Cloud Architecture Guide", 
    course: "AWS Cloud", 
    type: "PDF", 
    size: "3.1 MB", 
    downloads: 234, 
    icon: FileText, 
    iconColor: "text-violet-600", 
    iconBg: "bg-violet-100" 
  },
  { 
    id: 7, 
    title: "Flutter Widget Catalog", 
    course: "Flutter Dev", 
    type: "Document", 
    size: "1.5 MB", 
    downloads: 178, 
    icon: File, 
    iconColor: "text-emerald-600", 
    iconBg: "bg-emerald-100" 
  },
  { 
    id: 8, 
    title: "Python Practice Problems", 
    course: "Python Basics", 
    type: "PDF", 
    size: "900 KB", 
    downloads: 623, 
    icon: FileText, 
    iconColor: "text-blue-600", 
    iconBg: "bg-blue-100" 
  },
];

export default function StudyMaterialsPage() {
  return (
    <div className="space-y-8">
      {/* Search & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search materials..." 
            className="pl-12 h-14 bg-white border-none rounded-[18px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] focus-visible:ring-indigo-500"
          />
        </div>
        <Button className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-[18px] shadow-lg shadow-indigo-200 gap-2 text-base">
          <Plus className="w-6 h-6" /> Upload Material
        </Button>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {materials.map((item) => (
          <Card key={item.id} className="group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", item.iconBg)}>
                  <item.icon className={cn("w-7 h-7", item.iconColor)} />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-300 hover:text-gray-600 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-1 mb-6">
                <h3 className="font-bold text-gray-900 text-lg leading-snug group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                <p className="text-sm font-medium text-gray-400">{item.course}</p>
              </div>

              <div className="flex items-center justify-between mb-8">
                <Badge variant="secondary" className="bg-gray-50 text-gray-500 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-lg border-none">
                  {item.type}
                </Badge>
                <span className="text-xs font-bold text-gray-400">{item.size}</span>
              </div>

              <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-400">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-bold">{item.downloads}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                    <Eye className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                    <Download className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
