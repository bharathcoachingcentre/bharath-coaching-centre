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
  Trophy,
  Target,
  Lightbulb,
  Brain,
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
  Maximize2,
  User,
  Calendar,
  ClipboardList,
  BarChart,
  UserSquare2,
  Heart,
  Send,
  GripVertical,
  FileCheck,
  FileText
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
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
        id: "footer-menu-1",
        title: "Company",
        links: [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Results", href: "/our-results" },
          { label: "Contact Us", href: "/contact" },
        ]
      },
      {
        id: "footer-menu-2",
        title: "Courses",
        links: [
          { label: "CBSE Coaching", href: "/cbse" },
          { label: "Samacheer Coaching", href: "/samacheer" },
          { label: "Online Classes", href: "/online-courses" },
          { label: "One-to-One Mentorship", href: "/one-to-one-classes" },
        ]
      },
      {
        id: "footer-menu-3",
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
      { name: "Sunita Patel", role: "Parent, Class 8", quote: "The academy's structured approach to learning is commendable. My daughter's confidence has increased significantly. The regular tests and feedback system keep her Wood and focused.", avatar: placeholderImages["student-5"].src, rating: 5 },
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
    heroImageUrl: "/study-materials-banner.jpg",
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
  "one-to-one-classes": {
    heroTitle: "One to One Classes",
    heroImageUrl: "/one-to-one.jpg",
    infoTag: "Information",
    headingMain: "One to One ",
    headingHighlight: "Classes",
    iconCards: [
      { icon: "User", title: "Personal concern", color: "bg-blue-500" },
      { icon: "Calendar", title: "Personalized schedule", color: "bg-teal-500" },
      { icon: "BookOpen", title: "Perfect Learning", color: "bg-purple-500" },
    ],
    benefitsTitle: "Our Benefits",
    benefits: [
      { text: "Customized time table", icon: "Calendar", color: "bg-blue-500" },
      { text: "18+ year experienced faculties", icon: "Users", color: "bg-teal-500" },
      { text: "Individual attention", icon: "UserCheck", color: "bg-purple-500" },
      { text: "Weekly test", icon: "ClipboardCheck", color: "bg-orange-500" },
      { text: "25% & 50% portion test", icon: "BarChart", color: "bg-pink-500" },
      { text: "Full mock test", icon: "GraduationCap", color: "bg-indigo-500" },
      { text: "Specialized study materials", icon: "BookOpen", color: "bg-blue-600" },
      { text: "Previous year question paper", icon: "FileText", color: "bg-teal-600" },
    ],
    formTag: "Book Now",
    formTitle: "Booking Form",
    formSubtitle: "Experience our personalized demo class today",
    nameLabel: "Full Name",
    phoneLabel: "Mobile Number",
    emailLabel: "Email Address",
    submitBtnText: "Book My Demo Session"
  },
  "study-material": {
    heroTitle: "Free Study Material",
    heroImageUrl: "/study-materials-banner.jpg",
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
          { title: "Model Board Question Papers", content: "Expertly drafted model papers following the state board guidelines." },
          { title: "Previous Years Board QP", content: "Review actual papers from previous years to gauge the difficulty and recurring topics." }
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
  },
  blog: {
    heroTitle: "Our Blog",
    heroImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&h=600",
    badgeText: "Latest Updates",
    headingMain: "Insights & ",
    headingHighlight: "Stories",
    description: "Insights, articles, and success stories from the heart of Bharath Academy.",
    layoutColumns: "2"
  },
  teachers: {
    heroTitle: "Become A Teacher",
    heroImageUrl: "/Teacher-banner-bcc.jpg",
    introTag: "Join Our Faculty",
    introTitleMain: "Shape The Future ",
    introTitleHighlight: "With Us",
    introDescription: "At Bharath Academy, we believe that everyone is an achiever. We are looking for dedicated educators who can deliver complex concepts through unique and interactive methods.",
    requirements: [
      { icon: "GraduationCap", title: "Expertise", description: "Deep subject matter expertise in your chosen field of instruction.", color: "bg-blue-50 shadow-blue-500/30" },
      { icon: "Users", title: "Patience", description: "Ability to connect with students of varying learning speeds and styles.", color: "bg-teal-50 shadow-teal-500/30" },
      { icon: "Heart", title: "Passion", description: "A genuine love for teaching and witnessing student breakthroughs.", color: "bg-purple-500 shadow-purple-500/30" },
      { icon: "Lightbulb", title: "Innovation", description: "Willingness to adopt and create unique teaching methodologies.", color: "bg-orange-500 shadow-orange-500/30" }
    ],
    applyTitle: "Ready To Start Your Journey?",
    applyDescription: "If you have the passion to transform a student into an achiever, we want to hear from you. Please send your detailed resume and a brief introduction to our team.",
    applyBtnText: "Apply Now"
  }
};

