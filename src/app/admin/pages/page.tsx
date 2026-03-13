"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  ChevronRight, 
  Home, 
  Info, 
  Trophy, 
  Users, 
  Layout,
  ArrowRight,
  Globe,
  PanelTop,
  PanelBottom,
  BookOpen,
  BookMarked
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const pages = [
  { 
    id: "header", 
    title: "Global Header", 
    description: "Main navigation, branding, and CTA button", 
    icon: PanelTop, 
    color: "bg-indigo-500", 
    bg: "bg-indigo-50" 
  },
  { 
    id: "footer", 
    title: "Global Footer", 
    description: "Contact info, social links, and site links", 
    icon: PanelBottom, 
    color: "bg-slate-700", 
    bg: "bg-slate-50" 
  },
  { 
    id: "home", 
    title: "Home Page", 
    description: "Hero banner, features, and success metrics", 
    icon: Home, 
    color: "bg-blue-500", 
    bg: "bg-blue-50" 
  },
  { 
    id: "about", 
    title: "About Us", 
    description: "Philosophy, history, and team mission", 
    icon: Info, 
    color: "bg-teal-500", 
    bg: "bg-teal-50" 
  },
  { 
    id: "study-material", 
    title: "Study Materials", 
    description: "Premium learning cards and resource hub settings", 
    icon: BookMarked, 
    color: "bg-cyan-500", 
    bg: "bg-cyan-50" 
  },
  { 
    id: "results", 
    title: "Our Results", 
    description: "Top performers and achievement stats", 
    icon: Trophy, 
    color: "bg-orange-500", 
    bg: "bg-orange-50" 
  },
  { 
    id: "teachers", 
    title: "Become a Teacher", 
    description: "Faculty recruitment information", 
    icon: Users, 
    color: "bg-purple-500", 
    bg: "bg-purple-50" 
  },
  { 
    id: "online-courses", 
    title: "Online Courses", 
    description: "Batch details and digital features", 
    icon: Globe, 
    color: "bg-emerald-500", 
    bg: "bg-emerald-50" 
  }
];

export default function PagesManagementPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Content Management</h2>
          <p className="text-gray-500 font-medium mt-1">Select a page or layout component to edit its content</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card key={page.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
            <CardContent className="p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110", page.color)}>
                  <page.icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-xl tracking-tight">{page.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5">
                    <Layout className="w-3 h-3" />
                    Template Editor
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 line-clamp-2 min-h-[2.5rem] text-left">
                {page.description}
              </p>

              <Button asChild className="w-full h-12 bg-gray-50 hover:bg-blue-600 text-gray-600 hover:text-white font-bold rounded-xl border-none transition-all duration-300 group/btn">
                <Link href={`/admin/pages/${page.id}`} className="flex items-center justify-center gap-2">
                  Edit Content
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
