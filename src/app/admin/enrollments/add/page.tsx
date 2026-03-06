
"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  UserPlus, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  FileText, 
  Mail, 
  Phone,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  course: z.string().min(1, "Please select a course"),
  startDate: z.string().min(1, "Start date is required"),
  paymentPlan: z.string().min(1, "Please select a payment plan"),
  notes: z.string().optional(),
});

export default function AddEnrollmentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedAdmissionNo, setGeneratedAdmissionNo] = useState("");

  useEffect(() => {
    // Generate admission number on mount
    setGeneratedAdmissionNo(`ADM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      course: "",
      startDate: "",
      paymentPlan: "",
      notes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) {
        toast({
            variant: "destructive",
            title: "Database Error",
            description: "Firestore is not initialized. Please refresh the page.",
        });
        return;
    }
    
    setIsSubmitting(true);

    try {
        const submissionData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          whatsappNo: values.phone,
          course: values.course,
          admissionDate: values.startDate,
          feesDetails: values.paymentPlan,
          notes: values.notes || "",
          admissionNo: generatedAdmissionNo,
          status: "Active",
          progress: 0,
          createdAt: serverTimestamp(),
        };

        const enrollmentsRef = collection(firestore, 'enrollments');
        await addDoc(enrollmentsRef, submissionData);

        toast({
          title: "Enrollment Created",
          description: `Student ${values.firstName} has been successfully registered.`,
        });
        
        router.push("/admin/enrollments");
    } catch (error: any) {
        console.error("Firestore submission error:", error);
        setIsSubmitting(false);
        
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: error.message || "Could not save enrollment. Please check your network.",
        });

        if (error.code === 'permission-denied') {
            const permissionError = new FirestorePermissionError({
                path: 'enrollments',
                operation: 'create',
            });
            errorEmitter.emit('permission-error', permissionError);
        }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Link 
        href="/admin/enrollments" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#35a3be] transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Enrollments
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#35a3be]/10 flex items-center justify-center">
                  <UserPlus className="w-7 h-7 text-[#35a3be]" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Student Information</h3>
                  <p className="text-sm text-gray-400 font-medium">Enter the student's personal details</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-[#35a3be] px-6 font-medium" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-[#35a3be] px-6 font-medium" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" /> Email Address
                      </FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-[#35a3be] px-6 font-medium" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="+91 72000 00000" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-[#35a3be] px-6 font-medium" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-[#35a3be]/10 flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-[#35a3be]" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Course Details</h3>
                  <p className="text-sm text-gray-400 font-medium">Select the course and enrollment preferences</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
                <FormField
                  control={form.control}
                  name="course"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700">Course</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-[#35a3be] px-6 font-medium text-gray-500">
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                          <SelectItem value="cbse-10-maths">Class 10 CBSE Mathematics</SelectItem>
                          <SelectItem value="samacheer-12-physics">Class 12 Samacheer Physics</SelectItem>
                          <SelectItem value="neet-crash">NEET Crash Course 2025</SelectItem>
                          <SelectItem value="jee-prep">JEE Main Preparation</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" /> Start Date
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-[#35a3be] px-6 font-medium text-gray-500 appearance-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-8">
                <FormField
                  control={form.control}
                  name="paymentPlan"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" /> Payment Plan
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-[#35a3be] px-6 font-medium text-gray-500">
                            <SelectValue placeholder="Select payment plan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                          <SelectItem value="full">Full Payment (Upfront)</SelectItem>
                          <SelectItem value="installments">Monthly Installments</SelectItem>
                          <SelectItem value="scholarship">Scholarship / Fee Waiver</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" /> Additional Notes
                      </FormLabel>
                      <FormControl>
                        <Textarea placeholder="Any additional information..." {...field} className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-[#35a3be] p-6 font-medium text-gray-600 resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button 
              type="button"
              variant="ghost" 
              className="h-14 px-10 text-gray-500 font-bold rounded-xl hover:bg-gray-100"
              onClick={() => router.push("/admin/enrollments")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="h-14 px-10 bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold rounded-xl shadow-lg shadow-[#35a3be]/20 gap-3 transition-all active:scale-95 border-none disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {isSubmitting ? "Creating..." : "Create Enrollment"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
