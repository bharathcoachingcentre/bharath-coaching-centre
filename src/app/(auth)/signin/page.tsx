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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { initializeFirebase } from "@/firebase";

export default function SignInPage() {
    const { toast } = useToast();
    const [resetEmail, setResetEmail] = useState("");
    const [isResetting, setIsResetting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

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
                <Card className="w-full max-w-sm shadow-[0_30px_80px_rgba(8,112,184,0.1)] border-white/60 bg-white/80 backdrop-blur-md rounded-[20px] overflow-hidden">
                    <CardHeader className="text-left p-8 pb-4">
                        <CardTitle className="text-3xl font-black text-[#182d45] tracking-tight">Sign In</CardTitle>
                        <CardDescription className="text-gray-500 font-medium">Enter your email below to login to your account</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="font-bold text-[#182d45] text-sm">Email Address</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" title="password" className="font-bold text-[#182d45] text-sm">Password</Label>
                                    
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger asChild>
                                            <button type="button" className="text-xs font-bold text-[#35a3be] hover:underline">Forgot password?</button>
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
                                                    className="w-full bg-[#35a3be] hover:bg-[#174f5f] rounded-xl h-12 font-bold"
                                                >
                                                    {isResetting ? "Sending..." : "Send Reset Link"}
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Input id="password" type="password" required placeholder="••••••••" className="h-12 bg-gray-50/50 border-gray-200 rounded-xl focus:border-[#35a3be] focus:ring-[#35a3be]" />
                            </div>
                            <Button type="submit" className="w-full h-14 bg-[#35a3be] hover:bg-[#174f5f] text-white font-black text-lg rounded-2xl shadow-xl shadow-[#35a3be]/20 transition-all duration-300 transform active:scale-95">Sign In</Button>
                        </form>
                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-500 font-medium">
                                Don't have an account? <Link href="/student-registration" className="text-[#35a3be] font-bold hover:underline">Register Now</Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
