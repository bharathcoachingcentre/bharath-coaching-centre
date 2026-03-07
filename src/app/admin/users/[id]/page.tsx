
"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  ShieldAlert, 
  Save, 
  Loader2, 
  UserCog,
  History,
  Lock,
  Edit3
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
  displayName: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Role is required"),
  status: z.string().min(1, "Status is required"),
  phoneNumber: z.string().optional(),
});

export default function UserDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const userId = params?.id as string;
  const isEditModeParam = searchParams.get("edit") === "true";
  
  const [isEditing, setIsEditMode] = useState(isEditModeParam);
  const [isSaving, setIsSaving] = useState(false);

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
      status: "pending",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (user && !isSaving) {
      form.reset({
        displayName: user.displayName || "",
        email: user.email || "",
        role: user.role || "student",
        status: user.status || "pending",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, form, isSaving]);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !userId) return;
    setIsSaving(true);

    const ref = doc(firestore, "users", userId);
    
    updateDoc(ref, {
      ...values,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          title: "User Updated",
          description: "Account settings have been saved successfully.",
        });
        setIsEditMode(false);
        setIsSaving(false);
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
          description: error.message || "Could not save user changes.",
        });
        setIsSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[#35a3be]" />
        <p className="font-bold text-gray-400">Loading User Account...</p>
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
        <Button variant="ghost" onClick={() => router.push("/admin/users")} className="text-gray-500 font-bold hover:text-[#35a3be]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditMode(true)} className="bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold rounded-xl shadow-lg shadow-[#35a3be]/20">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Permissions
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditMode(false)} className="text-gray-500 font-bold">
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white text-center">
            <div className="h-24 bg-gradient-to-r from-[#14b8a6] to-[#35a3be]"></div>
            <CardContent className="p-8 -mt-12 relative text-left">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-gray-50 mb-6">
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                  {user.displayName}
                </h2>
                <Badge className={cn(
                  "px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border-none shadow-none",
                  user.role === 'admin' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                )}>
                  {user.role}
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
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="capitalize">{user.status} account</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#182d45] flex items-center gap-2">
                <History className="w-5 h-5 text-[#35a3be]" /> Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account Created</p>
                <p className="text-sm font-bold text-gray-700">
                  {user.createdAt?.toDate ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'Recently'}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Last Activity</p>
                <p className="text-sm font-bold text-gray-700">
                  {user.lastLogin?.toDate ? new Date(user.lastLogin.toDate()).toLocaleString() : 'Never'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white min-h-[600px]">
            <CardHeader className="p-10 pb-4 text-left">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">
                  {isEditing ? "Account Settings" : "Profile Details"}
                </CardTitle>
                <p className="text-sm text-gray-400 font-medium">
                  {isEditing ? "Manage user roles and administrative controls" : "Core account information and identity"}
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
                          <p className="text-lg font-bold text-gray-900 capitalize">{user.role}</p>
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
                          <p className="text-lg font-bold text-gray-900 capitalize">{user.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#35a3be]">
                      <Lock className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Security Note</h4>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-md">
                        Admins can modify roles and suspend accounts. Passwords must be reset by the user via the sign-in page.
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
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Display Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
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
                              <Input {...field} readOnly className="h-12 bg-gray-100/50 border-gray-100 rounded-xl font-medium text-gray-500 cursor-not-allowed" />
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
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Access Role</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl">
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
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Account Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl">
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
                    </div>

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400">Contact Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="+91 00000 00000" className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50">
                      <Button type="button" variant="ghost" onClick={() => setIsEditMode(false)} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving} className="bg-gray-900 hover:bg-black text-white font-bold h-12 px-8 rounded-xl shadow-xl transition-all active:scale-95">
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
