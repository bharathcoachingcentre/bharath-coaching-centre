"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  FileText,
  Upload,
  Sparkles,
  Type,
  Layout,
  User,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { RichTextEditor } from "@/components/rich-text-editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().min(1, "Short description is required"),
  content: z.string().min(1, "Article content is required"),
  featuredImage: z.string().min(1, "Featured image is required"),
  author: z.string().min(1, "Author name is required"),
  status: z.string().min(1, "Status is required"),
});

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, "blogs", id);
  }, [firestore, id]);

  const { data: blog, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      author: "",
      status: "draft",
    },
  });

  useEffect(() => {
    if (blog && !isSaving && !form.formState.isDirty) {
      form.reset({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        featuredImage: blog.featuredImage || "",
        author: blog.author || "",
        status: blog.status || "draft",
      });
    }
  }, [blog, form, isSaving]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please upload an image smaller than 1MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("featuredImage", reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !id) return;
    setIsSaving(true);

    try {
      await updateDoc(doc(firestore, "blogs", id), {
        ...values,
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "Article Updated",
        description: "Your changes have been saved successfully.",
      });
      router.push("/admin/blogs");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Content...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.push("/admin/blogs")} className="text-gray-500 font-bold hover:text-blue-600 w-full sm:w-auto justify-start px-0 sm:px-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
        </Button>
      </div>

      <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
        <CardHeader className="p-8 md:p-12 pb-0">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <CardTitle className="text-3xl font-black text-gray-900 tracking-tight">Edit Article</CardTitle>
              <p className="text-gray-400 font-medium text-sm mt-1">Update your article content and status</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-8 md:p-12 pt-10">
          <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                  <Type className="w-3.5 h-3.5" /> Blog Title
                </Label>
                <Input 
                  {...form.register("title")}
                  className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5" /> URL Slug
                </Label>
                <Input 
                  {...form.register("slug")}
                  className="h-14 bg-gray-50 border-none rounded-xl px-6 font-mono text-xs text-blue-600"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                  <Layout className="w-3.5 h-3.5" /> Short Description
                </Label>
                <Textarea 
                  {...form.register("excerpt")}
                  className="min-h-[100px] bg-gray-50 border-none rounded-xl p-6 font-medium text-gray-600 resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Author Name
                </Label>
                <Input 
                  {...form.register("author")}
                  className="h-12 bg-gray-50 border-none rounded-xl px-6 font-bold"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" /> Article Status
                </Label>
                <Select key={form.getValues("status")} onValueChange={(v) => form.setValue("status", v)} defaultValue={form.getValues("status")}>
                  <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-6 font-bold">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-xl">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-gray-400 flex items-center gap-2">
                <Upload className="w-3.5 h-3.5" /> Featured Image
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 transition-all flex items-center gap-2 w-full sm:w-auto"
                      onClick={() => document.getElementById('featured-upload')?.click()}
                    >
                      <Upload className="w-4 h-4" /> Replace Image
                    </Button>
                    <input 
                      id="featured-upload"
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
                {form.watch("featuredImage") && (
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-lg">
                    <img src={form.watch("featuredImage")} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-black uppercase text-gray-400">Article Content</Label>
              <RichTextEditor 
                value={form.watch("content")}
                onChange={(content) => form.setValue("content", content, { shouldDirty: true })}
              />
            </div>

            <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50">
              <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2">
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}