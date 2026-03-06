
"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  Layout, 
  Settings, 
  Plus, 
  X,
  DollarSign,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [modules, setModules] = useState([{ id: 1, title: "" }]);

  const addModule = () => {
    setModules([...modules, { id: modules.length + 1, title: "" }]);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Course Published",
      description: "Your new course has been successfully created and published.",
    });
    router.push("/admin/courses");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link 
        href="/admin/courses" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Courses
      </Link>

      <form onSubmit={handlePublish} className="space-y-8 pb-12">
        {/* Section 1: Course Information */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
          <CardContent className="p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Course Information</h3>
                <p className="text-sm text-gray-400 font-medium">Basic details about the course</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">Course Title</Label>
                <Input 
                  placeholder="e.g. Advanced React Patterns" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">Description</Label>
                <Textarea 
                  placeholder="What students will learn in this course..." 
                  className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-indigo-500 p-6 font-medium text-gray-600 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-3 text-left">
                  <Label className="text-sm font-bold text-gray-700">Category</Label>
                  <Select>
                    <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="data">Data Science</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="mobile">Mobile Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 text-left">
                  <Label className="text-sm font-bold text-gray-700">Difficulty Level</Label>
                  <Select>
                    <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">Tags</Label>
                <div className="relative">
                  <Input 
                    placeholder="Add a tag and press Enter" 
                    className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium pr-16"
                  />
                  <Button type="button" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white hover:bg-gray-100 text-gray-400 rounded-lg shadow-sm">
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Curriculum */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
          <CardContent className="p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Layout className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Curriculum</h3>
                <p className="text-sm text-gray-400 font-medium">Define course modules and structure</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {modules.map((module, index) => (
                <div key={module.id} className="flex items-center gap-6">
                  <span className="text-sm font-bold text-gray-300 w-4">{index + 1}</span>
                  <div className="relative flex-1">
                    <Input 
                      placeholder={`Module ${index + 1} title`} 
                      className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-emerald-500 px-6 font-medium"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button 
              type="button"
              variant="outline" 
              onClick={addModule}
              className="h-12 border-none bg-gray-50 hover:bg-gray-100 rounded-xl px-6 font-bold text-gray-600 gap-2 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Module
            </Button>
          </CardContent>
        </Card>

        {/* Section 3: Pricing & Settings */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
          <CardContent className="p-10">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Pricing & Settings</h3>
                <p className="text-sm text-gray-400 font-medium">Configure pricing and access options</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" /> Price (USD)
                </Label>
                <Input 
                  placeholder="49.99" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-orange-500 px-6 font-medium"
                />
              </div>
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" /> Duration
                </Label>
                <Input 
                  placeholder="e.g. 8 weeks" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-orange-500 px-6 font-medium"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50">
                <div className="space-y-1">
                  <Label className="text-base font-bold text-gray-900">Certificate on Completion</Label>
                  <p className="text-sm text-gray-400 font-medium">Issue a certificate when students finish</p>
                </div>
                <Switch className="data-[state=checked]:bg-indigo-600" />
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-50">
                <div className="space-y-1">
                  <Label className="text-base font-bold text-gray-900">Published</Label>
                  <p className="text-sm text-gray-400 font-medium">Make this course visible to students</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
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
            onClick={() => router.push("/admin/courses")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 gap-3 transition-all active:scale-95"
          >
            <BookOpen className="w-5 h-5" /> Publish Course
          </Button>
        </div>
      </form>
    </div>
  );
}
