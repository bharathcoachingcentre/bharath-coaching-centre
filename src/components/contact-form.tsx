"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, Loader2 } from "lucide-react"
import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { appendToGoogleSheetAction } from "@/app/actions/google-sheet"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Enter a valid mobile number (e.g., 9876543210)",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters."
  }),
})

export function ContactForm() {
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            mobileNumber: "",
            subject: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);
        
        try {
            // Direct sync to Google Sheets via secure Server Action
            const syncResult = await appendToGoogleSheetAction({ 
                ...values, 
                type: 'contact' 
            });

            if (syncResult.success) {
                toast({
                    title: "Message Sent!",
                    description: "Your inquiry has been received successfully.",
                });
                form.reset();
            } else {
                console.warn("Sheet Sync Warning:", syncResult.error);
                toast({
                    variant: "destructive",
                    title: "Submission Error",
                    description: syncResult.error || "Could not save your message to the spreadsheet.",
                });
            }
        } catch (error: any) {
            console.error("Submission Error:", error);
            toast({
                variant: "destructive",
                title: "System Error",
                description: "An unexpected error occurred. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Full Name *</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500" />
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
                                <FormLabel className="text-gray-700 font-bold">Email Address *</FormLabel>
                                <FormControl>
                                    <Input placeholder="you@example.com" {...field} className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Mobile Number *</FormLabel>
                                <FormControl>
                                    <Input placeholder="9876543210" {...field} className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 font-bold">Subject *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Inquiry about courses" {...field} className="h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-700 font-bold">Message *</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us how we can help..."
                                    className="resize-none min-h-[120px] bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 border-none"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...
                        </>
                    ) : (
                        <>
                            <Send className="mr-2 h-5 w-5" /> Send Message
                        </>
                    )}
                </Button>
            </form>
        </Form>
    )
}
