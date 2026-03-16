
"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  RotateCcw, 
  Trash2,
  Loader2,
  History,
  Layout,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function RecoveryBinPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const deletedPagesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'recovery-bin'), orderBy('deletedAt', 'desc'));
  }, [firestore]);

  const { data: deletedPages, loading } = useCollection(deletedPagesQuery);

  const handleRestore = async (page: any) => {
    if (!firestore) return;
    setIsProcessing(page.id);
    try {
      const { deletedAt, ...pageData } = page;
      // Move back to pages collection
      await setDoc(doc(firestore, "pages", page.id), pageData);
      // Remove from recovery bin
      await deleteDoc(doc(firestore, "recovery-bin", page.id));
      
      toast({ title: "Page Restored", description: `${page.title} configuration has been recovered.` });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Restore Failed", description: error.message });
    } finally {
      setIsProcessing(null);
    }
  };

  const handlePermanentDelete = async (pageId: string) => {
    if (!firestore) return;
    if (!confirm("This action is permanent and cannot be undone. Delete forever?")) return;

    setIsProcessing(pageId);
    try {
      await deleteDoc(doc(firestore, "recovery-bin", pageId));
      toast({ title: "Record Erased", description: "The archived page data has been deleted permanently." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Delete Failed", description: error.message });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-left">
          <Link href="/admin/pages" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-blue-600 mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Pages
          </Link>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Recovery Bin</h2>
          <p className="text-xs md:text-sm text-gray-500 font-medium mt-1">Restore your previously customized page content</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          <p className="font-bold">Syncing recovery data...</p>
        </div>
      ) : !deletedPages || deletedPages.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-[32px] shadow-sm border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <History className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Your bin is empty</h3>
          <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xs mx-auto">Archived page configurations will appear here for restoration.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deletedPages.map((page: any) => (
            <Card key={page.id} className="group border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] rounded-[24px] overflow-hidden bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-400">
                    <Layout className="w-6 h-6 md:w-7 md:h-7" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-lg md:text-xl tracking-tight line-clamp-1">{page.title}</h3>
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 mt-0.5">
                      Deleted {page.deletedAt?.toDate ? new Date(page.deletedAt.toDate()).toLocaleDateString() : 'Recently'}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-auto">
                  <Button 
                    onClick={() => handleRestore(page)} 
                    disabled={isProcessing === page.id}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl border-none transition-all active:scale-95"
                  >
                    {isProcessing === page.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4 mr-2" />}
                    Restore Page
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handlePermanentDelete(page.id)}
                    disabled={isProcessing === page.id}
                    className="h-12 w-12 rounded-xl text-gray-300 hover:text-red-500 hover:bg-red-50 border-none transition-all shrink-0"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
