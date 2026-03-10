
"use client";

import React, { useState, useMemo } from "react";
import { 
  ArrowLeft, 
  CalendarClock, 
  Save, 
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useFirestore, useCollection } from "@/firebase";
import { collection, addDoc, serverTimestamp, query, where, orderBy } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const formSchema = z.object({
  board: z.string().min(1, "Please select a board"),
  grade: z.string().min(1, "Please select a class"),
  day: z.string().min(1, "Please select a day"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  subject: z.string().min(1, "Subject is required"),
  teacher: z.string().min(1, "Please select a teacher"),
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function AddTimetableEntryPage() {
  const { toast } = useToast();
  const router = useRouter();
  const firestore = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch Master Data
  const subjectsQuery = useMemo(() => firestore ? query(collection(firestore, 'subjects'), orderBy('name', 'asc')) : null, [firestore]);
  const periodsQuery = useMemo(() => firestore ? query(collection(firestore, 'periods'), orderBy('order', 'asc')) : null, [firestore]);
  const teachersQuery = useMemo(() => firestore ? query(collection(firestore, 'users'), where('role', '==', 'teacher')) : null, [firestore]);
  const classesQuery = useMemo(() => firestore ? query(collection(firestore, 'classes'), orderBy('name', 'asc')) : null, [firestore]);

  const { data: subjects } = useCollection(subjectsQuery);
  const { data: periods } = useCollection(periodsQuery);
  const { data: teachers } = useCollection(teachersQuery);
  const { data: allClasses } = useCollection(classesQuery);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      board: "cbse",
      grade: "",
      day: "Monday",
      timeSlot: "",
      subject: "",
      teacher: "",
    },
  });

  const selectedBoard = form.watch("board");
  const filteredClasses = useMemo(() => {
    if (!allClasses || !selectedBoard) return [];
    return allClasses.filter(c => c.board?.toLowerCase() === selectedBoard.toLowerCase());
  }, [allClasses, selectedBoard]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!firestore) return;
    setIsSubmitting(true);

    const collectionRef = collection(firestore, 'timetables');
    const submissionData = {
      ...values,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    addDoc(collectionRef, submissionData)
      .then(() => {
        toast({
          title: "Schedule Added",
          description: "Class timing has been added to the database.",
        });
        router.push("/admin/timetable");
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: 'timetables',
          operation: 'create',
          requestResourceData: submissionData,
        } satisfies SecurityRuleContext);
        
        errorEmitter.emit('permission-error', permissionError);
        
        toast({
          variant: "destructive",
          title: "Save Failed",
          description: error.message || "An error occurred while creating the schedule.",
        });
        setIsSubmitting(false);
      });
  };

  const isMasterDataLoading = !subjects || !periods || !teachers || !allClasses;

  if (isMasterDataLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Configuration Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/timetable" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Timetable
      </Link>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
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
                      <Select onValueChange={(val) => {
                        field.onChange(val);
                        form.setValue("grade", ""); 
                      }} value={field.value}>
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
                          {filteredClasses?.map(c => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                          {filteredClasses?.length === 0 && (
                            <SelectItem value="none" disabled>No classes defined for this board.</SelectItem>
                          )}
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
                      <FormLabel className="text-sm font-bold text-gray-700">Period / Time Slot</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {periods?.map(p => (
                            <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
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
                      <FormLabel className="text-sm font-bold text-gray-700">Subject</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjects?.map(s => (
                            <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-sm font-bold text-gray-700">Teacher</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 focus:ring-blue-600 font-medium">
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachers?.map(t => (
                            <SelectItem key={t.id} value={t.id}>{t.displayName}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4 pt-10 border-t border-gray-50 mt-10">
                <Button type="button" variant="ghost" onClick={() => router.push("/admin/timetable")} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-14 px-10 rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2">
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  Save Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
