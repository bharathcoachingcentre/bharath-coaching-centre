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
    FileText 
} from "lucide-react";
import Image from "next/image";

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
        { text: "Customized time table", icon: Calendar },
        { text: "18+ year experienced faculties", icon: Users },
        { text: "Individual attention", icon: UserCheck },
        { text: "Weekly test", icon: ClipboardCheck },
        { text: "25% & 50% portion test", icon: BarChart },
        { text: "Full mock test", icon: GraduationCap },
        { text: "Specialized study materials", icon: BookOpen },
        { text: "Previous year question paper", icon: FileText },
    ];

    const whyChoosePoints = [
        { icon: User, title: "Personal concern" },
        { icon: Calendar, title: "Personalized schedule" },
        { icon: BookOpen, title: "Perfect Learning" },
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
    <div>
        <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
            <Image
                src="/one-to-one.jpg"
                alt="One to One Classes"
                fill
                className="object-cover"
                data-ai-hint="student learning online"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 w-full container mx-auto px-4 text-left">
                <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-lg text-left">
                    One to One Classes
                </h1>
            </div>
        </section>

        <div className="py-16 md:py-24" style={{ backgroundColor: 'rgb(245 250 255)' }}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div className="space-y-16">
                        <div className="text-left">
                            <span 
                                className="inline-block px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm"
                                style={{ color: '#35a3be', backgroundColor: 'white', borderColor: 'rgba(53, 163, 190, 0.2)' }}
                            >
                                Information
                            </span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-[#182d45] tracking-tight mb-12 text-left">
                                One to One <span style={{ color: '#35a3be' }}>Classes</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                                {whyChoosePoints.map((point, index) => (
                                    <div key={index} className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
                                        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#35a3be]/5 rounded-full transition-transform duration-700 group-hover:scale-150 -z-0" />
                                        
                                        <div className="relative mb-8">
                                            <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                                            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53,163,190,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                                                <point.icon className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                        <h3 className="relative z-10 text-xl font-extrabold text-[#182d45] tracking-tight leading-tight">{point.title}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 text-left">
                             <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 text-left" style={{ color: '#182d45' }}>
                                <span className="w-2 h-10 bg-[#35a3be] rounded-full"></span>
                                Our <span style={{ color: '#35a3be' }}>Benefits</span>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/70 backdrop-blur-md p-5 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center border border-white transition-all duration-300 hover:border-[#35a3be]/30 hover:shadow-lg group">
                                        <div className="flex-shrink-0 flex items-center justify-center h-11 w-11 rounded-2xl text-white mr-5 shadow-[0_5px_15px_rgba(13,79,92,0.2)] group-hover:scale-110 transition-transform" style={{ backgroundColor: '#0d4f5c' }}>
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
                            <span className="inline-block px-4 py-1.5 rounded-full bg-[#35a3be]/10 text-[#35a3be] text-xs font-black uppercase tracking-widest mb-4">Book Now</span>
                            <h2 className="text-3xl font-extrabold text-[#182d45]">Booking Form</h2>
                            <p className="text-gray-500 mt-2 font-medium">Experience our personalized demo class today</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel className="font-bold" style={{ color: '#182d45' }}>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} className="h-12 bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm"/>
                                            </FormControl>
                                            <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobileNumber"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel className="font-bold" style={{ color: '#182d45' }}>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm"/>
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
                                        <FormItem>
                                        <FormLabel className="font-bold" style={{ color: '#182d45' }}>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} className="h-12 bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm"/>
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
                                            <FormItem>
                                            <FormLabel className="font-bold" style={{ color: '#182d45' }}>Education Board *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="h-12 bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm">
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
                                            <FormItem>
                                            <FormLabel className="font-bold" style={{ color: '#182d45' }}>Grade Level *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="h-12 bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm">
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
                                                    <Textarea placeholder="Individual Concern" {...field} className="bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm resize-none" />
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
                                                    <Textarea placeholder="Personalized Schedule" {...field} className="bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm resize-none" />
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
                                                    <Textarea placeholder="Personalized Study Material" {...field} className="bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm resize-none" />
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
                                                    <Textarea placeholder="Weekly Academic Growth Tracking" {...field} className="bg-white/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] shadow-sm resize-none" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <Button type="submit" size="lg" className="w-full h-14 text-lg font-extrabold text-white rounded-2xl shadow-xl hover:shadow-[#35a3be]/30 transition-all duration-300 transform active:scale-95 mt-4" style={{ backgroundColor: '#35a3be' }}>
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
