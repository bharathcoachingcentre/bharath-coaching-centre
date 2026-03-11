
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  Book,
  Laptop,
  Building,
  Users,
  Award,
  TrendingUp,
  CalendarCheck,
  Clock,
  Presentation,
  FilePenLine,
  MessagesSquare,
  BookOpen,
  UserCheck,
  Download,
  Star,
  Zap,
  UserPlus,
  Calendar,
  PieChart,
  ClipboardCheck,
  ChevronDown,
  Layers,
  Handshake,
  Check,
  Loader2,
  Medal,
  Trophy,
  Search,
  Crown,
  CheckCircle2,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import placeholderImages from "@/app/lib/placeholder-images.json";
import { useFirestore, useCollection, useDoc } from "@/firebase";
import { collection, query, orderBy, doc, where } from "firebase/firestore";

const materialStyles = [
  {
    themeColor: "bg-blue-600",
    hoverThemeColor: "hover:bg-blue-700",
    lightBg: "bg-blue-50/50",
    iconContainerBg: "bg-blue-100/50",
    borderColor: "border-blue-100",
    hoverBorderColor: "hover:border-blue-300",
    iconColor: "text-blue-600",
  },
  {
    themeColor: "bg-teal-600",
    hoverThemeColor: "hover:bg-teal-700",
    lightBg: "bg-teal-50/50",
    iconContainerBg: "bg-teal-100/50",
    borderColor: "border-teal-100",
    hoverBorderColor: "hover:border-teal-300",
    iconColor: "text-teal-600",
  },
  {
    themeColor: "bg-purple-600",
    hoverThemeColor: "hover:bg-purple-700",
    lightBg: "bg-purple-50/50",
    iconContainerBg: "bg-purple-100/50",
    borderColor: "border-purple-100",
    hoverBorderColor: "hover:border-purple-300",
    iconColor: "text-purple-600",
  },
  {
    themeColor: "bg-orange-600",
    hoverThemeColor: "hover:bg-orange-700",
    lightBg: "bg-orange-50/50",
    iconContainerBg: "bg-orange-100/50",
    borderColor: "border-orange-100",
    hoverBorderColor: "hover:border-orange-300",
    iconColor: "text-orange-600",
  },
  {
    themeColor: "bg-pink-600",
    hoverThemeColor: "hover:bg-pink-700",
    lightBg: "bg-pink-50/50",
    iconContainerBg: "bg-pink-100/50",
    borderColor: "border-pink-100",
    hoverBorderColor: "hover:border-pink-300",
    iconColor: "text-pink-600",
  },
  {
    themeColor: "bg-indigo-600",
    hoverThemeColor: "hover:bg-indigo-700",
    lightBg: "bg-indigo-50/50",
    iconContainerBg: "bg-indigo-100/50",
    borderColor: "border-indigo-100",
    hoverBorderColor: "hover:border-indigo-300",
    iconColor: "text-indigo-600",
  },
  {
    themeColor: "bg-green-600",
    hoverThemeColor: "hover:bg-green-700",
    lightBg: "bg-green-50/50",
    iconContainerBg: "bg-green-100/50",
    borderColor: "border-green-100",
    hoverBorderColor: "hover:border-green-300",
    iconColor: "text-green-600",
  },
  {
    themeColor: "bg-amber-600",
    hoverThemeColor: "hover:bg-amber-700",
    lightBg: "bg-orange-50/50",
    iconContainerBg: "bg-amber-100/50",
    borderColor: "border-amber-100",
    hoverBorderColor: "hover:border-amber-300",
    iconColor: "text-amber-600",
  },
];

