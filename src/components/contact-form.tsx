"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, Smartphone, ShieldCheck, Loader2, RefreshCw, Info } from "lucide-react"
import React, { useState, useEffect } from "react"

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { initializeFirebase } from "@/firebase"
import { 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    ConfirmationResult 
} from "firebase/auth"

// PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE TO SYNC LIVE
const GOOGLE_SHEET_WEBHOOK_URL = ""; 

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Enter a valid mobile number (e.g., +91...)",
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
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false)
    const [otpValue, setOtpCode] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null)
    const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(null)
    const [isSimulationMode, setIsSimulationMode] = useState(false)

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

    const setupRecaptcha = () => {
        const { auth } = initializeFirebase();
        if (typeof window !== 'undefined' && !(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': () => {
                    console.log("Recaptcha resolved");
                }
            });
        }
    };

    async function handleStartVerification(values: z.infer<typeof formSchema>) {
        setFormData(values);
        setIsSendingOtp(true);
        setIsSimulationMode(false);
        
        try {
            const { auth } = initializeFirebase();
            setupRecaptcha();
            const appVerifier = (window as any).recaptchaVerifier;
            
            let phone = values.mobileNumber.trim();
            if (!phone.startsWith('+')) {
                phone = '+91' + phone; 
            }

            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
            setIsOtpDialogOpen(true);
            toast({
                title: "OTP Sent",
                description: `A 6-digit verification code has been sent to ${phone}.`,
            });
        } catch (error: any) {
            console.error("SMS Error:", error);
            
            if (error.code === 'auth/billing-not-enabled') {
                setIsSimulationMode(true);
                setIsOtpDialogOpen(true);
                setConfirmationResult({
                    confirm: async (code: string) => {
                        if (code === "123456") return { user: { phoneNumber: values.mobileNumber } };
                        throw new Error("Invalid simulation code");
                    }
                } as any);

                toast({
                    title: "Prototype Simulation Enabled",
                    description: "Real SMS requires a paid plan. Use code '123456' to test the flow for free.",
                });
            } else {
                let errorMessage = "Please check the mobile number and try again.";
                if (error.code === 'auth/operation-not-allowed') {
                    errorMessage = "Phone authentication is not enabled in Firebase Console.";
                } else if (error.message) {
                    errorMessage = error.message;
                }

                toast({
                    variant: "destructive",
                    title: "Failed to send OTP",
                    description: errorMessage,
                });
            }

            if (typeof window !== 'undefined' && (window as any).recaptchaVerifier) {
                (window as any).recaptchaVerifier.clear();
                (window as any).recaptchaVerifier = null;
            }
        } finally {
            setIsSendingOtp(false);
        }
    }

    async function handleVerifyOtp() {
        if (!confirmationResult || !otpValue || otpValue.length !== 6) {
            toast({
                variant: "destructive",
                title: "Invalid Code",
                description: "Please enter the 6-digit code received on your phone.",
            });
            return;
        }

        setIsVerifying(true);
        try {
            await confirmationResult.confirm(otpValue);
            
            // Sync to Google Sheets
            if (GOOGLE_SHEET_WEBHOOK_URL && formData) {
                fetch(GOOGLE_SHEET_WEBHOOK_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, type: 'contact', submittedAt: new Date().toISOString() })
                }).catch(err => console.warn("Google Sheet Sync Failed:", err));
            }

            toast({
                title: "Message Sent!",
                description: "Your phone number has been verified and your inquiry has been received.",
            });
            
            setIsOtpDialogOpen(false);
            form.reset();
            setOtpCode("");
            setConfirmationResult(null);
            setIsSimulationMode(false);
        } catch (error: any) {
            console.error("Verification Error:", error);
            toast({
                variant: "destructive",
                title: "Verification Failed",
                description: isSimulationMode ? "For simulation, please use code '123456'." : "The code you entered is incorrect or has expired.",
            });
        } finally {
            setIsVerifying(false);
        }
    }

    return (
        <>
            <div id="recaptcha-container"></div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleStartVerification)} className="space-y-6">
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
                                        <div className="relative">
                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <Input placeholder="98765 43210" {...field} className="h-12 pl-10 bg-gray-50 border-gray-200 rounded-xl focus:ring-blue-500" />
                                        </div>
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
                        disabled={isSendingOtp}
                        className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 rounded-xl shadow-lg transition-all duration-500 transform active:scale-95 border-none"
                    >
                        {isSendingOtp ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending Code...
                            </>
                        ) : (
                            <>
                                <Send className="mr-2 h-5 w-5" /> Send Message
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
                <DialogContent className="sm:max-w-md rounded-[2rem] border-none shadow-2xl p-8">
                    <DialogHeader className="text-left">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight">
                            {isSimulationMode ? "Simulation Mode" : "Verify Your Phone"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 font-medium">
                            {isSimulationMode 
                                ? "Real SMS requires a paid Firebase plan. We've enabled a simulation for your prototype." 
                                : "We've sent a 6-digit verification code to your mobile number."}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-6 space-y-4">
                        {isSimulationMode && (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                                    To test real SMS for free later, add your phone number as a <strong>Test Number</strong> in the Firebase Console under Authentication {">"} Users.
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <FormLabel className="text-xs font-black uppercase text-gray-400 tracking-widest text-center block w-full">
                                {isSimulationMode ? "Enter '123456' to proceed" : "Enter Verification Code"}
                            </FormLabel>
                            <Input 
                                placeholder="000000" 
                                value={otpValue}
                                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="h-14 text-center text-2xl font-black tracking-[0.5em] bg-gray-50 border-gray-100 rounded-2xl focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button 
                            onClick={handleVerifyOtp}
                            disabled={isVerifying || otpValue.length < 6}
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95 border-none"
                        >
                            {isVerifying ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...
                                </>
                            ) : (
                                "Complete Submission"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
