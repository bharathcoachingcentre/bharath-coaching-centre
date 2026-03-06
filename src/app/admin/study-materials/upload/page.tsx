"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Upload, 
  CloudUpload, 
  BookOpen, 
  FileText, 
  Info,
  ChevronDown,
  FileUp
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

export default function UploadMaterialPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Material Uploaded",
      description: "Your study resource has been successfully published.",
    });
    router.push("/admin/study-materials");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Link */}
      <Link 
        href="/admin/study-materials" 
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Materials
      </Link>

      <form onSubmit={handleUpload} className="space-y-8">
        {/* Section 1: Upload File */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                <FileUp className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Upload File</h3>
                <p className="text-sm text-gray-400 font-medium">Drag and drop or browse for a file</p>
              </div>
            </div>

            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              className={cn(
                "relative border-2 border-dashed rounded-[24px] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer",
                isDragging 
                  ? "border-indigo-500 bg-indigo-50/50" 
                  : "border-gray-100 bg-gray-50/30 hover:border-indigo-200 hover:bg-gray-50/50"
              )}
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CloudUpload className="w-8 h-8 text-gray-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-bold text-gray-700">
                  Drop your file here, or <span className="text-indigo-600">browse</span>
                </p>
                <p className="text-sm text-gray-400 font-medium">
                  Supports PDF, Video, Images, Documents (max 500 MB)
                </p>
              </div>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Material Details */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-emerald-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Material Details</h3>
                <p className="text-sm text-gray-400 font-medium">Provide metadata for the uploaded resource</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-sm font-bold text-gray-700">Title</Label>
                <Input 
                  placeholder="e.g. React Hooks Cheatsheet" 
                  className="h-14 bg-gray-50/80 border-none rounded-xl focus-visible:ring-indigo-500 px-6 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <div className="space-y-3 text-left">
                  <Label className="text-sm font-bold text-gray-700">Course</Label>
                  <Select>
                    <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                      <SelectValue placeholder="Assign to course" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                      <SelectItem value="react">Advanced React & Next.js</SelectItem>
                      <SelectItem value="python">Data Science with Python</SelectItem>
                      <SelectItem value="ux">UX Design Masterclass</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 text-left">
                  <Label className="text-sm font-bold text-gray-700">Material Type</Label>
                  <Select>
                    <SelectTrigger className="h-14 bg-gray-50/80 border-none rounded-xl focus:ring-indigo-500 px-6 font-medium text-gray-500">
                      <SelectValue placeholder="Auto-detect" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="video">Video Lecture</SelectItem>
                      <SelectItem value="image">Image / Infographic</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 text-left">
                <Label className="text-sm font-bold text-gray-700">Description</Label>
                <Textarea 
                  placeholder="Brief description of this material..." 
                  className="min-h-[150px] bg-gray-50/80 border-none rounded-[20px] focus-visible:ring-indigo-500 p-6 font-medium text-gray-600 resize-none"
                />
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <div className="space-y-1">
                    <Label className="text-base font-bold text-gray-900">Allow Downloads</Label>
                    <p className="text-sm text-gray-400 font-medium">Students can download this material</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                  <div className="space-y-1">
                    <Label className="text-base font-bold text-gray-900">Visible to Students</Label>
                    <p className="text-sm text-gray-400 font-medium">Publish immediately after upload</p>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
                </div>
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
            onClick={() => router.push("/admin/study-materials")}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="h-14 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 gap-3 transition-all active:scale-95"
          >
            <Upload className="w-5 h-5" /> Upload Material
          </Button>
        </div>
      </form>
    </div>
  );
}
