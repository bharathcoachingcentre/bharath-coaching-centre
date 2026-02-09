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
import { User, Calendar, BookOpen, CheckCircle, Send } from "lucide-react";
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
        "Customized time table",
        "18+ year experienced faculties",
        "Individual attention",
        "Weekly test",
        "25% & 50% portion test",
        "Full mock test",
        "Specialized study materials",
        "Previous year question paper",
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
            <div className="relative z-10 text-center">
            <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
                One to One Classes
            </h1>
            </div>
        </section>

        <div className="py-16 md:py-24" style={{ backgroundColor: 'rgb(245 250 255)' }}>
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div className="space-y-12">
                        <div>
                            <p className="text-sm font-semibold tracking-widest uppercase mb-2" style={{ color: '#35a3be' }}>INFORMATION</p>
                            <h2 className="text-3xl font-bold mb-8" style={{ color: '#182d45' }}>One to One <span style={{ color: '#35a3be' }}>Classes</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {whyChoosePoints.map((point, index) => (
                                    <Card key={index} className="bg-white/80 backdrop-blur-md p-6 flex flex-col items-center text-center shadow-lg rounded-xl border-white">
                                        <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-xl text-white mb-4" style={{ backgroundColor: '#35a3be' }}>
                                            <point.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-lg font-semibold" style={{ color: '#182d45' }}>{point.title}</h3>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h2 className="text-3xl font-bold mb-8" style={{ color: '#35a3be' }}>Our <span>Benefits</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/80 p-4 rounded-lg shadow flex items-center border border-white hover:border-[#35a3be]/30 transition-colors duration-300">
                                        <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg text-white mr-3" style={{ backgroundColor: '#0d4f5c' }}>
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                        <span className="font-medium text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl sticky top-28 border border-gray-100">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold" style={{ color: '#35a3be' }}>Booking Form</h2>
                            <p className="text-gray-600 mt-2">Fill in the form to experience our demo class</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel style={{ color: '#182d45' }}>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]"/>
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
                                            <FormLabel style={{ color: '#182d45' }}>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]"/>
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
                                        <FormLabel style={{ color: '#182d45' }}>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]"/>
                                        </FormControl>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="board"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel style={{ color: '#182d45' }}>Education Board *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]">
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
                                            <FormLabel style={{ color: '#182d45' }}>Grade Level *</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]">
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
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="individualConcern"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Individual Concern" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
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
                                                    <Textarea placeholder="Personalized Schedule" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="personalizedStudyMaterial"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Textarea placeholder="Personalized Study Material" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
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
                                                    <Textarea placeholder="Weekly Academic growth tracking" {...field} className="bg-gray-50 border-gray-200 focus:border-[#35a3be] focus:ring-[#35a3be]" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <Button type="submit" size="lg" className="w-full text-lg text-white hover:bg-[#174f5f] transition-colors" style={{ backgroundColor: '#35a3be' }}>
                                    <Send className="h-5 w-5 mr-2"/> Send Message
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
