
'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Download, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
});

interface DownloadLeadDialogProps {
  materialTitle: string;
  pdfUrl: string;
  trigger: React.ReactNode;
  onDownload?: () => void;
  className?: string;
}

export function DownloadLeadDialog({ materialTitle, pdfUrl, trigger, onDownload, className }: DownloadLeadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    if (firestore) {
      const leadData = {
        ...values,
        materialTitle,
        timestamp: serverTimestamp(),
      };
      const leadsRef = collection(firestore, 'material-leads');

      // NO await here. Chain the .catch() block to follow the standard architecture.
      addDoc(leadsRef, leadData)
        .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
            path: leadsRef.path,
            operation: 'create',
            requestResourceData: leadData,
          } satisfies SecurityRuleContext);

          // Emit the error to show contextual debug info in the dev overlay
          errorEmitter.emit('permission-error', permissionError);
        });
    }

    // Trigger actual file download for immediate user satisfaction
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.setAttribute('download', materialTitle);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (onDownload) onDownload();

    toast({
      title: "Download Started",
      description: `Your resource "${materialTitle}" is downloading.`,
    });
    setIsOpen(false);
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-[2.5rem] border-none shadow-2xl p-8 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-teal-500" />
        <DialogHeader className="text-left space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Download className="w-7 h-7" />
          </div>
          <DialogTitle className="text-2xl font-black text-[#182d45] tracking-tight">Access Resource</DialogTitle>
          <DialogDescription className="text-gray-500 font-medium text-sm leading-relaxed">
            Please provide your contact information to download <strong>{materialTitle}</strong>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="text-left space-y-1.5">
                  <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-400">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl font-bold" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="text-left space-y-1.5">
                  <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-400">Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@example.com" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl font-bold" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="text-left space-y-1.5">
                  <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-400">WhatsApp / Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 XXXXX XXXXX" {...field} className="h-12 bg-gray-50 border-gray-100 rounded-xl font-bold" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-blue-500/20 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 border-none mt-4"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>Submit & Download</span>
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
