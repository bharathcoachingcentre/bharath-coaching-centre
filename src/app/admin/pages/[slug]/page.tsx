"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  Globe,
  Plus,
  Trash2,
  Sparkles,
  Type,
  Layout,
  Star,
  Users,
  TrendingUp,
  Award,
  Presentation,
  FilePenLine,
  MessagesSquare,
  BookOpen,
  UserCheck,
  Zap,
  GraduationCap,
  MousePointer2,
  Search,
  Check,
  Trophy,
  Target,
  Lightbulb,
  Brain,
  Calendar,
  Clock,
  Info,
  Handshake,
  Layers,
  Upload,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useDoc } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import placeholderImages from "@/app/lib/placeholder-images.json";

const defaultPageData: Record<string, any> = {
  home: {
    heroTitleMain: "Empowering Students from ",
    heroTitleHighlight: "Class 1 to 12",
    heroSubtitle: "Interactive coaching for CBSE and Samacheer with personalized mentorship.",
    heroPrimaryBtnText: "Book Free Consultation",
    heroPrimaryBtnLink: "#",
    heroOutlineBtnText: "View Timetable",
    heroOutlineBtnLink: "#timetable-section",
    heroCard1Label: "Board",
    heroCard1Value: "CBSE",
    heroCard2Label: "Board",
    heroCard2Value: "Samacheer",
    heroCard3Online: "Online",
    heroCard3Offline: "Offline",
    stats: [
      { label: "Students", value: "5000+", icon: "Users" },
      { label: "Success Rate", value: "95%", icon: "TrendingUp" },
      { label: "Years Experience", value: "10+", icon: "Award" }
    ],
    featuresTitle: "How We Help Students Excel",
    featuresSubtitle: "Comprehensive learning solutions designed to ensure academic success",
    features: [
      { icon: "Presentation", title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-500 shadow-blue-500/30" },
      { icon: "FilePenLine", title: "Unit-wise Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-50 shadow-teal-500/30" },
      { icon: "MessagesSquare", title: "Instant Doubt Solving", desc: "Get your questions answered immediately by dedicated mentors", color: "bg-purple-500 shadow-purple-500/30" },
      { icon: "BookOpen", title: "Printed Study Materials", desc: "High-quality printed notes and reference materials delivered to you", color: "bg-orange-500 shadow-orange-500/30" },
      { icon: "UserCheck", title: "Mentor Support", desc: "One-on-one guidance tailored to your learning pace and goals", color: "bg-pink-500 shadow-pink-500/30" },
    ],
    programsTitle: "Explore Our Academic Programs",
    programsSubtitle: "Choose the perfect learning path for your child's academic journey",
    programs: [
      {
        title: "Classes 1–5",
        subtitle: "Foundation Program",
        icon: "Zap",
        popular: false,
        viewTimetableBtnText: "View Timetable",
        enrollNowBtnText: "Enroll Now",
        points: ["Building strong fundamentals", "Interactive learning with activities", "Focus on reading & arithmetic", "Regular parent communication", "Personalized attention & care"],
      },
      {
        title: "Classes 6–8",
        subtitle: "Middle School Program",
        icon: "BookOpen",
        popular: false,
        viewTimetableBtnText: "View Timetable",
        enrollNowBtnText: "Enroll Now",
        points: ["Comprehensive subject coverage", "Concept-based learning approach", "Regular tests & assessments", "Project-based activities", "Competitive exam foundation"],
      },
      {
        title: "Classes 9–12",
        subtitle: "Senior Secondary Program",
        icon: "GraduationCap",
        popular: true,
        viewTimetableBtnText: "View Timetable",
        enrollNowBtnText: "Enroll Now",
        points: ["Board exam focused curriculum", "JEE & NEET preparation integrated", "Advanced problem-solving techniques", "Weekly mock tests & analysis", "Career counseling & guidance"],
      },
    ],
    timetableTitle: "Offline Class Timetable",
    timetableSubtitle: "View our structured class schedules for offline sessions",
    timetableIcon: "Info",
    timetableNotes: [
      "Sunday is a holiday for all classes",
      "Each session includes a 15-minute break",
      "Extra classes are conducted before exams",
      "Timetable may vary based on class requirements"
    ],
    mentorshipTitleMain: "One-to-One ",
    mentorshipTitleHighlight: "Mentorship",
    mentorshipSubtitle: "Personalized attention to help every student reach their full potential.",
    mentorshipImageUrl: placeholderImages["one-to-one-mentorship"].src,
    mentorshipFeatures: [
      { icon: "UserCheck", title: "Individual Attention", desc: "Dedicated mentoring to focus on student's personal learning pace and understanding." },
      { icon: "Layers", title: "Customized Study Plan", desc: "Targeted learning strategies based on individual strengths and weaknesses." },
      { icon: "TrendingUp", title: "Weekly Academic Tracking", desc: "Regular monitoring of progress with detailed performance analysis." },
      { icon: "Handshake", title: "Parent Performance Updates", desc: "Constant communication with parents to keep them informed about their child's progress." },
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

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Basic size check (1MB limit for Firestore document string safety)
      if (file.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File Too Large",
          description: "Please upload an image smaller than 1MB.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateField('mentorshipImageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
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

      <div className="space-y-8">
        {/* Top Row: Page Info & Icon Library */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Page Info Card */}
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
            <div className="h-20 bg-gradient-to-r from-blue-600 to-teal-500"></div>
            <CardContent className="p-8 -mt-10 relative">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center text-blue-600 shrink-0">
                  <Globe className="w-10 h-10" />
                </div>
                <div className="pt-10 flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight capitalize">
                    {slug} Page
                  </h2>
                  <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest w-fit">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Website
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex flex-col gap-1">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Last Updated</p>
                <p className="text-sm font-bold text-gray-700">
                  {pageData?.updatedAt?.toDate ? new Date(pageData.updatedAt.toDate()).toLocaleString() : 'Never'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Icon Selection Helper */}
          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-[#182d45] text-white">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" /> Icon Library
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6 text-left">
              <p className="text-[10px] text-blue-200/60 font-black uppercase tracking-widest">Lucide Icon Reference</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {[
                  { n: "Presentation", i: Presentation },
                  { n: "FilePenLine", i: FilePenLine },
                  { n: "MessagesSquare", i: MessagesSquare },
                  { n: "BookOpen", i: BookOpen },
                  { n: "UserCheck", i: UserCheck },
                  { n: "Zap", i: Zap },
                  { n: "GraduationCap", i: GraduationCap },
                  { n: "Trophy", i: Trophy },
                  { n: "Target", i: Target },
                  { n: "Lightbulb", i: Lightbulb },
                  { n: "Brain", i: Brain },
                  { n: "Users", i: Users },
                  { n: "TrendingUp", i: TrendingUp },
                  { n: "Award", i: Award },
                  { n: "Search", i: Search },
                  { n: "Info", i: Info },
                  { n: "Handshake", i: Handshake },
                  { n: "Layers", i: Layers },
                ].map((item) => (
                  <div key={item.n} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                    <item.i className="w-5 h-5 text-teal-400" />
                    <span className="text-[8px] font-black uppercase tracking-tighter text-blue-200/60 text-center">{item.n}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Editor Row: All Fields Full Width */}
        <div className="space-y-8">
          {/* Home Page Specific Sections */}
          {slug === 'home' && (
            <div className="space-y-8">
              {/* Banner Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Banner Text</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-6 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Main Headline</Label>
                      <Input 
                        value={formData.heroTitleMain || ""} 
                        onChange={(e) => updateField('heroTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                        placeholder="Empowering Students from "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Highlighted Gradient Text</Label>
                      <Input 
                        value={formData.heroTitleHighlight || ""} 
                        onChange={(e) => updateField('heroTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600 focus-visible:ring-blue-600"
                        placeholder="Class 1 to 12"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Hero Subtitle</Label>
                    <Textarea 
                      value={formData.heroSubtitle || ""} 
                      onChange={(e) => updateField('heroSubtitle', e.target.value)}
                      className="min-h-[100px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none focus-visible:ring-blue-600"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Banner Buttons & Floating Cards */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <MousePointer2 className="w-6 h-6 text-blue-600" /> Banner Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Action Buttons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-xs font-bold text-blue-600 uppercase">Primary Button (Gradient)</Label>
                        <Input 
                          value={formData.heroPrimaryBtnText || ""} 
                          onChange={(e) => updateField('heroPrimaryBtnText', e.target.value)}
                          className="h-12 bg-white border-none rounded-xl px-4 mt-2"
                          placeholder="Button Text"
                        />
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Outline Button (White)</Label>
                        <Input 
                          value={formData.heroOutlineBtnText || ""} 
                          onChange={(e) => updateField('heroOutlineBtnText', e.target.value)}
                          className="h-12 bg-white border-none rounded-xl px-4 mt-2"
                          placeholder="Button Text"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Hero Stats Counters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(formData.stats || defaultPageData.home.stats)?.map((stat: any, idx: number) => (
                        <div key={idx} className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Value (e.g. 5000+)</Label>
                            <Input 
                              value={stat.value || ""} 
                              onChange={(e) => {
                                const newStats = [...(formData.stats || defaultPageData.home.stats)];
                                newStats[idx].value = e.target.value;
                                updateField('stats', newStats);
                              }}
                              className="h-10 bg-white"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Label</Label>
                            <Input 
                              value={stat.label || ""} 
                              onChange={(e) => {
                                const newStats = [...(formData.stats || defaultPageData.home.stats)];
                                newStats[idx].label = e.target.value;
                                updateField('stats', newStats);
                              }}
                              className="h-10 bg-white"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Floating UI Cards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 1 (CBSE)</Label>
                        <Input value={formData.heroCard1Value || ""} onChange={(e) => updateField('heroCard1Value', e.target.value)} className="h-10 bg-white" placeholder="CBSE" />
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 2 (Samacheer)</Label>
                        <Input value={formData.heroCard2Value || ""} onChange={(e) => updateField('heroCard2Value', e.target.value)} className="h-10 bg-white" placeholder="Samacheer" />
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 3 (Modes)</Label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input value={formData.heroCard3Online || ""} onChange={(e) => updateField('heroCard3Online', e.target.value)} className="h-10 bg-white" placeholder="Online" />
                          <Input value={formData.heroCard3Offline || ""} onChange={(e) => updateField('heroCard3Offline', e.target.value)} className="h-10 bg-white" placeholder="Offline" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Features Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" /> How We Help Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title</Label>
                      <Input 
                        value={formData.featuresTitle || ""} 
                        onChange={(e) => updateField('featuresTitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="How We Help Students Excel"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                      <Input 
                        value={formData.featuresSubtitle || ""} 
                        onChange={(e) => updateField('featuresSubtitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                        placeholder="Comprehensive learning solutions"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Feature Cards</Label>
                    <div className="space-y-4">
                      {(formData.features || defaultPageData.home.features)?.map((feature: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm mb-2", feature.color || "bg-blue-500")}>
                                <Type className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Title</Label>
                                <Input 
                                  value={feature.title || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.features || defaultPageData.home.features)];
                                    newFeatures[idx].title = e.target.value;
                                    updateField('features', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Icon Name (Lucide)</Label>
                                <Input 
                                  value={feature.icon || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.features || defaultPageData.home.features)];
                                    newFeatures[idx].icon = e.target.value;
                                    updateField('features', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                  placeholder="Presentation, BookOpen, etc."
                                />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Description</Label>
                                <Input 
                                  value={feature.desc || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.features || defaultPageData.home.features)];
                                    newFeatures[idx].desc = e.target.value;
                                    updateField('features', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                />
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const currentFeatures = formData.features || defaultPageData.home.features;
                              const newFeatures = currentFeatures.filter((_: any, i: number) => i !== idx);
                              updateField('features', newFeatures);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Academic Programs Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-teal-500" /> Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title</Label>
                      <Input 
                        value={formData.programsTitle || ""} 
                        onChange={(e) => updateField('programsTitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Explore Our Academic Programs"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                      <Input 
                        value={formData.programsSubtitle || ""} 
                        onChange={(e) => updateField('programsSubtitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                        placeholder="Choose the perfect learning path"
                      />
                    </div>
                  </div>

                  <div className="space-y-8">
                    {(formData.programs || defaultPageData.home.programs)?.map((program: any, idx: number) => (
                      <div key={idx} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Program Title</Label>
                            <Input 
                              value={program.title || ""} 
                              onChange={(e) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].title = e.target.value;
                                updateField('programs', newPrograms);
                              }}
                              className="h-12 bg-white"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Subtitle</Label>
                            <Input 
                              value={program.subtitle || ""} 
                              onChange={(e) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].subtitle = e.target.value;
                                updateField('programs', newPrograms);
                              }}
                              className="h-12 bg-white"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Icon Name</Label>
                            <Input 
                              value={program.icon || ""} 
                              onChange={(e) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].icon = e.target.value;
                                updateField('programs', newPrograms);
                              }}
                              className="h-12 bg-white"
                              placeholder="Zap, BookOpen, GraduationCap"
                            />
                          </div>
                          <div className="flex items-center gap-4 h-full pt-6">
                            <Switch 
                              checked={program.popular} 
                              onCheckedChange={(checked) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].popular = checked;
                                updateField('programs', newPrograms);
                              }}
                              className="data-[state=checked]:bg-teal-500"
                            />
                            <Label className="text-xs font-bold text-gray-600 uppercase">Featured / Popular</Label>
                          </div>
                          
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">View Timetable Button Text</Label>
                            <Input 
                              value={program.viewTimetableBtnText || ""} 
                              onChange={(e) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].viewTimetableBtnText = e.target.value;
                                updateField('programs', newPrograms);
                              }}
                              className="h-12 bg-white"
                              placeholder="View Timetable"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Enroll Now Button Text</Label>
                            <Input 
                              value={program.enrollNowBtnText || ""} 
                              onChange={(e) => {
                                const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                                newPrograms[idx].enrollNowBtnText = e.target.value;
                                updateField('programs', newPrograms);
                              }}
                              className="h-12 bg-white"
                              placeholder="Enroll Now"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-xs font-black uppercase text-gray-400">Curriculum Highlights (One per line)</Label>
                          <Textarea 
                            value={program.points?.join('\n') || ""} 
                            onChange={(e) => {
                              const newPrograms = [...(formData.programs || defaultPageData.home.programs)];
                              newPrograms[idx].points = e.target.value.split('\n').filter(p => p.trim() !== '');
                              updateField('programs', newPrograms);
                            }}
                            className="min-h-[120px] bg-white border-gray-200 rounded-xl p-4 font-medium text-gray-700 resize-none"
                            placeholder="Building strong fundamentals..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timetable Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" /> Offline Timetable Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title</Label>
                      <Input 
                        value={formData.timetableTitle || ""} 
                        onChange={(e) => updateField('timetableTitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Offline Class Timetable"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                      <Input 
                        value={formData.timetableSubtitle || ""} 
                        onChange={(e) => updateField('timetableSubtitle', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                        placeholder="View our structured class schedules"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Notes Icon (Lucide)</Label>
                    <Input 
                      value={formData.timetableIcon || ""} 
                      onChange={(e) => updateField('timetableIcon', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Info, Zap, Star, etc."
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Important Notes (One per line)</Label>
                    <Textarea 
                      value={formData.timetableNotes?.join('\n') || ""} 
                      onChange={(e) => updateField('timetableNotes', e.target.value.split('\n').filter(p => p.trim() !== ''))}
                      className="min-h-[120px] bg-gray-50 border-none rounded-xl p-4 font-medium text-gray-700 resize-none"
                      placeholder="Sunday is a holiday..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* One-to-One Mentorship Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <UserCheck className="w-6 h-6 text-blue-600" /> One-to-One Mentorship
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.mentorshipTitleMain || ""} 
                        onChange={(e) => updateField('mentorshipTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="One-to-One "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.mentorshipTitleHighlight || ""} 
                        onChange={(e) => updateField('mentorshipTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Mentorship"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Textarea 
                      value={formData.mentorshipSubtitle || ""} 
                      onChange={(e) => updateField('mentorshipSubtitle', e.target.value)}
                      className="min-h-[80px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>

                  {/* Mentorship Image Editor */}
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" /> Mentorship Section Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Image</Label>
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all flex items-center gap-2"
                            onClick={() => document.getElementById('image-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Choose Image
                          </Button>
                          <input 
                            id="image-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                          {formData.mentorshipImageUrl && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-12 rounded-xl"
                              onClick={() => updateField('mentorshipImageUrl', "")}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </Button>
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 italic">Select a photo from your computer for the mentorship section.</p>
                      </div>
                      {(formData.mentorshipImageUrl || placeholderImages["one-to-one-mentorship"].src) && (
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-gray-400">Preview</Label>
                          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                            <Image 
                              src={formData.mentorshipImageUrl || placeholderImages["one-to-one-mentorship"].src} 
                              alt="Mentorship Preview" 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Mentorship Features</Label>
                    <div className="space-y-4">
                      {(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures)?.map((feature: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Title</Label>
                                <Input 
                                  value={feature.title || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures)];
                                    newFeatures[idx].title = e.target.value;
                                    updateField('mentorshipFeatures', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Icon Name (Lucide)</Label>
                                <Input 
                                  value={feature.icon || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures)];
                                    newFeatures[idx].icon = e.target.value;
                                    updateField('mentorshipFeatures', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                  placeholder="UserCheck, Layers, Handshake, etc."
                                />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Description</Label>
                                <Input 
                                  value={feature.desc || ""} 
                                  onChange={(e) => {
                                    const newFeatures = [...(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures)];
                                    newFeatures[idx].desc = e.target.value;
                                    updateField('mentorshipFeatures', newFeatures);
                                  }}
                                  className="h-10 bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* About Page Sections */}
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
                      value={formData.heroTitle || ""} 
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
                      value={formData.philosophyTitle || ""} 
                      onChange={(e) => updateField('philosophyTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label className="text-xs font-black uppercase text-gray-400 block text-left">Philosophy Items</Label>
                    {formData.philosophyItems?.map((item: any, idx: number) => (
                      <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group">
                        <Textarea 
                          value={item.text || ""} 
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
                          <Trash2 className="w-4 h-4" />
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

          {/* Generic Editor Fallback */}
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
