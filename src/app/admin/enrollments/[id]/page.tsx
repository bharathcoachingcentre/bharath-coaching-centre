
"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Save, 
  Loader2, 
  Edit3,
  Info,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  whatsappNo: z.string().min(10, "Valid contact required"),
  standard: z.string().min(1, "Grade is required"),
  board: z.string().min(1, "Board is required"),
  status: z.string().min(1, "Status is required"),
  residentialAddress: z.string().optional(),
});

export default function EnrollmentDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const enrollmentId = params?.id as string;
  const isEditModeParam = searchParams.get("edit") === "true";
  
  const [isEditing, setIsEditMode] = useState(isEditModeParam);
  const [isSaving, setIsSaving] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !enrollmentId) return null;
    return doc(firestore, "enrollments", enrollmentId);
  }, [firestore, enrollmentId]);

  const { data: enrollment, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      whatsappNo: "",
      standard: "",
      board: "",
      status: "pending",
      residentialAddress: "",
    },
  });

  useEffect(() => {
    if (enrollment && !isSaving && !form.formState.isDirty) {
      form.reset({
        firstName: enrollment.firstName || "",
        lastName: enrollment.lastName || "",
        email: enrollment.email || "",
        whatsappNo: enrollment.whatsappNo || enrollment.motherContact || enrollment.fatherContact || "",
        standard: enrollment.standard || enrollment.course || "",
        board: enrollment.board || "",
        status: enrollment.status || "pending",
        residentialAddress: enrollment.residentialAddress || "",
      });
    }
  }, [enrollment, form, isSaving]);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !enrollmentId) return;
    setIsSaving(true);

    const ref = doc(firestore, "enrollments", enrollmentId);
    
    // Non-blocking write per guidelines
    updateDoc(ref, {
      ...values,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        toast({
          title: "Profile Updated",
          description: "Student records have been saved successfully.",
        });
        setIsEditMode(false);
        setIsSaving(false);
        // Explicitly reset form to clear dirty state after success
        form.reset(values);
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
        <Loader2 className="w-10 h-10 animate-spin text-[#35a3be]" />
        <p className="font-bold text-gray-400">Loading Student Profile...</p>
      </div>
    );
  }

  if (!enrollment) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Student Record Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/enrollments">Back to List</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="text-gray-500 font-bold hover:text-[#35a3be]">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-center gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditMode(true)} className="bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold rounded-xl shadow-lg shadow-[#35a3be]/20">
              <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => setIsEditMode(false)} className="text-gray-500 font-bold">
              Cancel Editing
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Sidebar Profile */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white text-center">
            <div className="h-24 bg-gradient-to-r from-[#14b8a6] to-[#35a3be]"></div>
            <CardContent className="p-8 -mt-12 relative">
              <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-gray-50 flex items-center justify-center text-gray-300">
                <User className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mt-4 leading-tight">
                {enrollment.firstName} {enrollment.lastName}
              </h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">
                {enrollment.admissionNo}
              </p>
              
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Badge className="bg-[#35a3be]/10 text-[#35a3be] border-none px-3 py-1 font-black text-[10px] uppercase">
                  {enrollment.status || "pending"}
                </Badge>
                <Badge className="bg-gray-100 text-gray-500 border-none px-3 py-1 font-black text-[10px] uppercase">
                  {enrollment.board || "N/A"}
                </Badge>
              </div>

              <div className="mt-8 space-y-4 pt-8 border-t border-gray-50">
                <div className="flex items-center gap-3 text-left text-sm font-medium text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{enrollment.email || "No email set"}</span>
                </div>
                <div className="flex items-center gap-3 text-left text-sm font-medium text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{enrollment.whatsappNo || enrollment.fatherNo || enrollment.motherNo}</span>
                </div>
                <div className="flex items-start gap-3 text-left text-sm font-medium text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="line-clamp-2">{enrollment.residentialAddress || "No address provided"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-[#182d45] flex items-center gap-2">
                <Info className="w-5 h-5 text-[#35a3be]" /> Family Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Father's Name</p>
                <p className="text-sm font-bold text-gray-700">{enrollment.fatherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Mother's Name</p>
                <p className="text-sm font-bold text-gray-700">{enrollment.motherName || "N/A"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Occupation</p>
                <p className="text-sm font-bold text-gray-700">{enrollment.fatherOccupation || enrollment.motherOccupation || "N/A"}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Dynamic Form / Detail View */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white min-h-[600px]">
            <CardHeader className="p-10 pb-4 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">
                  {isEditing ? "Edit Information" : "Academic Records"}
                </CardTitle>
                <p className="text-sm text-gray-400 font-medium">
                  {isEditing ? "Modify the student's details below" : "Details about the student's enrollment and progress"}
                </p>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-6">
              {!isEditing ? (
                <div className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Course / Standard</p>
                          <p className="font-bold text-gray-900">{enrollment.standard || enrollment.course}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Admission Date</p>
                          <p className="font-bold text-gray-900">{enrollment.admissionDate?.split('T')[0] || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Board of Ed.</p>
                          <p className="font-bold text-gray-900 uppercase">{enrollment.board || "Not Set"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Academic Year</p>
                          <p className="font-bold text-gray-900">{enrollment.academicYear || "2025-2026"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <Edit3 className="w-4 h-4 text-[#35a3be]" /> Subjects Enrolled
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {enrollment.subjects?.map((sub: string) => (
                        <Badge key={sub} className="bg-gray-100 text-gray-600 border-none capitalize px-4 py-1.5 rounded-xl font-bold">
                          {sub}
                        </Badge>
                      )) || <p className="text-sm text-gray-400 font-medium">No subjects recorded</p>}
                    </div>
                  </div>

                  <div className="p-8 rounded-[32px] bg-gradient-to-br from-gray-900 to-[#1e1e2d] text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-bold uppercase tracking-widest text-xs opacity-60">Academic Progress</h4>
                        <span className="text-3xl font-black">{enrollment.progress || 0}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-[#14b8a6] to-[#35a3be] transition-all duration-1000" 
                          style={{ width: `${enrollment.progress || 0}%` }}
                        ></div>
                      </div>
                      <p className="mt-6 text-sm opacity-60 font-medium leading-relaxed">
                        Course completion based on attendance, test scores, and module completion.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">First Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Last Name</FormLabel>
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
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsappNo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Contact Number</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="standard"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Class / Standard</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-black uppercase text-gray-400">Enrollment Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="pending">Pending Review</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="Dropped">Dropped Out</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="residentialAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-black uppercase text-gray-400">Residential Address</FormLabel>
                          <FormControl>
                            <Textarea {...field} className="min-h-[100px] bg-gray-50 border-gray-100 rounded-xl focus:ring-[#35a3be] resize-none" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-end gap-4 pt-6">
                      <Button type="button" variant="ghost" onClick={() => setIsEditMode(false)} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSaving} className="bg-gray-900 hover:bg-black text-white font-bold h-12 px-8 rounded-xl shadow-xl transition-all active:scale-95">
                        {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                        Save Changes
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
