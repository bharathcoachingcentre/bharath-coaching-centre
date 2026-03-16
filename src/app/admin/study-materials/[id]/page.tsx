"use client";

import React, { useMemo, useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  FileText, 
  Save, 
  Loader2, 
  Info,
  ShieldCheck,
  Eye,
  Link as LinkIcon,
  Upload,
  FileCheck,
  X
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
import { useFirestore, useDoc, useCollection } from "@/firebase";
import { doc, updateDoc, serverTimestamp, query, collection, orderBy } from "firebase/firestore";
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
  pdfUrl: z.string().min(1, "URL or File is required"),
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
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const docRef = useMemo(() => {
    if (!firestore || !materialId) return null;
    return doc(firestore, "study-materials", materialId);
  }, [firestore, materialId]);

  const { data: material, loading } = useDoc(docRef);

  const classesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'classes'), orderBy('order', 'asc'));
  }, [firestore]);
  const { data: allClassesRaw } = useCollection(classesQuery);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please upload a file smaller than 5MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("pdfUrl", reader.result as string, { shouldDirty: true });
        setSelectedFileName(file.name);
        toast({
          title: "File Ready",
          description: `"${file.name}" replacement is ready.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFileName(null);
    form.setValue("pdfUrl", material?.pdfUrl || "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePreview = async () => {
    const url = form.getValues("pdfUrl");
    if (!url) return;
    
    if (url.startsWith('data:')) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      } catch (error) {
        window.open(url, '_blank');
      }
    } else {
      window.open(url, '_blank');
    }
  };

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.back()} className="text-gray-500 font-bold hover:text-blue-600 w-full sm:w-auto justify-start px-0 sm:px-4">
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
                  type="button"
                  variant="outline" 
                  onClick={handlePreview}
                  className="w-full rounded-xl h-12 font-bold gap-2 text-blue-600 border-blue-100 hover:bg-blue-50"
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
            <CardHeader className="p-6 sm:p-10 pb-4">
              <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Edit Metadata</CardTitle>
              <p className="text-sm text-gray-400 font-medium">Update the resource details and settings</p>
            </CardHeader>
            <CardContent className="p-6 sm:p-10 pt-6">
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
                          <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Resource URL or File</FormLabel>
                          <FormControl>
                            <div className="flex flex-col gap-4">
                              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                                <div className="relative flex-1 w-full">
                                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                  <Input {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500" />
                                </div>
                                <div className="flex-shrink-0 w-full sm:w-auto">
                                  <Button 
                                    type="button" 
                                    variant="outline" 
                                    className="h-12 w-full sm:w-auto border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <Upload className="w-4 h-4" /> Replace
                                  </Button>
                                  <input 
                                    id="edit-file-upload"
                                    type="file" 
                                    className="hidden" 
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                  />
                                </div>
                              </div>

                              {selectedFileName && (
                                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl w-fit animate-in fade-in slide-in-from-left-2 duration-300">
                                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                                    <FileCheck className="w-4 h-4" />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-black text-blue-900 truncate max-w-[250px]">{selectedFileName}</span>
                                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">New replacement file</span>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={removeSelectedFile}
                                    className="ml-2 p-1 hover:bg-blue-100 rounded-md text-blue-400 hover:text-red-500 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
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
                              {allClassesRaw?.map(c => (
                                <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
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

                  <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6">
                    <Button type="button" variant="ghost" onClick={() => router.back()} disabled={isSaving} className="w-full sm:w-auto">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSaving} 
                      className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
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
