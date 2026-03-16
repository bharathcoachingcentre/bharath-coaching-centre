"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  BookOpen, 
  Layout, 
  Plus, 
  X,
  DollarSign,
  Clock,
  Save,
  Loader2,
  Edit3,
  CheckCircle2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import Link from "next/link";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(1, "Course title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Please select a category"),
  level: z.string().min(1, "Please select a difficulty level"),
  price: z.string().min(1, "Price is required"),
  duration: z.string().min(1, "Duration is required"),
  hasCertificate: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export default function CourseDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id: courseId } = use(params);
  const resolvedSearchParams = use(searchParams);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const isEditModeParam = resolvedSearchParams?.edit === "true";
  
  const [isEditing, setIsEditMode] = useState(isEditModeParam);
  const [isSaving, setIsSaving] = useState(false);
  const [modules, setModules] = useState<{ id: number; title: string }[]>([]);

  const docRef = useMemo(() => {
    if (!firestore || !courseId) return null;
    return doc(firestore, "courses", courseId);
  }, [firestore, courseId]);

  const { data: course, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      duration: "",
      hasCertificate: false,
      isPublished: true,
    },
  });

  useEffect(() => {
    if (course && !isSaving) {
      form.reset({
        title: course.title || "",
        description: course.description || "",
        category: course.category || "",
        level: course.level || "",
        price: course.price || "",
        duration: course.duration || "",
        hasCertificate: course.hasCertificate || false,
        isPublished: course.isPublished !== undefined ? course.isPublished : true,
      });
      if (course.modules) {
        setModules(course.modules.map((m: string, i: number) => ({ id: i, title: m })));
      } else {
        setModules([{ id: 0, title: "" }]);
      }
    }
  }, [course, form, isSaving]);

  const addModule = () => {
    setModules([...modules, { id: Date.now(), title: "" }]);
  };

  const handleModuleChange = (index: number, title: string) => {
    const updatedModules = [...modules];
    updatedModules[index].title = title;
    setModules(updatedModules);
  };

  const removeModule = (index: number) => {
    if (modules.length > 1) {
      setModules(modules.filter((_, i) => i !== index));
    }
  };

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !courseId) return;
    setIsSaving(true);

    const ref = doc(firestore, "courses", courseId);
    const submissionData = {
      ...values,
      modules: modules.filter(m => m.title.trim() !== "").map(m => m.title),
      status: values.isPublished ? "Active" : "Draft",
      updatedAt: serverTimestamp(),
    };
    
    updateDoc(ref, submissionData)
      .then(() => {
        toast({
          title: "Course Updated",
          description: "Changes have been saved successfully.",
        });
        setIsEditMode(false);
        setIsSaving(false);
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: "update",
          requestResourceData: submissionData,
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
        <p className="font-bold text-gray-400">Loading Course Data...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Course Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/courses">Back to List</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.push("/admin/courses")} className="text-gray-500 font-bold hover:text-blue-600 w-full sm:w-auto justify-start px-0 sm:px-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isEditing ? (
            <Button onClick={() => setIsEditMode(true)} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95 w-full sm:w-auto">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Details
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditMode(false)} className="text-gray-500 font-bold w-full sm:w-auto">
              Cancel Editing
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Sidebar Profile */}
        <div className="lg:col-span-1 space-y-8 text-left">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-8 -mt-12 relative text-center">
              <div className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg mx-auto overflow-hidden bg-white flex items-center justify-center text-blue-600">
                <BookOpen className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mt-4 leading-tight">
                {course.title}
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                {course.category}
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className={cn(
                  "px-3 py-1 font-black text-[10px] uppercase border-none",
                  course.status === "Active" ? "bg-blue-600/10 text-blue-600" : "bg-gray-100 text-gray-500"
                )}>
                  {course.status}
                </Badge>
                <Badge className="bg-orange-50 text-orange-600 border-none px-3 py-1 font-black text-[10px] uppercase">
                  {course.level}
                </Badge>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 pt-8 border-t border-gray-50">
                <div className="text-center space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Students</p>
                  <p className="text-xl font-black text-gray-900">{course.students || 0}</p>
                </div>
                <div className="text-center space-y-1 border-l border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <p className="text-xl font-black text-gray-900">{course.rating || "5.0"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#182d45] flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" /> Pricing Info
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Course Fee</p>
                <p className="text-2xl font-black text-gray-900">₹ {course.price || "0"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Course Duration</p>
                <p className="text-sm font-bold text-gray-700 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4 text-gray-400" /> {course.duration}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2">
          {!isEditing ? (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">Overview</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-gray-900 tracking-tight">Curriculum</h3>
                      <Badge variant="outline" className="rounded-lg text-[10px] font-bold px-3">
                        {course.modules?.length || 0} Modules
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      {course.modules?.map((module: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-50">
                          <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-[10px] font-black text-gray-400">
                            {idx + 1}
                          </div>
                          <p className="font-bold text-gray-700">{module}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-50">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Certificate</p>
                        <p className="font-bold text-gray-900">{course.hasCertificate ? "Included" : "No Certificate"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50/50 border border-blue-50">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <Layout className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Difficulty</p>
                        <p className="font-bold text-gray-900 capitalize">{course.level}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="p-6 sm:p-10 pb-0">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Edit Course</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-10 pt-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 text-left">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-bold text-gray-700">Course Title</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium focus-visible:ring-blue-600" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel className="text-sm font-bold text-gray-700">Description</FormLabel>
                            <FormControl>
                              <Textarea {...field} className="min-h-[150px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none focus-visible:ring-blue-600" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold text-gray-700">Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="CBSE Curriculum">CBSE Curriculum</SelectItem>
                                  <SelectItem value="State Board">State Board</SelectItem>
                                  <SelectItem value="Competitive">Competitive</SelectItem>
                                  <SelectItem value="Foundation">Foundation</SelectItem>
                                  <SelectItem value="Language">Language</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold text-gray-700">Difficulty Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600">
                                    <SelectValue placeholder="Select level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="beginner">Beginner</SelectItem>
                                  <SelectItem value="intermediate">Intermediate</SelectItem>
                                  <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Curriculum Modules */}
                      <div className="space-y-4">
                        <Label className="text-sm font-bold text-gray-700">Curriculum Modules</Label>
                        <div className="space-y-3">
                          {modules.map((module, index) => (
                            <div key={module.id} className="flex items-center gap-4">
                              <span className="text-xs font-black text-gray-300 w-4">{index + 1}</span>
                              <Input 
                                placeholder={`Module ${index + 1} title`} 
                                value={module.title}
                                onChange={(e) => handleModuleChange(index, e.target.value)}
                                className="h-12 bg-gray-50 border-none rounded-xl px-6 font-medium focus-visible:ring-blue-600"
                              />
                              {modules.length > 1 && (
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeModule(index)}
                                  className="text-gray-300 hover:text-red-500"
                                >
                                  <X className="w-5 h-5" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        <Button 
                          type="button"
                          variant="outline" 
                          onClick={addModule}
                          className="h-10 border-dashed border-gray-200 bg-gray-50/50 hover:bg-gray-100 rounded-xl px-6 font-bold text-gray-500 gap-2 w-full sm:w-auto"
                        >
                          <Plus className="w-4 h-4" /> Add Module
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold text-gray-700">Price (INR)</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 focus-visible:ring-blue-600" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold text-gray-700">Duration</FormLabel>
                              <FormControl>
                                <Input {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 focus-visible:ring-blue-600" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="hasCertificate"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-50 space-y-0">
                              <FormLabel className="text-sm font-bold text-gray-700">Certificate</FormLabel>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="isPublished"
                          render={({ field }) => (
                            <FormItem className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-50 space-y-0">
                              <FormLabel className="text-sm font-bold text-gray-700">Published</FormLabel>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t border-gray-50">
                      <Button type="button" variant="ghost" onClick={() => setIsEditMode(false)} disabled={isSaving} className="w-full sm:w-auto">
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2 w-full sm:w-auto">
                        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Save Course
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
