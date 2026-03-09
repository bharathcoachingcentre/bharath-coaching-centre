
"use client";

import React, { useMemo, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Layout,
  Globe,
  Plus,
  Trash2,
  Undo2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";

const defaultPageData: Record<string, any> = {
  home: {
    heroTitle: "Empowering Students from Class 1 to 12",
    heroSubtitle: "Interactive coaching for CBSE and Samacheer with personalized mentorship.",
    stats: [
      { label: "Students", value: "5000+", icon: "Users" },
      { label: "Success Rate", value: "95%", icon: "TrendingUp" },
      { label: "Years Experience", value: "10+", icon: "Award" }
    ]
  },
  about: {
    heroTitle: "About Us",
    philosophyTitle: "What Makes Us Different",
    philosophyItems: [
      { text: "Everyone is an achiever.", icon: "Target" },
      { text: "Every student needs a unique method to deliver the concept.", icon: "Lightbulb" },
      { text: "BEC works in many unique ways to deliver concepts effectively.", icon: "Brain" },
      { text: "Our motto \"Everyone is an achiever\" stands as our ultimate goal.", icon: "Trophy" }
    ]
  }
};

export default function PageEditor() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  const slug = params?.slug as string;
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const docRef = useMemo(() => {
    if (!firestore || !slug) return null;
    return doc(firestore, "pages", slug);
  }, [firestore, slug]);

  const { data: pageData, loading } = useDoc(docRef);

  useEffect(() => {
    if (pageData) {
      setFormData(pageData.content);
    } else if (!loading && !formData) {
      setFormData(defaultPageData[slug] || {});
    }
  }, [pageData, loading, slug]);

  const handleSave = async () => {
    if (!firestore || !slug) return;
    setIsSaving(true);

    const submissionData = {
      title: slug.charAt(0).toUpperCase() + slug.slice(1),
      content: formData,
      updatedAt: serverTimestamp(),
    };

    try {
      await setDoc(doc(firestore, "pages", slug), submissionData, { merge: true });
      toast({
        title: "Page Updated",
        description: "Your changes have been published to the website.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error.message || "Could not update page content.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  if (loading || !formData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Page Editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/admin/pages")} className="text-gray-500 font-bold hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pages
        </Button>
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95 gap-2"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Publish Changes
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Page Info Sidebar */}
        <div className="lg:col-span-1 space-y-8 text-left">
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <div className="h-24 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-8 -mt-12 relative text-center">
              <div className="w-24 h-24 rounded-3xl border-4 border-white shadow-lg mx-auto overflow-hidden bg-white flex items-center justify-center text-blue-600">
                <Globe className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mt-4 leading-tight capitalize">
                {slug} Page
              </h2>
              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Website
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-50 text-left">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Last Updated</p>
                <p className="text-sm font-bold text-gray-700">
                  {pageData?.updatedAt?.toDate ? new Date(pageData.updatedAt.toDate()).toLocaleString() : 'Never'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Editor Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Home Page Specific Fields */}
          {slug === 'home' && (
            <div className="space-y-8">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-6 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Headline Title</Label>
                    <Input 
                      value={formData.heroTitle} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Hero Subtitle</Label>
                    <Textarea 
                      value={formData.heroSubtitle} 
                      onChange={(e) => updateField('heroSubtitle', e.target.value)}
                      className="min-h-[100px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none focus-visible:ring-blue-600"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-6">
                  {formData.stats?.map((stat: any, idx: number) => (
                    <div key={idx} className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded-[20px] relative">
                      <div className="space-y-2 text-left">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Label</Label>
                        <Input 
                          value={stat.label} 
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[idx].label = e.target.value;
                            updateField('stats', newStats);
                          }}
                          className="h-10 bg-white border-gray-200 rounded-lg font-bold"
                        />
                      </div>
                      <div className="space-y-2 text-left">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Value</Label>
                        <Input 
                          value={stat.value} 
                          onChange={(e) => {
                            const newStats = [...formData.stats];
                            newStats[idx].value = e.target.value;
                            updateField('stats', newStats);
                          }}
                          className="h-10 bg-white border-gray-200 rounded-lg font-bold"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}

          {/* About Page Specific Fields */}
          {slug === 'about' && (
            <div className="space-y-8">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Page Headline</Label>
                    <Input 
                      value={formData.heroTitle} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Our Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-6">
                  <div className="space-y-3 text-left mb-8">
                    <Label className="text-sm font-bold text-gray-700">Section Title</Label>
                    <Input 
                      value={formData.philosophyTitle} 
                      onChange={(e) => updateField('philosophyTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase text-gray-400 block text-left">Philosophy Items</Label>
                    {formData.philosophyItems?.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                        <Textarea 
                          value={item.text} 
                          onChange={(e) => {
                            const newItems = [...formData.philosophyItems];
                            newItems[idx].text = e.target.value;
                            updateField('philosophyItems', newItems);
                          }}
                          className="min-h-[60px] bg-white border-gray-200 rounded-xl p-4 font-medium text-gray-700 resize-none"
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-300 hover:text-red-500 flex-shrink-0"
                          onClick={() => {
                            const newItems = formData.philosophyItems.filter((_: any, i: number) => i !== idx);
                            updateField('philosophyItems', newItems);
                          }}
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        const newItems = [...(formData.philosophyItems || []), { text: "", icon: "Target" }];
                        updateField('philosophyItems', newItems);
                      }}
                      className="w-full h-12 border-dashed border-gray-200 rounded-xl text-gray-400 font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* General Fields for Other Pages */}
          {slug !== 'home' && slug !== 'about' && (
            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="p-10 pb-0">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Generic Content Editor</CardTitle>
              </CardHeader>
              <CardContent className="p-10 pt-6 text-center py-20">
                <Layout className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 font-bold">Standard content fields for this page are coming soon.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
