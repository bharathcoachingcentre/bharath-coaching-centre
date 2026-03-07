
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { User, Users, Phone, Send, GraduationCap, Trash2, Loader2 } from "lucide-react"
import React, { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const formSchema = z.object({
    candidateName: z.string().min(1, { message: "Candidate name is required." }),
    parentName: z.string().min(1, { message: "Parent's name is required." }),
    photo: z.any().optional(),
    standard: z.string().min(1, { message: "Standard is required." }),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required." }),
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required." }),
    institutionName: z.string().min(1, { message: "Institution name is required." }),
    dob: z.string().min(1, { message: "Date of birth is required." }),
    gender: z.enum(["male", "female"], { required_error: "Please select a gender." }),
    residentialAddress: z.string().min(1, { message: "Residential address is required." }),
    fatherContact: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(15),
    motherContact: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(15),
    whatsappNumber: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }).max(15),
    board: z.enum(["cbse", "samacheer", "other-board"], { required_error: "Please select a board." }),
    subjects: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one subject.",
    }),
    howHeard: z.array(z.string()).optional(),
    terms: z.boolean().refine((val) => val === true, {
        message: "You must agree to the terms and conditions.",
    }),
});

const subjectItems = [
    { id: "tamil", label: "Tamil" },
    { id: "english", label: "English" },
    { id: "mathematics", label: "Mathematics" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
];

const howHeardItems = [
    { id: "internet", label: "Internet" },
    { id: "old-student", label: "From an old student" },
    { id: "other", label: "Other" },
];


export default function StudentRegistrationPage() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            candidateName: "",
            parentName: "",
            photo: undefined,
            standard: "",
            motherOccupation: "",
            fatherOccupation: "",
            institutionName: "",
            dob: "",
            gender: undefined,
            residentialAddress: "",
            fatherContact: "",
            motherContact: "",
            whatsappNumber: "",
            board: undefined,
            subjects: [],
            howHeard: [],
            terms: false,
        },
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
            form.setValue("photo", e.target.files);
        }
    };

    const removeFile = () => {
        setSelectedFileName(null);
        form.setValue("photo", undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!firestore) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Firestore is not initialized.",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const admissionNo = `ADM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            const submissionData = {
                firstName: values.candidateName.split(' ')[0] || values.candidateName,
                lastName: values.candidateName.split(' ').slice(1).join(' ') || "",
                fatherName: values.parentName,
                fatherOccupation: values.fatherOccupation,
                motherOccupation: values.motherOccupation,
                standard: values.standard,
                institutionName: values.institutionName,
                dob: values.dob,
                gender: values.gender,
                residentialAddress: values.residentialAddress,
                fatherNo: values.fatherContact,
                motherNo: values.motherContact,
                whatsappNo: values.whatsappNumber,
                board: values.board,
                subjects: values.subjects,
                admissionNo,
                status: 'pending',
                createdAt: serverTimestamp(),
            };

            const enrollmentsRef = collection(firestore, 'enrollments');
            await addDoc(enrollmentsRef, submissionData);

            toast({
                title: "Registration Submitted!",
                description: "Thank you for registering. We will be in touch shortly.",
            });
            
            form.reset();
            setSelectedFileName(null);
            setIsSubmitting(false);
        } catch (error: any) {
            console.error("Registration error:", error);
            setIsSubmitting(false);
            
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error.message || "An unexpected error occurred. Please try again.",
            });

            if (error.code === 'permission-denied') {
                const permissionError = new FirestorePermissionError({
                    path: 'enrollments',
                    operation: 'create',
                });
                errorEmitter.emit('permission-error', permissionError);
            }
        }
    }

  return (
    <div className="font-body-home2">
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Our-result.jpg"
          alt="Student Registration Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-lg">
            Registration
          </h1>
        </div>
      </section>

      <div style={{ backgroundColor: 'rgb(245 250 255)' }} className="py-12 md:py-16 px-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#182d45] tracking-tight mb-3">
              Registration Form
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto font-medium text-sm md:text-base">
              Please fill out the form below to register with Bharath Academy.
            </p>
          </div>

          <Card className="shadow-[0_30px_80px_rgba(8,112,184,0.1)] border border-white bg-white/90 backdrop-blur-md rounded-[2rem] overflow-hidden">
            <CardContent className="p-6 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Candidate Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-cyan-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-[#35a3be]" />
                        </div>
                        <h3 className="text-lg font-bold text-[#182d45]">Student Details</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="candidateName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Candidate Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
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
                            <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Standard *</FormLabel>
                            <FormControl>
                              <Input placeholder="Grade / Class" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="institutionName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Name of the Institution *</FormLabel>
                            <FormControl>
                                <Input placeholder="Current School / College" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="dob"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-[#182d45] font-bold mb-1.5 text-xs md:text-sm">Date of Birth *</FormLabel>
                            <FormControl>
                                <Input 
                                    type="date"
                                    className="h-11 bg-gray-50/50 border-gray-200 rounded-xl shadow-sm"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                              <FormItem className="space-y-2">
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Gender *</FormLabel>
                              <FormControl>
                                  <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="flex items-center gap-8 mt-1"
                                  >
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                      <RadioGroupItem value="male" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-600 cursor-pointer">Male</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-2 space-y-0">
                                      <FormControl>
                                      <RadioGroupItem value="female" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-600 cursor-pointer">Female</FormLabel>
                                  </FormItem>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormItem>
                          <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Upload Candidate Photo</FormLabel>
                          <FormControl>
                              <div className="flex items-center gap-4">
                                {selectedFileName ? (
                                    <div className="flex items-center justify-between w-full h-11 bg-gray-50/50 rounded-xl border border-gray-200 px-4">
                                        <span className="text-sm text-gray-600 truncate max-w-[200px]">{selectedFileName}</span>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
                                            onClick={removeFile}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ) : (
                                    <Input 
                                        type="file"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="h-11 bg-gray-50/50 rounded-xl border-gray-200 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#35a3be]/10 file:text-[#35a3be] hover:file:bg-[#35a3be]/20 cursor-pointer" 
                                    />
                                )}
                              </div>
                          </FormControl>
                          <FormMessage />
                      </FormItem>
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Family Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-[#182d45]">Family Background</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Parent's / Guardian's Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="fatherOccupation"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Father's Occupation *</FormLabel>
                                <FormControl>
                                <Input placeholder="Occupation" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="motherOccupation"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Mother's Occupation *</FormLabel>
                                <FormControl>
                                <Input placeholder="Occupation" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="residentialAddress"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Residential Address *</FormLabel>
                          <FormControl>
                              <Textarea placeholder="Full Postal Address" {...field} className="bg-gray-50/50 rounded-xl border-gray-200 min-h-[80px] resize-none focus:border-[#35a3be] focus:ring-[#35a3be]" />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Contact Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="text-lg font-bold text-[#182d45]">Contact Channels</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                          control={form.control}
                          name="fatherContact"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Father's Contact *</FormLabel>
                              <FormControl>
                                  <Input placeholder="10 Digit Number" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="motherContact"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Mother's Contact *</FormLabel>
                              <FormControl>
                                  <Input placeholder="10 Digit Number" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="whatsappNumber"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">WhatsApp Number *</FormLabel>
                              <FormControl>
                                  <Input placeholder="For Updates" {...field} className="h-11 bg-gray-50/50 rounded-xl border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                  </div>

                  <Separator className="bg-gray-100" />

                  {/* Academy Details */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-orange-600" />
                        </div>
                        <h3 className="text-lg font-bold text-[#182d45]">Academic & Source</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                          control={form.control}
                          name="board"
                          render={({ field }) => (
                              <FormItem className="space-y-3">
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Board of Education *</FormLabel>
                              <FormControl>
                                  <RadioGroup
                                  onValueChange={field.onChange}
                                  value={field.value}
                                  className="mt-1 space-y-2"
                                  >
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-2.5 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="cbse" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full text-sm">CBSE</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-2.5 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="samacheer" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full text-sm">Samacheer</FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0 p-2.5 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                      <FormControl>
                                      <RadioGroupItem value="other-board" className="border-gray-300 text-[#35a3be]" />
                                      </FormControl>
                                      <FormLabel className="font-semibold text-gray-700 cursor-pointer w-full text-sm">Other Board</FormLabel>
                                  </FormItem>
                                  </RadioGroup>
                              </FormControl>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="subjects"
                          render={({ field }) => (
                              <FormItem>
                              <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">Preferred Subjects *</FormLabel>
                              <div className="grid grid-cols-2 gap-2 mt-2">
                                  {subjectItems.map((item) => (
                                  <FormField
                                      key={item.id}
                                      control={form.control}
                                      name="subjects"
                                      render={({ field }) => {
                                      return (
                                          <FormItem
                                          key={item.id}
                                          className="flex flex-row items-center space-x-2 space-y-0 p-2 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all"
                                          >
                                          <FormControl>
                                              <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                  return checked
                                                  ? field.onChange([...(field.value || []), item.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                          (value) => value !== item.id
                                                      )
                                                      )
                                              }}
                                              className="border-gray-300 data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                                              />
                                          </FormControl>
                                          <FormLabel className="font-semibold text-gray-600 text-xs md:text-sm cursor-pointer">
                                              {item.label}
                                          </FormLabel>
                                          </FormItem>
                                      )
                                      }}
                                  />
                                  ))}
                              </div>
                              <FormMessage />
                              </FormItem>
                          )}
                      />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="howHeard"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-[#182d45] font-bold text-xs md:text-sm">How did you hear about us?</FormLabel>
                                <div className="flex flex-wrap gap-2 mt-2">
                                {howHeardItems.map((item) => (
                                    <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="howHeard"
                                    render={({ field }) => {
                                        return (
                                        <FormItem
                                            key={item.id}
                                            className="flex flex-row items-center space-x-2 space-y-0 p-2 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all"
                                        >
                                            <FormControl>
                                            <Checkbox
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([...(field.value || []), item.id])
                                                    : field.onChange(
                                                        field.value?.filter(
                                                        (value) => value !== item.id
                                                        )
                                                    )
                                                }}
                                                className="border-gray-300 data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                                            />
                                            </FormControl>
                                            <FormLabel className="font-semibold text-gray-600 text-xs md:text-sm cursor-pointer">
                                            {item.label}
                                            </FormLabel>
                                        </FormItem>
                                        )
                                    }}
                                    />
                                ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                  </div>

                  <div className="pt-2">
                    <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border border-gray-100 bg-[#35a3be]/5 p-4 shadow-inner">
                        <FormControl>
                            <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-1 border-[#35a3be] data-[state=checked]:bg-[#35a3be] data-[state=checked]:border-[#35a3be]"
                            />
                        </FormControl>
                        <div className="space-y-1 leading-relaxed">
                            <FormLabel className="text-xs font-bold text-[#182d45] cursor-pointer">
                            I agree to the terms and conditions. I verify that all the information provided above is correct to the best of my knowledge.
                            </FormLabel>
                            <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />

                    <div className="mt-6 text-center">
                    <Button 
                        type="submit" 
                        size="lg" 
                        disabled={isSubmitting}
                        className="w-full md:w-auto min-w-[260px] h-14 text-base font-bold text-white rounded-2xl shadow-xl hover:shadow-[#35a3be]/30 transition-all duration-300 transform active:scale-95 group disabled:opacity-70" 
                        style={{ backgroundColor: '#35a3be' }}
                    >
                        {isSubmitting ? <Loader2 className="w-4 h-4 mr-2.5 animate-spin" /> : <Send className="w-4 h-4 mr-2.5 group-hover:animate-bounce" />}
                        {isSubmitting ? "Processing..." : "Submit Application"}
                    </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