const iconMap: Record<string, any> = {
  Presentation,
  FilePenLine,
  MessagesSquare,
  BookOpen,
  Book,
  UserCheck,
  Zap,
  GraduationCap,
  Trophy,
  Target,
  Lightbulb,
  Brain,
  Users,
  TrendingUp,
  Award,
  Search,
  Info,
  Handshake,
  Layers,
  PieChart,
  ClipboardCheck,
  Medal,
  Crown,
  Star,
  ImageIcon,
  CalendarCheck,
  Clock,
  Laptop,
  Building,
  FileCheck,
  FileText,
  User,
  Calendar,
  ClipboardList,
  BarChart,
  UserSquare2,
  Heart,
  Send
};

export default function PageEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();
  
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [isIconLibraryOpen, setIsIconLibraryOpen] = useState(false);
  const [iconSearchQuery, setIconSearchQuery] = useState("");

  const docRef = useMemo(() => {
    if (!firestore || !slug) return null;
    return doc(firestore, "pages", slug);
  }, [firestore, slug]);

  const { data: pageData, loading } = useDoc(docRef);

  useEffect(() => {
    setFormData(null);
  }, [slug]);

  useEffect(() => {
    if (loading || formData) return;

    if (pageData) {
      if (slug === 'footer' && pageData.content?.menus) {
        const menusWithIds = pageData.content.menus.map((m: any, colIdx: number) => ({
          ...m,
          id: m.id || `footer-menu-${colIdx}`,
          links: (m.links || []).map((l: any, linkIdx: number) => ({
            ...l,
            id: l.id || `link-${colIdx}-${linkIdx}-${Math.random().toString(36).substring(2, 7)}`
          }))
        }));
        setFormData({ ...pageData.content, menus: menusWithIds });
      } else {
        setFormData(pageData.content || defaultPageData[slug] || {});
      }
    } else if (!loading) {
      setFormData(defaultPageData[slug] || {});
    }
  }, [pageData, loading, slug, formData]);

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

  const addMenuItem = () => {
    const newItems = [...(formData?.navMenu || [])];
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
    const newItems = (formData?.navMenu || []).filter((item: any) => item.id !== id && item.parentId !== id);
    updateField('navMenu', newItems);
  };

  const handleMenuReorder = (newItems: any[]) => {
    const reordered = newItems.map((item, idx) => ({ ...item, order: idx }));
    updateField('navMenu', reordered);
  };

  const rootMenuItems = useMemo(() => {
    return (formData?.navMenu || []).filter((item: any) => !item.parentId);
  }, [formData?.navMenu]);

  const allIconKeys = Object.keys(iconMap);
  const previewIcons = allIconKeys.slice(0, 15);
  const filteredIcons = allIconKeys.filter(key => 
    key.toLowerCase().includes(iconSearchQuery.toLowerCase())
  );

  if (loading || !formData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Loading Page Editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="ghost" onClick={() => router.push("/admin/pages")} className="text-gray-500 font-bold hover:text-blue-600 w-full sm:w-auto justify-start px-0 sm:px-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Pages
        </Button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold h-12 px-10 rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95 gap-2 w-full sm:w-auto justify-center"
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
            <CardContent className="p-6 sm:p-8 -mt-10 relative text-left">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-3xl border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center text-blue-600 shrink-0">
                  <Globe className="w-10 h-10" />
                </div>
                <div className="pt-10 flex-grow">
                  <h2 className="text-2xl font-black text-gray-900 leading-tight capitalize">
                    {slug.replace(/-/g, ' ')} Editor
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
              <CardHeader className="p-6 sm:p-8 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-400" /> Icon Library
                </CardTitle>
                <Dialog open={isIconLibraryOpen} onOpenChange={setIsIconLibraryOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-teal-400 hover:text-white hover:bg-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest gap-2">
                      <Maximize2 className="w-3 h-3" /> View All
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl rounded-[2.5rem] border-none shadow-2xl p-0 overflow-hidden bg-[#182d45] text-white">
                    <DialogHeader className="p-8 pb-4">
                      <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-teal-400" /> 
                        Lucide Icon Explorer
                      </DialogTitle>
                    </DialogHeader>
                    <div className="px-8 pb-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input 
                          placeholder="Search icon names (e.g. Trophy, Zap)..." 
                          value={iconSearchQuery}
                          onChange={(e) => setIconSearchQuery(e.target.value)}
                          className="h-12 bg-white/10 border-none rounded-xl pl-11 text-white placeholder:text-gray-500 focus-visible:ring-teal-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="h-[400px] px-8 pb-8">
                      {filteredIcons.length === 0 ? (
                        <div className="py-20 text-center text-gray-500">No icons match your search</div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                          {filteredIcons.map((iconName) => {
                            const Icon = iconMap[iconName];
                            return (
                              <div key={iconName} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-teal-500/50 transition-all group">
                                <Icon className="w-8 h-8 text-teal-400 transition-transform group-hover:scale-110" />
                                <span className="text-[10px] font-black uppercase tracking-tighter text-blue-200/60 text-center line-clamp-1">{iconName}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </ScrollArea>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-6 text-left">
                <p className="text-[10px] text-blue-200/60 font-black uppercase tracking-widest">Lucide Icon Reference</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {previewIcons.map((iconName) => {
                    const Icon = iconMap[iconName];
                    return (
                      <div key={iconName} className="flex flex-col items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                        <Icon className="w-5 h-5 text-teal-400" />
                        <span className="text-[8px] font-black uppercase tracking-tighter text-blue-200/60 text-center line-clamp-1">{iconName}</span>
                      </div>
                    );
                  })}
                </div>
                <Button 
                  onClick={() => setIsIconLibraryOpen(true)}
                  variant="link" 
                  className="w-full text-teal-400 font-bold text-[10px] uppercase tracking-[0.2em] h-auto p-0 hover:text-white"
                >
                  Show More Icons
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-8">
          {slug === 'header' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Branding & Identity</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8">
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
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2 w-full sm:w-auto"
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
                              className="text-red-500 hover:bg-red-50 rounded-xl h-12 w-full sm:w-auto"
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

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Navigation Menu</CardTitle>
                  <Button 
                    onClick={addMenuItem}
                    variant="outline"
                    className="rounded-xl font-bold h-10 gap-2 border-blue-100 text-blue-600 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" /> Add Item
                  </Button>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-4">
                  <p className="text-xs text-gray-400 font-medium mb-6">Drag handle to reorder. Use the "Parent Menu" selector to create dropdown submenus.</p>
                  
                  <Reorder.Group 
                    axis="y" 
                    values={formData?.navMenu || []} 
                    onReorder={handleMenuReorder}
                    className="space-y-3"
                  >
                    {(formData?.navMenu || []).map((item: any, idx: number) => (
                      <Reorder.Item key={item.id} value={item}>
                        <div className={cn(
                          "p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-2 sm:gap-4 transition-all duration-300 group",
                          item.parentId && "ml-4 sm:ml-12 border-l-4 border-l-blue-200 bg-blue-50/30 shadow-inner"
                        )}>
                          <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white rounded-lg transition-colors">
                            <GripVertical className="w-5 h-5 text-gray-300" />
                          </div>
                          
                          <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-4">
                            <div className="lg:col-span-3 space-y-1 text-left">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Title</Label>
                              <Input 
                                value={item.title} 
                                onChange={(e) => {
                                  const newList = [...(formData?.navMenu || [])];
                                  if (newList[idx]) {
                                    newList[idx].title = e.target.value;
                                    updateField('navMenu', newList);
                                  }
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
                                  const newList = [...(formData?.navMenu || [])];
                                  if (newList[idx]) {
                                    newList[idx].url = e.target.value;
                                    updateField('navMenu', newList);
                                  }
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
                                  const newList = [...(formData?.navMenu || [])];
                                  if (newList[idx]) {
                                    newList[idx].parentId = val === "none" ? null : val;
                                    updateField('navMenu', newList);
                                  }
                                }}
                              >
                                <SelectTrigger className="h-10 text-xs bg-white border-none rounded-lg">
                                  <SelectValue placeholder="No Parent" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl shadow-xl">
                                  <SelectItem value="none">None (Main Menu)</SelectItem>
                                  {rootMenuItems
                                    .filter((root: any) => root.id !== item.id)
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
                                  const newList = [...(formData?.navMenu || [])];
                                  if (newList[idx]) {
                                    newList[idx].subLabel = e.target.value;
                                    updateField('navMenu', newList);
                                  }
                                }}
                                className="h-10 text-[10px] bg-white border-none rounded-lg uppercase tracking-widest font-medium"
                                placeholder="e.g. Class 1-12"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              type="button"
                              onClick={() => deleteMenuItem(item.id)}
                              className="h-8 w-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Header CTA Button</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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

          {slug === 'footer' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Organization Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Footer Description</Label>
                    <Textarea 
                      value={formData.description || ""} 
                      onChange={(e) => updateField('description', e.target.value)}
                      className="min-h-[120px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none"
                    />
                  </div>
                </CardContent>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Footer Menu Columns</CardTitle>
                  <Button 
                    onClick={() => {
                      const currentMenus = formData.menus || [];
                      const id = `footer-menu-${Math.random().toString(36).substring(2, 9)}`;
                      updateField('menus', [...currentMenus, { id, title: "New Menu", links: [] }]);
                    }}
                    variant="outline"
                    className="rounded-xl font-bold gap-2 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" /> Add Column
                  </Button>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6">
                  <Reorder.Group 
                    axis="y" 
                    values={formData.menus || []} 
                    onReorder={(newMenus) => updateField('menus', newMenus)}
                    className="space-y-10"
                  >
                    {(formData.menus || []).map((menu: any, colIdx: number) => (
                      <Reorder.Item key={menu.id || `menu-${colIdx}`} value={menu}>
                        <div className="p-4 sm:p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-6 relative group/col flex flex-col sm:flex-row gap-4 items-start">
                          <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white rounded-lg transition-colors shrink-0 sm:mt-10">
                            <GripVertical className="w-5 h-5 text-gray-300" />
                          </div>
                          
                          <div className="flex-grow w-full space-y-6">
                            <div className="flex items-center justify-between">
                              <div className="space-y-2 flex-grow max-w-md">
                                <Label className="text-xs font-black uppercase text-gray-400">Column Title</Label>
                                <Input 
                                  value={menu.title} 
                                  onChange={(e) => {
                                    const newMenus = [...formData.menus];
                                    if (newMenus[colIdx]) {
                                      newMenus[colIdx].title = e.target.value;
                                      updateField('menus', newMenus);
                                    }
                                  }}
                                  className="bg-white border-none h-12 rounded-xl font-bold"
                                />
                              </div>
                              <button 
                                type="button"
                                onClick={() => {
                                  const newMenus = formData.menus.filter((_: any, i: number) => i !== colIdx);
                                  updateField('menus', newMenus);
                                }}
                                className="h-10 w-10 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between px-2 text-left">
                                <Label className="text-xs font-black uppercase text-gray-400">Links</Label>
                                <Button 
                                  variant="link" 
                                  size="sm" 
                                  onClick={() => {
                                    const newMenus = [...formData.menus];
                                    const newId = `link-${colIdx}-${newMenus[colIdx].links.length}-${Math.random().toString(36).substring(2, 7)}`;
                                    newMenus[colIdx].links.push({ id: newId, label: "New Link", href: "#" });
                                    updateField('menus', newMenus);
                                  }}
                                  className="h-auto p-0 font-bold text-blue-600"
                                >
                                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Link
                                </Button>
                              </div>
                              <Reorder.Group 
                                axis="y" 
                                values={menu.links || []} 
                                onReorder={(newLinks) => {
                                  const newMenus = [...formData.menus];
                                  newMenus[colIdx].links = newLinks;
                                  updateField('menus', newMenus);
                                }}
                                className="space-y-3"
                              >
                                {(menu.links || []).map((link: any, linkIdx: number) => (
                                  <Reorder.Item key={link.id || `link-${linkIdx}`} value={link}>
                                    <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm group/link relative">
                                      <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-50 rounded-lg transition-colors shrink-0">
                                        <GripVertical className="w-4 h-4 text-gray-300" />
                                      </div>
                                      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                                        <div className="space-y-1">
                                          <Label className="text-[10px] font-black uppercase text-gray-400">Label</Label>
                                          <Input 
                                            value={link.label} 
                                            onChange={(e) => {
                                              const newMenus = [...formData.menus];
                                              if (newMenus[colIdx] && newMenus[colIdx].links[linkIdx]) {
                                                newMenus[colIdx].links[linkIdx].label = e.target.value;
                                                updateField('menus', newMenus);
                                              }
                                            }}
                                            className="h-10 text-sm font-bold border-none bg-gray-50 rounded-lg"
                                            placeholder="Label"
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-[10px] font-black uppercase text-gray-400">URL</Label>
                                          <Input 
                                            value={link.href} 
                                            onChange={(e) => {
                                              const newMenus = [...formData.menus];
                                              if (newMenus[colIdx] && newMenus[colIdx].links[linkIdx]) {
                                                newMenus[colIdx].links[linkIdx].href = e.target.value;
                                                updateField('menus', newMenus);
                                              }
                                            }}
                                            className="h-10 text-sm border-none bg-gray-50 rounded-lg"
                                            placeholder="URL"
                                          />
                                        </div>
                                      </div>
                                      <button 
                                        type="button"
                                        onClick={() => {
                                          const newMenus = [...formData.menus];
                                          newMenus[colIdx].links = newMenus[colIdx].links.filter((_: any, i: number) => i !== linkIdx);
                                          updateField('menus', newMenus);
                                        }}
                                        className="h-8 w-8 flex items-center justify-center text-gray-200 hover:text-red-500 shrink-0 transition-colors"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </Reorder.Item>
                                ))}
                              </Reorder.Group>
                            </div>
                          </div>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Contact & Support</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
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
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Social & App Links</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-10">
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

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Copyright & Legal Links</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-10 text-left">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                      <Label className="text-xs font-black uppercase tracking-widest text-gray-400">Legal Links (Bottom Row)</Label>
                      <Button 
                        onClick={() => {
                          const currentLinks = formData.bottomLinks || [];
                          updateField('bottomLinks', [...currentLinks, { label: "New Link", href: "#" }]);
                        }}
                        variant="outline"
                        size="sm"
                        className="rounded-xl font-bold gap-2 text-blue-600 border-blue-100 w-full sm:w-auto"
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
                                if (newLinks[linkIdx]) {
                                  newLinks[linkIdx].label = e.target.value;
                                  updateField('bottomLinks', newLinks);
                                }
                              }}
                              className="h-10 text-sm font-bold border-none bg-white rounded-lg"
                              placeholder="Label"
                            />
                            <Input 
                              value={link.href} 
                              onChange={(e) => {
                                const newLinks = [...formData.bottomLinks];
                                if (newLinks[linkIdx]) {
                                  newLinks[linkIdx].href = e.target.value;
                                  updateField('bottomLinks', newLinks);
                                }
                              }}
                              className="h-10 text-sm border-none bg-white rounded-lg"
                              placeholder="URL"
                            />
                          </div>
                          <button 
                            type="button"
                            onClick={() => {
                              const newLinks = formData.bottomLinks.filter((_: any, i: number) => i !== linkIdx);
                              updateField('bottomLinks', newLinks);
                            }}
                            className="h-10 w-10 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug === 'one-to-one-classes' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Banner Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8">
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700">Banner Image</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 transition-all flex items-center gap-2 w-full sm:w-auto"
                            onClick={() => document.getElementById('hero-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Upload Image
                          </Button>
                          <input 
                            id="hero-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                          />
                        </div>
                        <Input 
                          value={formData.heroImageUrl || ""} 
                          onChange={(e) => updateField('heroImageUrl', e.target.value)}
                          placeholder="Image URL"
                          className="h-12 bg-gray-50 border-none rounded-xl px-6"
                        />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                        <Image 
                          src={formData.heroImageUrl || "/one-to-one.jpg"} 
                          alt="Hero Preview" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Information Tag Text</Label>
                      <Input 
                        value={formData.infoTag || ""} 
                        onChange={(e) => updateField('infoTag', e.target.value)}
                        className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Heading Main</Label>
                        <Input 
                          value={formData.headingMain || ""} 
                          onChange={(e) => updateField('headingMain', e.target.value)}
                          className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Heading Highlight</Label>
                        <Input 
                          value={formData.headingHighlight || ""} 
                          onChange={(e) => updateField('headingHighlight', e.target.value)}
                          className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Feature Cards (3 Cards)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(formData.iconCards || defaultPageData['one-to-one-classes'].iconCards).map((card: any, idx: number) => (
                      <div key={idx} className="p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Card {idx + 1} Icon (Lucide)</Label>
                          <Input 
                            value={card.icon} 
                            onChange={(e) => {
                              const newCards = [...(formData.iconCards || defaultPageData['one-to-one-classes'].iconCards)];
                              newCards[idx].icon = e.target.value;
                              updateField('iconCards', newCards);
                            }}
                            className="h-10 bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Card {idx + 1} Title</Label>
                          <Input 
                            value={card.title} 
                            onChange={(e) => {
                              const newCards = [...(formData.iconCards || defaultPageData['one-to-one-classes'].iconCards)];
                              newCards[idx].title = e.target.value;
                              updateField('iconCards', newCards);
                            }}
                            className="h-10 bg-white font-bold"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Benefits Section</CardTitle>
                  <Button 
                    onClick={() => {
                      const current = formData.benefits || [];
                      updateField('benefits', [...current, { text: "New Benefit", icon: "CheckCircle", color: "bg-blue-500", id: Math.random().toString(36).substring(7) }]);
                    }}
                    variant="outline"
                    className="rounded-xl font-bold h-10 gap-2 border-blue-100 text-blue-600 w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" /> Add Benefit
                  </Button>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-6">
                  <div className="space-y-3 max-w-md mb-8">
                    <Label className="text-sm font-bold text-gray-700">Section Heading</Label>
                    <Input 
                      value={formData.benefitsTitle || "Our Benefits"} 
                      onChange={(e) => updateField('benefitsTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                    />
                  </div>

                  <Reorder.Group 
                    axis="y" 
                    values={formData.benefits || []} 
                    onReorder={(newItems) => updateField('benefits', newItems)}
                    className="space-y-3"
                  >
                    {(formData.benefits || []).map((benefit: any, idx: number) => (
                      <Reorder.Item key={benefit.id || idx} value={benefit}>
                        <div className="p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 transition-all duration-300 group">
                          <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white rounded-lg transition-colors">
                            <GripVertical className="w-5 h-5 text-gray-300" />
                          </div>
                          
                          <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
                            <div className="md:col-span-3 space-y-1">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Icon (Lucide)</Label>
                              <Input 
                                value={benefit.icon} 
                                onChange={(e) => {
                                  const newList = [...(formData.benefits || [])];
                                  if (newList[idx]) {
                                    newList[idx].icon = e.target.value;
                                    updateField('benefits', newList);
                                  }
                                }}
                                className="h-10 text-sm bg-white border-none rounded-lg"
                              />
                            </div>
                            <div className="md:col-span-9 space-y-1">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Benefit Text</Label>
                              <Input 
                                value={benefit.text} 
                                onChange={(e) => {
                                  const newList = [...(formData.benefits || [])];
                                  if (newList[idx]) {
                                    newList[idx].text = e.target.value;
                                    updateField('benefits', newList);
                                  }
                                }}
                                className="h-10 text-sm font-bold bg-white border-none rounded-lg"
                              />
                            </div>
                          </div>

                          <button 
                            type="button"
                            onClick={() => {
                              const newList = (formData.benefits || []).filter((_: any, i: number) => i !== idx);
                              updateField('benefits', newList);
                            }}
                            className="h-10 w-10 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Booking Form Configuration</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Form Tag</Label>
                      <Input value={formData.formTag || ""} onChange={(e) => updateField('formTag', e.target.value)} className="h-12 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Form Title</Label>
                      <Input value={formData.formTitle || ""} onChange={(e) => updateField('formTitle', e.target.value)} className="h-12 bg-gray-50 rounded-xl font-bold" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Form Subtitle</Label>
                      <Input value={formData.formSubtitle || ""} onChange={(e) => updateField('formSubtitle', e.target.value)} className="h-12 bg-gray-50 rounded-xl" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-50">
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Name Field Label</Label>
                      <Input value={formData.nameLabel || ""} onChange={(e) => updateField('nameLabel', e.target.value)} className="h-12 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Phone Field Label</Label>
                      <Input value={formData.phoneLabel || ""} onChange={(e) => updateField('phoneLabel', e.target.value)} className="h-12 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Email Field Label</Label>
                      <Input value={formData.emailLabel || ""} onChange={(e) => updateField('emailLabel', e.target.value)} className="h-12 bg-gray-50 rounded-xl" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-xs font-bold text-gray-400 uppercase">Submit Button Text</Label>
                      <Input value={formData.submitBtnText || ""} onChange={(e) => updateField('submitBtnText', e.target.value)} className="h-12 bg-gray-50 rounded-xl font-bold" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug === 'study-material' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
                      <div className="space-y-3 text-left">
                        <Label className="text-xs font-black uppercase text-gray-400">Upload Banner</Label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2 w-full sm:w-auto"
                            onClick={() => document.getElementById('study-hero-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Choose Image
                          </Button>
                          <input 
                            id="study-hero-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                          />
                        </div>
                        <p className="text-[10px] text-gray-400 italic text-left">Select a wide photo for the main page header.</p>
                      </div>
                      {(formData.heroImageUrl || defaultPageData['study-material'].heroImageUrl) && (
                        <div className="space-y-2 text-left">
                          <Label className="text-xs font-black uppercase text-gray-400">Preview</Label>
                          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                            <Image 
                              src={formData.heroImageUrl || defaultPageData['study-material'].heroImageUrl} 
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

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Access Premium Learning (Section 1)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-10 text-left">
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
                      <div key={cardIdx} className="p-4 sm:p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-6 relative group">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          <div className="space-y-3 text-left">
                            <Label className="text-xs font-black uppercase text-gray-400">Card Heading</Label>
                            <Input 
                              value={card.title} 
                              onChange={(e) => {
                                const newCards = [...formData.premiumCards];
                                if (newCards[cardIdx]) {
                                  newCards[cardIdx].title = e.target.value;
                                  updateField('premiumCards', newCards);
                                }
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
                                if (newCards[cardIdx]) {
                                  newCards[cardIdx].icon = e.target.value;
                                  updateField('premiumCards', newCards);
                                }
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
                                if (newCards[cardIdx]) {
                                  newCards[cardIdx].description = e.target.value;
                                  updateField('premiumCards', newCards);
                                }
                              }}
                              className="h-20 bg-white rounded-xl resize-none"
                            />
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
                            <Label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Accordion Items</Label>
                            <Button 
                              onClick={() => {
                                const newCards = [...formData.premiumCards];
                                if (newCards[cardIdx]) {
                                  newCards[cardIdx].accordions = [...(newCards[cardIdx].accordions || []), { title: "New Accordion", content: "" }];
                                  updateField('premiumCards', newCards);
                                }
                              }}
                              variant="outline"
                              size="sm"
                              className="h-8 rounded-lg text-xs font-bold w-full sm:w-auto"
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
                                      if (newCards[cardIdx] && newCards[cardIdx].accordions[accIdx]) {
                                        newCards[cardIdx].accordions[accIdx].title = e.target.value;
                                        updateField('premiumCards', newCards);
                                      }
                                    }}
                                    className="h-9 text-xs font-bold border-none bg-gray-50 rounded-lg"
                                    placeholder="Accordion Title"
                                  />
                                  <Textarea 
                                    value={acc.content} 
                                    onChange={(e) => {
                                      const newCards = [...formData.premiumCards];
                                      if (newCards[cardIdx] && newCards[cardIdx].accordions[accIdx]) {
                                        newCards[cardIdx].accordions[accIdx].content = e.target.value;
                                        updateField('premiumCards', newCards);
                                      }
                                    }}
                                    className="min-h-[60px] text-xs border-none bg-gray-50 rounded-lg resize-none"
                                    placeholder="Accordion Content"
                                  />
                                </div>
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newCards = [...formData.premiumCards];
                                    if (newCards[cardIdx]) {
                                      newCards[cardIdx].accordions = newCards[cardIdx].accordions.filter((_: any, i: number) => i !== accIdx);
                                      updateField('premiumCards', newCards);
                                    }
                                  }}
                                  className="absolute top-2 right-2 h-6 w-6 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Free Resource Hub (Section 2)</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
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

          {slug === 'results' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
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
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2 w-full sm:w-auto"
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

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Success Stats Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-10 text-left">
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
                        <div key={idx} className="p-4 sm:p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Icon (Lucide)</Label>
                            <Input value={stat.icon} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.results.successStats)];
                              if (newList[idx]) {
                                newList[idx].icon = e.target.value;
                                updateField('successStats', newList);
                              }
                            }} className="h-10 bg-white" />
                          </div>
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Value</Label>
                            <Input value={stat.value} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.results.successStats)];
                              if (newList[idx]) {
                                newList[idx].value = e.target.value;
                                updateField('successStats', newList);
                              }
                            }} className="h-10 bg-white font-bold" />
                          </div>
                          <div className="space-y-2 text-left">
                            <Label className="text-[10px] font-black uppercase">Label</Label>
                            <Input value={stat.label} onChange={(e) => {
                              const newList = [...(formData.successStats || defaultPageData.results.successStats)];
                              if (newList[idx]) {
                                newList[idx].label = e.target.value;
                                updateField('successStats', newList);
                              }
                            }} className="h-10 bg-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Performers Grid Headers</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
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

          {slug === 'teachers' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
                  <div className="space-y-3 text-left">
                    <Label className="text-sm font-bold text-gray-700">Page Headline</Label>
                    <Input 
                      value={formData.heroTitle || ""} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-gray-900"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700">Banner Image</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 transition-all flex items-center gap-2"
                            onClick={() => document.getElementById('teacher-hero-upload')?.click()}
                          >
                            <Upload className="w-4 h-4" /> Upload Banner
                          </Button>
                          <input 
                            id="teacher-hero-upload"
                            type="file" 
                            accept="image/*"
                            className="hidden" 
                            onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                          />
                        </div>
                        <Input value={formData.heroImageUrl || ""} onChange={(e) => updateField('heroImageUrl', e.target.value)} className="bg-gray-50 border-none h-12 rounded-xl px-6" placeholder="Image URL" />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                        <Image src={formData.heroImageUrl || "/Teacher-banner-bcc.jpg"} alt="Hero Preview" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Intro Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Intro Tag Text</Label>
                      <Input value={formData.introTag || ""} onChange={(e) => updateField('introTag', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Title Main</Label>
                        <Input value={formData.introTitleMain || ""} onChange={(e) => updateField('introTitleMain', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Title Highlight</Label>
                        <Input value={formData.introTitleHighlight || ""} onChange={(e) => updateField('introTitleHighlight', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Recruitment Description</Label>
                    <Textarea value={formData.introDescription || ""} onChange={(e) => updateField('introDescription', e.target.value)} className="min-h-[120px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Core Requirements</CardTitle>
                  <Button 
                    onClick={() => {
                      const current = formData.requirements || [];
                      updateField('requirements', [...current, { title: "New Criterion", icon: "Award", description: "", color: "bg-blue-50 shadow-blue-500/30", id: Math.random().toString(36).substring(7) }]);
                    }}
                    variant="outline"
                    className="rounded-xl font-bold h-10 gap-2 border-blue-100 text-blue-600"
                  >
                    <Plus className="w-4 h-4" /> Add Criterion
                  </Button>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-6">
                  <Reorder.Group axis="y" values={formData.requirements || []} onReorder={(newItems) => updateField('requirements', newItems)} className="space-y-4">
                    {(formData.requirements || []).map((req: any, idx: number) => (
                      <Reorder.Item key={req.id || idx} value={req}>
                        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-4 group">
                          <div className="cursor-grab active:cursor-grabbing p-2 hover:bg-white rounded-lg transition-colors">
                            <GripVertical className="w-5 h-5 text-gray-300" />
                          </div>
                          <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 text-left">
                            <div className="md:col-span-3 space-y-1">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Icon (Lucide)</Label>
                              <Input value={req.icon} onChange={(e) => {
                                const list = [...formData.requirements];
                                if (list[idx]) {
                                  list[idx].icon = e.target.value;
                                  updateField('requirements', list);
                                }
                              }} className="h-10 bg-white" />
                            </div>
                            <div className="md:col-span-3 space-y-1">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Label</Label>
                              <Input value={req.title} onChange={(e) => {
                                const list = [...formData.requirements];
                                if (list[idx]) {
                                  list[idx].title = e.target.value;
                                  updateField('requirements', list);
                                }
                              }} className="h-10 bg-white font-bold" />
                            </div>
                            <div className="md:col-span-6 space-y-1">
                              <Label className="text-[10px] font-black uppercase text-gray-400">Description</Label>
                              <Input value={req.description} onChange={(e) => {
                                const list = [...formData.requirements];
                                if (list[idx]) {
                                  list[idx].description = e.target.value;
                                  updateField('requirements', list);
                                }
                              }} className="h-10 bg-white" />
                            </div>
                          </div>
                          <button onClick={() => {
                            const list = formData.requirements.filter((_: any, i: number) => i !== idx);
                            updateField('requirements', list);
                          }} className="h-10 w-10 flex items-center justify-center text-gray-200 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </Reorder.Item>
                    ))}
                  </Reorder.Group>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Apply Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Title</Label>
                    <Input value={formData.applyTitle || ""} onChange={(e) => updateField('applyTitle', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Description</Label>
                    <Textarea value={formData.applyDescription || ""} onChange={(e) => updateField('applyDescription', e.target.value)} className="min-h-[120px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600" />
                  </div>
                  <div className="space-y-3 max-w-md">
                    <Label className="text-sm font-bold text-gray-700">Button Label</Label>
                    <Input value={formData.applyBtnText || ""} onChange={(e) => updateField('applyBtnText', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug === 'blog' && (
            <div className="space-y-8 text-left">
              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Hero Section</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Banner Heading</Label>
                    <Input 
                      value={formData.heroTitle || ""} 
                      onChange={(e) => updateField('heroTitle', e.target.value)}
                      className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-bold text-gray-700">Banner Image</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                      <div className="space-y-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="h-12 border-dashed border-gray-300 rounded-xl px-6 font-bold text-gray-500 hover:bg-blue-50 transition-all flex items-center gap-2 w-full sm:w-auto"
                          onClick={() => document.getElementById('blog-banner-upload')?.click()}
                        >
                          <Upload className="w-4 h-4" /> Upload Banner
                        </Button>
                        <input 
                          id="blog-banner-upload"
                          type="file" 
                          accept="image/*"
                          className="hidden" 
                          onChange={(e) => handleImageUpload(e, (b64) => updateField('heroImageUrl', b64))}
                        />
                        <Input 
                          value={formData.heroImageUrl || ""} 
                          onChange={(e) => updateField('heroImageUrl', e.target.value)}
                          placeholder="Image URL"
                          className="h-12 bg-gray-50 border-none rounded-xl px-6"
                        />
                      </div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 shadow-md">
                        <Image src={formData.heroImageUrl || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200&h=600"} alt="Banner Preview" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Blog Listing Header</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 space-y-8 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold text-gray-700">Badge Text</Label>
                      <Input value={formData.badgeText || ""} onChange={(e) => updateField('badgeText', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-medium" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Heading Main</Label>
                        <Input value={formData.headingMain || ""} onChange={(e) => updateField('headingMain', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold" />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-bold text-gray-700">Highlight</Label>
                        <Input value={formData.headingHighlight || ""} onChange={(e) => updateField('headingHighlight', e.target.value)} className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-sm font-bold text-gray-700">Section Description</Label>
                    <Textarea value={formData.description || ""} onChange={(e) => updateField('description', e.target.value)} className="min-h-[120px] bg-gray-50 border-none rounded-[20px] p-6 font-medium text-gray-600 resize-none" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
                <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                  <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Listing Layout</CardTitle>
                </CardHeader>
                <CardContent className="p-6 sm:p-10 pt-6 text-left">
                  <div className="space-y-3 max-w-xs">
                    <Label className="text-sm font-bold text-gray-700">Columns (Large Screens)</Label>
                    <Select value={formData.layoutColumns || "2"} onValueChange={(val) => updateField('layoutColumns', val)}>
                      <SelectTrigger className="h-14 bg-gray-50 border-none rounded-xl px-6 font-bold">
                        <SelectValue placeholder="Select Columns" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 Columns</SelectItem>
                        <SelectItem value="3">3 Columns</SelectItem>
                        <SelectItem value="4">4 Columns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {slug !== 'home' && slug !== 'about' && slug !== 'header' && slug !== 'footer' && slug !== 'study-material' && slug !== 'results' && slug !== 'one-to-one-classes' && slug !== 'teachers' && slug !== 'blog' && (
            <Card className="border-none shadow-xl rounded-[32px] overflow-hidden bg-white">
              <CardHeader className="p-6 sm:p-10 pb-0 text-left">
                <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">Generic Content Editor</CardTitle>
              </CardHeader>
              <CardContent className="p-6 sm:p-10 pt-6 text-center py-20">
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
