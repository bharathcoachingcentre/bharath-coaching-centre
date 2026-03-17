"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Loader2,
  FileText,
  Calendar,
  User,
  ExternalLink
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

export default function BlogsManagementPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const blogsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blogs'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: blogs, loading } = useCollection(blogsQuery);

  const filteredBlogs = useMemo(() => {
    if (!blogs) return [];
    const lower = searchTerm.toLowerCase();
    return blogs.filter(b => 
      b.title?.toLowerCase().includes(lower) || 
      b.author?.toLowerCase().includes(lower)
    );
  }, [blogs, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    if (!confirm("Are you sure you want to delete this article permanently?")) return;

    const docRef = doc(firestore, 'blogs', id);
    try {
      await deleteDoc(docRef);
      toast({ title: "Article Deleted", description: "The blog post has been removed." });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: error.message
      });
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-14 bg-white border-none rounded-2xl shadow-sm focus-visible:ring-blue-600"
          />
        </div>
        <Button asChild className="h-14 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 gap-2 border-none transition-all active:scale-95">
          <Link href="/admin/blogs/create">
            <Plus className="w-6 h-6" /> Create Article
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing Blog Archives...</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No articles found</h3>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">Start sharing insights by publishing your first blog post.</p>
          <Button asChild variant="outline" className="mt-8 rounded-xl font-bold">
            <Link href="/admin/blogs/create">Draft First Post</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="group border-none shadow-xl rounded-[24px] overflow-hidden bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
              <div className="relative h-48 w-full overflow-hidden">
                <img 
                  src={blog.featuredImage || "https://placehold.co/600x400.png?text=No+Image"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={blog.title}
                />
                <div className="absolute top-4 right-4">
                  <Badge className={cn(
                    "px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none shadow-lg",
                    blog.status === 'published' ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
                  )}>
                    {blog.status}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col flex-grow text-left">
                <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3 h-3" /> {blog.author || 'Staff'}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" /> {blog.date}
                  </div>
                </div>
                
                <h3 className="text-xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3.5rem]">
                  {blog.title}
                </h3>
                
                <p className="text-sm text-gray-500 font-medium mb-8 line-clamp-3 leading-relaxed flex-grow">
                  {blog.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                  <div className="flex gap-2">
                    <Button asChild size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-blue-600 hover:bg-blue-50">
                      <Link href={`/admin/blogs/${blog.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={() => handleDelete(blog.id)}
                      className="h-10 w-10 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button asChild variant="ghost" className="rounded-xl font-bold text-xs gap-2 text-gray-400 hover:text-blue-600">
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      Live Preview <ExternalLink className="w-3 h-3" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}