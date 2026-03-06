"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { 
    CalendarIcon, 
    User, 
    Users, 
    Phone, 
    BookOpen, 
    Send, 
    GraduationCap, 
    Trash2,
    Briefcase,
    Building,
    MapPin,
    Calendar,
    Hash,
    IndianRupee,
    Info,
    Clock
} from "lucide-react"
import React, { useEffect, useState, useRef } from "react"
import ReactCalendar from 'react-calendar'
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required." }),
    lastName: z.string().min(1, { message: "Last name is required." }),
    gender: z.enum(["male", "female", "other"], { required_error: "Please select a gender." }),
    dob: z.date({ required_error: "Date of birth is required." }),
    religion: z.string().min(1, { message: "Religion is required." }),
    fatherName: z.string().min(1, { message: "Father's name is required." }),
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
    admissionDate: z.date({ required_error: "Admission date is required." }),
    admissionNo: z.string(),
    
    fatherNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    motherNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    whatsappNo: z.string().min(10, { message: "Valid 10-digit number required." }).max(15),
    residentialAddress: z.string().min(1, { message: "Residential address is required." }),
});

const subjectItems = [
    { id: "tamil", label: "Tamil" },
    { id: "english", label: "English" },
    { id: "maths", label: "Maths" },
    { id: "science", label: "Science" },
    { id: "social", label: "Social" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
];

export default function EnrollmentPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: undefined,
            dob: undefined,
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
            admissionDate: new Date(),
            admissionNo: "",
            fatherNo: "",
            motherNo: "",
            whatsappNo: "",
            residentialAddress: "",
        },
    });

    useEffect(() => {
        setIsMounted(true);
        // Auto generate Admission No
        const generatedId = `ADM-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
        form.setValue("admissionNo", generatedId);
    }, [form]);

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

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Application Submitted Successfully!",
            description: `Application for ${values.firstName} ${values.lastName} has been received. Admission No: ${values.admissionNo}`,
        });
        // Generate new ID for next possible entry if not navigating away
        const nextId = `ADM-${Math.random().toString(36).substr(2, 7).toUpperCase()}`;
        form.reset({ admissionNo: nextId, admissionDate: new Date(), academicYear: "2025-2026" });
        setSelectedFileName(null);
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <section className="relative w-full flex items-center justify-center pt-24 pb-32 overflow-hidden bg-[#182d45]">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
                
                <div className="relative z-10 text-center px-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                        <GraduationCap className="w-4 h-4" /> Admission 2025-26
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                        Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Application Form</span>
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto font-medium">
                        Complete your enrollment at Bharath Academy. Please provide accurate details for official records.
                    </p>
                </div>
            </section>

            <main className="max-w-5xl mx-auto w-full px-4 -mt-20 pb-24 relative z-20">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                        {/* Section 1: Personal Info */}
                        <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] overflow-hidden bg-white/90 backdrop-blur-md">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                        <User className="text-white w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Personal Information</h2>
                                </div>
                            </div>
                            <CardContent className="p-8 md:p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem>
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
                                            <FormItem>
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
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-[#182d45] font-bold">Gender *</FormLabel>
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="male" id="male" className="text-blue-600 border-gray-300" />
                                                            <FormLabel htmlFor="male" className="font-semibold text-gray-600 cursor-pointer">Male</FormLabel>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="female" id="female" className="text-blue-600 border-gray-300" />
                                                            <FormLabel htmlFor="female" className="font-semibold text-gray-600 cursor-pointer">Female</FormLabel>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="other" id="other" className="text-blue-600 border-gray-300" />
                                                            <FormLabel htmlFor="other" className="font-semibold text-gray-600 cursor-pointer">Other</FormLabel>
                                                        </div>
                                                    </RadioGroup>
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
                                                <FormLabel className="text-[#182d45] font-bold mb-2">Date of Birth *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"} className={cn("h-12 justify-start text-left font-normal bg-gray-50 border-gray-100 rounded-xl shadow-sm", !field.value && "text-muted-foreground")}>
                                                                <CalendarIcon className="mr-2 h-4 w-4 text-blue-500" />
                                                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden shadow-2xl border-none">
                                                        {isMounted && (
                                                            <ReactCalendar
                                                                onChange={(val) => field.onChange(val as Date)}
                                                                value={field.value || new Date()}
                                                                calendarType="gregory"
                                                                className="border-none"
                                                            />
                                                        )}
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="religion"
                                        render={({ field }) => (
                                            <FormItem>
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
                                            <FormItem>
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
                                            <FormItem>
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
                                            <FormItem>
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
                                            <FormItem>
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
                                    <FormItem>
                                        <FormLabel className="text-[#182d45] font-bold">Student Photo *</FormLabel>
                                        <FormControl>
                                            <div className="flex flex-col gap-3">
                                                {selectedFileName ? (
                                                    <div className="flex items-center justify-between w-full h-12 bg-blue-50 rounded-xl border border-blue-100 px-4">
                                                        <span className="text-sm font-medium text-blue-700 truncate max-w-[200px]">{selectedFileName}</span>
                                                        <Button type="button" variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8" onClick={removeFile}>
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="relative h-12">
                                                        <Input type="file" onChange={handleFileChange} ref={fileInputRef} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                        <div className="absolute inset-0 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-sm text-gray-500 font-medium">
                                                            <Download className="w-4 h-4 mr-2" /> Click to Browse Photo
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Section 2: Academic Info */}
                        <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] overflow-hidden bg-white/90 backdrop-blur-md">
                            <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                        <BookOpen className="text-white w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Academic Information</h2>
                                </div>
                            </div>
                            <CardContent className="p-8 md:p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="academicYear"
                                        render={({ field }) => (
                                            <FormItem>
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
                                            <FormItem>
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
                                    <div className="md:col-span-2 space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="subjects"
                                            render={() => (
                                                <FormItem>
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
                                                                            <FormLabel className="font-bold text-gray-700 cursor-pointer group-hover:text-teal-700">{item.label}</FormLabel>
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
                                                <FormItem>
                                                    <FormLabel className="text-[#182d45] font-bold">Other Subjects</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Specify if any other subjects" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
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
                                            <FormItem>
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
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-[#182d45] font-bold">Board of Education *</FormLabel>
                                                <FormControl>
                                                    <RadioGroup onValueChange={field.onChange} value={field.value} className="grid grid-cols-2 gap-4">
                                                        {["cbse", "samacheer", "icse", "igcse", "ib", "one to one"].map(board => (
                                                            <div key={board} className="flex items-center space-x-2 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white transition-all cursor-pointer">
                                                                <RadioGroupItem value={board} id={board} className="text-teal-600 border-gray-300" />
                                                                <FormLabel htmlFor={board} className="font-bold text-gray-600 cursor-pointer uppercase text-xs tracking-wider">{board}</FormLabel>
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
                                            <FormItem>
                                                <FormLabel className="text-[#182d45] font-bold">Batch Timing *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm">
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="w-4 h-4 text-teal-600" />
                                                                <SelectValue placeholder="Select preferred timing" />
                                                            </div>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="morning">Morning (6:00 AM - 8:00 AM)</SelectItem>
                                                        <SelectItem value="evening-1">Evening Batch 1 (4:00 PM - 6:00 PM)</SelectItem>
                                                        <SelectItem value="evening-2">Evening Batch 2 (6:00 PM - 8:00 PM)</SelectItem>
                                                        <SelectItem value="weekend">Weekend Special Batch</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Section 3: Guardian & Fees Info */}
                        <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] overflow-hidden bg-white/90 backdrop-blur-md">
                            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                        <Users className="text-white w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Guardian & Fees Information</h2>
                                </div>
                            </div>
                            <CardContent className="p-8 md:p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="feesDetails"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-[#182d45] font-bold">Fees Details *</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <IndianRupee className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                                        <Textarea placeholder="Enter breakdown of fees, discounts, or special notes" {...field} className="min-h-[100px] pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm resize-none" />
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
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-[#182d45] font-bold mb-2">Admission Date *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button variant={"outline"} className={cn("h-12 justify-start text-left font-normal bg-gray-50 border-gray-100 rounded-xl shadow-sm", !field.value && "text-muted-foreground")}>
                                                                <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                                                                {field.value ? format(field.value, "PPP") : <span>Select Date</span>}
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 rounded-2xl overflow-hidden shadow-2xl border-none">
                                                        {isMounted && (
                                                            <ReactCalendar
                                                                onChange={(val) => field.onChange(val as Date)}
                                                                value={field.value || new Date()}
                                                                calendarType="gregory"
                                                                className="border-none"
                                                            />
                                                        )}
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="admissionNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#182d45] font-bold">Admission No (Auto Generated)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <Input {...field} readOnly className="h-12 pl-11 bg-purple-50/50 border-purple-100 rounded-xl font-mono font-bold text-purple-700 cursor-not-allowed" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Section 4: Contact Info */}
                        <Card className="shadow-2xl shadow-gray-200 border-none rounded-[2rem] overflow-hidden bg-white/90 backdrop-blur-md">
                            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-inner">
                                        <Phone className="text-white w-6 h-6" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Contact Information</h2>
                                </div>
                            </div>
                            <CardContent className="p-8 md:p-12 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                                    <FormField
                                        control={form.control}
                                        name="fatherNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#182d45] font-bold">Father's No *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10-digit number" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="motherNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-[#182d45] font-bold">Mother's No *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10-digit number" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
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
                                                <FormLabel className="text-[#182d45] font-bold">WhatsApp No *</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <svg viewBox="0 0 24 24" fill="currentColor" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500">
                                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.284l-.549 2.312 2.357-.544c.942.491 1.882.801 2.935.802 3.182 0 5.768-2.586 5.769-5.766 0-3.18-2.587-5.754-5.769-5.754zm4.556 8.308c-.19.524-.974.956-1.344 1.034-.429.09-1.07.146-3.01-.639-2.485-.983-4.031-3.453-4.152-3.611-.122-.159-.988-1.312-.988-2.502 0-1.19.622-1.774.844-2.018.224-.244.487-.305.65-.305.162 0 .325.002.466.01.149.008.352-.057.55.422.204.489.698 1.701.76 1.826.063.125.104.271.021.438-.083.167-.125.271-.25.417-.125.146-.262.325-.375.439-.125.125-.255.262-.11.481.145.219.641 1.056 1.375 1.712.945.841 1.743 1.101 1.99 1.226.247.125.391.104.536-.062.145-.167.621-.73.787-.979.166-.25.334-.208.556-.125.221.083 1.408.665 1.651.788.242.122.402.183.463.288.06.103.06.598-.131 1.122z"/>
                                                        </svg>
                                                        <Input placeholder="Active WhatsApp number" {...field} className="h-12 pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="residentialAddress"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-3">
                                                <FormLabel className="text-[#182d45] font-bold">Residential Address *</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                                                        <Textarea placeholder="Full postal address" {...field} className="min-h-[100px] pl-11 bg-gray-50 border-gray-100 rounded-xl shadow-sm resize-none" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col items-center gap-6 pt-8">
                            <div className="flex items-start gap-3 p-6 bg-blue-50 rounded-2xl border border-blue-100 max-w-2xl">
                                <div className="bg-blue-600 rounded-full p-1.5 mt-0.5 shadow-md flex-shrink-0">
                                    <Info className="text-white h-4 w-4" />
                                </div>
                                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                                    By submitting this form, I verify that all the information provided above is correct to the best of my knowledge and I agree to follow the rules and regulations of Bharath Academy.
                                </p>
                            </div>
                            
                            <Button 
                                type="submit" 
                                size="lg" 
                                className="w-full md:w-auto min-w-[320px] h-16 text-xl font-black text-white rounded-[1.25rem] shadow-2xl bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-blue-500/40 transition-all duration-500 transform active:scale-95 group"
                            >
                                <Send className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                                Submit Application
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    )
}
