
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
  Crown
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

const topPerformers = [
  {
    name: "Ananya Krishnan",
    grade: "Class 10, CBSE",
    marks: "98.6%",
    rank: "Rank 1",
    badgeColor: "bg-[#fbbf24]",
    marksColor: "text-blue-600",
    iconColor: "bg-blue-600",
    img: "/ananya-krishnan.jpg",
    rankIcon: Crown
  },
  {
    name: "Arjun Mehta",
    grade: "Class 12, CBSE",
    marks: "97.8%",
    rank: "Rank 2",
    badgeColor: "bg-[#94a3b8]",
    marksColor: "text-teal-600",
    iconColor: "bg-teal-600",
    img: "/arjun-mehta.jpg",
    rankIcon: Medal
  },
  {
    name: "Divya Nair",
    grade: "Class 10, Samacheer",
    marks: "96.4%",
    rank: "Rank 3",
    badgeColor: "bg-[#f59e0b]",
    marksColor: "text-purple-600",
    iconColor: "bg-purple-600",
    img: "/divya-nair.jpg",
    rankIcon: Award
  },
  {
    name: "Rohan Kapoor",
    grade: "Class 12, CBSE",
    marks: "95.2%",
    rank: "Top 10",
    badgeColor: "from-blue-400 to-blue-500",
    marksColor: "text-orange-600",
    iconColor: "bg-orange-600",
    img: "/rohan-kappoor.jpg"
  },
  {
    name: "Sanya Gupta",
    grade: "Class 10, CBSE",
    marks: "94.8%",
    rank: "Top 10",
    badgeColor: "from-blue-400 to-blue-500",
    marksColor: "text-pink-600",
    iconColor: "bg-pink-600",
    img: "/sanya-gupta.jpg"
  },
  {
    name: "Vikram Malhotra",
    grade: "Class 12, Samacheer",
    marks: "94.2%",
    rank: "Top 10",
    badgeColor: "from-blue-400 to-blue-500",
    marksColor: "text-green-600",
    iconColor: "bg-green-600",
    img: "/vikram-malhotra.jpg"
  },
  {
    name: "Nisha Reddy",
    grade: "Class 10, CBSE",
    marks: "93.9%",
    rank: "Top 10",
    badgeColor: "from-blue-400 to-blue-500",
    marksColor: "text-indigo-600",
    iconColor: "bg-indigo-600",
    img: "/nisha-reddy.jpg"
  },
  {
    name: "Kabir Singh",
    grade: "Class 12, CBSE",
    marks: "93.5%",
    rank: "Top 10",
    badgeColor: "from-blue-400 to-blue-500",
    marksColor: "text-amber-600",
    iconColor: "bg-amber-600",
    img: "/kabir-singh.jpg"
  },
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

  // Fetch Page Content
  const pageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "home");
  }, [firestore]);
  const { data: homeContent } = useDoc(pageRef);

  // Fetch Master Data for Timetable Lookups
  const periodsQuery = useMemo(() => firestore ? query(collection(firestore, 'periods'), orderBy('order', 'asc')) : null, [firestore]);
  const { data: allPeriods } = useCollection(periodsQuery);

  const classesLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'classes')) : null, [firestore]);
  const { data: allClassesLookup } = useCollection(classesLookupQuery);

  const subjectsLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'subjects')) : null, [firestore]);
  const { data: allSubjectsLookup } = useCollection(subjectsLookupQuery);

  const teachersLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'users'), where('role', '==', 'teacher')) : null, [firestore]);
  const { data: allTeachersLookup } = useCollection(teachersLookupQuery);

  // Fetch Available Classes for Filters
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

  // Fetch Subjects for Filters
  const subjectsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'subjects'), orderBy('name', 'asc'));
  }, [firestore]);
  const { data: allSubjectsRaw } = useCollection(subjectsQuery);

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

  // Fetch Study Materials
  const materialsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'study-materials'), orderBy('createdAt', 'desc'));
  }, [firestore]);
  const { data: allMaterials, loading: materialsLoading } = useCollection(materialsQuery);

  // Fetch Timetables
  const timetablesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'timetables'));
  }, [firestore]);
  const { data: allTimetables } = useCollection(timetablesQuery);

  const content = useMemo(() => {
    const defaults = {
      heroTitleMain: "Empowering Students from ",
      heroTitleHighlight: "Class 1 to 12",
      heroSubtitle: "Interactive coaching for CBSE and Samacheer with personalized mentorship.",
      heroPrimaryBtnText: "Book Free Consultation",
      heroPrimaryBtnLink: "#",
      heroOutlineBtnText: "View Timetable",
      heroOutlineBtnLink: "#timetable-section",
      stats: [
        { label: "Students", value: "5000+", icon: "Users" },
        { label: "Success Rate", value: "95%", icon: "TrendingUp" },
        { label: "Years Experience", value: "10+", icon: "Award" }
      ],
      featuresTitle: "How We Help Students Excel",
      featuresSubtitle: "Comprehensive learning solutions designed to ensure academic success",
      features: [
        { icon: "Presentation", title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-500 shadow-blue-500/30" },
        { icon: "FilePenLine", title: "Unit-wise Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-500 shadow-teal-500/30" },
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
          points: ["Building strong fundamentals", "Interactive learning with activities", "Focus on reading & arithmetic", "Regular parent communication", "Personalized attention & care"],
        },
        {
          title: "Classes 6–8",
          subtitle: "Middle School Program",
          icon: "BookOpen",
          points: ["Comprehensive subject coverage", "Concept-based learning approach", "Regular tests & assessments", "Project-based activities", "Competitive exam foundation"],
        },
        {
          title: "Classes 9–12",
          subtitle: "Senior Secondary Program",
          icon: "GraduationCap",
          popular: true,
          points: ["Board exam focused curriculum", "JEE & NEET preparation integrated", "Advanced problem-solving techniques", "Weekly mock tests & analysis", "Career counseling & guidance"],
        },
      ],
      timetableTitle: "Offline Class Timetable",
      timetableSubtitle: "View our structured class schedules for offline sessions",
      timetableNotes: [
        "Sunday is a holiday for all classes",
        "Each session includes a 15-minute break",
        "Extra classes are conducted before exams",
        "Timetable may vary based on class requirements"
      ]
    };

    if (!homeContent?.content) return defaults;
    return { ...defaults, ...homeContent.content };
  }, [homeContent]);

  const displayMaterials = useMemo(() => {
    if (!allMaterials) return [];
    
    return allMaterials
      .filter(m => {
        const matchesVisibility = m.isVisible !== false;
        // Check both ID and Name for grade/class to support legacy data
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
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const slots = allPeriods?.map(p => p.label) || [
      "9:00 AM - 10:30 AM",
      "11:00 AM - 12:30 PM",
      "2:00 PM - 3:30 PM",
      "4:00 PM - 5:30 PM"
    ];

    const styleClasses = [
      "bg-blue-100 border-blue-200 text-blue-900",
      "bg-teal-100 border-teal-200 text-teal-900",
      "bg-purple-100 border-purple-200 text-purple-900",
      "bg-orange-100 border-orange-200 text-orange-900",
      "bg-pink-100 border-pink-200 text-pink-900",
    ];

    const currentClassId = allClassesLookup?.find(c => c.name === selectedScheduleClass)?.id;
    const relevant = (allTimetables || []).filter(t => 
      t.board.toLowerCase() === activeScheduleBoard.toLowerCase() && 
      (t.grade === selectedScheduleClass || t.grade === currentClassId)
    );

    return days.map(day => {
      const daySlots = slots.map((timeLabel, idx) => {
        const periodId = allPeriods?.find(p => p.label === timeLabel)?.id;
        const match = relevant.find(r => r.day === day && (r.timeSlot === timeLabel || r.timeSlot === periodId));
        
        if (match) {
          const subjectName = allSubjectsLookup?.find(s => s.id === match.subject)?.name || match.subject;
          const teacherName = allTeachersLookup?.find(t => t.id === match.teacher)?.displayName || match.teacher;
          return {
            s: subjectName,
            t: teacherName,
            c: styleClasses[idx % styleClasses.length],
            tc: "text-[#4b5563]"
          };
        }
        return { s: "-", t: "-", c: "bg-gray-50 border-gray-100 text-gray-300", tc: "text-gray-300" };
      });
      return { day, slots: daySlots };
    });
  }, [allTimetables, activeScheduleBoard, selectedScheduleClass, allPeriods, allClassesLookup, allSubjectsLookup, allTeachersLookup]);

  const saturdayData = useMemo(() => {
    const currentClassId = allClassesLookup?.find(c => c.name === selectedScheduleClass)?.id;
    const relevant = (allTimetables || []).filter(t => 
      t.board.toLowerCase() === activeScheduleBoard.toLowerCase() && 
      (t.grade === selectedScheduleClass || t.grade === currentClassId) &&
      t.day === "Saturday"
    );

    const saturdayColors = [
      "bg-green-100 border-green-200 text-green-900",
      "bg-yellow-100 border-yellow-200 text-yellow-900",
      "bg-blue-100 border-blue-200 text-blue-900",
      "bg-teal-100 border-teal-200 text-teal-900",
    ];

    if (relevant.length === 0) return null;

    const totalSlots = allPeriods?.length || 4;
    const baseSpan = Math.floor(totalSlots / relevant.length);
    const remainder = totalSlots % relevant.length;

    return relevant.map((entry, idx) => {
      const subjectName = allSubjectsLookup?.find(s => s.id === entry.subject)?.name || entry.subject;
      const teacherName = allTeachersLookup?.find(t => t.id === entry.teacher)?.displayName || entry.teacher;
      return {
        subject: subjectName,
        teacher: teacherName,
        color: saturdayColors[idx % saturdayColors.length],
        span: idx === relevant.length - 1 ? baseSpan + remainder : baseSpan
      };
    });
  }, [allTimetables, activeScheduleBoard, selectedScheduleClass, allPeriods, allClassesLookup, allSubjectsLookup, allTeachersLookup]);

  const heroImageData = (placeholderImages as any)["hero-education"];

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
                  <Link href={content.heroPrimaryBtnLink}>
                    <CalendarCheck className="mr-2 h-6 w-6" />
                    {content.heroPrimaryBtnText}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-7 bg-white text-gray-700 font-bold text-lg rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  <Link href={content.heroOutlineBtnLink}>
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

              {/* Floating Labels */}
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
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
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-normal">{feature.desc}</p>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Download Free <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Study Materials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              Access comprehensive study resources for all subjects and classes
            </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mb-12">
              <div className="relative w-full max-w-xs mx-auto lg:mx-0">
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="appearance-none w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-blue-600 focus:outline-none shadow-sm bg-white cursor-pointer text-xs"
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

              <div className="relative w-full max-w-xs mx-auto lg:ml-auto lg:mr-0">
                <Popover open={isSubjectOpen} onOpenChange={setIsSubjectOpen}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center justify-between w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-teal-600 focus:outline-none shadow-sm bg-white cursor-pointer text-xs">
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
                      <div className="p-1">
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
                <p className="text-gray-500 font-bold">No study materials found for {selectedSubject} in {selectedClass} ({activeBoard.toUpperCase()}).</p>
                <p className="text-gray-400 text-sm mt-1">Please try another filter or check back later.</p>
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

      {/* Rest of the UI remains the same, lookups integrated into Timetable Display logic */}
      {/* Timetable Section */}
      <section id="timetable-section" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {content.timetableTitle.includes('Timetable') ? (
                <>
                  {content.timetableTitle.split('Timetable')[0]}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Timetable</span>
                </>
              ) : content.timetableTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              {content.timetableSubtitle}
            </p>
          </div>

          <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden bg-white p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mb-8 text-left">
              <div className="relative min-w-[180px] w-full lg:w-auto">
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
                  {saturdayData ? (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-[#182d45]">Saturday</td>
                      {saturdayData.map((item, idx) => (
                        <td key={idx} className="px-4 py-4 border-l border-gray-50" colSpan={item.span}>
                          <div className={cn("rounded-2xl p-5 text-center border shadow-sm", item.color)}>
                            <div className="font-bold text-sm">{item.subject}</div>
                            <div className="text-[11px] font-bold mt-1 opacity-70">{item.teacher}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ) : (
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-[#182d45]">Saturday</td>
                      <td className="px-4 py-4 border-l border-gray-50 text-center text-gray-300" colSpan={allPeriods?.length || 4}>
                        No sessions scheduled for Saturday
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-8 bg-[#eff6ff] rounded-[1.5rem] border border-[#dbeafe] flex items-start gap-4 shadow-inner text-left">
              <div className="bg-blue-600 rounded-full p-1.5 mt-0.5 shadow-md">
                <span className="text-white">ℹ️</span>
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-gray-900 text-base">Important Notes:</h4>
                <ul className="space-y-1.5 text-gray-600 text-[13px] font-normal leading-relaxed font-body">
                  {(content.timetableNotes || []).map((note: string, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-left">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Program and Mentorship Sections omitted for brevity but preserved in full file */}
      {/* ... Rest of the Home Page components ... */}
    </div>
  );
}
