"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { 
    User, 
    Users, 
    Phone, 
    BookOpen, 
    Send, 
    GraduationCap, 
    Briefcase,
    Building,
    IndianRupee,
    Clock,
    Loader2,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Mail,
    Calendar,
    TableProperties
} from "lucide-react"
import React, { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFirestore } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { appendToGoogleSheetAction } from "@/app/actions/google-sheet"

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    email: z.string().email({ message: "Valid email is required." }),
    gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender." }),
    dob: z.string().min(1, { message: "Date of birth is required." }),
    religion: z.string().min(1, { message: "Religion is required." }),
    fatherName: z.string().min(1, { message: "Father's name is required." }),
    fatherNameNo: z.string().optional(), // Added for compatibility with action if needed, though schema uses fatherNo
    fatherOccupation: z.string().min(1, { message: "Father's occupation is required." }),
    motherName: z.string().min(1, { message: "Mother's name is required." }),
    motherOccupation: z.string().min(1, { message: "Mother's occupation is required." }),
    photo: z.any().optional(),
    
    academicYear: z.string().min(1, { message: "Academic year is required." }),
    standard: z.string().min(1, { message: "Standard / Class is required." }),
    subjects: z.array(z.string()).min(1, { message: "Select at least one subject." }),
    otherSubject: z.string().optional(),
    institutionName: z.string().min(1, { message: "Institution name is required." }),
    board: z.enum(["cbse", "samacheer", "icse", "igcse", "ib", "one to one"], { required_error: "Please select a board." }),
    batchTiming: z.string().min(1, { message: "Batch timing is required." }),
    
    feesDetails: z.string().min(1, { message: "Fees details are required." }),
    admissionDate: z.string().min(1, { message: "Admission date is required." }),
    admissionNo: z.string(),
    
    fatherNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    motherNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    whatsappNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    residentialAddress: z.string().min(1, { message: "Residential address is required." }),
});

const subjectItems = [
    { id: "Tamil", label: "Tamil" },
    { id: "English", label: "English" },
    { id: "Mathematics", label: "Mathematics" },
    { id: "Science", label: "Science" },
    { id: "Social Science", label: "Social Science" },
    { id: "Physics", label: "Physics" },
    { id: "Chemistry", label: "Chemistry" },
];

const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Academic", icon: BookOpen },
    { id: 3, title: "Guardian", icon: Users },
    { id: 4, title: "Contact", icon: Phone },
];