const whyChooseStyles = [
  { bg: "bg-blue-50/50", iconBg: "bg-blue-600", shadow: "shadow-blue-500/20", border: "border-blue-100", hoverBorder: "hover:border-blue-600" },
  { bg: "bg-teal-50/50", iconBg: "bg-teal-500", shadow: "shadow-teal-500/20", border: "border-teal-100", hoverBorder: "hover:border-teal-500" },
  { bg: "bg-purple-50/50", iconBg: "bg-purple-600", shadow: "shadow-purple-500/20", border: "border-purple-100", hoverBorder: "hover:border-purple-600" },
  { bg: "bg-orange-50/50", iconBg: "bg-orange-600", shadow: "shadow-orange-500/20", border: "border-orange-100", hoverBorder: "hover:border-orange-600" },
  { bg: "bg-pink-50/50", iconBg: "bg-pink-600", shadow: "shadow-pink-500/20", border: "border-pink-100", hoverBorder: "hover:border-pink-600" },
  { bg: "bg-indigo-50/50", iconBg: "bg-indigo-600", shadow: "shadow-indigo-500/20", border: "border-indigo-100", hoverBorder: "hover:border-indigo-600" },
];

const iconMap: Record<string, any> = {
  Users: Users,
  TrendingUp: TrendingUp,
  Award: Award,
  Presentation: Presentation,
  FilePenLine: FilePenLine,
  MessagesSquare: MessagesSquare,
  BookOpen: BookOpen,
  UserCheck: UserCheck,
  Zap: Zap,
  GraduationCap: GraduationCap,
  Search: Search,
  Star: Star,
  Laptop: Laptop,
  Building: Building,
  Info: Info,
  Handshake: Handshake,
  Layers: Layers,
  PieChart: PieChart,
  ClipboardCheck: ClipboardCheck,
  Trophy: Trophy,
  Medal: Medal,
  Crown: Crown,
};

