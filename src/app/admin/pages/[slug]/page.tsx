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
  Book,
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
  CalendarCheck,
  Clock,
  Info,
  Handshake,
  Layers,
  Upload,
  Image as ImageIcon,
  MessageSquareQuote,
  PieChart,
  ClipboardCheck,
  HelpCircle,
  Medal,
  Crown,
  Laptop,
  Building
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const defaultPageData: Record<string, any> = {
  home: {
    heroTitleMain: "Empowering Students from ",
    heroTitleHighlight: "Class 1 to 12",
    heroSubtitle: "Interactive coaching for CBSE and Samacheer with personalized mentorship.",
    heroPrimaryBtnText: "Book Free Consultation",
    heroPrimaryBtnLink: "#",
    heroPrimaryBtnIcon: "CalendarCheck",
    heroOutlineBtnText: "View Timetable",
    heroOutlineBtnLink: "#timetable-section",
    heroOutlineBtnIcon: "Clock",
    heroCard1Label: "Board",
    heroCard1Value: "CBSE",
    heroCard1Icon: "Book",
    heroCard2Label: "Board",
    heroCard2Value: "Samacheer",
    heroCard2Icon: "GraduationCap",
    heroCard3Online: "Online",
    heroCard3OnlineIcon: "Laptop",
    heroCard3Offline: "Offline",
    heroCard3OfflineIcon: "Building",
    heroImageUrl: placeholderImages["hero-education"].src,
    stats: [
      { label: "Students", value: "5000+", icon: "Users" },
      { label: "Success Rate", value: "95%", icon: "TrendingUp" },
      { label: "Years Experience", value: "10+", icon: "Award" }
    ],
    featuresTitleMain: "How We Help Students ",
    featuresTitleHighlight: "Excel",
    featuresSubtitle: "Comprehensive learning solutions designed to ensure academic success",
    features: [
      { icon: "Presentation", title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-500 shadow-blue-500/30" },
      { icon: "FilePenLine", title: "Unit-wise Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-50 shadow-teal-500/30" },
      { icon: "MessagesSquare", title: "Instant Doubt Solving", desc: "Get your questions answered immediately by dedicated mentors", color: "bg-purple-500 shadow-purple-500/30" },
      { icon: "BookOpen", title: "Printed Study Materials", desc: "High-quality printed notes and reference materials delivered to you", color: "bg-orange-500 shadow-orange-500/30" },
      { icon: "UserCheck", title: "Mentor Support", desc: "One-on-one guidance tailored to your learning pace and goals", color: "bg-pink-500 shadow-pink-500/30" },
    ],
    materialsTitleMain: "Download Free ",
    materialsTitleHighlight: "Study Materials",
    materialsSubtitle: "Filter by class and board to find specific resources for your curriculum",
    programsTitleMain: "Explore Our Academic ",
    programsTitleHighlight: "Programs",
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
    timetableTitleMain: "Offline Class ",
    timetableTitleHighlight: "Timetable",
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
    mentorshipBtnText: "Book Personal Session",
    mentorshipFeatures: [
      { icon: "UserCheck", title: "Individual Attention", desc: "Dedicated mentoring to focus on student's personal learning pace and understanding." },
      { icon: "Layers", title: "Customized Study Plan", desc: "Targeted learning strategies based on individual strengths and weaknesses." },
      { icon: "TrendingUp", title: "Weekly Academic Tracking", desc: "Regular monitoring of progress with detailed performance analysis." },
      { icon: "Handshake", title: "Parent Performance Updates", desc: "Constant communication with parents to keep them informed about their child's progress." },
    ],
    testimonialsTitleMain: "What Students & ",
    testimonialsTitleHighlight: "Parents Say",
    testimonialsSubtitle: "Read stories from our successful students and satisfied parents.",
    testimonials: [
      { name: "Priya Sharma", role: "Class 12, CBSE", quote: "The teachers at Bharath Academy are amazing! They kept me motivated throughout the year and were always available for doubt clearing. I improved my score from 75% to 93% in just one year!", avatar: placeholderImages["student-1"].src, rating: 5 },
      { name: "Rajesh Kumar", role: "Parent, Class 10", quote: "As a parent, I am very impressed with the regular updates and personalized attention my son receives. The weekly performance reports help me stay connected with his progress. Highly recommended!", avatar: placeholderImages["student-4"].src, rating: 5 },
      { name: "Arun Reddy", role: "Class 12, Samacheer", quote: "The study materials and practice worksheets are excellent. The one-to-one mentorship helped me overcome my weaknesses in physics and chemistry. Now I'm confident about my board exams!", avatar: placeholderImages["student-6"].src, rating: 5 },
      { name: "Kavya Iyer", role: "Class 9, CBSE", quote: "I love the interactive classes! The teachers make learning fun with real-life examples. The doubt clearing sessions are super helpful and I never feel hesitant to ask questions anymore.", avatar: placeholderImages["student-3"].src, rating: 5 },
      { name: "Sunita Patel", role: "Parent, Class 8", quote: "The academy's structured approach to learning is commendable. My daughter's confidence has increased significantly. The regular tests and feedback system keep her motivated and focused.", avatar: placeholderImages["student-5"].src, rating: 5 },
      { name: "Vikram Singh", role: "Class 10, CBSE", quote: "Preparing for JEE along with board exams was made easy by Bharath Academy. The step-by-step approach and expert teachers made it look achievable. Got 95% in boards and cleared JEE!", avatar: placeholderImages["student-2"].src, rating: 5 },
    ],
    whyChooseTitleMain: "Why Choose ",
    whyChooseTitleHighlight: "Bharath Academy?",
    whyChooseSubtitle: "Comprehensive features designed for complete academic excellence",
    whyChooseFeatures: [
      { icon: "PieChart", title: "Parent Academic Tracking", desc: "Real-time updates on student's performance, attendance, and progress through our dedicated parent portal with detailed analytics.", color: "bg-blue-600 shadow-blue-600/30" },
      { icon: "UserCheck", title: "Daily Performance Monitoring", desc: "Track daily homework completion, class participation, and understanding levels with instant notifications to parents.", color: "bg-teal-50 shadow-teal-500/30" },
      { icon: "ClipboardCheck", title: "Weekly Tests & Evaluation", desc: "Regular assessments every week to measure progress and identify areas needing improvement with detailed performance reports.", color: "bg-purple-500 shadow-purple-500/30" },
      { icon: "Zap", title: "Structured Test Hierarchy", desc: "Progressive testing from unit tests to full mock exams, designed to build confidence and cover the entire syllabus systematically.", color: "bg-orange-500 shadow-orange-500/30" },
      { icon: "Users", title: "Term-wise Parent Meetings", desc: "Scheduled one-on-one meetings with teachers to discuss student progress, challenges, and customized improvement strategies.", color: "bg-pink-500 shadow-pink-500/30" },
      { icon: "BookOpen", title: "Specialized Learning Materials", desc: "Curated study materials, practice papers, and reference books specifically designed for CBSE and Samacheer curricula.", color: "bg-blue-500 shadow-blue-500/30" }
    ],
    successTitleMain: "Our Students' ",
    successTitleHighlight: "Success Stories",
    successSubtitle: "Celebrating exceptional achievements and academic excellence",
    successStats: [
      { icon: "Trophy", value: "95%", label: "Pass Rate", color: "text-blue-600" },
      { icon: "Medal", value: "120+", label: "Distinctions", color: "text-teal-600" },
      { icon: "GraduationCap", value: "5000+", label: "Students", color: "text-purple-600" },
    ],
    successTopHeader: "Top Performers",
    successYears: ["2025", "2024", "2023"],
    successTotalMarksLabel: "Total Marks",
    successCardIcon: "Star",
    successPerformers: [
      { name: "Ananya Krishnan", grade: "Class 10, CBSE", marks: "98.6%", rank: "Rank 1", rankIcon: "Crown", badgeColor: "bg-[#fbbf24]", marksColor: "text-blue-600", iconColor: "bg-blue-600", img: placeholderImages["student-7"].src },
      { name: "Arjun Mehta", grade: "Class 12, CBSE", marks: "97.8%", rank: "Rank 2", rankIcon: "Medal", badgeColor: "bg-[#94a3b8]", marksColor: "text-teal-600", iconColor: "bg-teal-600", img: placeholderImages["student-4"].src },
      { name: "Divya Nair", grade: "Class 10, Samacheer", marks: "96.4%", rank: "Rank 3", rankIcon: "Award", badgeColor: "bg-[#f59e0b]", marksColor: "text-purple-600", iconColor: "bg-purple-600", img: placeholderImages["student-3"].src },
      { name: "Rohan Kapoor", grade: "Class 12, CBSE", marks: "95.2%", rank: "Top 10", rankIcon: "", badgeColor: "bg-blue-500", marksColor: "text-orange-600", iconColor: "bg-orange-600", img: placeholderImages["student-8"].src },
    ]
  },
  about: {
    heroTitle: "About Us",
    heroImageUrl: "/About-Us.jpg",
    philosophyTag: "Philosophy",
    philosophyTitleMain: "What Makes Us ",
    philosophyTitleHighlight: "Different",
    philosophyImageUrl: "/about-image-vector.jpg",
    philosophyItems: [
      { text: "Everyone is an achiever.", icon: "Target" },
      { text: "Every student needs a unique method to deliver the concept.", icon: "Lightbulb" },
      { text: "BEC works in many unique ways to deliver the concepts to the students' mind which is more efficient than a common teaching methodology for different personalities.", icon: "Brain" },
      { text: "Our motto \"Everyone is an achiever\" stands as our ultimate goal is to train up any student who steps into our academy and turn them into an achiever.", icon: "Trophy" }
    ],
    ctaTitle: "Start Your Journey To Success",
    ctaSubtitle: "Experience the difference with our unique teaching methodology and personalized attention.",
    ctaBtnText: "Enroll Today"
  }
};

const iconMap: Record<string, any> = {
  Presentation: Presentation,
  FilePenLine: FilePenLine,
  MessagesSquare: MessagesSquare,
  BookOpen: BookOpen,
  Book: Book,
  UserCheck: UserCheck,
  Zap: Zap,
  GraduationCap: GraduationCap,
  Trophy: Trophy,
  Target: Target,
  Lightbulb: Lightbulb,
  Brain: Brain,
  Users: Users,
  TrendingUp: TrendingUp,
  Award: Award,
  Search: Search,
  Info: Info,
  Handshake: Handshake,
  Layers: Layers,
  PieChart: PieChart,
  ClipboardCheck: ClipboardCheck,
  Medal: Medal,
  Crown: Crown,
  Star: Star,
  ImageIcon: ImageIcon,
  CalendarCheck: CalendarCheck,
  Clock: Clock,
  Laptop: Laptop,
  Building: Building
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (base64: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
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
        callback(base64String);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
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

          <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-[#182d45] text-white">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-400" /> Icon Library
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-4 space-y-6 text-left">
              <p className="text-[10px] text-blue-200/60 font-black uppercase tracking-widest">Lucide Icon Reference</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {Object.keys(iconMap).map((iconName) => {
                  const Icon = iconMap[iconName];
                  return (
                    <div key={iconName} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                      <Icon className="w-5 h-5 text-teal-400" />
                      <span className="text-[8px] font-black uppercase tracking-tighter text-blue-200/60 text-center">{iconName}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {slug === 'home' && (
            <div className="space-y-8">
              {/* Hero Banner Text Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
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

              {/* Hero Image Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-blue-600" /> Hero Banner Image
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <Label className="text-xs font-black uppercase text-gray-400">Upload Hero Graphic</Label>
                      <div className="flex items-center gap-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                          onClick={() => document.getElementById('hero-upload')?.click()}
                        >
                          <Upload className="w-4 h-4" /> Choose Image
                        </Button>
                        <input 
                          id="hero-upload"
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                        />
                        {formData.heroImageUrl && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            className="text-red-500 hover:bg-red-50 rounded-xl h-12"
                            onClick={() => updateField('heroImageUrl', "")}
                          >
                            Reset to Default
                          </Button>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 italic">Select a large, high-quality graphic for your main hero section.</p>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase text-gray-400">Live Preview</Label>
                      <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-lg">
                        <Image 
                          src={formData.heroImageUrl || defaultPageData.home.heroImageUrl} 
                          alt="Hero Preview" 
                          fill 
                          className="object-contain" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Banner Elements Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <MousePointer2 className="w-6 h-6 text-blue-600" /> Action Elements
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Buttons</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-xs font-bold text-blue-600 uppercase">Primary Button (Gradient)</Label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          <input 
                            value={formData.heroPrimaryBtnText || ""} 
                            onChange={(e) => updateField('heroPrimaryBtnText', e.target.value)}
                            className="h-12 bg-white border-none rounded-xl px-4 w-full shadow-sm text-sm"
                            placeholder="Button Text"
                          />
                          <input 
                            value={formData.heroPrimaryBtnIcon || ""} 
                            onChange={(e) => updateField('heroPrimaryBtnIcon', e.target.value)}
                            className="h-12 bg-white border-none rounded-xl px-4 w-full shadow-sm text-sm"
                            placeholder="Icon Name (e.g. CalendarCheck)"
                          />
                        </div>
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-xs font-bold text-gray-500 uppercase">Outline Button (White)</Label>
                        <div className="grid grid-cols-1 gap-4 mt-2">
                          <input 
                            value={formData.heroOutlineBtnText || ""} 
                            onChange={(e) => updateField('heroOutlineBtnText', e.target.value)}
                            className="h-12 bg-white border-none rounded-xl px-4 w-full shadow-sm text-sm"
                            placeholder="Button Text"
                          />
                          <input 
                            value={formData.heroOutlineBtnIcon || ""} 
                            onChange={(e) => updateField('heroOutlineBtnIcon', e.target.value)}
                            className="h-12 bg-white border-none rounded-xl px-4 w-full shadow-sm text-sm"
                            placeholder="Icon Name (e.g. Clock)"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Floating UI Cards</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 1 (Top Floating)</Label>
                        <div className="space-y-2">
                          <Input 
                            value={formData.heroCard1Label || ""} 
                            onChange={(e) => updateField('heroCard1Label', e.target.value)} 
                            className="h-10 bg-white" 
                            placeholder="Label (e.g. Board)" 
                          />
                          <Input 
                            value={formData.heroCard1Value || ""} 
                            onChange={(e) => updateField('heroCard1Value', e.target.value)} 
                            className="h-10 bg-white font-bold" 
                            placeholder="Value (e.g. CBSE)" 
                          />
                          <Input 
                            value={formData.heroCard1Icon || ""} 
                            onChange={(e) => updateField('heroCard1Icon', e.target.value)} 
                            className="h-10 bg-white" 
                            placeholder="Icon (e.g. Book)" 
                          />
                        </div>
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 2 (Bottom Floating)</Label>
                        <div className="space-y-2">
                          <Input 
                            value={formData.heroCard2Label || ""} 
                            onChange={(e) => updateField('heroCard2Label', e.target.value)} 
                            className="h-10 bg-white" 
                            placeholder="Label (e.g. Board)" 
                          />
                          <Input 
                            value={formData.heroCard2Value || ""} 
                            onChange={(e) => updateField('heroCard2Value', e.target.value)} 
                            className="h-10 bg-white font-bold" 
                            placeholder="Value (e.g. Samacheer)" 
                          />
                          <Input 
                            value={formData.heroCard2Icon || ""} 
                            onChange={(e) => updateField('heroCard2Icon', e.target.value)} 
                            className="h-10 bg-white" 
                            placeholder="Icon (e.g. GraduationCap)" 
                          />
                        </div>
                      </div>
                      <div className="space-y-3 p-6 bg-gray-50 rounded-2xl">
                        <Label className="text-[10px] font-black uppercase text-gray-400">Card 3 (Modes)</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Input value={formData.heroCard3Online || ""} onChange={(e) => updateField('heroCard3Online', e.target.value)} className="h-10 bg-white" placeholder="Online" />
                            <Input value={formData.heroCard3OnlineIcon || ""} onChange={(e) => updateField('heroCard3OnlineIcon', e.target.value)} className="h-10 bg-white" placeholder="Online Icon" />
                          </div>
                          <div className="space-y-2">
                            <Input value={formData.heroCard3Offline || ""} onChange={(e) => updateField('heroCard3Offline', e.target.value)} className="h-10 bg-white" placeholder="Offline" />
                            <Input value={formData.heroCard3OfflineIcon || ""} onChange={(e) => updateField('heroCard3OfflineIcon', e.target.value)} className="h-10 bg-white" placeholder="Offline Icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Hero Stats Counters</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(formData.stats || defaultPageData.home.stats).map((stat: any, idx: number) => (
                        <div key={idx} className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Icon Name</Label>
                            <Input 
                              value={stat.icon || ""} 
                              onChange={(e) => {
                                const newStats = [...(formData.stats || defaultPageData.home.stats)];
                                newStats[idx].icon = e.target.value;
                                updateField('stats', newStats);
                              }}
                              className="h-10 bg-white"
                              placeholder="Users, TrendingUp, Award"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Value</Label>
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
                </CardContent>
              </Card>

              {/* How We Help Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" /> How We Help Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.featuresTitleMain || ""} 
                        onChange={(e) => updateField('featuresTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="How We Help Students "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.featuresTitleHighlight || ""} 
                        onChange={(e) => updateField('featuresTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Excel"
                      />
                    </div>
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

                  <div className="space-y-6">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Feature Cards</Label>
                    <div className="space-y-4">
                      {(formData.features || defaultPageData.home.features).map((feature: any, idx: number) => (
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
                          <button 
                            type="button"
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const currentFeatures = formData.features || defaultPageData.home.features;
                              const newFeatures = currentFeatures.filter((_: any, i: number) => i !== idx);
                              updateField('features', newFeatures);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Materials Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-blue-600" /> Study Materials Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.materialsTitleMain || ""} 
                        onChange={(e) => updateField('materialsTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Download Free "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.materialsTitleHighlight || ""} 
                        onChange={(e) => updateField('materialsTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Study Materials"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.materialsSubtitle || ""} 
                      onChange={(e) => updateField('materialsSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Filter by class and board to find specific resources"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Academic Programs Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-teal-500" /> Academic Programs
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.programsTitleMain || ""} 
                        onChange={(e) => updateField('programsTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Explore Our Academic "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.programsTitleHighlight || ""} 
                        onChange={(e) => updateField('programsTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Programs"
                      />
                    </div>
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

                  <div className="space-y-8">
                    {(formData.programs || defaultPageData.home.programs).map((program: any, idx: number) => (
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

              {/* Timetable Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" /> Offline Timetable Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.timetableTitleMain || ""} 
                        onChange={(e) => updateField('timetableTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Offline Class "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.timetableTitleHighlight || ""} 
                        onChange={(e) => updateField('timetableTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Timetable"
                      />
                    </div>
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

              {/* One-to-One Mentorship Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
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

                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Button Text</Label>
                    <Input 
                      value={formData.mentorshipBtnText || ""} 
                      onChange={(e) => updateField('mentorshipBtnText', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus-visible:ring-blue-600"
                      placeholder="Book Personal Session"
                    />
                  </div>

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
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('mentorshipImageUrl', b64))}
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
                      {(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures).map((feature: any, idx: number) => (
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

              {/* Testimonials Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <MessageSquareQuote className="w-6 h-6 text-blue-600" /> Testimonials Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.testimonialsTitleMain || ""} 
                        onChange={(e) => updateField('testimonialsTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="What Students & "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.testimonialsTitleHighlight || ""} 
                        onChange={(e) => updateField('testimonialsTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Parents Say"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Textarea 
                      value={formData.testimonialsSubtitle || ""} 
                      onChange={(e) => updateField('testimonialsSubtitle', e.target.value)}
                      className="min-h-[80px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Testimonials List</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newList = [...(formData.testimonials || [])];
                          newList.push({ name: "New Student", role: "Class 10", quote: "", avatar: "", rating: 5 });
                          updateField('testimonials', newList);
                        }}
                        className="h-9 rounded-xl font-bold gap-2 text-blue-600 border-blue-100"
                      >
                        <Plus className="w-4 h-4" /> Add Testimonial
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {(formData.testimonials || defaultPageData.home.testimonials).map((testimonial: any, idx: number) => (
                        <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Name</Label>
                              <Input 
                                value={testimonial.name || ""} 
                                onChange={(e) => {
                                  const newList = [...(formData.testimonials || defaultPageData.home.testimonials)];
                                  newList[idx].name = e.target.value;
                                  updateField('testimonials', newList);
                                }}
                                className="h-12 bg-white"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Class / Role</Label>
                              <Input 
                                value={testimonial.role || ""} 
                                onChange={(e) => {
                                  const newList = [...(formData.testimonials || defaultPageData.home.testimonials)];
                                  newList[idx].role = e.target.value;
                                  updateField('testimonials', newList);
                                }}
                                className="h-12 bg-white"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Rating (Stars)</Label>
                              <Select 
                                value={String(testimonial.rating || 5)} 
                                onValueChange={(val) => {
                                  const newList = [...(formData.testimonials || defaultPageData.home.testimonials)];
                                  newList[idx].rating = parseInt(val);
                                  updateField('testimonials', newList);
                                }}
                              >
                                <SelectTrigger className="h-12 bg-white rounded-xl">
                                  <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5].map(num => (
                                    <SelectItem key={num} value={String(num)}>{num} Stars</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Student Avatar</Label>
                              <div className="flex items-center gap-4">
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 transition-all flex items-center gap-2"
                                  onClick={() => document.getElementById(`avatar-upload-${idx}`)?.click()}
                                >
                                  <Upload className="w-4 h-4" /> Upload Photo
                                </Button>
                                <input 
                                  id={`avatar-upload-${idx}`}
                                  type="file" 
                                  accept="image/*"
                                  className="hidden" 
                                  onChange={(e) => handleImageUpload(e, (b64) => {
                                    const newList = [...(formData.testimonials || defaultPageData.home.testimonials)];
                                    newList[idx].avatar = b64;
                                    updateField('testimonials', newList);
                                  })}
                                />
                                {testimonial.avatar && (
                                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200">
                                    <img src={testimonial.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Review Description</Label>
                            <Textarea 
                              value={testimonial.quote || ""} 
                              onChange={(e) => {
                                const newList = [...(formData.testimonials || defaultPageData.home.testimonials)];
                                newList[idx].quote = e.target.value;
                                updateField('testimonials', newList);
                              }}
                              className="min-h-[100px] bg-white border-gray-200 rounded-xl p-4 font-medium text-gray-700 resize-none"
                            />
                          </div>
                          <button 
                            type="button"
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newList = (formData.testimonials || defaultPageData.home.testimonials).filter((_: any, i: number) => i !== idx);
                              updateField('testimonials', newList);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <HelpCircle className="w-6 h-6 text-blue-600" /> Why Choose Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.whyChooseTitleMain || ""} 
                        onChange={(e) => updateField('whyChooseTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Why Choose "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.whyChooseTitleHighlight || ""} 
                        onChange={(e) => updateField('whyChooseTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Bharath Academy?"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Description</Label>
                    <Input 
                      value={formData.whyChooseSubtitle || ""} 
                      onChange={(e) => updateField('whyChooseSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Comprehensive features designed..."
                    />
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Features List</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newList = [...(formData.whyChooseFeatures || [])];
                          newList.push({ icon: "Zap", title: "New Feature", desc: "", color: "bg-blue-600 shadow-blue-600/30" });
                          updateField('whyChooseFeatures', newList);
                        }}
                        className="h-9 rounded-xl font-bold gap-2 text-blue-600 border-blue-100"
                      >
                        <Plus className="w-4 h-4" /> Add Feature
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {(formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures).map((feature: any, idx: number) => (
                        <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Title</Label>
                              <Input 
                                value={feature.title || ""} 
                                onChange={(e) => {
                                  const newList = [...(formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures)];
                                  newList[idx].title = e.target.value;
                                  updateField('whyChooseFeatures', newList);
                                }}
                                className="h-12 bg-white"
                              />
                            </div>
                            <div className="space-y-3">
                              <Label className="text-xs font-black uppercase text-gray-400">Icon Name (Lucide)</Label>
                              <Input 
                                value={feature.icon || ""} 
                                onChange={(e) => {
                                  const newList = [...(formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures)];
                                  newList[idx].icon = e.target.value;
                                  updateField('whyChooseFeatures', newList);
                                }}
                                className="h-12 bg-white"
                                placeholder="Zap, PieChart, Users, etc."
                              />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label className="text-xs font-black uppercase text-gray-400">Description</Label>
                            <Textarea 
                              value={feature.desc || ""} 
                              onChange={(e) => {
                                const newList = [...(formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures)];
                                newList[idx].desc = e.target.value;
                                updateField('whyChooseFeatures', newList);
                              }}
                              className="min-h-[100px] bg-white border-gray-200 rounded-xl p-4 font-medium text-gray-700 resize-none"
                            />
                          </div>
                          <button 
                            type="button"
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newList = (formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures).filter((_: any, i: number) => i !== idx);
                              updateField('whyChooseFeatures', newList);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Stories Section Card */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-blue-600" /> Success Stories Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.successTitleMain || ""} 
                        onChange={(e) => updateField('successTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Our Students' "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.successTitleHighlight || ""} 
                        onChange={(e) => updateField('successTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Success Stories"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.successSubtitle || ""} 
                      onChange={(e) => updateField('successSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                    />
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Success Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(formData.successStats || defaultPageData.home.successStats).map((stat: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase">Icon (Lucide)</Label>
                            <Input value={stat.icon} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.home.successStats)];
                              newList[idx].icon = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase">Value</Label>
                            <Input value={stat.value} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.home.successStats)];
                              newList[idx].value = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase">Label</Label>
                            <Input value={stat.label} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.home.successStats)];
                              newList[idx].label = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Top Performers Header</Label>
                      <Input value={formData.successTopHeader} onChange={(e) => updateField('successTopHeader', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Total Marks Label</Label>
                      <Input value={formData.successTotalMarksLabel} onChange={(e) => updateField('successTotalMarksLabel', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Card Icon (Lucide)</Label>
                      <Input value={formData.successCardIcon} onChange={(e) => updateField('successCardIcon', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-bold text-gray-700">Academic Years List</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const currentYears = Array.isArray(formData.successYears) ? formData.successYears : [];
                          updateField('successYears', [...currentYears, ""]);
                        }}
                        className="h-9 rounded-xl font-bold gap-2 text-blue-600 border-blue-100"
                      >
                        <Plus className="w-4 h-4" /> Add Year
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3 p-6 bg-gray-50 rounded-[2rem] border border-gray-100 min-h-[80px]">
                      {(Array.isArray(formData.successYears) ? formData.successYears : (typeof formData.successYears === 'string' ? formData.successYears.split(/[\n,\s]+/).filter(Boolean) : [])).map((year: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm transition-all hover:border-blue-200">
                          <input 
                            value={year}
                            onChange={(e) => {
                              const currentYears = Array.isArray(formData.successYears) ? [...formData.successYears] : (typeof formData.successYears === 'string' ? formData.successYears.split(/[\n,\s]+/).filter(Boolean) : []);
                              currentYears[idx] = e.target.value;
                              updateField('successYears', currentYears);
                            }}
                            className="bg-transparent border-none outline-none font-bold text-gray-700 w-16 text-center text-sm"
                            placeholder="2025"
                          />
                          <button 
                            type="button"
                            onClick={() => {
                              const currentYears = Array.isArray(formData.successYears) ? formData.successYears : (typeof formData.successYears === 'string' ? formData.successYears.split(/[\n,\s]+/).filter(Boolean) : []);
                              const newList = currentYears.filter((_: any, i: number) => i !== idx);
                              updateField('successYears', newList);
                            }}
                            className="text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {(!formData.successYears || (Array.isArray(formData.successYears) && formData.successYears.length === 0)) && (
                        <p className="text-xs text-gray-400 font-medium italic py-2">No years added. Click "Add Year" to manage dropdown options.</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* About Page Sections */}
          {slug === 'about' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Page Headline</Label>
                    <Input 
                      value={formData.heroTitle || ""} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" /> Hero Banner Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Banner</Label>
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                            onClick={() => document.getElementById('about-hero-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Choose Image
                          </Button>
                          <input 
                            id="about-hero-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 italic">Select a wide photo for the main page header.</p>
                      </div>
                      {(formData.heroImageUrl || defaultPageData.about.heroImageUrl) && (
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-gray-400">Preview</Label>
                          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                            <Image 
                              src={formData.heroImageUrl || defaultPageData.about.heroImageUrl} 
                              alt="Hero Preview" 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Philosophy Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Our Philosophy</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Philosophy Section Main Title</Label>
                      <Input 
                        value={formData.philosophyTitleMain || ""} 
                        onChange={(e) => updateField('philosophyTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="What Makes Us "
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Philosophy Title Highlight</Label>
                      <Input 
                        value={formData.philosophyTitleHighlight || ""} 
                        onChange={(e) => updateField('philosophyTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Different"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Section Tag</Label>
                      <Input 
                        value={formData.philosophyTag || ""} 
                        onChange={(e) => updateField('philosophyTag', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                        placeholder="Philosophy"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-teal-500" /> Philosophy Section Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                      <div className="space-y-3">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Image</Label>
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-teal-50 hover:text-teal-600 transition-all flex items-center gap-2"
                            onClick={() => document.getElementById('about-philosophy-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Choose Image
                          </Button>
                          <input 
                            id="about-philosophy-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('philosophyImageUrl', b64))}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 italic">Select an illustration for the philosophy section.</p>
                      </div>
                      {(formData.philosophyImageUrl || defaultPageData.about.philosophyImageUrl) && (
                        <div className="space-y-2">
                          <Label className="text-xs font-black uppercase text-gray-400">Preview</Label>
                          <div className="relative w-full aspect-square max-w-[200px] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                            <Image 
                              src={formData.philosophyImageUrl || defaultPageData.about.philosophyImageUrl} 
                              alt="Philosophy Preview" 
                              fill 
                              className="object-cover" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Philosophy Features</Label>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newItems = [...(formData.philosophyItems || []), { text: "", icon: "Target" }];
                          updateField('philosophyItems', newItems);
                        }}
                        className="h-9 rounded-xl font-bold gap-2 text-blue-600 border-blue-100"
                      >
                        <Plus className="w-4 h-4" /> Add Item
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(formData.philosophyItems || defaultPageData.about.philosophyItems).map((item: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Description Text</Label>
                                <Textarea 
                                  value={item.text || ""} 
                                  onChange={(e) => {
                                    const newItems = [...(formData.philosophyItems || [])];
                                    newItems[idx].text = e.target.value;
                                    updateField('philosophyItems', newItems);
                                  }}
                                  className="min-h-[80px] bg-white border-gray-200 rounded-xl p-4 font-medium text-gray-700 resize-none"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-gray-400">Icon Name (Lucide)</Label>
                                <Input 
                                  value={item.icon || ""} 
                                  onChange={(e) => {
                                    const newItems = [...(formData.philosophyItems || [])];
                                    newItems[idx].icon = e.target.value;
                                    updateField('philosophyItems', newItems);
                                  }}
                                  className="h-10 bg-white"
                                  placeholder="Target, Brain, etc."
                                />
                              </div>
                            </div>
                          </div>
                          <button 
                            type="button"
                            className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => {
                              const newItems = (formData.philosophyItems || []).filter((_: any, i: number) => i !== idx);
                              updateField('philosophyItems', newItems);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Call To Action (Footer)</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-6 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">CTA Headline</Label>
                    <Input 
                      value={formData.ctaTitle || ""} 
                      onChange={(e) => updateField('ctaTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">CTA Subtitle</Label>
                    <Textarea 
                      value={formData.ctaSubtitle || ""} 
                      onChange={(e) => updateField('ctaSubtitle', e.target.value)}
                      className="min-h-[100px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none focus-visible:ring-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Button Text</Label>
                      <Input 
                        value={formData.ctaBtnText || ""} 
                        onChange={(e) => updateField('ctaBtnText', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug !== 'home' && slug !== 'about' && (
            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="p-10 pb-0 text-left">
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
