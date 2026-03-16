"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Upload, 
  BookOpen, 
  FileUp,
  Loader2,
  Link as LinkIcon,
  FileCheck,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  grade: z.string().min(1, "Please select a grade"),
  board: z.string().min(1, "Please select a board"),
  subject: z.string().min(1, "Please select a subject"),
  materialType: z.string().min(1, "Material type is required"),
  description: z.string().min(1, "Description is required"),
  pdfUrl: z.string().min(1, "Resource URL or File is required"),
  allowDownloads: z.boolean().default(true),
  visibleToStudents: z.boolean().default(true),
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

export default function UploadMaterialPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      grade: "",
      board: "CBSE",
      subject: "",
      materialType: "pdf",
      description: "",
      pdfUrl: "",
      allowDownloads: true,
      visibleToStudents: true,
    },
  });

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
          description: `"${file.name}" is ready to upload.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFileName(null);
    form.setValue("pdfUrl", "");
  };

  const handleUpload = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firestore is not initialized. Please refresh.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const materialsRef = collection(firestore, 'study-materials');
      
      const submissionData = {
        title: values.title,
        grade: values.grade,
        board: values.board,
        subject: values.subject,
        category: values.materialType,
        description: values.description,
        pdfUrl: values.pdfUrl,
        downloads: 0,
        allowDownloads: values.allowDownloads,
        isVisible: values.visibleToStudents,
        createdAt: serverTimestamp(),
      };

      await addDoc(materialsRef, submissionData);
      
      toast({
        title: "Material Uploaded",
        description: "Your study resource has been successfully published.",
      });
      router.push("/admin/study-materials");

    } catch (error: any) {
      console.error("Upload error:", error);
      setIsSubmitting(false);
      
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Failed to save material to database.",
      });

      if (error.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: 'study-materials',
          operation: 'create',
          requestResourceData: values,
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link 
        href="/admin/study-materials" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Materials
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleUpload)} className="space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <FileUp className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Upload Resource</h3>
                  <p className="text-sm text-gray-400 font-medium">Link or upload your academic file to the platform</p>
                </div>
              </div>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="pdfUrl"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Resource URL or File *</FormLabel>
                      <FormControl>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                            <div className="relative flex-1 w-full">
                              <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input 
                                placeholder="https://example.com/file.pdf or direct file data" 
                                {...field}
                                className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-blue-500 pl-11 font-medium shadow-sm"
                              />
                            </div>
                            <div className="flex-shrink-0 w-full sm:w-auto">
                              <Button 
                                type="button" 
                                variant="outline" 
                                className="h-14 w-full sm:w-auto border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                                onClick={() => document.getElementById('file-upload')?.click()}
                              >
                                <Upload className="w-4 h-4" /> Upload File
                              </Button>
                              <input 
                                id="file-upload"
                                type="file" 
                                className="hidden" 
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
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Ready to sync</span>
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
                <p className="text-xs text-gray-400 px-2 italic text-left">Note: You can either paste a link from Drive/Dropbox or upload a file directly from your computer (max 5MB).</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <BookOpen className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Material Details</h3>
                  <p className="text-sm text-gray-400 font-medium">Provide metadata for the uploaded resource</p>
                </div>
              </div>

              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Title</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g. Class 10 Maths NCERT Solutions" 
                          {...field}
                          className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-blue-500 px-6 font-medium shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="board"
                    render={({ field }) => (
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Board</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select board" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Class / Grade</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Subject</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
                    name="materialType"
                    render={({ field }) => (
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Material Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of this material..." 
                          {...field}
                          className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-blue-500 p-6 font-medium text-gray-600 resize-none shadow-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6 pt-4">
                  <FormField
                    control={form.control}
                    name="allowDownloads"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-0">
                        <div className="space-y-1 text-left">
                          <FormLabel className="text-base font-bold text-gray-900">Allow Downloads</FormLabel>
                          <p className="text-sm text-gray-400 font-medium">Students can download this material</p>
                        </div>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600" 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="visibleToStudents"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100 space-y-0">
                        <div className="space-y-1 text-left">
                          <FormLabel className="text-base font-bold text-gray-900">Visible to Students</FormLabel>
                          <p className="text-sm text-gray-400 font-medium">Publish immediately after upload</p>
                        </div>
                        <FormControl>
                          <Switch 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-blue-600" 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4 pt-4 pb-12">
            <Button 
              type="button"
              variant="ghost" 
              className="h-14 px-10 text-gray-500 font-bold rounded-xl hover:bg-gray-100"
              onClick={() => router.push("/admin/study-materials")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="h-14 px-10 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 gap-3 transition-all active:scale-95 border-none disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {isSubmitting ? "Uploading..." : "Upload Material"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
