
"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CalendarClock, 
  Save, 
  Loader2,
  BookOpen,
  UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import Link from "next/link";

const formSchema = z.object({
  board: z.string().min(1, "Please select a board"),
  grade: z.string().min(1, "Please select a class"),
  day: z.string().min(1, "Please select a day"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Teacher name is required"),
});

const timeSlots = [
  "9:00 AM - 10:30 AM",
  "11:00 AM - 12:30 PM",
  "2:00 PM - 3:30 PM",
  "4:00 PM - 5:30 PM"
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function EditTimetableEntryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id: entryId } = use(params);
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, setIsSaving] = useState(false);

  const docRef = useMemo(() => {
    if (!firestore || !entryId) return null;
    return doc(firestore, "timetables", entryId);
  }, [firestore, entryId]);

  const { data: entry, loading } = useDoc(docRef);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      board: "",
      grade: "",
      day: "",
      timeSlot: "",
      subject: "",
      teacher: "",
    },
  });

  useEffect(() => {
    if (entry && !isSaving) {
      form.reset({
        board: entry.board || "",
        grade: entry.grade || "",
        day: entry.day || "",
        timeSlot: entry.timeSlot || "",
        subject: entry.subject || "",
        teacher: entry.teacher || "",
      });
    }
  }, [entry, form, isSaving]);

  const onUpdate = async (values: z.infer<typeof formSchema>) => {
    if (!firestore || !entryId) return;
    setIsSaving(true);

    const ref = doc(firestore, "timetables", entryId);
    updateDoc(ref, {
      ...values,
      updatedAt: serverTimestamp(),
    })
      .then(() => {
        toast({ title: "Entry Updated", description: "Schedule has been saved." });
        router.push("/admin/timetable");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description: error.message || "An error occurred.",
        });
        setIsSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Schedule Details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/timetable" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Timetable
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onUpdate)} className="space-y-8 text-left">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-10 -mt-12 relative">
              <div className="w-20 h-20 rounded-3xl border-4 border-white shadow-lg bg-white flex items-center justify-center text-blue-600 mb-8">
                <CalendarClock className="w-10 h-10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="board"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Education Board</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select board" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cbse">CBSE</SelectItem>
                          <SelectItem value="samacheer">Samacheer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Class / Grade</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(c => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="day"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Day of Week</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {days.map(d => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeSlot"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map(t => (
                            <SelectItem key={t} value={t}>{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Subject Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input placeholder="e.g. Mathematics" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-12 focus-visible:ring-blue-600 font-medium" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Teacher Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input placeholder="e.g. Mr. Rajesh Kumar" {...field} className="h-14 bg-gray-50 border-none rounded-xl px-12 focus-visible:ring-blue-600 font-medium" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4 pt-10 border-t border-gray-50 mt-10">
                <Button type="button" variant="ghost" onClick={() => router.push("/admin/timetable")} disabled={isSaving}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2">
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Update Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
