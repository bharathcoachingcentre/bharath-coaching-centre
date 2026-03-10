"use client";

import React, { useState, Suspense } from "react";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone,
  Loader2,
  Save,
  UserCog,
  Check,
  Plus,
  BookMarked,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useFirestore } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { cn } from "@/lib/utils";

const formSchema = z.object({
  displayName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Valid contact required"),
  role: z.string().min(1, "Please select a role"),
  status: z.string().min(1, "Please select a status"),
  photoURL: z.string().optional(),
  bio: z.string().optional(),
  specialty: z.string().optional(),
});

const avatarCollections = [
  { name: "Professional", id: "micah", seeds: ["Jack", "Avery", "Sarah", "Oliver", "Emma", "Leo", "Mia", "Noah", "Sophia", "Lucas"] },
  { name: "Personas", id: "personas", seeds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] },
  { name: "Avataaars", id: "avataaars", seeds: ["Felix", "Aneka", "Jack", "Max", "Luna", "Oliver", "Sophie", "Leo", "Mia", "Zoe"] },
];

const quickSeeds = [
  { id: "micah", seed: "Jack" },
  { id: "micah", seed: "Sarah" },
  { id: "personas", seed: "1" },
  { id: "avataaars", seed: "Felix" },
];

function CreateUserForm() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const defaultRole = searchParams.get('role') || 'student';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      phoneNumber: "",
      role: defaultRole,
      status: "active",
      photoURL: `https://api.dicebear.com/7.x/micah/svg?seed=Jack`,
      bio: "",
      specialty: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) return;
    setIsSubmitting(true);

    const submissionData = {
      ...values,
      photoURL: values.photoURL || `https://api.dicebear.com/7.x/micah/svg?seed=${values.email}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const usersRef = collection(firestore, 'users');
    
    addDoc(usersRef, submissionData)
      .then(() => {
        toast({ title: "User Created", description: `${values.displayName} has been added.` });
        router.push(values.role === 'teacher' ? "/admin/teachers" : "/admin/users");
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'users',
          operation: 'create',
          requestResourceData: submissionData,
        });
        errorEmitter.emit('permission-error', permissionError);
        toast({ variant: "destructive", title: "Failed", description: error.message });
        setIsSubmitting(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link 
        href={defaultRole === 'teacher' ? "/admin/teachers" : "/admin/users"} 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Directory
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-12">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <UserCog className="w-7 h-7 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Create Account</h3>
                  <p className="text-sm text-gray-400 font-medium">Register a new student or faculty member</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <FormField
                  control={form.control}
                  name="photoURL"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Choose Avatar</FormLabel>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mt-2">
                        {quickSeeds.map((item, idx) => {
                          const url = `https://api.dicebear.com/7.x/${item.id}/svg?seed=${item.seed}`;
                          const isSelected = field.value === url;
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => field.onChange(url)}
                              className={cn(
                                "relative rounded-2xl overflow-hidden aspect-square border-2 transition-all duration-300",
                                isSelected ? "border-blue-600 scale-110 shadow-lg" : "border-transparent hover:border-gray-200"
                              )}
                            >
                              <img src={url} alt={item.seed} className="w-full h-full object-cover" />
                              {isSelected && (
                                <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                  <div className="bg-blue-600 text-white rounded-full p-0.5">
                                    <Check className="w-3 h-3" />
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        })}

                        <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                          <DialogTrigger asChild>
                            <button type="button" className="relative rounded-2xl aspect-square border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-1 group">
                              <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                              <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase">More</span>
                            </button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight">Avatar Library</DialogTitle>
                            </DialogHeader>
                            <Tabs defaultValue="micah" className="w-full mt-4">
                              <TabsList className="grid grid-cols-3 sm:grid-cols-6 bg-gray-100 p-1 rounded-xl h-auto gap-1">
                                {avatarCollections.map(collection => (
                                  <TabsTrigger key={collection.id} value={collection.id} className="rounded-lg font-bold text-[10px] data-[state=active]:bg-white data-[state=active]:text-blue-600 shadow-none py-2 px-1">
                                    {collection.name}
                                  </TabsTrigger>
                                ))}
                              </TabsList>
                              {avatarCollections.map(collection => (
                                <TabsContent key={collection.id} value={collection.id} className="mt-6">
                                  <div className="grid grid-cols-5 gap-4">
                                    {collection.seeds.map(seed => {
                                      const url = `https://api.dicebear.com/7.x/${collection.id}/svg?seed=${seed}`;
                                      const isSelected = field.value === url;
                                      return (
                                        <button
                                          key={seed}
                                          type="button"
                                          onClick={() => {
                                            field.onChange(url);
                                            setIsAvatarDialogOpen(false);
                                          }}
                                          className={cn(
                                            "relative rounded-xl overflow-hidden aspect-square border-2 transition-all",
                                            isSelected ? "border-blue-600 scale-105 shadow-md" : "border-transparent hover:border-gray-100 hover:bg-gray-50"
                                          )}
                                        >
                                          <img src={url} alt={seed} className="w-full h-full object-cover" />
                                          {isSelected && (
                                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center">
                                              <Check className="w-4 h-4 text-blue-600" />
                                            </div>
                                          )}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </TabsContent>
                              ))}
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {/* Conditional Fields for Teachers */}
                {form.watch("role") === 'teacher' && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
                    <FormField
                      control={form.control}
                      name="specialty"
                      render={({ field }) => (
                        <FormItem className="space-y-3 text-left">
                          <FormLabel className="text-xs font-black uppercase text-gray-400">Specialty / Subject</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input placeholder="e.g. Senior Physics Mentor" {...field} className="h-14 bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500 pl-11 font-medium shadow-sm" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem className="space-y-3 text-left">
                          <FormLabel className="text-xs font-black uppercase text-gray-400">Short Bio</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <BookMarked className="absolute left-4 top-6 w-4 h-4 text-gray-400" />
                              <Textarea placeholder="Brief professional summary..." {...field} className="min-h-[100px] bg-gray-50 border-none rounded-xl focus-visible:ring-blue-500 pl-11 py-4 font-medium shadow-sm resize-none" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

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
              onClick={() => router.back()}
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
              {isSubmitting ? "Saving..." : "Create Account"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function CreateUserPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-20 text-blue-600"><Loader2 className="animate-spin w-8 h-8" /></div>}>
      <CreateUserForm />
    </Suspense>
  );
}