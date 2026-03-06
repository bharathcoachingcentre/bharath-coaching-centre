
"use client";

import React from "react";
import { 
  ArrowLeft, 
  UserPlus, 
  GraduationCap, 
  Calendar, 
  CreditCard, 
  FileText, 
  Mail, 
  Phone,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function AddEnrollmentPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [date, setDate] = React.useState<Date>();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enrollment Created",
      description: "The student has been successfully registered.",
    });
    router.push("/admin/enrollments");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link 
        href="/admin/enrollments" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Enrollments
      </Link>

      <form onSubmit={handleCreate} className="space-y-8">
        {/* Section 1: Student Information */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Student Information</h3>
                <p className="text-sm text-gray-400 font-medium">Enter the student's personal details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">First Name</Label>
                <Input 
                  placeholder="John" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">Last Name</Label>
                <Input 
                  placeholder="Doe" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" /> Email Address
                </Label>
                <Input 
                  type="email"
                  placeholder="john@example.com" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" /> Phone Number
                </Label>
                <Input 
                  placeholder="+1 (555) 000-0000" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Course Details */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-sky-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Course Details</h3>
                <p className="text-sm text-gray-400 font-medium">Select the course and enrollment preferences</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-8">
              <div className="space-y-3 text-left">
                <Label className="text-sm font-bold text-gray-700">Course</Label>
                <Select>
                  <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                    <SelectItem value="react">Advanced React & Next.js</SelectItem>
                    <SelectItem value="python">Data Science with Python</SelectItem>
                    <SelectItem value="ux">UX Design Masterclass</SelectItem>
                    <SelectItem value="ml">Machine Learning A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" /> Start Date
                </Label>
                <Input 
                  type="date"
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium text-gray-500 appearance-none"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3 text-left">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" /> Payment Plan
                </Label>
                <Select>
                  <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                    <SelectValue placeholder="Select payment plan" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                    <SelectItem value="full">Full Payment (Upfront)</SelectItem>
                    <SelectItem value="installments">Monthly Installments</SelectItem>
                    <SelectItem value="scholarship">Scholarship / Fee Waiver</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" /> Additional Notes
                </Label>
                <Textarea 
                  placeholder="Any additional information about this enrollment..." 
                  className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-indigo-500 p-6 font-medium text-gray-600 resize-none"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Button 
            type="button"
            variant="ghost" 
            className="h-14 px-10 text-gray-500 font-bold rounded-xl hover:bg-gray-100"
            onClick={() => router.push("/admin/enrollments")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 gap-3 transition-all active:scale-95"
          >
            <UserPlus className="w-5 h-5" /> Create Enrollment
          </Button>
        </div>
      </form>
    </div>
  );
}
