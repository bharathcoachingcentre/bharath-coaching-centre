
"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  FileText, 
  Save, 
  Loader2, 
  Info,
  ShieldCheck,
  Eye,
  Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError, type SecurityRuleContext } from "@/firebase/errors";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  grade: z.string().min(1, "Grade is required"),
  board: z.string().min(1, "Board is required"),
  subject: z.string().min(1, "Subject is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  pdfUrl: z.string().url("Valid URL required").min(1, "URL is required"),
  isVisible: z.boolean().default(true),
  allowDownloads: z.boolean().default(true),
});

const subjects = [
  "Tamil",
  "English",
  "Mathematics",
  "Science",
  "Social Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Hindi",
  "Other"
];

export default function StudyMaterialEditPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id: materialId } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const [isSaving, setIsSaving] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !materialId) return null;
    return doc(firestore, "study-materials", materialId);
  }, [firestore, materialId]);

  const { data: material, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      grade: "",
      board: "CBSE",
      subject: "",
      category: "pdf",
      description: "",
      pdfUrl: "",
      isVisible: true,
      allowDownloads: true,
    },
  });

  useEffect(() => {
    if (material && !isSaving && !form.formState.isDirty) {
      form.reset({
        title: material.title || "",
        grade: material.grade || "",
        board: material.board || "CBSE",
        subject: material.subject || "",
        category: material.category || "pdf",
        description: material.description || "",
        pdfUrl: material.pdfUrl || "",
        isVisible: material.isVisible !== undefined ? material.isVisible : true,
        allowDownloads: material.allowDownloads !== undefined ? material.allowDownloads : true,
      });
    }
  }, [material, form, isSaving]);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !materialId) return;
    setIsSaving(true);

    const ref = doc(firestore, "study-materials", materialId);
    
    updateDoc(ref, {
      ...values,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          title: "Resource Updated",
          description: "Changes have been saved successfully.",
        });
        setIsSaving(false);
        router.push("/admin/study-materials");
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: "update",
          requestResourceData: values,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: error.message || "Could not save changes.",
        });
        setIsSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Resource Details...</p>
      </div>
    );
  }

  if (!material) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Resource Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/study-materials">Back to Materials</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="text-gray-500 font-bold hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
        </Button>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] uppercase px-3 py-1">
            {material.category}
          </Badge>
          <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase px-3 py-1">
            {material.grade}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white text-center">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-8 -mt-12 relative text-left">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-gray-50 flex items-center justify-center text-blue-600">
                <FileText className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mt-4 leading-tight line-clamp-2 text-center">
                {material.title}
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1 text-center">
                Resource ID: {materialId.substring(0, 8)}
              </p>
              
              <div className="mt-8 space-y-4 pt-8 border-t border-gray-50 text-left">
                <Button 
                  variant="outline" 
                  className="w-full rounded-xl h-12 font-bold gap-2 text-blue-600 border-blue-100 hover:bg-blue-50"
                  onClick={() => material.pdfUrl && window.open(material.pdfUrl, '_blank')}
                >
                  <Eye className="w-4 h-4" /> View Current File
                </Button>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase text-gray-400">Visibility Status</span>
                  </div>
                  <p className="text-sm font-bold text-gray-700">
                    {material.isVisible ? "Published to Students" : "Internal / Hidden"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="p-10 pb-4">
              <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Edit Metadata</CardTitle>
              <p className="text-sm text-gray-400 font-medium">Update the resource details and settings</p>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Material Title</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pdfUrl"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Resource URL</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="board"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Board</FormLabel>
                          <Select key={`board-select-${field.value}`} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                <SelectValue placeholder="Select board" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl shadow-xl">
                              <SelectItem value="CBSE">CBSE</SelectItem>
                              <SelectItem value="Samacheer">Samacheer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Class / Grade</FormLabel>
                          <Select key={`grade-select-${field.value}`} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                <SelectValue placeholder="Assign to class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl shadow-xl">
                              <SelectItem value="Class 1">Class 1</SelectItem>
                              <SelectItem value="Class 2">Class 2</SelectItem>
                              <SelectItem value="Class 3">Class 3</SelectItem>
                              <SelectItem value="Class 4">Class 4</SelectItem>
                              <SelectItem value="Class 5">Class 5</SelectItem>
                              {Array.from({ length: 7 }, (_, i) => i + 6).map(grade => (
                                <SelectItem key={grade} value={`Class ${grade}`}>Class {grade}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Subject</FormLabel>
                          <Select key={`subject-select-${field.value}`} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl shadow-xl">
                              {subjects.map(sub => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Material Type</FormLabel>
                          <Select key={`category-select-${field.value}`} onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-xl shadow-xl">
                              <SelectItem value="pdf">PDF Document</SelectItem>
                              <SelectItem value="video">Video Lecture</SelectItem>
                              <SelectItem value="image">Image / Infographic</SelectItem>
                              <SelectItem value="other">Other Resource</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Resource Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-[120px] bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 resize-none" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" /> Access Settings
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="allowDownloads"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-0">
                            <FormLabel className="text-sm font-bold text-gray-700">Allow Downloads</FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="isVisible"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-0">
                            <FormLabel className="text-sm font-bold text-gray-700">Student Visibility</FormLabel>
                            <FormControl>
                              <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isSaving}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSaving} 
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95 flex items-center gap-2"
                    >
                      {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                      Update Metadata
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
