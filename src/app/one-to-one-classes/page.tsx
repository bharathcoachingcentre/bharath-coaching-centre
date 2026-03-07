'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
    User, 
    Calendar, 
    BookOpen, 
    CheckCircle, 
    Send, 
    Users, 
    UserCheck, 
    ClipboardCheck, 
    BarChart, 
    GraduationCap, 
    FileText,
    ChevronDown
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().min(10, "Please enter a valid 10-digit phone number.").max(15),
  email: z.string().email("Invalid email address"),
  board: z.string({ required_error: "Please select a board." }).min(1, "Please select a board."),
  grade: z.string({ required_error: "Please select a grade." }).min(1, "Please select a grade."),
  individualConcern: z.string().optional(),
  personalizedSchedule: z.string().optional(),
  personalizedStudyMaterial: z.string().optional(),
  weeklyGrowthTracking: z.string().optional(),
});

export default function OneToOneClassesPage() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mobileNumber: "",
            email: "",
            board: undefined,
            grade: undefined,
            individualConcern: "",
            personalizedSchedule: "",
            personalizedStudyMaterial: "",
            weeklyGrowthTracking: "",
        },
    });

    const benefits = [
        { text: "Customized time table", icon: Calendar, color: "bg-blue-500" },
        { text: "18+ year experienced faculties", icon: Users, color: "bg-teal-500" },
        { text: "Individual attention", icon: UserCheck, color: "bg-purple-500" },
        { text: "Weekly test", icon: ClipboardCheck, color: "bg-orange-500" },
        { text: "25% & 50% portion test", icon: BarChart, color: "bg-pink-500" },
        { text: "Full mock test", icon: GraduationCap, color: "bg-indigo-500" },
        { text: "Specialized study materials", icon: BookOpen, color: "bg-blue-600" },
        { text: "Previous year question paper", icon: FileText, color: "bg-teal-600" },
    ];

    const whyChoosePoints = [
        { icon: User, title: "Personal concern", color: "bg-blue-500" },
        { icon: Calendar, title: "Personalized schedule", color: "bg-teal-500" },
        { icon: BookOpen, title: "Perfect Learning", color: "bg-purple-500" },
    ];

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Submitted!",
            description: "Thank you for your request. We will be in touch shortly.",
        });
        form.reset();
    }

  return (
    <div className="font-body antialiased">
        {/* Hero Section */}
        <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
            <Image
                src="/one-to-one.jpg"
                alt="One to One Classes"
                fill
                className="object-cover"
                data-ai-hint="student learning online"
                priority
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div className="relative z-10 w-full container mx-auto px-4 text-center pt-20">
                <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
                    One to One Classes
                </h1>
            </div>
        </section>

        <div className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
            {/* Decorative Background Blobs */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div className="space-y-16">
                        <div className="text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
                                Information
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-12">
                                One to One <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Classes</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {whyChoosePoints.map((point, index) => (
                                    <div key={index} className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
                                        <div className="relative mb-8">
                                            <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                                            <div className={cn(
                                                "relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-white",
                                                point.color
                                            )}>
                                                <point.icon className="w-10 h-10" />
                                            </div>
                                        </div>
                                        <h3 className="relative z-10 text-xl font-bold text-gray-900 tracking-tight leading-tight">{point.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 text-left">
                             <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-left text-gray-900">
                                <span className="w-2 h-10 bg-gradient-to-b from-blue-600 to-teal-500 rounded-full"></span>
                                Our <span className="text-blue-600">Benefits</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/70 backdrop-blur-md p-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center border border-white transition-all duration-300 hover:border-blue-200 hover:shadow-lg group">
                                        <div className={cn(
                                            "flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-2xl text-white mr-5 shadow-lg transition-transform group-hover:scale-110",
                                            benefit.color
                                        )}>
                                            <benefit.icon className="h-6 w-6" />
                                        </div>
                                        <span className="font-bold text-gray-700 text-lg leading-tight text-left">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_30px_80px_rgba(8,112,184,0.1)] sticky top-28 border border-white">
                        <div className="text-center mb-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-xs font-bold uppercase tracking-widest mb-4">Book Now</span>
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Booking Form</h2>
                            <p className="text-gray-500 mt-2 font-medium">Experience our personalized demo class today</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="text-left">
                                            <FormLabel className="font-bold text-gray-700">Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobileNumber"
                                        render={({ field }) => (
                                            <FormItem className="text-left">
                                            <FormLabel className="font-bold text-gray-700">Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="text-left">
                                        <FormLabel className="font-bold text-gray-700">Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm"/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="board"
                                        render={({ field }) => (
                                            <FormItem className="text-left">
                                            <FormLabel className="font-bold text-gray-700">Education Board *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                                                    <SelectValue placeholder="Select board" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="cbse">CBSE</SelectItem>
                                                    <SelectItem value="samacheer">SAMACHEER</SelectItem>
                                                    <SelectItem value="ib">IB</SelectItem>
                                                    <SelectItem value="igcse">IGCSE</SelectItem>
                                                    <SelectItem value="10th-12th-compartment">10th & 12th Compartment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="grade"
                                        render={({ field }) => (
                                            <FormItem className="text-left">
                                            <FormLabel className="font-bold text-gray-700">Grade Level *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm">
                                                    <SelectValue placeholder="Select grade" />
                                                </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {Array.from({ length: 7 }, (_, i) => i + 6).map(grade => (
                                                        <SelectItem key={grade} value={String(grade)}>Class {grade}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                     <FormField
                                        control={form.control}
                                        name="individualConcern"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Individual Concern" {...field} className="bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none h-24" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="personalizedSchedule"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Personalized Schedule" {...field} className="bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none h-24" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                     <FormField
                                        control={form.control}
                                        name="personalizedStudyMaterial"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Personalized Study Material" {...field} className="bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none h-24" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="weeklyGrowthTracking"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Weekly Academic Growth Tracking" {...field} className="bg-gray-50 border-gray-100 rounded-xl focus:ring-blue-500 focus:border-blue-500 shadow-sm resize-none h-24" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <Button type="submit" size="lg" className="w-full h-14 text-lg font-bold text-white rounded-2xl shadow-xl bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-blue-500/25 transition-all duration-300 transform active:scale-95 mt-4 border-none">
                                    <Send className="h-5 w-5 mr-2"/> Book My Demo Session
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
