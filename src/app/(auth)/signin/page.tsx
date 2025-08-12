"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
    return (
        <div className="flex flex-col min-h-screen bg-blue-50">
            <main className="flex-grow flex items-center justify-center p-4">
                <Card className="w-full max-w-sm shadow-xl">
                    <CardHeader className="text-left">
                        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
                        <CardDescription>Enter your email below to login to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required className="bg-blue-100/50 border-blue-200/50 focus:bg-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required placeholder="••••••••" className="bg-blue-100/50 border-blue-200/50 focus:bg-white" />
                            </div>
                            <Button type="submit" className="w-full bg-[#43b9ea] hover:bg-[#38a8d6] text-white">Sign In</Button>
                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