export default function EnrollmentPage() {
    const { toast } = useToast();
    const firestore = useFirestore();
    const [isMounted, setIsMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            gender: undefined,
            dob: "",
            religion: "",
            fatherName: "",
            fatherOccupation: "",
            motherName: "",
            motherOccupation: "",
            academicYear: "2025-2026",
            standard: "",
            subjects: [],
            otherSubject: "",
            institutionName: "",
            board: undefined,
            batchTiming: "",
            feesDetails: "",
            admissionDate: format(new Date(), "yyyy-MM-dd"),
            admissionNo: "",
            fatherNo: "",
            motherNo: "",
            whatsappNo: "",
            residentialAddress: "",
        },
    });

    useEffect(() => {
        setIsMounted(true);
        const generatedId = `ADM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        form.setValue("admissionNo", generatedId);
    }, [form]);

    const nextStep = async () => {
        const fields = getFieldsForStep(currentStep);
        const isValid = await form.trigger(fields as any);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, steps.length));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            toast({
                variant: "destructive",
                title: "Section Incomplete",
                description: "Please fill in all required fields marked with * before continuing.",
            });
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getFieldsForStep = (step: number) => {
        switch (step) {
            case 1:
                return ["firstName", "lastName", "email", "gender", "dob", "religion", "fatherName", "fatherOccupation", "motherName", "motherOccupation"];
            case 2:
                return ["academicYear", "standard", "subjects", "otherSubject", "institutionName", "board", "batchTiming"];
            case 3:
                return ["feesDetails", "admissionDate"];
            case 4:
                return ["fatherNo", "motherNo", "whatsappNo", "residentialAddress"];
            default:
                return [];
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
            const timestamp = serverTimestamp();
            const { photo, ...cleanValues } = values;
            
            const enrollmentData = {
                ...cleanValues,
                status: 'pending',
                progress: 0,
                createdAt: timestamp,
            };

            // 1. Save to Firestore
            const enrollmentsRef = collection(firestore, 'enrollments');
            await addDoc(enrollmentsRef, enrollmentData);

            // 2. Sync to Google Sheets via secure Server Action
            const syncResult = await appendToGoogleSheetAction({ 
                ...enrollmentData, 
                type: 'enrollment' 
            });

            if (!syncResult.success) {
                console.warn("Sheet Sync Warning:", syncResult.error);
            }

            // 3. Create User Account (Pending)
            const usersRef = collection(firestore, 'users');
            await addDoc(usersRef, {
                email: values.email,
                displayName: `${values.firstName} ${values.lastName}`,
                role: 'student',
                status: 'pending',
                phoneNumber: values.whatsappNo,
                createdAt: timestamp,
                updatedAt: timestamp,
            });

            toast({
                title: "Application Submitted!",
                description: `Application for ${values.firstName} ${values.lastName} has been received.`,
            });
            
            const nextId = `ADM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
            form.reset({ admissionNo: nextId, admissionDate: format(new Date(), "yyyy-MM-dd"), academicYear: "2025-2026" });
            setCurrentStep(1);
            setIsSubmitting(false);
        } catch (error: any) {
            console.error("Submission error:", error);
            setIsSubmitting(false);
            
            toast({
                variant: "destructive",
                title: "Submission Failed",
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

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-left">
            <section className="relative w-full flex items-center justify-center pt-24 pb-32 overflow-hidden bg-[#182d45]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
                
                <div className="relative z-10 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                        <GraduationCap className="w-4 h-4" /> Admission 2025-26
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                        Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Application</span>
                    </h1>
                    
                    <div className="mt-12 max-w-2xl mx-auto flex items-center justify-between relative px-2">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 -z-0"></div>
                        <div 
                            className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 -translate-y-1/2 transition-all duration-500 -z-0"
                            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>
                        {steps.map((s) => (
                            <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-lg",
                                    currentStep >= s.id 
                                        ? "bg-blue-500 border-blue-400 text-white" 
                                        : "bg-[#182d45] border-white/20 text-white/40"
                                )}>
                                    {currentStep > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
                                </div>
                                <span className={cn(
                                    "text-[10px] font-black uppercase tracking-widest",
                                    currentStep >= s.id ? "text-blue-400" : "text-white/20"
                                )}>{s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-4xl mx-auto w-full px-4 -mt-16 pb-24 relative z-20">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                        
                        {/* Step 1: Personal Info */}
                        {currentStep === 1 && (
                            <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] bg-white/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 rounded-t-[2rem]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                            <User className="text-white w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">Personal Information</h2>
                                    </div>
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-8 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">First Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter first name" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Last Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter last name" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Email Address *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="your@email.com" {...field} className="h-12 pl-10 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="dob"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col text-left">
                                                    <FormLabel className="text-[#182d45] font-bold mb-2">Date of Birth *</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="date"
                                                            className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm"
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
                                                <FormItem className="space-y-3 text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Gender *</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="male" id="male" className="text-blue-600 border-gray-300" />
                                                                <FormLabel htmlFor="male" className="font-semibold text-gray-600 cursor-pointer text-sm">Male</FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="female" id="female" className="text-blue-600 border-gray-300" />
                                                                <FormLabel htmlFor="female" className="font-semibold text-gray-600 cursor-pointer text-sm">Female</FormLabel>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <RadioGroupItem value="other" id="other" className="text-blue-600 border-gray-300" />
                                                                <FormLabel htmlFor="other" className="font-semibold text-gray-600 cursor-pointer text-sm">Other</FormLabel>
                                                            </div>
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="religion"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Religion *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter religion" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="fatherName"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Father's Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Father's full name" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="fatherOccupation"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Father's Occupation *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="Occupation" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="motherName"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Mother's Name *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Mother's full name" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="motherOccupation"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Mother's Occupation *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="Occupation" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 2: Academic Info */}
                        {currentStep === 2 && (
                            <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] bg-white/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6 rounded-t-[2rem]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                            <BookOpen className="text-white w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">Academic Information</h2>
                                    </div>
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-8 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <FormField
                                            control={form.control}
                                            name="academicYear"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Academic Year *</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                                                <SelectValue placeholder="Select year" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="2024-2025">2024-2025</SelectItem>
                                                            <SelectItem value="2025-2026">2025-2026</SelectItem>
                                                            <SelectItem value="2026-2027">2026-2027</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="standard"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Standard / Class *</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                                                <SelectValue placeholder="Select class" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(cls => (
                                                                <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <div className="md:col-span-2 space-y-4 text-left">
                                            <FormField
                                                control={form.control}
                                                name="subjects"
                                                render={() => (
                                                    <FormItem className="text-left">
                                                        <FormLabel className="text-[#182d45] font-bold text-base">Subjects Required *</FormLabel>
                                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                                            {subjectItems.map((item) => (
                                                                <FormField
                                                                    key={item.id}
                                                                    control={form.control}
                                                                    name="subjects"
                                                                    render={({ field }) => {
                                                                        return (
                                                                            <FormItem key={item.id} className="flex items-center space-x-3 space-y-0 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={field.value?.includes(item.id)}
                                                                                        onCheckedChange={(checked) => {
                                                                                            return checked
                                                                                                ? field.onChange([...field.value, item.id])
                                                                                                : field.onChange(field.value?.filter((value) => value !== item.id))
                                                                                        }}
                                                                                        className="border-gray-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600"
                                                                                    />
                                                                                </FormControl>
                                                                                <FormLabel className="font-bold text-gray-700 cursor-pointer group-hover:text-teal-700 text-sm">{item.label}</FormLabel>
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
                                            <FormField
                                                control={form.control}
                                                name="otherSubject"
                                                render={({ field }) => (
                                                    <FormItem className="text-left mt-2">
                                                        <FormLabel className="text-[#182d45] font-bold">Other Subject (if any)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Specify other subjects" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="institutionName"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Name of the Institution *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="Current school / college" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="board"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3 text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Board of Education *</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-4">
                                                            {["cbse", "samacheer", "icse", "igcse", "ib", "one to one"].map(board => (
                                                                <div key={board} className="flex items-center space-x-2 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-all cursor-pointer">
                                                                    <RadioGroupItem value={board} id={board} className="text-teal-600 border-gray-300" />
                                                                    <FormLabel htmlFor={board} className="font-bold text-gray-600 cursor-pointer uppercase text-[10px] tracking-wider">{board}</FormLabel>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="batchTiming"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Batch Timing *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="e.g. 4 PM - 6 PM" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 3: Guardian & Fees */}
                        {currentStep === 3 && (
                            <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] bg-white/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6 rounded-t-[2rem]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                            <Users className="text-white w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">Guardian & Fees Details</h2>
                                    </div>
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-8 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <FormField
                                            control={form.control}
                                            name="feesDetails"
                                            render={({ field }) => (
                                                <FormItem className="text-left md:col-span-2">
                                                    <FormLabel className="text-[#182d45] font-bold">Fees Details / Payment Plan *</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                            <Input placeholder="Monthly installments / Full payment" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="admissionDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col text-left">
                                                    <FormLabel className="text-[#182d45] font-bold mb-2">Admission Date *</FormLabel>
                                                    <FormControl>
                                                        <Input 
                                                            type="date"
                                                            className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="admissionNo"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Generated Admission No.</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} readOnly className="h-12 bg-gray-100 border-gray-200 rounded-xl font-mono text-blue-600 font-bold" />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Step 4: Contact Details */}
                        {currentStep === 4 && (
                            <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] bg-white/90 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6 rounded-t-[2rem]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                            <Phone className="text-white w-6 h-6" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-white tracking-tight">Contact Information</h2>
                                    </div>
                                </div>
                                <CardContent className="p-8 md:p-12 space-y-8 text-left">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                        <FormField
                                            control={form.control}
                                            name="fatherNo"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Father's Mobile *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="motherNo"
                                            render={({ field }) => (
                                                <FormItem className="text-left">
                                                    <FormLabel className="text-[#182d45] font-bold">Mother's Mobile *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="whatsappNo"
                                            render={({ field }) => (
                                                <FormItem className="text-left md:col-span-2">
                                                    <FormLabel className="text-[#182d45] font-bold">WhatsApp Number *</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="residentialAddress"
                                            render={({ field }) => (
                                                <FormItem className="text-left md:col-span-2">
                                                    <FormLabel className="text-[#182d45] font-bold">Residential Address *</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Full postal address" {...field} className="min-h-[100px] bg-gray-50 border-gray-100 rounded-xl shadow-sm resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <div className="flex flex-col items-center gap-6 pt-4">
                            <div className="flex items-center justify-between w-full max-w-2xl gap-4">
                                {currentStep > 1 && (
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={prevStep}
                                        className="h-14 px-8 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" /> Previous
                                    </Button>
                                )}
                                
                                {currentStep < steps.length ? (
                                    <Button 
                                        type="button" 
                                        onClick={nextStep}
                                        className="h-14 px-10 rounded-2xl bg-[#182d45] text-white font-bold ml-auto shadow-xl transition-all transform active:scale-95 flex items-center gap-2"
                                    >
                                        Continue <ArrowRight className="w-5 h-5" />
                                    </Button>
                                ) : (
                                    <div className="w-full flex flex-col items-center gap-6">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            className="w-full h-16 text-xl font-bold text-white rounded-[1.25rem] shadow-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-blue-500/40 transition-all duration-500 transform active:scale-95 group disabled:opacity-70 flex items-center justify-center gap-3"
                                        >
                                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6 group-hover:animate-pulse" />}
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    )
}
