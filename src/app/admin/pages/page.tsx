"use client";

import React, { useMemo, useState } from "react";
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
  BookMarked,
  Plus,
  Loader2,
  FilePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const systemPages = [
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
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newPage, setNewPage] = useState({ title: "", slug: "" });

  const pagesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'pages'));
  }, [firestore]);

  const { data: dbPages, loading } = useCollection(pagesQuery);

  const mergedPages = useMemo(() => {
    const base = [...systemPages];
    if (!dbPages) return base;

    dbPages.forEach(dbPage => {
      if (!base.find(p => p.id === dbPage.id)) {
        base.push({
          id: dbPage.id,
          title: dbPage.title || dbPage.id,
          description: "Custom user-defined page content",
          icon: FileText,
          color: "bg-gray-500",
          bg: "bg-gray-50"
        });
      }
    });
    return base;
  }, [dbPages]);

  const handleCreatePage = async () => {
    if (!firestore || !newPage.title || !newPage.slug) return;
    
    const slug = newPage.slug.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!slug) {
      toast({ variant: "destructive", title: "Invalid Slug", description: "Slug must contain only alphanumeric characters and hyphens." });
      return;
    }

    setIsCreating(true);
    try {
      await setDoc(doc(firestore, "pages", slug), {
        title: newPage.title,
        content: {},
        updatedAt: serverTimestamp(),
      });
      
      toast({ title: "Page Created", description: `${newPage.title} is now available for editing.` });
      setIsCreateDialogOpen(false);
      setNewPage({ title: "", slug: "" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Content Management</h2>
          <p className="text-gray-500 font-medium mt-1">Select a page or layout component to edit its content</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="h-12 px-6 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 gap-2 border-none transition-all active:scale-95 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" /> Create New Page
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Pages List...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mergedPages.map((page) => (
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
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight">Create New Page</DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
              Define a new content page. The slug will be used in the URL.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2 text-left">
              <Label className="font-bold text-sm text-[#182d45]">Page Title</Label>
              <Input 
                placeholder="e.g. Terms of Service" 
                value={newPage.title}
                onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2 text-left">
              <Label className="font-bold text-sm text-[#182d45]">Page Slug (URL)</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs">/pages/</span>
                <Input 
                  placeholder="terms-and-conditions" 
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="h-12 pl-16 bg-gray-50 border-gray-100 rounded-xl font-mono text-xs focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsCreateDialogOpen(false)} disabled={isCreating} className="font-bold">Cancel</Button>
            <Button 
              onClick={handleCreatePage} 
              disabled={isCreating}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 px-8 rounded-xl shadow-lg border-none transition-all active:scale-95"
            >
              {isCreating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FilePlus className="w-4 h-4 mr-2" />}
              Create Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
