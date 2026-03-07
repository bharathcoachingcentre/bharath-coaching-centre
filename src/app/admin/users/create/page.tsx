
"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone,
  Loader2,
  Save,
  UserCog
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
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
  displayName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid contact required"),
  role: z.string().min(1, "Please select a role"),
  status: z.string().min(1, "Please select a status"),
});

export default function CreateUserPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      role: "student",
      status: "active",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) return;
    setIsSubmitting(true);

    const submissionData = {
      ...values,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${values.email}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const usersRef = collection(firestore, 'users');
    
    addDoc(usersRef, submissionData)
      .then(() => {
        toast({
          title: "User Created",
          description: `${values.displayName} has been added to the directory.`,
        });
        router.push("/admin/users");
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'users',
          operation: 'create',
          requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({
          variant: "destructive",
          title: "Failed to Create User",
          description: error.message || "Could not save user record.",
        });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href="/admin/users" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Directory
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <UserCog className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Create User Account</h3>
                  <p className="text-sm text-gray-400 font-medium">Register a new staff member or student in the system</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Full Display Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="John Doe" {...field} className="h-14 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500 pl-11 font-medium shadow-sm" />
                        </div>
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
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="john@example.com" {...field} className="h-14 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500 pl-11 font-medium shadow-sm" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="+91 00000 00000" {...field} className="h-14 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500 pl-11 font-medium shadow-sm" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Access Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="teacher">Faculty Member</SelectItem>
                          <SelectItem value="student">Academy Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-3 text-left md:col-span-2">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Account Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl focus:ring-blue-500 px-6 font-medium text-gray-500 shadow-sm">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending Approval</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
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
              onClick={() => router.push("/admin/users")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-10 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 gap-3 transition-all active:scale-95 border-none"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSubmitting ? "Creating Account..." : "Save Account"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
