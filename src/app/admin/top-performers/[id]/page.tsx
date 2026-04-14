"use client";

import React, { useMemo, useEffect, useState, use, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Trophy, 
  Save, 
  Loader2, 
  Upload,
  Sparkles,
  Star,
  Award,
  Medal,
  Crown,
  ListOrdered
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc, useCollection } from "@/firebase";
import { doc, updateDoc, serverTimestamp, query, collection, orderBy } from "firebase/firestore";
import { cn } from "@/lib/utils";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  grade: z.string().optional(),
  marks: z.string().min(1, "Marks / Percentage is required"),
  rank: z.string().min(1, "Rank text is required"),
  rankOrder: z.coerce.number().int().min(1, "Rank order must be at least 1"),
  year: z.string().min(1, "Year is required"),
  imageUrl: z.string().min(1, "Student photo is required"),
  badgeColor: z.string().min(1, "Badge color is required"),
  iconColor: z.string().min(1, "Icon color is required"),
  marksColor: z.string().min(1, "Marks color is required"),
  rankIcon: z.string().min(1, "Rank icon is required"),
});

const colorOptions = [
  { label: "Ocean Blue", value: "bg-blue-600", text: "text-blue-600" },
  { label: "Emerald Teal", value: "bg-teal-600", text: "text-teal-600" },
  { label: "Royal Purple", value: "bg-purple-600", text: "text-purple-600" },
  { label: "Sunset Orange", value: "bg-orange-600", text: "text-orange-600" },
  { label: "Golden Yellow", value: "bg-[#fbbf24]", text: "text-[#fbbf24]" },
  { label: "Silver Slate", value: "bg-[#94a3b8]", text: "text-[#94a3b8]" },
  { label: "Amber Glow", value: "bg-[#f59e0b]", text: "text-[#f59e0b]" },
  { label: "Rose Pink", value: "bg-pink-600", text: "text-pink-600" },
];

const iconOptions = [
  { name: "Star", icon: Star },
  { name: "Trophy", icon: Trophy },
  { name: "Medal", icon: Medal },
  { name: "Award", icon: Award },
  { name: "Crown", icon: Crown },
];

