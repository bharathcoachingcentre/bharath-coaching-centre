
"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  Layout, 
  Settings, 
  Plus, 
  X,
  DollarSign,
  Clock,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

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

export default function CreateCoursePage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modules, setModules] = useState([{ id: 1, title: "" }]);

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

  const addModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "" }]);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firestore not initialized. Please refresh.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const coursesRef = collection(firestore, 'courses');
      const submissionData = {
        ...values,
        modules: modules.filter(m => m.title.trim() !== "").map(m => m.title),
        students: 0,
        rating: 5.0,
        status: values.isPublished ? "Active" : "Draft",
        createdAt: serverTimestamp(),
      };

      await addDoc(coursesRef, submissionData);

      toast({
        title: "Course Published",
        description: `${values.title} has been successfully created.`,
      });
      router.push("/admin/courses");
    } catch (error: any) {
      console.error("Course creation error:", error);
      setIsSubmitting(false);
      
      toast({
        variant: "destructive",
        title: "Publish Failed",
        description: error.message || "Failed to save course to database.",
      });

      if (error.code === 'permission-denied') {
        const permissionError = new FirestorePermissionError({
          path: 'courses',
          operation: 'create',
        });
        errorEmitter.emit('permission-error', permissionError);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link 
        href="/admin/courses" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Courses
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          {/* Section 1: Course Information */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
            <CardContent className="p-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Course Information</h3>
                  <p className="text-sm text-gray-400 font-medium">Basic details about the course</p>
                </div>
              </div>

              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Course Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Advanced React Patterns" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-blue-500 px-6 font-medium shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="What students will learn in this course..." {...field} className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-blue-500 p-6 font-medium text-gray-600 resize-none shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
                      <FormItem className="space-y-3 text-left">
                        <FormLabel className="text-sm font-bold text-gray-700">Difficulty Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl border-gray-100 shadow-xl">
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
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Curriculum */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
            <CardContent className="p-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-teal-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Curriculum</h3>
                  <p className="text-sm text-gray-400 font-medium">Define course modules and structure</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {modules.map((module, index) => (
                  <div key={module.id} className="flex items-center gap-6">
                    <span className="text-sm font-bold text-gray-300 w-4">{index + 1}</span>
                    <div className="relative flex-1">
                      <Input 
                        placeholder={`Module ${index + 1} title`} 
                        value={module.title}
                        onChange={(e) => handleModuleChange(index, e.target.value)}
                        className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-teal-500 px-6 font-medium shadow-sm"
                      />
                    </div>
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
                className="h-12 border-none bg-gray-50 hover:bg-gray-100 rounded-xl px-6 font-bold text-gray-600 gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add Module
              </Button>
            </CardContent>
          </Card>

          {/* Section 3: Pricing & Settings */}
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
            <CardContent className="p-10">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Settings className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Pricing & Settings</h3>
                  <p className="text-sm text-gray-400 font-medium">Configure pricing and access options</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" /> Price (INR)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="4999" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-orange-500 px-6 font-medium shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" /> Duration
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 8 weeks" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-orange-500 px-6 font-medium shadow-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasCertificate"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-0">
                      <div className="space-y-1 text-left">
                        <FormLabel className="text-base font-bold text-gray-900">Certificate on Completion</FormLabel>
                        <p className="text-sm text-gray-400 font-medium">Issue a certificate when students finish</p>
                      </div>
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
                    <FormItem className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50 space-y-0">
                      <div className="space-y-1 text-left">
                        <FormLabel className="text-base font-bold text-gray-900">Published</FormLabel>
                        <p className="text-sm text-gray-400 font-medium">Make this course visible to students</p>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} className="data-[state=checked]:bg-blue-600" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <Button 
              type="button"
              variant="ghost" 
              className="h-14 px-10 text-gray-500 font-bold rounded-xl hover:bg-gray-100"
              onClick={() => router.push("/admin/courses")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-10 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 gap-3 transition-all active:scale-95 border-none"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <BookOpen className="w-5 h-5" />}
              {isSubmitting ? "Publishing..." : "Publish Course"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
