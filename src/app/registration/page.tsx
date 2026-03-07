"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { initializeFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const signupSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function SignUpPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSignUp = async (values: z.infer<typeof signupSchema>) => {
        setIsLoading(true);
        try {
            const { auth, firestore } = initializeFirebase();
            
            // 1. Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;

            // 2. Update Profile
            await updateProfile(user, {
                displayName: values.fullName,
            });

            // 3. Create Firestore User Doc
            const userRef = doc(firestore, "users", user.uid);
            const userData = {
                uid: user.uid,
                email: values.email,
                displayName: values.fullName,
                role: "student",
                status: "active",
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            setDoc(userRef, userData)
                .catch(async (error) => {
                    const permissionError = new FirestorePermissionError({
                        path: userRef.path,
                        operation: 'create',
                        requestResourceData: userData,
                    });
                    errorEmitter.emit('permission-error', permissionError);
                });

            toast({
                title: "Account Created",
                description: "Welcome to Bharath Academy! Your account is ready.",
            });
            
            router.push("/admin");
        } catch (error: any) {
            console.error("Signup error:", error);
            toast({
                variant: "destructive",
                title: "Registration Failed",
                description: error.message || "An error occurred during signup.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pt-16 pb-24 gradient-bg" style={{ marginTop: '-140px' }}>
            <main className="flex-grow flex items-center justify-center p-4 pt-48 md:pt-56">
                <Card className="w-full max-w-md shadow-[0_30px_80px_rgba(8,112,184,0.1)] border-white/60 bg-white/80 backdrop-blur-md rounded-[20px] overflow-hidden">
                    <CardHeader className="text-left p-8 pb-4">
                        <CardTitle className="text-3xl font-black text-[#182d45] tracking-tight">Create Account</CardTitle>
                        <CardDescription className="text-gray-500 font-medium">Join our community of achievers today</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-5">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-bold text-[#182d45] text-sm">Full Name</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input placeholder="John Doe" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] pl-11" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-bold text-[#182d45] text-sm">Email Address</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input placeholder="m@example.com" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] pl-11" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="font-bold text-[#182d45] text-sm">Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <Input type="password" placeholder="••••••••" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] pl-11" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="confirmPassword"
                                        render={({ field }) => (
                                            <FormItem className="space-y-2">
                                                <FormLabel className="font-bold text-[#182d45] text-sm">Confirm</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <Input type="password" placeholder="••••••••" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be] pl-11" />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full h-14 bg-[#35a3be] hover:bg-[#174f5f] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#35a3be]/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                    {isLoading ? "Creating Account..." : "Sign Up Now"}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 font-medium">
                                Already have an account? <Link href="/signin" className="text-[#35a3be] font-bold hover:underline">Sign In</Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
