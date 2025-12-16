
'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Mail, Phone, MapPin, User, Calendar, BookOpen, CheckCircle, Sparkles, Send } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobileNumber: z.string().min(10, "Please enter a valid 10-digit phone number.").max(15),
  email: z.string().email("Invalid email address"),
  board: z.string({ required_error: "Please select a board." }),
  grade: z.string({ required_error: "Please select a grade." }),
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
            board: "",
            grade: "",
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
        "Previous year question paper discussion",
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
        <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
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

        <div className="py-16 md:py-24 bg-blue-50/50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column */}
                    <div className="space-y-12">
                        <div>
                            <p className="text-sm font-semibold tracking-widest text-primary mb-2">INFORMATION</p>
                            <h2 className="text-3xl font-bold mb-8">One to One <span className="text-primary">Classes</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {whyChoosePoints.map((point, index) => (
                                    <Card key={index} className="bg-white/80 p-6 flex flex-col items-center text-center shadow-lg rounded-xl">
                                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mb-4">
                                            <point.icon className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-semibold">{point.title}</h3>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div>
                             <h2 className="text-3xl font-bold mb-8">Our <span className="text-primary">Benefits</span></h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/80 p-4 rounded-lg shadow flex items-center">
                                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                                        <span className="font-medium text-gray-700">{benefit}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl sticky top-28">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold" style={{ color: '#1b9df3' }}>Booking Form</h2>
                            <p className="text-black mt-2">Fill in the form to experience our demo class</p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your name" {...field} className="bg-gray-100"/>
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
                                            <FormLabel>Mobile Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+91 XXXXX XXXXX" {...field} className="bg-gray-100"/>
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="your@email.com" {...field} className="bg-gray-100"/>
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
                                            <FormLabel>Education Board</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="bg-gray-100">
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
                                            <FormLabel>Grade Level</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                <SelectTrigger className="bg-gray-100">
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
                                                <FormLabel>Individual Concern</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Individual Concern" {...field} className="bg-gray-100" />
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
                                                <FormLabel>Preferred Schedule</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Personalized Schedule" {...field} className="bg-gray-100" />
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
                                                <FormLabel className="opacity-0 hidden sm:block">Placeholder</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Personalized Study Material" {...field} className="bg-gray-100" />
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
                                                <FormLabel className="opacity-0 hidden sm:block">Placeholder</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Weekly Academic growth tracking" {...field} className="bg-gray-100" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <Button type="submit" size="lg" className="w-full text-lg">
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