export default function EditPerformerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: performerId } = use(params);
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);

  const yearsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'years'), orderBy('year', 'desc'));
  }, [firestore]);
  const { data: yearsList, loading: yearsLoading } = useCollection(yearsQuery);

  const docRef = useMemo(() => {
    if (!firestore || !performerId) return null;
    return doc(firestore, "top-performers", performerId);
  }, [firestore, performerId]);
  const { data: performer, loading: performerLoading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grade: "",
      marks: "",
      rank: "",
      rankOrder: 1,
      year: "",
      imageUrl: "",
      badgeColor: "bg-blue-600",
      iconColor: "bg-blue-600",
      marksColor: "text-blue-600",
      rankIcon: "Star",
    },
  });

  const yearOptions = useMemo(() => {
    const list = yearsList?.map(y => String(y.year)) || [];
    const savedYear = performer?.year ? String(performer.year) : null;
    if (savedYear && !list.includes(savedYear)) {
      list.push(savedYear);
    }
    return Array.from(new Set(list)).sort((a, b) => b.localeCompare(a));
  }, [yearsList, performer?.year]);

  useEffect(() => {
    if (!performerLoading && !yearsLoading && performer && !isSaving && !form.formState.isDirty) {
      const normalized = {
        name: String(performer.name || ""),
        grade: String(performer.grade || ""),
        marks: String(performer.marks || ""),
        rank: String(performer.rank || ""),
        rankOrder: Number(performer.rankOrder || 1),
        year: String(performer.year || ""),
        imageUrl: String(performer.imageUrl || ""),
        badgeColor: String(performer.badgeColor || "bg-blue-600"),
        iconColor: String(performer.iconColor || "bg-blue-600"),
        marksColor: String(performer.marksColor || "text-blue-600"),
        rankIcon: String(performer.rankIcon || "Star"),
      };
      form.reset(normalized);
    }
  }, [performer, performerLoading, yearsLoading, form, isSaving]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          form.setValue("imageUrl", compressedBase64, { shouldDirty: true });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!firestore || !performerId || !performer) return;
    setIsSaving(true);

    try {
      await updateDoc(doc(firestore, "top-performers", performerId), {
        ...formData,
        rankOrder: Number(formData.rankOrder),
        updatedAt: serverTimestamp(),
      });
      toast({ title: "Performer Updated", description: "Record has been saved successfully." });
      router.push("/admin/top-performers");
    } catch (error: any) {
      console.error("Update Error:", error);
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
      setIsSaving(false);
    }
  };

  if (performerLoading || (yearsLoading && !performer)) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Achievement Profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <Button variant="ghost" onClick={() => router.push("/admin/top-performers")} className="text-gray-500 font-bold hover:text-blue-600 w-full sm:w-auto justify-start px-0 sm:px-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left pb-12">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="p-6 sm:p-10 pb-0 text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Trophy className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Performer Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 sm:p-10 pt-8 space-y-8 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <Label className="text-xs font-black uppercase text-gray-400">Student Photo</Label>
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    <div className="relative w-32 h-32 rounded-3xl overflow-hidden border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center group hover:border-blue-400 transition-colors">
                      {form.watch("imageUrl") ? (
                        <img src={form.watch("imageUrl")} className="w-full h-full object-cover" alt="Preview" />
                      ) : (
                        <Upload className="w-8 h-8 text-gray-300 group-hover:text-blue-400" />
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handleImageUpload}
                      />
                    </div>
                    <div className="space-y-1 text-center sm:text-left">
                      <p className="text-sm font-bold text-gray-700">Student Portrait</p>
                      <p className="text-xs text-gray-400">Automatic resizing & optimization applied.</p>
                    </div>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Student Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full Name" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Class / Board (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Class 10, CBSE" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="marks"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Total Marks / Percentage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 98.6%" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Academic Year</FormLabel>
                      <Select key={`year-select-${field.value}`} value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl shadow-xl">
                          {yearOptions.map(y => (
                            <SelectItem key={y} value={y}>{y}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rank"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Rank Text</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Rank 1" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rankOrder"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Rank Order (Sorting)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <ListOrdered className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input type="number" placeholder="1" {...field} className="h-14 bg-gray-50 border-none rounded-xl pl-11 pr-6 font-bold" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rankIcon"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Rank Icon</FormLabel>
                      <Select key={`icon-select-${field.value}`} value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold">
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl shadow-xl">
                          {iconOptions.map(opt => (
                            <SelectItem key={opt.name} value={opt.name}>
                              <div className="flex items-center gap-2">
                                <opt.icon className="w-4 h-4" /> {opt.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-10 border-t border-gray-50 text-left">
                <h4 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Style Configuration
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField
                    control={form.control}
                    name="badgeColor"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase text-gray-400">Badge Theme</FormLabel>
                        <Select key={`badge-color-${field.value}`} value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            {colorOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2">
                                  <div className={cn("w-3 h-3 rounded-full", opt.value)} /> {opt.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="iconColor"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase text-gray-400">Icon Background</FormLabel>
                        <Select key={`icon-color-${field.value}`} value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            {colorOptions.map(opt => (
                              <SelectItem key={opt.value} value={opt.value}>
                                <div className="flex items-center gap-2">
                                  <div className={cn("w-3 h-3 rounded-full", opt.value)} /> {opt.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="marksColor"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase text-gray-400">Marks Text Color</FormLabel>
                        <Select key={`marks-color-${field.value}`} value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Color" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl">
                            {colorOptions.map(opt => (
                              <SelectItem key={opt.text} value={opt.text}>
                                <div className="flex items-center gap-2">
                                  <div className={cn("w-3 h-3 rounded-full", opt.value)} /> {opt.label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-10 border-t border-gray-50 mt-10">
                <Button type="button" variant="ghost" onClick={() => router.push("/admin/top-performers")} disabled={isSaving} className="w-full sm:w-auto">
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2 w-full sm:w-auto justify-center">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
