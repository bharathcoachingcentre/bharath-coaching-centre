
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
import { Mail, Phone, MapPin } from "lucide-react";

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
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        toast({
            title: "Booking Submitted!",
            description: "Thank you for your request. We will be in touch shortly.",
        });
        form.reset();
    }
  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="space-y-12">
                <div>
                    <p className="text-primary font-semibold text-sm tracking-wider">INFORMATION</p>
                    <h2 className="text-4xl font-bold mt-2">Partner with us to build something remarkable</h2>
                    <p className="mt-4 text-muted-foreground">
                        Connect with us today and we will take you through a hassle-free experience!
                        Turn your dreams and ideas into reality.
                    </p>
                </div>
                <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <MapPin className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Address</h3>
                            <p className="text-muted-foreground">First floor, 59/G5, Adura Regent Apartment, 6th Street, Perumalpuram, Tirunelveli<br/>Tamil Nadu, 627007.</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <Mail className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Mail Us</h3>
                            <p className="text-muted-foreground">bcc_try@hotmail.com</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <Phone className="h-8 w-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Call Us</h3>
                            <p className="text-muted-foreground">+91 7200030307</p>
                        </div>
                    </div>
                </div>
            </div>

            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <p className="text-primary font-semibold text-3xl">BOOKING FORM</p>
                    <CardTitle className="text-xl font-bold">Fill in the Form to experience our demo class</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Name *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} />
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
                                        <FormLabel>Mobile Number *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your Mobile Number" {...field} />
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
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Your Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="board"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Board *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a board" />
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
                                        <FormLabel>Grade *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a grade" />
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
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="individualConcern"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea placeholder="Individual Concern" {...field} />
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
                                                <Textarea placeholder="Personalized Schedule" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="personalizedStudyMaterial"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea placeholder="Personalized Study Material" {...field} />
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
                                                <Textarea placeholder="Weekly Academic growth tracking" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            
                            <div className="flex justify-center">
                                <Button type="submit" size="lg">Send Message</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
