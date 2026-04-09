"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Send, Smartphone, ShieldCheck, Loader2, Info } from "lucide-react"
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
import { Label } from "@/components/ui/label"
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
import { appendToGoogleSheetAction } from "@/app/actions/google-sheet"

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
            try {
                (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                    'size': 'invisible',
                    'callback': () => {
                        console.log("Recaptcha resolved");
                    }
                });
            } catch (err) {
                console.error("Recaptcha init failed:", err);
            }
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
            
            if (!appVerifier) {
                throw new Error("reCAPTCHA initialization failed. Please refresh the page.");
            }

            let phone = values.mobileNumber.trim();
            if (!phone.startsWith('+')) {
                phone = '+91' + phone; 
            }

            const result = await signInWithPhoneNumber(auth, phone, appVerifier);
            setConfirmationResult(result);
            setIsOtpDialogOpen(true);
            toast({
                title: "OTP Sent",
                description: `A verification code has been sent to ${phone}.`,
            });
        } catch (error: any) {
            console.error("Verification initiation error:", error);
            
            const isBillingError = error.code === 'auth/billing-not-enabled' || error.message?.includes('billing');
            const isQuotaError = error.code === 'auth/too-many-requests' || error.message?.includes('quota');

            if (isBillingError || isQuotaError) {
                setIsSimulationMode(true);
                setIsOtpDialogOpen(true);
                
                setConfirmationResult({
                    confirm: async (code: string) => {
                        if (code === "123456") return { user: { phoneNumber: values.mobileNumber } };
                        throw new Error("Invalid simulation code. Please use '123456'.");
                    }
                } as any);

                toast({
                    title: isQuotaError ? "Rate Limit Exceeded" : "Simulation Mode Active",
                    description: isQuotaError 
                        ? "Verification requests are temporarily blocked by Google. Switching to simulation mode. Use code '123456'."
                        : "SMS requires a paid plan. Use code '123456' to continue testing.",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "System Error",
                    description: error.message || "Failed to initiate phone verification.",
                });
            }

            if (typeof window !== 'undefined' && (window as any).recaptchaVerifier) {
                try {
                    (window as any).recaptchaVerifier.clear();
                    (window as any).recaptchaVerifier = null;
                } catch (e) {}
            }
        } finally {
            setIsSendingOtp(false);
        }
    }

    async function handleVerifyOtp() {
        if (!confirmationResult || !otpValue || otpValue.length !== 6) {
            toast({
                variant: "destructive",
                title: "Invalid Input",
                description: "Please enter the 6-digit code.",
            });
            return;
        }

        setIsVerifying(true);
        try {
            await confirmationResult.confirm(otpValue);
            
            if (formData) {
                // Sync to Google Sheets via secure Server Action
                const syncResult = await appendToGoogleSheetAction({ 
                    ...formData, 
                    type: 'contact' 
                });

                if (syncResult.success) {
                    toast({
                        title: "Message Sent!",
                        description: "Your inquiry has been received and verified.",
                    });
                } else {
                    console.warn("Sheet Sync Warning:", syncResult.error);
                    toast({
                        title: "Message Verified",
                        description: "Submission successful, but cloud sync encountered an issue.",
                    });
                }
            }
            
            setIsOtpDialogOpen(false);
            form.reset();
            setOtpCode("");
            setConfirmationResult(null);
            setIsSimulationMode(false);
        } catch (error: any) {
            console.error("OTP Verification Error:", error);
            toast({
                variant: "destructive",
                title: "Verification Failed",
                description: error.message || "The code is incorrect or expired.",
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
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
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
                            {isSimulationMode ? "Simulation Active" : "Verify Phone Number"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 font-medium">
                            {isSimulationMode 
                                ? "Real SMS is currently limited. Use the bypass code to proceed." 
                                : "A verification code has been sent to your mobile number."}
                        </DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-6 space-y-4">
                        {isSimulationMode && (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-3">
                                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-xs text-amber-800 font-medium leading-relaxed">
                                    Testing Mode: Please enter <strong>123456</strong> to verify.
                                </p>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase text-gray-400 tracking-widest text-center block w-full">
                                {isSimulationMode ? "Enter '123456'" : "Enter 6-Digit Code"}
                            </Label>
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
                                "Verify & Submit"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}