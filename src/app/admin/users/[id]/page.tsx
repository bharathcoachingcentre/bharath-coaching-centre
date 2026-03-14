"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ShieldAlert, 
  Save, 
  Loader2, 
  UserCog,
  History,
  Lock,
  Edit3,
  Check,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { updateUserCredentialsAction } from "@/app/actions/user-actions";

const formSchema = z.object({
  displayName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  phoneNumber: z.string().optional(),
  photoURL: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
});

const avatarCollections = [
  {
    name: "Professional",
    id: "micah",
    seeds: ["Jack", "Avery", "Sarah", "Oliver", "Emma", "Leo", "Mia", "Noah", "Sophia", "Lucas"]
  },
  {
    name: "Personas",
    id: "personas",
    seeds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
  },
  {
    name: "Avataaars",
    id: "avataaars",
    seeds: ["Felix", "Aneka", "Jack", "Max", "Luna", "Oliver", "Sophie", "Leo", "Mia", "Zoe"]
  }
];

const quickSeeds = [
  { id: "micah", seed: "Jack" },
  { id: "micah", seed: "Sarah" },
  { id: "personas", seed: "1" },
  { id: "avataaars", seed: "Felix" },
];

export default function UserDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id: userId } = use(params);
  const resolvedSearchParams = use(searchParams);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const isEditModeParam = resolvedSearchParams?.edit === "true";
  
  const [isEditing, setIsEditMode] = useState(isEditModeParam);
  const [isSaving, setIsSaving] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !userId) return null;
    return doc(firestore, "users", userId);
  }, [firestore, userId]);

  const { data: user, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      role: "student",
      status: "active",
      phoneNumber: "",
      photoURL: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user && !loading && !isSaving && !form.formState.isDirty) {
      form.reset({
        displayName: user.displayName || "",
        email: user.email || "",
        role: (user.role || "student").toLowerCase(),
        status: (user.status || "active").toLowerCase(),
        phoneNumber: user.phoneNumber || "",
        photoURL: user.photoURL || `https://api.dicebear.com/7.x/micah/svg?seed=${user.email}`,
        password: "",
      });
    }
  }, [user, loading, isSaving, form]);

  const displayPhotoURL = (form.watch("photoURL") || user?.photoURL || `https://api.dicebear.com/7.x/micah/svg?seed=${user?.email || 'default'}`);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!userId) return;
    setIsSaving(true);

    const result = await updateUserCredentialsAction(userId, values);

    if (result.success) {
      toast({
        title: "User Updated",
        description: "Credentials and profile have been synchronized successfully.",
      });
      form.reset(values);
      setIsEditMode(false);
    } else {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: result.error || "Could not save changes.",
      });
    }
    setIsSaving(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading User Account...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">User Account Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/users">Back to Directory</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="text-gray-500 font-bold hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditMode(true)} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Details
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditMode(false)} className="text-gray-500 font-bold">
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white text-center">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-8 -mt-12 relative text-left">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-gray-50 mb-6 flex items-center justify-center">
                {displayPhotoURL ? (
                  <img 
                    src={displayPhotoURL} 
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCog className="w-12 h-12 text-gray-300" />
                )}
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                  {user.displayName}
                </h2>
                <Badge className={cn(
                  "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                  user.role === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                )}>
                  {user.role || 'student'}
                </Badge>
              </div>

              <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{user.phoneNumber || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <ShieldCheck className={cn("w-4 h-4", user.status === 'active' ? "text-emerald-500" : "text-amber-500")} />
                  <span className="capitalize">{user.status || 'pending'} account</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#182d45] flex items-center gap-2">
                <History className="w-5 h-5 text-blue-600" /> Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-left">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Created</p>
                <p className="text-sm font-bold text-gray-700">
                  {user.createdAt ? (typeof user.createdAt === 'string' ? new Date(user.createdAt).toLocaleDateString() : (user.createdAt as any).toDate().toLocaleDateString()) : 'Recently'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Last Activity</p>
                <p className="text-sm font-bold text-gray-700">
                  {(user.lastLogin as any)?.toDate ? new Date((user.lastLogin as any).toDate()).toLocaleString() : 'Never'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white min-h-[600px]">
            <CardHeader className="p-10 pb-4 text-left">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">
                  {isEditing ? "Account Settings" : "Profile Details"}
                </CardTitle>
                <p className="text-sm text-gray-400 font-medium">
                  {isEditing ? "Manage user roles and credentials" : "Core account information and identity"}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              {!isEditing ? (
                <div className="space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Full Display Name</p>
                        <p className="text-lg font-bold text-gray-900">{user.displayName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">System Email</p>
                        <p className="text-lg font-bold text-gray-900">{user.email}</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Access Level</p>
                        <div className="flex items-center gap-2 mt-1">
                          <UserCog className="w-5 h-5 text-purple-500" />
                          <p className="text-lg font-bold text-gray-900 capitalize">{user.role || 'student'}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Security Status</p>
                        <div className="flex items-center gap-2 mt-1">
                          {user.status === 'active' ? (
                            <ShieldCheck className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <ShieldAlert className="w-5 h-5 text-rose-500" />
                          )}
                          <p className="text-lg font-bold text-gray-900 capitalize">{user.status || 'pending'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600">
                      <Lock className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">Security Management</h4>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                        This user can now be updated dynamically. Changing the email or password here will update their login credentials instantly.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
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
                                  <button
                                    type="button"
                                    className="relative rounded-2xl aspect-square border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-1 group"
                                  >
                                    <Plus className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-600 uppercase">More</span>
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px] rounded-[2.5rem]">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight text-left">Avatar Library</DialogTitle>
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
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Display Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 shadow-sm" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 shadow-sm" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">New Password (optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input type="password" placeholder="••••••••" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 shadow-sm" />
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
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Access Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
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
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400 text-left block">Account Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="pending">Pending Approval</SelectItem>
                                <SelectItem value="suspended">Suspended Access</SelectItem>
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
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Contact Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input {...field} placeholder="+91 00000 00000" className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 shadow-sm" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50">
                      <Button type="button" variant="ghost" onClick={() => setIsEditMode(false)} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Update Account
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}