
"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { 
  ArrowLeft, 
  Trophy, 
  Save, 
  Loader2, 
  Upload,
  Trash2,
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
import { useRouter } from "next/navigation";
import { useFirestore, useDoc, useCollection } from "@/firebase";
import { doc, updateDoc, serverTimestamp, query, collection, orderBy } from "firebase/firestore";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  grade: z.string().min(1, "Class / Board is required"),
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

  useEffect(() => {
    if (performer && !isSaving) {
      const existingData = performer;
      console.log("Loading Performer into form:", existingData);
      form.reset({
        name: existingData.name || "",
        grade: existingData.grade || "",
        marks: existingData.marks || "",
        rank: existingData.rank || "",
        rankOrder: existingData.rankOrder || 1,
        year: existingData.year ? String(existingData.year) : "",
        imageUrl: existingData.imageUrl || "",
        badgeColor: existingData.badgeColor || "bg-blue-600",
        iconColor: existingData.iconColor || "bg-blue-600",
        marksColor: existingData.marksColor || "text-blue-600",
        rankIcon: existingData.rankIcon || "Star",
      });
    }
  }, [performer, form, isSaving]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        toast({ variant: "destructive", title: "File Too Large", description: "Please upload an image smaller than 500KB." });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("imageUrl", reader.result as string, { shouldDirty: true });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if (!firestore || !performerId || !performer) return;
    setIsSaving(true);

    const existingData = performer;
    const cleanData = {
      name: formData.name,
      grade: formData.grade,
      marks: formData.marks,
      rank: formData.rank,
      rankOrder: formData.rankOrder,
      year: formData.year || existingData.year || "",
      imageUrl: formData.imageUrl || existingData.imageUrl || "",
      badgeColor: formData.badgeColor || existingData.badgeColor || "bg-blue-600",
      iconColor: formData.iconColor || existingData.iconColor || "bg-blue-600",
      marksColor: formData.marksColor || existingData.marksColor || "text-blue-600",
      rankIcon: formData.rankIcon || existingData.rankIcon || "Star",
      updatedAt: serverTimestamp(),
    };

    console.log("Existing Data:", existingData);
    console.log("Form Data:", formData);
    console.log("Clean Data to Save:", cleanData);

    try {
      const ref = doc(firestore, "top-performers", performerId);
      await updateDoc(ref, cleanData);
      toast({ title: "Performer Updated", description: "Record has been saved successfully." });
      router.push("/admin/top-performers");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Update Failed", description: error.message });
      setIsSaving(false);
    }
  };

  if (performerLoading || yearsLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Performer Data...</p>
      </div>
    );
  }

  if (!performer) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Performer Not Found</h2>
        <Button asChild variant="outline">
          <Link href="/admin/top-performers">Back to List</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Button variant="ghost" onClick={() => router.push("/admin/top-performers")} className="text-gray-500 font-bold hover:text-blue-600">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to List
      </Button>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left pb-12">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <CardHeader className="p-10 pb-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Trophy className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Edit Performer Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-10 pt-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-4">
                  <Label className="text-xs font-black uppercase text-gray-400">Student Photo</Label>
                  <div className="flex items-center gap-8">
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
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-bold text-gray-700">Change portrait</p>
                      <p className="text-xs text-gray-400">Maximum size: 500KB.</p>
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
                      <FormLabel className="text-xs font-black uppercase text-gray-400">Class / Board</FormLabel>
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
                      <Select 
                        onValueChange={(val) => form.setValue("year", val)} 
                        value={form.watch("year")}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                          {yearsList?.map(y => (
                            <SelectItem key={y.id} value={y.year}>{y.year}</SelectItem>
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
                      <p className="text-[10px] text-gray-400 font-medium text-left">1 = First, 2 = Second, etc.</p>
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
                      <Select 
                        onValueChange={(val) => form.setValue("rankIcon", val)} 
                        value={form.watch("rankIcon")}
                      >
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold">
                            <SelectValue placeholder="Select icon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-xl">
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

              <div className="pt-10 border-t border-gray-50">
                <h4 className="text-sm font-black text-gray-900 mb-8 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" /> Visual Branding
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField
                    control={form.control}
                    name="badgeColor"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-xs font-black uppercase text-gray-400">Badge Theme (Rank)</FormLabel>
                        <Select 
                          onValueChange={(val) => form.setValue("badgeColor", val)} 
                          value={form.watch("badgeColor")}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Select color" />
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
                        <Select 
                          onValueChange={(val) => form.setValue("iconColor", val)} 
                          value={form.watch("iconColor")}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Select color" />
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
                        <FormLabel className="text-xs font-black uppercase text-gray-400">Score Text Color</FormLabel>
                        <Select 
                          onValueChange={(val) => form.setValue("marksColor", val)} 
                          value={form.watch("marksColor")}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl px-4 font-bold">
                              <SelectValue placeholder="Select color" />
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

              <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50 mt-10">
                <Button type="button" variant="ghost" onClick={() => router.push("/admin/top-performers")} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2">
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
