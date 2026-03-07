"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter,
  DialogTrigger 
} from "@/components/ui/dialog";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { initializeFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [resetEmail, setResetEmail] = useState("");
    const [isResetting, setIsResetting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin = async (values: z.infer<typeof loginSchema>) => {
        setIsLoading(true);
        try {
            const { auth } = initializeFirebase();
            await signInWithEmailAndPassword(auth, values.email, values.password);
            toast({
                title: "Welcome Back",
                description: "Successfully signed in to your account.",
            });
            router.push("/admin");
        } catch (error: any) {
            console.error("Login error:", error);
            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: error.message || "Invalid email or password.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resetEmail) {
            toast({
                variant: "destructive",
                title: "Email Required",
                description: "Please enter your email address to receive a reset link.",
            });
            return;
        }

        setIsResetting(true);
        try {
            const { auth } = initializeFirebase();
            await sendPasswordResetEmail(auth, resetEmail);
            toast({
                title: "Reset Link Sent",
                description: "Check your email inbox for instructions to reset your password.",
            });
            setIsDialogOpen(false);
            setResetEmail("");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to send reset email. Please try again.",
            });
        } finally {
            setIsResetting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen pt-16 pb-24 gradient-bg" style={{ marginTop: '-140px' }}>
            <main className="flex-grow flex items-center justify-center p-4 pt-48 md:pt-56">
                <Card className="w-full max-w-sm shadow-[0_30px_80px_rgba(37,99,235,0.1)] border-white/60 bg-white/80 backdrop-blur-md rounded-[20px] overflow-hidden">
                    <CardHeader className="text-left p-8 pb-4">
                        <CardTitle className="text-3xl font-black text-[#182d45] tracking-tight">Sign In</CardTitle>
                        <CardDescription className="text-gray-500 font-medium">Enter your email below to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel className="font-bold text-[#182d45] text-sm">Email Address</FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input placeholder="m@example.com" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 pl-11 shadow-sm transition-all" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <FormLabel className="font-bold text-[#182d45] text-sm">Password</FormLabel>
                                                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                                    <DialogTrigger asChild>
                                                        <button type="button" className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-xl font-bold">Reset Password</DialogTitle>
                                                            <DialogDescription className="text-gray-500">
                                                                Enter your email address and we'll send you a link to reset your password.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="reset-email" className="font-bold">Email Address</Label>
                                                                <Input 
                                                                    id="reset-email" 
                                                                    placeholder="m@example.com" 
                                                                    value={resetEmail} 
                                                                    onChange={(e) => setResetEmail(e.target.value)}
                                                                    className="rounded-xl"
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button 
                                                                onClick={handleForgotPassword} 
                                                                disabled={isResetting}
                                                                className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 border-none text-white rounded-xl h-12 font-bold shadow-lg shadow-blue-500/20"
                                                            >
                                                                {isResetting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                                                {isResetting ? "Sending..." : "Send Reset Link"}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input type="password" placeholder="••••••••" {...field} className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500 pl-11 shadow-sm transition-all" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button 
                                    type="submit" 
                                    disabled={isLoading}
                                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-500/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 border-none"
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                                    {isLoading ? "Signing In..." : "Sign In"}
                                </Button>
                            </form>
                        </Form>
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 font-medium">
                                Don't have an account? <Link href="/registration" className="text-blue-600 font-bold hover:underline">Register Now</Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