export default function HomePage() {
  const firestore = useFirestore();
  const [activeBoard, setActiveBoard] = useState("cbse");
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const [activeScheduleBoard, setActiveScheduleBoard] = useState("cbse");
  const [selectedScheduleClass, setSelectedScheduleClass] = useState("Class 10");

  const pageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "home");
  }, [firestore]);
  const { data: homeContent } = useDoc(pageRef);

  const content = useMemo(() => {
    const defaults = {
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
        { name: "Priya Sharma", role: "Class 12, CBSE", quote: "The teachers at Bharath Academy are amazing! They kept me motivated throughout the year and were always available for doubt clearing.", avatar: placeholderImages["student-1"].src, rating: 5 },
        { name: "Rajesh Kumar", role: "Parent, Class 10", quote: "As a parent, I am very impressed with the regular updates and personalized attention my son receives.", avatar: placeholderImages["student-4"].src, rating: 5 },
        { name: "Arun Reddy", role: "Class 12, Samacheer", quote: "The study materials and practice worksheets are excellent. The mentorship helped me overcome my weaknesses.", avatar: placeholderImages["student-6"].src, rating: 5 },
      ],
      whyChooseTitle: "Why Choose Bharath Academy?",
      whyChooseSubtitle: "Comprehensive features designed for complete academic excellence",
      whyChooseFeatures: [
        { icon: "PieChart", title: "Parent Academic Tracking", desc: "Real-time updates on student's performance and progress through our parent portal.", color: "bg-blue-600 shadow-blue-600/30" },
        { icon: "UserCheck", title: "Daily Performance Monitoring", desc: "Track daily homework completion and class participation with notifications.", color: "bg-teal-50 shadow-teal-500/30" },
        { icon: "ClipboardCheck", title: "Weekly Tests & Evaluation", desc: "Regular assessments every week to measure progress and identify areas for improvement.", color: "bg-purple-500 shadow-purple-500/30" },
        { icon: "Zap", title: "Structured Test Hierarchy", desc: "Progressive testing from unit tests to mock exams, designed to build confidence.", color: "bg-orange-500 shadow-orange-500/30" },
        { icon: "Users", title: "Term-wise Parent Meetings", desc: "Scheduled meetings with teachers to discuss student progress and strategies.", color: "bg-pink-500 shadow-pink-500/30" },
        { icon: "BookOpen", title: "Specialized Learning Materials", desc: "Curated study materials specifically designed for CBSE and Samacheer curricula.", color: "bg-blue-500 shadow-blue-500/30" }
      ],
      successTitle: "Our Students' Success Stories",
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
      ]
    };

    if (!homeContent?.content) return defaults;

    return {
      ...defaults,
      ...homeContent.content
    };
  }, [homeContent]);

  const successYears = useMemo(() => {
    if (Array.isArray(content.successYears)) {
      return content.successYears.filter(Boolean);
    }
    if (typeof content.successYears === 'string') {
      return content.successYears.split(/[\n,\s]+/).map(s => s.trim()).filter(Boolean);
    }
    return ["2025", "2023"]; // Updated default fallback to be cleaner
  }, [content.successYears]);

  const periodsQuery = useMemo(() => firestore ? query(collection(firestore, 'periods'), orderBy('order', 'asc')) : null, [firestore]);
  const { data: allPeriods } = useCollection(periodsQuery);

  const materialsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'study-materials'), orderBy('createdAt', 'desc'));
  }, [firestore]);
  const { data: allMaterials, loading: materialsLoading } = useCollection(materialsQuery);

  const timetableQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'timetables'), orderBy('createdAt', 'desc'));
  }, [firestore]);
  const { data: allTimetables } = useCollection(timetableQuery);

  const classesLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'classes')) : null, [firestore]);
  const { data: allClassesLookup } = useCollection(classesLookupQuery);

  const subjectsLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'subjects')) : null, [firestore]);
  const { data: allSubjectsLookup } = useCollection(subjectsLookupQuery);

  const teachersLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'users'), where('role', '==', 'teacher')) : null, [firestore]);
  const { data: allTeachersLookup } = useCollection(teachersLookupQuery);

  const classesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'classes'));
  }, [firestore]);
  const { data: allClassesRaw } = useCollection(classesQuery);

  const availableClasses = useMemo(() => {
    if (!allClassesRaw) return [];
    return [...allClassesRaw]
      .filter(c => c.board?.toLowerCase() === activeBoard.toLowerCase())
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [allClassesRaw, activeBoard]);

  useEffect(() => {
    if (availableClasses.length > 0) {
      const exists = availableClasses.find(c => c.name === selectedClass);
      if (!exists) {
        setSelectedClass(availableClasses[0].name);
      }
    }
  }, [availableClasses, selectedClass]);

  const subjectsQuery_Look = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'subjects'), orderBy('name', 'asc'));
  }, [firestore]);
  const { data: allSubjectsRaw } = useCollection(subjectsQuery_Look);

  const availableSubjectsList = useMemo(() => {
    const base = ["All Subjects"];
    if (allSubjectsRaw) {
      return [...base, ...allSubjectsRaw.map(s => s.name)];
    }
    return base;
  }, [allSubjectsRaw]);

  const filteredSubjectsForDropdown = useMemo(() => {
    return availableSubjectsList.filter(s => 
      s.toLowerCase().includes(subjectSearch.toLowerCase())
    );
  }, [availableSubjectsList, subjectSearch]);

  const displayMaterials = useMemo(() => {
    if (!allMaterials) return [];
    
    return allMaterials
      .filter(m => {
        const matchesVisibility = m.isVisible !== false;
        const gradeId = allClassesLookup?.find(c => c.name === selectedClass)?.id;
        const matchesGrade = m.grade === selectedClass || m.grade === gradeId;
        const matchesBoard = !m.board || m.board.toLowerCase() === activeBoard.toLowerCase();
        const subjectId = allSubjectsLookup?.find(s => s.name === selectedSubject)?.id;
        const matchesSubject = selectedSubject === "All Subjects" || m.subject === selectedSubject || m.subject === subjectId;
        
        return matchesVisibility && matchesGrade && matchesBoard && matchesSubject;
      })
      .map((m, idx) => {
        const styleIdx = idx % materialStyles.length;
        const subjectName = allSubjectsLookup?.find(s => s.id === m.subject)?.name || m.subject;
        return {
          ...m,
          subject: subjectName,
          desc: m.description,
          ...materialStyles[styleIdx]
        };
      });
  }, [allMaterials, selectedClass, activeBoard, selectedSubject, allClassesLookup, allSubjectsLookup]);

  const timetableDisplayData = useMemo(() => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const slots = allPeriods?.map(p => p.label) || [
      "9:00 AM - 10:30 AM",
      "11:00 AM - 12:30 PM",
      "2:00 PM - 3:30 PM",
      "4:00 PM - 5:30 PM"
    ];

    const currentClassId = allClassesLookup?.find(c => c.name === selectedScheduleClass)?.id;
    const relevant = (allTimetables || []).filter(t => 
      t.board.toLowerCase() === activeScheduleBoard.toLowerCase() && 
      (t.grade === selectedScheduleClass || t.grade === currentClassId)
    );

    return days.map(day => {
      const daySlots = slots.map((timeLabel) => {
        const periodId = allPeriods?.find(p => p.label === timeLabel)?.id;
        const match = relevant.find(r => r.day === day && (r.timeSlot === timeLabel || r.timeSlot === periodId));
        
        if (match) {
          const subjectName = allSubjectsLookup?.find(s => s.id === match.subject)?.name || match.subject;
          const teacherName = allTeachersLookup?.find(t => t.id === match.teacher)?.displayName || match.teacher;
          
          let cardStyle = "bg-purple-100 border-purple-200 text-purple-900"; 
          const s = subjectName.toLowerCase();
          if (s.includes("math")) cardStyle = "bg-blue-100 border-blue-200 text-blue-900";
          else if (s.includes("science") && !s.includes("social")) cardStyle = "bg-emerald-100 border-emerald-200 text-emerald-900";
          else if (s.includes("english")) cardStyle = "bg-pink-100 border-pink-200 text-pink-900";
          else if (s.includes("social")) cardStyle = "bg-orange-100 border-orange-200 text-orange-900";

          return {
            s: subjectName,
            t: teacherName,
            c: cardStyle,
            tc: "text-[#4b5563]"
          };
        }
        return { s: "-", t: "-", c: "bg-gray-50 border-gray-100 text-gray-300", tc: "text-gray-300" };
      });
      return { day, slots: daySlots };
    });
  }, [allTimetables, activeScheduleBoard, selectedScheduleClass, allPeriods, allClassesLookup, allSubjectsLookup, allTeachersLookup]);

  const TimetableIcon = iconMap[content.timetableIcon] || Info;
  const SuccessCardIcon = iconMap[content.successCardIcon] || Star;
  const heroImageData = placeholderImages["hero-education"];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden h-auto min-h-[871px] lg:h-[871px] flex items-center bg-gradient-to-br from-[#EFF6FF] to-[#CCFBF1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-blob rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-blob rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6 text-left">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  {content.heroTitleMain}<span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.heroTitleHighlight}</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl lg:mx-0 font-normal">
                  {content.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="px-8 py-7 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-none">
                  <Link href={content.heroPrimaryBtnLink || "#"}>
                    <CalendarCheck className="mr-2 h-6 w-6" />
                    {content.heroPrimaryBtnText}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-7 bg-white text-gray-700 font-bold text-lg rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  <Link href={content.heroOutlineBtnLink || "#"}>
                    <Clock className="mr-2 h-6 w-6" />
                    {content.heroOutlineBtnText}
                  </Link>
                </Button>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {content.stats?.map((stat: any, i: number) => {
                    const Icon = iconMap[stat.icon] || Users;
                    const bgs = ["bg-blue-100", "bg-teal-100", "bg-purple-100"];
                    const colors = ["text-blue-600", "text-teal-600", "text-purple-600"];
                    return (
                      <div key={i} className="flex items-center justify-center lg:justify-start space-x-3">
                        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", bgs[i % bgs.length])}>
                          <Icon className={cn("w-6 h-6", colors[i % colors.length])} />
                        </div>
                        <div className="text-left">
                          <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                          <div className="text-sm text-gray-600 font-normal">{stat.label}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[650px] flex items-center justify-center">
              <Image
                src={heroImageData.src}
                alt={heroImageData.alt}
                width={heroImageData.width}
                height={heroImageData.height}
                className="w-full h-full object-contain relative z-10"
                priority
                data-ai-hint={heroImageData.hint}
              />

              <div className="absolute top-2 right-2 sm:top-8 sm:right-4 lg:right-8 floating-card bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <Book className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] sm:text-sm text-gray-500 font-bold">{content.heroCard1Label}</div>
                    <div className="text-xs sm:text-lg font-bold text-gray-900">{content.heroCard1Value}</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 left-2 sm:bottom-24 sm:left-4 lg:left-8 floating-card-delay-1 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="text-white w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] sm:text-sm text-gray-500 font-bold">{content.heroCard2Label}</div>
                    <div className="text-xs sm:text-lg font-bold text-gray-900">{content.heroCard2Value}</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-2 sm:-right-4 lg:right-0 transform -translate-y-1/2 floating-card-delay-2 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl p-2 sm:p-6 border border-white/50 z-20">
                <div className="space-y-1 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-50 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                      <Laptop className="text-white w-3 h-3 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-sm font-bold text-gray-900">{content.heroCard3Online}</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                      <Building className="text-white w-3 h-3 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-[10px] sm:text-sm font-bold text-gray-900">{content.heroCard3Offline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              {content.featuresTitle.includes('Excel') ? (
                <>
                  {content.featuresTitle.split('Excel')[0]}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Excel</span>
                </>
              ) : content.featuresTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              {content.featuresSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {(content.features || []).map((feature: any, idx: number) => {
              const Icon = iconMap[feature.icon] || Presentation;
              const defaultColors = [
                "bg-blue-500 shadow-blue-500/30",
                "bg-teal-500 shadow-teal-500/30",
                "bg-purple-500 shadow-purple-500/30",
                "bg-orange-500 shadow-orange-500/30",
                "bg-pink-500 shadow-pink-500/30",
              ];
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center space-y-4 transition-all duration-300"
                >
                  <div 
                    className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-shadow duration-300", feature.color || defaultColors[idx % defaultColors.length])}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-[24px] font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-[16px] leading-relaxed font-normal">{feature.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Study Materials Section */}
      <section id="study-materials-section" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              Download Free <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Study Materials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal text-center">
              Access comprehensive study resources for all subjects and classes
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mb-12">
              <div className="relative w-full max-w-xs mx-auto lg:mx-0 text-left">
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="appearance-none w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-blue-600 focus:outline-none shadow-sm bg-white cursor-pointer text-sm"
                >
                  {allClassesRaw?.filter(c => c.board?.toLowerCase() === activeBoard.toLowerCase())
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    )) || <option disabled>No classes available</option>}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl mx-auto w-fit">
                <button
                  onClick={() => setActiveBoard("cbse")}
                  className={cn(
                    "px-10 py-3.5 font-bold rounded-2xl transition-all duration-500 min-w-[140px] text-sm tracking-tight",
                    activeBoard === "cbse"
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl"
                      : "text-gray-500 hover:bg-gray-200"
                  )}
                >
                  CBSE
                </button>
                <button
                  onClick={() => setActiveBoard("samacheer")}
                  className={cn(
                    "px-10 py-3.5 font-bold rounded-2xl transition-all duration-500 min-w-[140px] text-sm tracking-tight",
                    activeBoard === "samacheer"
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-xl"
                      : "text-gray-500 hover:bg-gray-200"
                  )}
                >
                  Samacheer
                </button>
              </div>

              <div className="relative w-full max-w-xs mx-auto lg:ml-auto lg:mr-0 text-left">
                <Popover open={isSubjectOpen} onOpenChange={setIsSubjectOpen}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center justify-between w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-teal-600 focus:outline-none shadow-sm bg-white cursor-pointer text-sm">
                      <span className="truncate">{selectedSubject}</span>
                      <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", isSubjectOpen && "rotate-180")} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 rounded-xl border-gray-100 shadow-2xl" align="end">
                    <div className="p-3 border-b border-gray-50 text-left">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                        <Input 
                          placeholder="Search subjects..." 
                          value={subjectSearch}
                          onChange={(e) => setSubjectSearch(e.target.value)}
                          className="h-9 pl-9 border-none bg-gray-50 rounded-lg text-xs focus-visible:ring-teal-500"
                        />
                      </div>
                    </div>
                    <ScrollArea className="h-60">
                      <div className="p-1 text-left">
                        {filteredSubjectsForDropdown.length === 0 ? (
                          <div className="p-4 text-center text-xs text-gray-400">No subjects found</div>
                        ) : (
                          filteredSubjectsForDropdown.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => {
                                setSelectedSubject(sub);
                                setIsSubjectOpen(false);
                                setSubjectSearch("");
                              }}
                              className={cn(
                                "w-full text-left px-4 py-2.5 text-xs font-bold rounded-lg transition-colors",
                                selectedSubject === sub 
                                  ? "bg-teal-50 text-teal-600" 
                                  : "text-gray-600 hover:bg-gray-50"
                              )}
                            >
                              {sub}
                            </button>
                          ))
                        )}
                      </div>
                    </ScrollArea>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {materialsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-[#35a3be]" />
                <p className="font-bold">Loading Materials...</p>
              </div>
            ) : displayMaterials.length === 0 ? (
              <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold text-center">No study materials found for {selectedSubject} in {selectedClass} ({activeBoard.toUpperCase()}).</p>
                <p className="text-gray-400 text-sm mt-1 text-center">Please try another filter or check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayMaterials.map((material, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group rounded-[16px] p-6 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative flex flex-col h-full",
                      material.lightBg,
                      material.borderColor,
                      material.hoverBorderColor
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center relative", material.iconContainerBg)}>
                        <div className={cn("relative flex items-center justify-center", material.iconColor)}>
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                            <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" />
                          </svg>
                          <span className="absolute bottom-[6px] text-[8px] font-bold text-white tracking-tighter">PDF</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className={cn("px-3 py-1 text-white text-[12px] font-bold rounded-full shadow-sm", material.themeColor)}>{material.grade}</span>
                        {material.subject && (
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{material.subject}</span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2 tracking-tight text-left">{material.title}</h3>
                    <p className="text-[14px] text-gray-600 font-normal mb-4 flex-grow text-left line-clamp-3">{material.desc}</p>
                    <Button
                      asChild
                      className={cn(
                        "w-full text-white font-bold rounded-2xl h-14 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-auto border-none",
                        material.themeColor,
                        material.hoverThemeColor
                      )}
                    >
                      <a href={material.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-5 h-5" />
                        Download PDF
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section id="timetable-section" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              {content.timetableTitle.includes('Timetable') ? (
                <>
                  {content.timetableTitle.split('Timetable')[0]}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Timetable</span>
                </>
              ) : content.timetableTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal text-center">
              {content.timetableSubtitle}
            </p>
          </div>

          <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden bg-white p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mb-8 text-left">
              <div className="relative min-w-[180px] w-full lg:w-auto text-left">
                <select 
                  value={selectedScheduleClass}
                  onChange={(e) => setSelectedScheduleClass(e.target.value)}
                  className="appearance-none w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none shadow-sm bg-white cursor-pointer text-sm"
                >
                  {allClassesRaw?.filter(c => c.board?.toLowerCase() === activeScheduleBoard.toLowerCase())
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    )) || <option value="Class 10">Class 10</option>}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl mx-auto">
                <button
                  onClick={() => setActiveScheduleBoard("cbse")}
                  className={cn(
                    "px-10 py-3.5 font-semibold rounded-2xl transition-all duration-500 text-[16px] tracking-tight",
                    activeScheduleBoard === "cbse"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-lg"
                      : "text-[#374151] hover:bg-gray-200"
                  )}
                >
                  CBSE
                </button>
                <button
                  onClick={() => setActiveScheduleBoard("samacheer")}
                  className={cn(
                    "px-10 py-3.5 font-semibold rounded-2xl transition-all duration-500 text-[16px] tracking-tight",
                    activeScheduleBoard === "samacheer"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-lg"
                      : "text-[#374151] hover:bg-gray-200"
                  )}
                >
                  Samacheer
                </button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-[1.5rem] border border-gray-100 shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] text-white">
                    <th className="px-8 py-6 font-bold text-base whitespace-nowrap">Day / Time</th>
                    {(allPeriods?.length ? allPeriods : [
                      { label: "9:00 AM - 10:30 AM" },
                      { label: "11:00 AM - 12:30 PM" },
                      { label: "2:00 PM - 3:30 PM" },
                      { label: "4:00 PM - 5:30 PM" }
                    ]).map((p, idx) => (
                      <th key={idx} className="px-8 py-6 font-bold text-base text-center whitespace-nowrap border-l border-white/10">{p.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {timetableDisplayData.map((row) => (
                    <tr key={row.day} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-[#182d45]">{row.day}</td>
                      {row.slots.map((item, iIdx) => (
                        <td key={iIdx} className="px-4 py-4 text-center border-l border-gray-50">
                          <div className={cn("rounded-2xl p-4 transition-transform hover:scale-105 border shadow-sm", item.c)}>
                            <div className="font-bold text-[#182d45] text-sm">{item.s}</div>
                            <div className={cn("text-[11px] font-bold mt-1", item.tc)}>{item.t}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-8 md:p-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[3rem] border border-blue-100 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-inner text-left group">
              <div className="relative shrink-0">
                <div className="absolute -inset-4 bg-blue-600/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
                <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center shadow-2xl text-white transform group-hover:rotate-12 transition-transform duration-500">
                  <TimetableIcon className="w-8 h-8" />
                </div>
              </div>
              <div className="space-y-4 text-left">
                <h4 className="font-bold text-gray-900 text-2xl tracking-tight">Important Notes</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3 text-gray-600 text-sm font-medium leading-relaxed font-body">
                  {(content.timetableNotes || []).map((note: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0 shadow-sm shadow-blue-200"></div>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* One-to-One Mentorship Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-teal-500/10 rounded-[3rem] blur-2xl"></div>
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-white">
                <Image
                  src={content.mentorshipImageUrl || placeholderImages["one-to-one-mentorship"].src}
                  alt="Mentorship"
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  data-ai-hint="student mentorship"
                />
              </div>
            </div>

            <div className="space-y-10 order-1 lg:order-2 text-left">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {content.mentorshipTitleMain}<span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.mentorshipTitleHighlight}</span>
                </h2>
                <p className="mt-4 text-gray-500 font-medium">{content.mentorshipSubtitle}</p>
              </div>

              <div className="space-y-8">
                {(content.mentorshipFeatures || []).map((feature: any, idx: number) => {
                  const Icon = iconMap[feature.icon] || UserCheck;
                  const styles = [
                    { iconColor: "text-blue-600", bg: "bg-blue-50" },
                    { iconColor: "text-teal-600", bg: "bg-teal-50" },
                    { iconColor: "text-purple-600", bg: "bg-purple-50" },
                    { iconColor: "text-orange-600", bg: "bg-orange-50" },
                  ];
                  const style = styles[idx % styles.length];
                  return (
                    <div key={idx} className="flex items-start gap-6 group">
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform", style.bg)}>
                        <Icon className={cn("w-6 h-6", style.iconColor)} />
                      </div>
                      <div className="space-y-1 text-left">
                        <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-normal">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4">
                <Button asChild className="h-14 px-10 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 border-none transition-all active:scale-95 gap-2">
                  <Link href="/contact">
                    <CalendarCheck className="w-5 h-5" />
                    {content.mentorshipBtnText || "Book Personal Session"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight text-center">
              {content.testimonialsTitleMain || "What Students & "}<span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.testimonialsTitleHighlight || "Parents Say"}</span>
            </h2>
            <p className="mt-4 text-gray-500 font-medium italic text-center">{content.testimonialsSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.testimonials || []).map((testimonial: any, idx: number) => (
              <Card key={idx} className="border-none shadow-xl rounded-[2rem] bg-white p-8 flex flex-col h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4 mb-6 text-left">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-100 shadow-sm">
                    <Image src={testimonial.avatar || placeholderImages["student-1"].src} alt={testimonial.name} width={100} height={100} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed font-medium text-left italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              {content.whyChooseTitle.includes('Bharath') ? (
                <>
                  {content.whyChooseTitle.split('Bharath Academy?')[0]}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Bharath Academy?</span>
                </>
              ) : content.whyChooseTitle}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-center font-normal">
              {content.whyChooseSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(content.whyChooseFeatures || []).map((feature: any, idx: number) => {
              const Icon = iconMap[feature.icon] || Zap;
              const style = whyChooseStyles[idx % whyChooseStyles.length];
              return (
                <div key={idx} className={cn("p-8 rounded-[16px] border transition-all duration-500 group text-left backdrop-blur-md", style.bg, style.border, "shadow-sm hover:shadow-xl hover:-translate-y-2", style.hoverBorder)}>
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform", style.iconBg, style.shadow)}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-[24px] font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-[16px] text-gray-500 leading-relaxed font-normal">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-24 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
              {content.successTitle.includes('Success') ? (
                <>
                  {content.successTitle.split('Success Stories')[0]}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Success Stories</span>
                </>
              ) : content.successTitle}
            </h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-center font-normal">
              {content.successSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {(content.successStats || []).map((stat: any, idx: number) => {
              const Icon = iconMap[stat.icon] || Trophy;
              const bgColors = ["bg-[#2b65e2]", "bg-[#10b981]", "bg-[#8b5cf6]"]; 
              return (
                <Card key={idx} className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2rem] p-12 text-center flex flex-col items-center bg-white hover:-translate-y-2 transition-transform duration-500">
                  <div className={cn("w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-xl mb-6 text-white", bgColors[idx % bgColors.length])}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-gray-900 tracking-tight">{stat.value}</div>
                    <div className="text-[16px] font-medium text-[#4b5563] font-body">{stat.label}</div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-white">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight text-left">{content.successTopHeader}</h3>
              <div className="w-full md:w-auto text-left">
                {/* Fixed: Adding a key based on successYears to force Select component refresh when years are removed */}
                <Select key={successYears.join(',')} defaultValue={successYears[0] || ""}>
                  <SelectTrigger className="h-12 w-full md:w-[180px] bg-gray-50 border-gray-100 rounded-xl font-bold text-gray-700">
                    <SelectValue placeholder={successYears.length > 0 ? `Year ${successYears[0]}` : "Select Year"} />
                  </SelectTrigger>
                  <SelectContent>
                    {successYears.map((year: string) => (
                      <SelectItem key={year} value={year}>Year {year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {(content.successPerformers || []).map((student: any, idx: number) => {
                const PerformerRankIcon = iconMap[student.rankIcon] || null;
                return (
                  <div key={idx} className="group bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left">
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image src={student.img || placeholderImages["student-7"].src} alt={student.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className={cn("absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg flex items-center gap-1.5", student.badgeColor || "bg-blue-500")}>
                        {PerformerRankIcon && <PerformerRankIcon className="w-3 h-3" />}
                        {student.rank}
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-gray-900 text-lg leading-tight mb-1">{student.name}</h4>
                      <p className="text-[11px] font-bold text-gray-400 mb-6">{student.grade}</p>
                      <div className="flex items-end justify-between">
                        <div className="space-y-0.5 text-left">
                          <div className={cn("text-3xl font-black tracking-tighter", student.marksColor || "text-blue-600")}>{student.marks}</div>
                          <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{content.successTotalMarksLabel}</div>
                        </div>
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg", student.iconColor || "bg-blue-600")}>
                          <SuccessCardIcon className="w-5 h-5 fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
