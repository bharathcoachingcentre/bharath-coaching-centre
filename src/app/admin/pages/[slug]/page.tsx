
"use client";

import React, { useMemo, useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
  Building,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Navigation,
  List,
  FileCheck,
  FileText,
  GripVertical
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
import { Reorder } from "framer-motion";

const defaultPageData: Record<string, any> = {
  header: {
    academyName: "Bharath Academy",
    logoUrl: "",
    logoWidth: "100",
    logoHeight: "80",
    ctaText: "Explore Courses",
    ctaLink: "/enrollment",
    navMenu: [
      { id: "1", title: "Study Materials", url: "/study-material", parentId: null, order: 0 },
      { id: "2", title: "Our Faculty", url: "/teachers", parentId: null, order: 1 },
      { id: "3", title: "Results", url: "/our-results", parentId: null, order: 2 },
      { id: "4", title: "About", url: "/about", parentId: null, order: 3 },
      { id: "5", title: "Contact", url: "/contact", parentId: null, order: 4 },
      { id: "6", title: "Courses", url: "#", parentId: null, order: 5 },
      { id: "7", title: "CBSE Curriculum", subLabel: "Class 1 to 12", url: "/cbse", parentId: "6", order: 0 },
      { id: "8", title: "Samacheer Kalvi", subLabel: "Class 1 to 12", url: "/samacheer", parentId: "6", order: 1 },
      { id: "9", title: "Competitive Exams", subLabel: "JEE, NEET, Olympiad", url: "/online-courses", parentId: "6", order: 2 },
      { id: "10", title: "TNPSC", subLabel: "Group Exams", url: "#", parentId: "6", order: 3 },
      { id: "11", title: "Banking", subLabel: "IBPS, SBI, RBI", url: "#", parentId: "6", order: 4 },
    ]
  },
  footer: {
    description: "Helping students from Class 1 to 12 achieve academic excellence through structured coaching.",
    facebookLink: "#",
    instagramLink: "#",
    youtubeLink: "#",
    contactPhone: "+91 72000 30307",
    contactEmail: "bcc_try@hotmail.com",
    contactAddress: "C-109, 5th Cross, Thillainagar (East), Trichy - 18",
    contactHours: "Mon-Sat 9AM-7PM",
    appTitle: "Get the Bharath Academy App",
    appSubtitle: "Learn anytime, anywhere with our mobile app",
    playStoreLink: "#",
    appStoreLink: "#",
    copyrightText: "© 2026 Bharath Academy Hub. All rights reserved.",
    bottomLinks: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
      { label: "Refund Policy", href: "#" },
    ],
    menus: [
      {
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Results", href: "/our-results" },
          { label: "Contact Us", href: "/contact" },
        ]
      },
      {
        title: "Courses",
        links: [
          { label: "CBSE Coaching", href: "/cbse" },
          { label: "Samacheer Coaching", href: "/samacheer" },
          { label: "Online Classes", href: "/online-courses" },
          { label: "One-to-One Mentorship", href: "/one-to-one-classes" },
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Free Study Materials", href: "/study-material" },
          { label: "Blog", href: "/blog" },
          { label: "Become a Teacher", href: "/become-a-teacher" },
        ]
      }
    ]
  },
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
    successTotalMarksLabel: "Total Marks",
    successCardIcon: "Star",
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
  },
  "study-material": {
    premiumTitleMain: "Access ",
    premiumTitleHighlight: "Premium Learning",
    premiumCards: [
      {
        icon: "BookOpen",
        title: "CBSE",
        description: "Complete NCERT solutions and chapter-wise practice questions",
        accentColor: "blue",
        accordions: [
          { title: "CBSE NCERT Solutions", content: "Select your class below to access full NCERT book back solutions for all core subjects." },
          { title: "CBSE Chapter Wise Test Questions", content: "Deep dive into specific chapters with our curated list of test questions designed to test core conceptual understanding." }
        ]
      },
      {
        icon: "FileText",
        title: "Model Papers",
        description: "Board question papers and previous year papers for preparation",
        accentColor: "teal",
        accordions: [
          { title: "Board Question Papers", content: "Practice with the latest model board papers to understand the exam pattern and marking schemes." },
          { title: "Previous Year Board QP", content: "Review actual papers from previous years to gauge the difficulty and recurring topics." }
        ]
      },
      {
        icon: "GraduationCap",
        title: "Samacheer",
        description: "Book back solutions and comprehensive test materials for state board",
        accentColor: "purple",
        accordions: [
          { title: "Book Back Solutions", content: "Comprehensive solutions for all textbook exercises across the Samacheer Kalvi syllabus." },
          { title: "Chapter Wise Test Questions", content: "Structured test questions for every chapter in the Samacheer Kalvi syllabus." },
          { title: "Model Board Question Papers", content: "Expertly drafted model papers following the state board guidelines." }
        ]
      }
    ],
    materialsTitleMain: "Download Free ",
    materialsTitleHighlight: "Study Materials",
    materialsSubtitle: "Filter by class and board to find specific resources for your curriculum"
  },
  results: {
    heroTitle: "Our Results",
    heroImageUrl: "/Our-result.jpg",
    successTitleMain: "Our Students' ",
    successTitleHighlight: "Success Stories",
    successSubtitle: "Celebrating exceptional achievements and academic excellence.",
    successStats: [
      { icon: "Trophy", value: "95%", label: "Pass Rate", color: "bg-blue-500" },
      { icon: "Medal", value: "120+", label: "Distinctions", color: "bg-teal-500" },
      { icon: "GraduationCap", value: "5000+", label: "Students", color: "bg-purple-500" },
    ],
    performersTitleMain: "Our Top ",
    performersTitleHighlight: "Performers",
    performersSubtitle: "Celebrating the hard work and dedication of our brilliant students",
    performersYearHeader: "Top Achievers",
    totalMarksLabel: "Total Marks",
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
  Building: Building,
  FileCheck: FileCheck,
  FileText: FileText
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

  // Menu Helpers
  const addMenuItem = () => {
    const newItems = [...(formData.navMenu || [])];
    const id = Math.random().toString(36).substring(2, 9);
    newItems.push({ 
      id, 
      title: "New Link", 
      url: "/", 
      parentId: null, 
      order: newItems.length 
    });
    updateField('navMenu', newItems);
  };

  const deleteMenuItem = (id: string) => {
    const newItems = (formData.navMenu || []).filter((item: any) => item.id !== id && item.parentId !== id);
    updateField('navMenu', newItems);
  };

  const handleMenuReorder = (newItems: any[]) => {
    const reordered = newItems.map((item, idx) => ({ ...item, order: idx }));
    updateField('navMenu', reordered);
  };

  const rootMenuItems = useMemo(() => {
    return (formData.navMenu || []).filter((item: any) => !item.parentId);
  }, [formData.navMenu]);

  if (loading || !formData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400">Loading Page Editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 text-left">
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
            <CardContent className="p-8 -mt-10 relative text-left">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center text-blue-600 shrink-0">
                  <Globe className="w-10 h-10" />
                </div>
                <div className="pt-10 flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight capitalize">
                    {slug} Editor
                  </h2>
                  <div className="mt-4 flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-black uppercase tracking-widest w-fit">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Layout
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

          {slug !== 'header' && slug !== 'footer' && (
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
          )}
        </div>

        <div className="space-y-8">
          {/* Header Editor */}
          {slug === 'header' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Branding & Identity</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Academy Name (Logo Text)</Label>
                    <Input 
                      value={formData.academyName || ""} 
                      onChange={(e) => updateField('academyName', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700">Academy Logo</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                            onClick={() => document.getElementById('logo-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Upload Image
                          </Button>
                          <input 
                            id="logo-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('logoUrl', b64))}
                          />
                          {formData.logoUrl && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              className="text-red-500 hover:bg-red-50 rounded-xl h-12"
                              onClick={() => updateField('logoUrl', "")}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Remove
                            </Button>
                          )}
                        </div>
                        <Input 
                          value={formData.logoUrl || ""} 
                          onChange={(e) => updateField('logoUrl', e.target.value)}
                          placeholder="Or enter logo URL (https://...)"
                          className="h-14 bg-gray-50 border-none rounded-xl px-6"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-black uppercase text-gray-400">Preview</Label>
                        <div className="relative h-24 w-full bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-4">
                          {formData.logoUrl ? (
                            <img 
                              src={formData.logoUrl} 
                              alt="Logo Preview" 
                              style={{ 
                                width: formData.logoWidth ? `${formData.logoWidth}px` : 'auto', 
                                height: formData.logoHeight ? `${formData.logoHeight}px` : '40px',
                                maxWidth: '100%',
                                maxHeight: '100%'
                              }} 
                              className="object-contain" 
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-1 opacity-20">
                              <GraduationCap className="w-8 h-8" />
                              <span className="text-[10px] font-bold">DEFAULT ICON</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Logo Width (px)</Label>
                      <Input 
                        value={formData.logoWidth || ""} 
                        onChange={(e) => updateField('logoWidth', e.target.value)}
                        placeholder="e.g. 150"
                        className="h-14 bg-gray-50 border-none rounded-xl px-6"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Logo Height (px)</Label>
                      <Input 
                        value={formData.logoHeight || ""} 
                        onChange={(e) => updateField('logoHeight', e.target.value)}
                        placeholder="e.g. 150"
                        className="h-14 bg-gray-50 border-none rounded-xl px-6"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Robust Navigation Menu Editor */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Navigation Menu</CardTitle>
                  <Button 
                    onClick={addMenuItem}
                    variant="outline"
                    className="rounded-xl font-bold h-10 gap-2 border-blue-100 text-blue-600"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </Button>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-4">
                  <p className="text-xs text-gray-400 font-medium mb-6">Drag handle to reorder. Use the "Parent Menu" selector to create dropdown submenus.</p>
                  
                  <Reorder.Group 
                    axis="y" 
                    values={formData.navMenu || []} 
                    onReorder={handleMenuReorder}
                    className="space-y-3"
                  >
                    {(formData.navMenu || []).map((item: any, idx: number) => (
                      <Reorder.Item key={item.id} value={item}>
                        <div className={cn(
                          "p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all group",
                          item.parentId && "ml-12 border-l-4 border-l-blue-200 bg-blue-50/30 shadow-inner"
                        )}>
                          <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white rounded-lg transition-colors">
                            <GripVertical className="w-5 h-5 text-gray-300" />
                          </div>
                          
                          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-3 space-y-1 text-left">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Title</Label>
                              <Input 
                                value={item.title} 
                                onChange={(e) => {
                                  const newList = [...formData.navMenu];
                                  newList[idx].title = e.target.value;
                                  updateField('navMenu', newList);
                                }}
                                className="h-10 text-sm font-bold bg-white border-none rounded-lg"
                                placeholder="Title"
                              />
                            </div>
                            <div className="lg:col-span-3 space-y-1 text-left">
                              <Label className="text-[10px] font-black uppercase text-gray-400">URL</Label>
                              <Input 
                                value={item.url} 
                                onChange={(e) => {
                                  const newList = [...formData.navMenu];
                                  newList[idx].url = e.target.value;
                                  updateField('navMenu', newList);
                                }}
                                className="h-10 text-sm bg-white border-none rounded-lg"
                                placeholder="URL (/...)"
                              />
                            </div>
                            <div className="lg:col-span-3 space-y-1 text-left">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Parent Menu</Label>
                              <Select 
                                value={item.parentId || "none"} 
                                onValueChange={(val) => {
                                  const newList = [...formData.navMenu];
                                  newList[idx].parentId = val === "none" ? null : val;
                                  updateField('navMenu', newList);
                                }}
                              >
                                <SelectTrigger className="h-10 text-xs bg-white border-none rounded-lg">
                                  <SelectValue placeholder="No Parent" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl shadow-xl">
                                  <SelectItem value="none">None (Main Menu)</SelectItem>
                                  {rootMenuItems
                                    .filter((root: any) => root.id !== item.id) // Cannot be own parent
                                    .map((root: any) => (
                                      <SelectItem key={root.id} value={root.id}>{root.title}</SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="lg:col-span-3 space-y-1 text-left">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Sub-label (Optional)</Label>
                              <Input 
                                value={item.subLabel || ""} 
                                onChange={(e) => {
                                  const newList = [...formData.navMenu];
                                  newList[idx].subLabel = e.target.value;
                                  updateField('navMenu', newList);
                                }}
                                className="h-10 text-[10px] bg-white border-none rounded-lg uppercase tracking-widest font-medium"
                                placeholder="e.g. Class 1-12"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteMenuItem(item.id)}
                              className="h-8 w-8 text-gray-300 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Header CTA Button</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Button Text</Label>
                    <Input 
                      value={formData.ctaText || ""} 
                      onChange={(e) => updateField('ctaText', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Button Link</Label>
                    <Input 
                      value={formData.ctaLink || ""} 
                      onChange={(e) => updateField('ctaLink', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Footer Editor */}
          {slug === 'footer' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Organization Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Footer Description</Label>
                    <Textarea 
                      value={formData.description || ""} 
                      onChange={(e) => updateField('description', e.target.value)}
                      className="min-h-[120px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Footer Menu Columns</CardTitle>
                  <Button 
                    onClick={() => {
                      const currentMenus = formData.menus || [];
                      updateField('menus', [...currentMenus, { title: "New Menu", links: [] }]);
                    }}
                    variant="outline"
                    className="rounded-xl font-bold gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Column
                  </Button>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10">
                  {(formData.menus || []).map((menu: any, colIdx: number) => (
                    <div key={colIdx} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6 relative group/col">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2 flex-grow max-w-md">
                          <Label className="text-xs font-black uppercase text-gray-400">Column Title</Label>
                          <Input 
                            value={menu.title} 
                            onChange={(e) => {
                              const newMenus = [...formData.menus];
                              newMenus[colIdx].title = e.target.value;
                              updateField('menus', newMenus);
                            }}
                            className="bg-white border-none h-12 rounded-xl font-bold"
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            const newMenus = formData.menus.filter((_: any, i: number) => i !== colIdx);
                            updateField('menus', newMenus);
                          }}
                          className="text-gray-300 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between px-2 text-left">
                          <Label className="text-xs font-black uppercase text-gray-400">Links</Label>
                          <Button 
                            variant="link" 
                            size="sm" 
                            onClick={() => {
                              const newMenus = [...formData.menus];
                              newMenus[colIdx].links.push({ label: "New Link", href: "#" });
                              updateField('menus', newMenus);
                            }}
                            className="h-auto p-0 font-bold text-blue-600"
                          >
                            <Plus className="w-3 h-3 mr-1" /> Add Link
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {menu.links.map((link: any, linkIdx: number) => (
                            <div key={linkIdx} className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm group/link relative">
                              <div className="flex-grow space-y-2 text-left">
                                <Input 
                                  value={link.label} 
                                  onChange={(e) => {
                                    const newMenus = [...formData.menus];
                                    newMenus[colIdx].links[linkIdx].label = e.target.value;
                                    updateField('menus', newMenus);
                                  }}
                                  className="h-8 text-xs border-none bg-gray-50"
                                  placeholder="Label"
                                />
                                <Input 
                                  value={link.href} 
                                  onChange={(e) => {
                                    const newMenus = [...formData.menus];
                                    newMenus[colIdx].links[linkIdx].href = e.target.value;
                                    updateField('menus', newMenus);
                                  }}
                                  className="h-8 text-xs border-none bg-gray-50"
                                  placeholder="URL"
                                />
                              </div>
                              <Button 
                                size="icon" 
                                variant="ghost"
                                onClick={() => {
                                  const newMenus = [...formData.menus];
                                  newMenus[colIdx].links = newMenus[colIdx].links.filter((_: any, i: number) => i !== linkIdx);
                                  updateField('menus', newMenus);
                                }}
                                className="h-8 w-8 text-gray-200 hover:text-red-500"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Contact & Support</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-600" /> Phone Number
                    </Label>
                    <Input 
                      value={formData.contactPhone || ""} 
                      onChange={(e) => updateField('contactPhone', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" /> Email Address
                    </Label>
                    <Input 
                      value={formData.contactEmail || ""} 
                      onChange={(e) => updateField('contactEmail', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" /> Working Hours
                    </Label>
                    <Input 
                      value={formData.contactHours || ""} 
                      onChange={(e) => updateField('contactHours', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" /> Office Address
                    </Label>
                    <Input 
                      value={formData.contactAddress || ""} 
                      onChange={(e) => updateField('contactAddress', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Social & App Links</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-blue-600 flex items-center gap-2 uppercase">
                        <Facebook className="w-4 h-4" /> Facebook
                      </Label>
                      <Input value={formData.facebookLink || ""} onChange={(e) => updateField('facebookLink', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl shadow-sm" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-pink-600 flex items-center gap-2 uppercase">
                        <Instagram className="w-4 h-4" /> Instagram
                      </Label>
                      <Input value={formData.instagramLink || ""} onChange={(e) => updateField('instagramLink', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl shadow-sm" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-red-600 flex items-center gap-2 uppercase">
                        <Youtube className="w-4 h-4" /> Youtube
                      </Label>
                      <Input value={formData.youtubeLink || ""} onChange={(e) => updateField('youtubeLink', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl shadow-sm" />
                    </div>
                  </div>

                  <div className="pt-10 border-t border-gray-50 space-y-8">
                    <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest text-left">Mobile App Section</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">App Section Title</Label>
                        <Input value={formData.appTitle || ""} onChange={(e) => updateField('appTitle', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">App Section Subtitle</Label>
                        <Input value={formData.appSubtitle || ""} onChange={(e) => updateField('appSubtitle', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Google Play Store Link</Label>
                        <Input value={formData.playStoreLink || ""} onChange={(e) => updateField('playStoreLink', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Apple App Store Link</Label>
                        <Input value={formData.appStoreLink || ""} onChange={(e) => updateField('appStoreLink', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Copyright & Legal Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Copyright & Legal Links</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Copyright Text</Label>
                    <Input 
                      value={formData.copyrightText || ""} 
                      onChange={(e) => updateField('copyrightText', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      placeholder="© 2026 Bharath Academy Hub. All rights reserved."
                    />
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-left">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Legal Links (Bottom Row)</Label>
                      <Button 
                        onClick={() => {
                          const currentLinks = formData.bottomLinks || [];
                          updateField('bottomLinks', [...currentLinks, { label: "New Link", href: "#" }]);
                        }}
                        variant="outline"
                        size="sm"
                        className="rounded-xl font-bold gap-2 text-blue-600 border-blue-100"
                      >
                        <Plus className="w-4 h-4" /> Add Link
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(formData.bottomLinks || []).map((link: any, linkIdx: number) => (
                        <div key={linkIdx} className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-100 group relative">
                          <div className="flex-grow space-y-2 text-left">
                            <Input 
                              value={link.label} 
                              onChange={(e) => {
                                const newLinks = [...formData.bottomLinks];
                                newLinks[linkIdx].label = e.target.value;
                                updateField('bottomLinks', newLinks);
                              }}
                              className="h-10 text-sm border-none bg-white rounded-lg"
                              placeholder="Label"
                            />
                            <Input 
                              value={link.href} 
                              onChange={(e) => {
                                const newLinks = [...formData.bottomLinks];
                                newLinks[linkIdx].href = e.target.value;
                                updateField('bottomLinks', newLinks);
                              }}
                              className="h-10 text-sm border-none bg-white rounded-lg"
                              placeholder="URL"
                            />
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              const newLinks = formData.bottomLinks.filter((_: any, i: number) => i !== linkIdx);
                              updateField('bottomLinks', newLinks);
                            }}
                            className="text-gray-300 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
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
                        <div className="space-y-2 text-left">
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
                        <div className="space-y-2 text-left">
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
                          <div className="space-y-2 text-left">
                            <Input value={formData.heroCard3Online || ""} onChange={(e) => updateField('heroCard3Online', e.target.value)} className="h-10 bg-white" placeholder="Online" />
                            <Input value={formData.heroCard3OnlineIcon || ""} onChange={(e) => updateField('heroCard3OnlineIcon', e.target.value)} className="h-10 bg-white" placeholder="Online Icon" />
                          </div>
                          <div className="space-y-2 text-left">
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
                          <div className="space-y-2 text-left">
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
                          <div className="space-y-2 text-left">
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
                          <div className="space-y-2 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.featuresSubtitle || ""} 
                      onChange={(e) => updateField('featuresSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Comprehensive learning solutions"
                    />
                  </div>

                  <div className="space-y-6 text-left">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Feature Cards</Label>
                    <div className="space-y-4">
                      {(formData.features || defaultPageData.home.features).map((feature: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm mb-2", feature.color || "bg-blue-500")}>
                                <Type className="w-5 h-5" />
                              </div>
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2 text-left">
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
                              <div className="space-y-2 text-left">
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
                              <div className="md:col-span-2 space-y-2 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.programsTitleMain || ""} 
                        onChange={(e) => updateField('programsTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Explore Our Academic "
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.programsTitleHighlight || ""} 
                        onChange={(e) => updateField('programsTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Programs"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.programsSubtitle || ""} 
                      onChange={(e) => updateField('programsSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Choose the perfect learning path"
                    />
                  </div>

                  <div className="space-y-8 text-left">
                    {(formData.programs || defaultPageData.home.programs).map((program: any, idx: number) => (
                      <div key={idx} className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          <div className="space-y-3 text-left">
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
                          <div className="space-y-3 text-left">
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
                          <div className="space-y-3 text-left">
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
                          <div className="flex items-center gap-4 h-full pt-6 text-left">
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
                          
                          <div className="space-y-3 text-left">
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
                          <div className="space-y-3 text-left">
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

                        <div className="space-y-3 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.timetableSubtitle || ""} 
                      onChange={(e) => updateField('timetableSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="View our structured class schedules"
                    />
                  </div>

                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Notes Icon (Lucide)</Label>
                    <Input 
                      value={formData.timetableIcon || ""} 
                      onChange={(e) => updateField('timetableIcon', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Info, Zap, Star, etc."
                    />
                  </div>

                  <div className="space-y-4 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Textarea 
                      value={formData.mentorshipSubtitle || ""} 
                      onChange={(e) => updateField('mentorshipSubtitle', e.target.value)}
                      className="min-h-[80px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>

                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Button Text</Label>
                    <Input 
                      value={formData.mentorshipBtnText || ""} 
                      onChange={(e) => updateField('mentorshipBtnText', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600 focus-visible:ring-blue-600"
                      placeholder="Book Personal Session"
                    />
                  </div>

                  <div className="space-y-4 text-left">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" /> Mentorship Section Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                      <div className="space-y-3 text-left">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Image</Label>
                        <div className="flex items-center gap-4 text-left">
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
                        <p className="text-[10px] text-gray-400 italic text-left">Select a photo from your computer for the mentorship section.</p>
                      </div>
                      {(formData.mentorshipImageUrl || placeholderImages["one-to-one-mentorship"].src) && (
                        <div className="space-y-2 text-left">
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

                  <div className="space-y-6 text-left">
                    <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Mentorship Features</Label>
                    <div className="space-y-4">
                      {(formData.mentorshipFeatures || defaultPageData.home.mentorshipFeatures).map((feature: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2 text-left">
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
                              <div className="space-y-2 text-left">
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
                              <div className="md:col-span-2 space-y-2 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Textarea 
                      value={formData.testimonialsSubtitle || ""} 
                      onChange={(e) => updateField('testimonialsSubtitle', e.target.value)}
                      className="min-h-[80px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>

                  <div className="space-y-8 text-left">
                    <div className="flex items-center justify-between text-left">
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

                    <div className="space-y-6 text-left">
                      {(formData.testimonials || defaultPageData.home.testimonials).map((testimonial: any, idx: number) => (
                        <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="space-y-3 text-left">
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
                            <div className="space-y-3 text-left">
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
                            <div className="space-y-3 text-left">
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
                            <div className="space-y-3 text-left">
                              <Label className="text-xs font-black uppercase text-gray-400">Student Avatar</Label>
                              <div className="flex items-center gap-4 text-left">
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
                          <div className="space-y-3 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Description</Label>
                    <Input 
                      value={formData.whyChooseSubtitle || ""} 
                      onChange={(e) => updateField('whyChooseSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                      placeholder="Comprehensive features designed..."
                    />
                  </div>

                  <div className="space-y-8 text-left">
                    <div className="flex items-center justify-between text-left">
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

                    <div className="space-y-6 text-left">
                      {(formData.whyChooseFeatures || defaultPageData.home.whyChooseFeatures).map((feature: any, idx: number) => (
                        <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="space-y-3 text-left">
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
                            <div className="space-y-3 text-left">
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
                          <div className="space-y-3 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.successTitleMain || ""} 
                        onChange={(e) => updateField('successTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="Our Students' "
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.successTitleHighlight || ""} 
                        onChange={(e) => updateField('successTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Success Stories"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.successSubtitle || ""} 
                      onChange={(e) => updateField('successSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                    />
                  </div>

                  <div className="space-y-6 text-left">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Success Statistics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(formData.successStats || defaultPageData.home.successStats).map((stat: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Icon (Lucide)</Label>
                            <Input value={stat.icon} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.home.successStats)];
                              newList[idx].icon = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Value</Label>
                            <Input value={stat.value} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.home.successStats)];
                              newList[idx].value = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2 text-left">
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-50 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Top Performers Header</Label>
                      <Input value={formData.successTopHeader} onChange={(e) => updateField('successTopHeader', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Total Marks Label</Label>
                      <Input value={formData.successTotalMarksLabel} onChange={(e) => updateField('successTotalMarksLabel', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Card Icon (Lucide)</Label>
                      <Input value={formData.successCardIcon} onChange={(e) => updateField('successCardIcon', e.target.value)} className="h-12 bg-gray-50 border-none rounded-xl" />
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Page Headline</Label>
                    <Input 
                      value={formData.heroTitle || ""} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-4 text-left">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-blue-600" /> Hero Banner Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                      <div className="space-y-3 text-left">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Banner</Label>
                        <div className="flex items-center gap-4 text-left">
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
                        <p className="text-[10px] text-gray-400 italic text-left">Select a wide photo for the main page header.</p>
                      </div>
                      {(formData.heroImageUrl || defaultPageData.about.heroImageUrl) && (
                        <div className="space-y-2 text-left">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Philosophy Section Main Title</Label>
                      <Input 
                        value={formData.philosophyTitleMain || ""} 
                        onChange={(e) => updateField('philosophyTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                        placeholder="What Makes Us "
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Philosophy Title Highlight</Label>
                      <Input 
                        value={formData.philosophyTitleHighlight || ""} 
                        onChange={(e) => updateField('philosophyTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        placeholder="Different"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Tag</Label>
                      <Input 
                        value={formData.philosophyTag || ""} 
                        onChange={(e) => updateField('philosophyTag', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium text-gray-600"
                        placeholder="Philosophy"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 text-left">
                    <Label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-teal-500" /> Philosophy Section Image
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start text-left">
                      <div className="space-y-3 text-left">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Image</Label>
                        <div className="flex items-center gap-4 text-left">
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
                        <p className="text-[10px] text-gray-400 italic text-left">Select an illustration for the philosophy section.</p>
                      </div>
                      {(formData.philosophyImageUrl || defaultPageData.about.philosophyImageUrl) && (
                        <div className="space-y-2 text-left">
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
                  
                  <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between text-left">
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

                    <div className="space-y-4 text-left">
                      {(formData.philosophyItems || defaultPageData.about.philosophyItems).map((item: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start text-left">
                            <div className="md:col-span-1 flex flex-col items-center">
                              <span className="text-[10px] font-black text-gray-300">{idx + 1}</span>
                            </div>
                            <div className="md:col-span-11 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="md:col-span-2 space-y-2 text-left">
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
                              <div className="space-y-2 text-left">
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
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">CTA Headline</Label>
                    <Input 
                      value={formData.ctaTitle || ""} 
                      onChange={(e) => updateField('ctaTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900 focus-visible:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">CTA Subtitle</Label>
                    <Textarea 
                      value={formData.ctaSubtitle || ""} 
                      onChange={(e) => updateField('ctaSubtitle', e.target.value)}
                      className="min-h-[100px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none focus-visible:ring-blue-600"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
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

          {/* Study Material Editor */}
          {slug === 'study-material' && (
            <div className="space-y-8 text-left">
              {/* Section 1: Premium Learning Cards */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Access Premium Learning (Section 1)</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Main Title</Label>
                      <Input 
                        value={formData.premiumTitleMain || ""} 
                        onChange={(e) => updateField('premiumTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Title Highlight (Gradient)</Label>
                      <Input 
                        value={formData.premiumTitleHighlight || ""} 
                        onChange={(e) => updateField('premiumTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-8 text-left">
                    {(formData.premiumCards || []).map((card: any, cardIdx: number) => (
                      <div key={cardIdx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          <div className="space-y-3 text-left">
                            <Label className="text-xs font-black uppercase text-gray-400">Card Heading</Label>
                            <Input 
                              value={card.title} 
                              onChange={(e) => {
                                const newCards = [...formData.premiumCards];
                                newCards[cardIdx].title = e.target.value;
                                updateField('premiumCards', newCards);
                              }}
                              className="h-12 bg-white rounded-xl font-bold"
                            />
                          </div>
                          <div className="space-y-3 text-left">
                            <Label className="text-xs font-black uppercase text-gray-400">Icon Name (Lucide)</Label>
                            <Input 
                              value={card.icon} 
                              onChange={(e) => {
                                const newCards = [...formData.premiumCards];
                                newCards[cardIdx].icon = e.target.value;
                                updateField('premiumCards', newCards);
                              }}
                              className="h-12 bg-white rounded-xl"
                              placeholder="BookOpen, GraduationCap, etc."
                            />
                          </div>
                          <div className="md:col-span-2 space-y-3 text-left">
                            <Label className="text-xs font-black uppercase text-gray-400">Description</Label>
                            <Textarea 
                              value={card.description} 
                              onChange={(e) => {
                                const newCards = [...formData.premiumCards];
                                newCards[cardIdx].description = e.target.value;
                                updateField('premiumCards', newCards);
                              }}
                              className="h-20 bg-white rounded-xl resize-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          <div className="flex items-center justify-between text-left">
                            <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Accordion Items</Label>
                            <Button 
                              onClick={() => {
                                const newCards = [...formData.premiumCards];
                                newCards[cardIdx].accordions = [...(newCards[cardIdx].accordions || []), { title: "New Accordion", content: "" }];
                                updateField('premiumCards', newCards);
                              }}
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-lg text-xs font-bold"
                            >
                              <Plus className="w-3.5 h-3.5 mr-1" /> Add Item
                            </Button>
                          </div>
                          <div className="space-y-3 text-left">
                            {(card.accordions || []).map((acc: any, accIdx: number) => (
                              <div key={accIdx} className="p-4 bg-white rounded-2xl border border-gray-100 relative group/acc">
                                <div className="space-y-3 text-left">
                                  <Input 
                                    value={acc.title} 
                                    onChange={(e) => {
                                      const newCards = [...formData.premiumCards];
                                      newCards[cardIdx].accordions[accIdx].title = e.target.value;
                                      updateField('premiumCards', newCards);
                                    }}
                                    className="h-9 text-xs font-bold border-none bg-gray-50 rounded-lg"
                                    placeholder="Accordion Title"
                                  />
                                  <Textarea 
                                    value={acc.content} 
                                    onChange={(e) => {
                                      const newCards = [...formData.premiumCards];
                                      newCards[cardIdx].accordions[accIdx].content = e.target.value;
                                      updateField('premiumCards', newCards);
                                    }}
                                    className="min-h-[60px] text-xs border-none bg-gray-50 rounded-lg resize-none"
                                    placeholder="Accordion Content"
                                  />
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => {
                                    const newCards = [...formData.premiumCards];
                                    newCards[cardIdx].accordions = newCards[cardIdx].accordions.filter((_: any, i: number) => i !== accIdx);
                                    updateField('premiumCards', newCards);
                                  }}
                                  className="absolute top-2 right-2 h-6 w-6 text-gray-200 hover:text-red-500 opacity-0 group-hover/acc:opacity-100 transition-opacity"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Section 2: Download Free Study Materials Headers */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Free Resource Hub (Section 2)</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Hub Title Main</Label>
                      <Input 
                        value={formData.materialsTitleMain || ""} 
                        onChange={(e) => updateField('materialsTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Hub Title Highlight</Label>
                      <Input 
                        value={formData.materialsTitleHighlight || ""} 
                        onChange={(e) => updateField('materialsTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Hub Subtitle</Label>
                    <Input 
                      value={formData.materialsSubtitle || ""} 
                      onChange={(e) => updateField('materialsSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                  <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-xs text-blue-800/70 font-medium text-left">
                      Note: The study material items (PDFs, subjects, etc.) are managed through the top-level <Link href="/admin/study-materials" className="font-bold underline text-blue-600">Study Materials</Link> menu in the sidebar.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results Page Editor */}
          {slug === 'results' && (
            <div className="space-y-8 text-left">
              {/* Hero Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Headline</Label>
                    <Input 
                      value={formData.heroTitle || ""} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                    />
                  </div>
                  <div className="space-y-4 text-left">
                    <Label className="text-sm font-bold text-gray-700">Banner Image</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                      <div className="space-y-4 text-left">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                          onClick={() => document.getElementById('results-hero-upload')?.click()}
                        >
                          <Upload className="w-4 h-4" /> Choose Image
                        </Button>
                        <input 
                          id="results-hero-upload"
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                        />
                      </div>
                      {(formData.heroImageUrl || defaultPageData.results.heroImageUrl) && (
                        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                          <Image 
                            src={formData.heroImageUrl || defaultPageData.results.heroImageUrl} 
                            alt="Hero Preview" 
                            fill 
                            className="object-cover" 
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Success Stats Section */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Success Stats Section</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-10 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Title Main</Label>
                      <Input 
                        value={formData.successTitleMain || ""} 
                        onChange={(e) => updateField('successTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Title Highlight</Label>
                      <Input 
                        value={formData.successTitleHighlight || ""} 
                        onChange={(e) => updateField('successTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Subtitle</Label>
                    <Input 
                      value={formData.successSubtitle || ""} 
                      onChange={(e) => updateField('successSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>

                  <div className="space-y-6 text-left">
                    <div className="flex items-center justify-between text-left">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Statistics (3 Cards)</Label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      {(formData.successStats || defaultPageData.results.successStats).map((stat: any, idx: number) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Icon (Lucide)</Label>
                            <Input value={stat.icon} onChange={(e) => {
                              const newList = [...(formData.results.successStats || defaultPageData.results.successStats)];
                              newList[idx].icon = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Value</Label>
                            <Input value={stat.value} onChange={(e) => {
                              const newList = [...(formData.results.successStats || defaultPageData.results.successStats)];
                              newList[idx].value = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white font-bold" />
                          </div>
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Label</Label>
                            <Input value={stat.label} onChange={(e) => {
                              const newList = [...(formData.results.successStats || defaultPageData.results.successStats)];
                              newList[idx].label = e.target.value;
                              updateField('successStats', newList);
                            }} className="h-10 bg-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performers Grid Headers */}
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Performers Grid Headers</CardTitle>
                </CardHeader>
                <CardContent className="p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Main</Label>
                      <Input 
                        value={formData.performersTitleMain || ""} 
                        onChange={(e) => updateField('performersTitleMain', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Section Title Highlight</Label>
                      <Input 
                        value={formData.performersTitleHighlight || ""} 
                        onChange={(e) => updateField('performersTitleHighlight', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                      />
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Section Subtitle</Label>
                    <Input 
                      value={formData.performersSubtitle || ""} 
                      onChange={(e) => updateField('performersSubtitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Year Filter Header</Label>
                      <Input 
                        value={formData.performersYearHeader || ""} 
                        onChange={(e) => updateField('performersYearHeader', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="space-y-3 text-left">
                      <Label className="text-sm font-bold text-gray-700">Marks Label</Label>
                      <Input 
                        value={formData.totalMarksLabel || ""} 
                        onChange={(e) => updateField('totalMarksLabel', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug !== 'home' && slug !== 'about' && slug !== 'header' && slug !== 'footer' && slug !== 'study-material' && slug !== 'results' && (
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
