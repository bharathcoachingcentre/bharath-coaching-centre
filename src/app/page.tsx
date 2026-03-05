"use client";

import React, { useState } from "react";
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
  CheckCircle2,
  Trophy,
  Medal,
  Zap,
  UserPlus,
  Info,
  ClipboardList,
  LineChart,
  Calendar,
  PieChart,
  ClipboardCheck,
  ChevronDown,
  Layers,
  Handshake,
  Crown,
  FileText,
  Check,
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
import placeholderImages from "@/app/lib/placeholder-images.json";

// True Solid/Filled Icons
const SolidUserCheck = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm9.29-4.71L17 13.59l-2.29-2.3-1.42 1.42L17 16.41l5.71-5.71-1.42-1.42z"/>
  </svg>
);

const SolidClipboardList = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 3h-4.18a3 3 0 0 0-5.64 0H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM7 7h10V5h2v14H5V5h2v2zm2 5h6v2H9v-2zm0 4h6v2H9v-2z" />
  </svg>
);

const SolidLineChart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3.5 18.49l6-6-4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
  </svg>
);

const SolidUsers = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

export default function HomePage() {
  const [activeBoard, setActiveBoard] = useState("cbse");
  const [activeScheduleBoard, setActiveScheduleBoard] = useState("cbse");

  const features = [
    { icon: Presentation, title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-500 shadow-blue-500/30" },
    { icon: FilePenLine, title: "Unit-wise Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-500 shadow-teal-500/30" },
    { icon: MessagesSquare, title: "Instant Doubt Solving", desc: "Get your questions answered immediately by dedicated mentors", color: "bg-purple-500 shadow-purple-500/30" },
    { icon: BookOpen, title: "Printed Study Materials", desc: "High-quality printed notes and reference materials delivered to you", color: "bg-orange-500 shadow-orange-500/30" },
    { icon: UserCheck, title: "Mentor Support", desc: "One-on-one guidance tailored to your learning pace and goals", color: "bg-pink-500 shadow-pink-500/30" },
  ];

  const materials = [
    {
      title: "Mathematics",
      grade: "Class 10",
      desc: "Complete chapter-wise notes and formulas",
      themeColor: "bg-blue-600",
      hoverThemeColor: "hover:bg-blue-700",
      lightBg: "bg-blue-50/50",
      iconContainerBg: "bg-blue-100/50",
      borderColor: "border-blue-100",
      hoverBorderColor: "hover:border-blue-300",
      iconColor: "text-blue-600",
    },
    {
      title: "Science",
      grade: "Class 10",
      desc: "Physics, Chemistry & Biology notes",
      themeColor: "bg-teal-600",
      hoverThemeColor: "hover:bg-teal-700",
      lightBg: "bg-teal-50/50",
      iconContainerBg: "bg-teal-100/50",
      borderColor: "border-teal-100",
      hoverBorderColor: "hover:border-teal-300",
      iconColor: "text-teal-600",
    },
    {
      title: "English",
      grade: "Class 9",
      desc: "Grammar, literature and writing skills",
      themeColor: "bg-purple-600",
      hoverThemeColor: "hover:bg-purple-700",
      lightBg: "bg-purple-50/50",
      iconContainerBg: "bg-purple-100/50",
      borderColor: "border-purple-100",
      hoverBorderColor: "hover:border-purple-300",
      iconColor: "text-purple-600",
    },
    {
      title: "Social Science",
      grade: "Class 12",
      desc: "History, Geography & Civics notes",
      themeColor: "bg-orange-600",
      hoverThemeColor: "hover:bg-orange-700",
      lightBg: "bg-orange-50/50",
      iconContainerBg: "bg-orange-100/50",
      borderColor: "border-orange-100",
      hoverBorderColor: "hover:border-orange-300",
      iconColor: "text-orange-600",
    },
    {
      title: "Physics",
      grade: "Class 11",
      desc: "Concepts, formulas and problems",
      themeColor: "bg-pink-600",
      hoverThemeColor: "hover:bg-pink-700",
      lightBg: "bg-pink-50/50",
      iconContainerBg: "bg-pink-100/50",
      borderColor: "border-pink-100",
      hoverBorderColor: "hover:border-pink-300",
      iconColor: "text-pink-600",
    },
    {
      title: "Chemistry",
      grade: "Class 11",
      desc: "Organic, inorganic & physical chemistry",
      themeColor: "bg-indigo-600",
      hoverThemeColor: "hover:bg-indigo-700",
      lightBg: "bg-indigo-50/50",
      iconContainerBg: "bg-indigo-100/50",
      borderColor: "border-indigo-100",
      hoverBorderColor: "hover:border-indigo-300",
      iconColor: "text-indigo-600",
    },
    {
      title: "Biology",
      grade: "Class 12",
      desc: "Botany and zoology comprehensive notes",
      themeColor: "bg-green-600",
      hoverThemeColor: "hover:bg-green-700",
      lightBg: "bg-green-50/50",
      iconContainerBg: "bg-green-100/50",
      borderColor: "border-green-100",
      hoverBorderColor: "hover:border-green-300",
      iconColor: "text-green-600",
    },
    {
      title: "Hindi",
      grade: "Class 8",
      desc: "Grammar and literature study material",
      themeColor: "bg-amber-600",
      hoverThemeColor: "hover:bg-amber-700",
      lightBg: "bg-amber-50/50",
      iconContainerBg: "bg-amber-100/50",
      borderColor: "border-amber-100",
      hoverBorderColor: "hover:border-amber-300",
      iconColor: "text-amber-600",
    },
  ];

  const programs = [
    {
      title: "Classes 1–5",
      subtitle: "Foundation Program",
      icon: Zap,
      iconBg: "bg-blue-500",
      points: ["Building strong fundamentals", "Interactive learning with activities", "Focus on reading & arithmetic", "Regular parent communication", "Personalized attention & care"],
    },
    {
      title: "Classes 6–8",
      subtitle: "Middle School Program",
      icon: BookOpen,
      iconBg: "bg-teal-500",
      points: ["Comprehensive subject coverage", "Concept-based learning approach", "Regular tests & assessments", "Project-based activities", "Competitive exam foundation"],
    },
    {
      title: "Classes 9–12",
      subtitle: "Senior Secondary Program",
      icon: GraduationCap,
      iconBg: "bg-purple-500",
      popular: true,
      points: ["Board exam focused curriculum", "JEE & NEET preparation integrated", "Advanced problem-solving techniques", "Weekly mock tests & analysis", "Career counseling & guidance"],
    },
  ];

  const topPerformers = [
    {
      name: "Ananya Krishnan",
      grade: "Class 10, CBSE",
      marks: "98.6%",
      rank: "Rank 1",
      badgeColor: "bg-[#fbbf24]",
      marksColor: "text-[#2b65e2]",
      iconColor: "bg-[#2b65e2]",
      img: placeholderImages["student-1"].src,
      rankIcon: Crown
    },
    {
      name: "Arjun Mehta",
      grade: "Class 12, CBSE",
      marks: "97.8%",
      rank: "Rank 2",
      badgeColor: "bg-[#94a3b8]",
      marksColor: "text-[#2abfaf]",
      iconColor: "bg-[#94a3b8]",
      img: placeholderImages["student-2"].src,
      rankIcon: Medal
    },
    {
      name: "Divya Nair",
      grade: "Class 10, Samacheer",
      marks: "96.4%",
      rank: "Rank 3",
      badgeColor: "bg-[#f59e0b]",
      marksColor: "text-[#8b5cf6]",
      iconColor: "bg-[#f59e0b]",
      img: placeholderImages["student-3"].src,
      rankIcon: Award
    },
    {
      name: "Rohan Kapoor",
      grade: "Class 12, CBSE",
      marks: "95.2%",
      rank: "Top 10",
      badgeColor: "bg-[#3b82f6]",
      marksColor: "text-[#f97316]",
      iconColor: "bg-[#f97316]",
      img: placeholderImages["student-4"].src
    },
    {
      name: "Sanya Gupta",
      grade: "Class 10, CBSE",
      marks: "94.8%",
      rank: "Top 10",
      badgeColor: "bg-[#3b82f6]",
      marksColor: "text-blue-600",
      iconColor: "bg-blue-600",
      img: placeholderImages["student-5"].src
    },
    {
      name: "Vikram Malhotra",
      grade: "Class 12, Samacheer",
      marks: "94.2%",
      rank: "Top 10",
      badgeColor: "bg-[#3b82f6]",
      marksColor: "text-blue-600",
      iconColor: "bg-blue-600",
      img: placeholderImages["student-6"].src
    },
    {
      name: "Nisha Reddy",
      grade: "Class 10, CBSE",
      marks: "93.9%",
      rank: "Top 10",
      badgeColor: "bg-[#3b82f6]",
      marksColor: "text-blue-600",
      iconColor: "bg-blue-600",
      img: placeholderImages["student-7"].src
    },
    {
      name: "Kabir Singh",
      grade: "Class 12, CBSE",
      marks: "93.5%",
      rank: "Top 10",
      badgeColor: "bg-[#3b82f6]",
      marksColor: "text-blue-600",
      iconColor: "bg-blue-600",
      img: placeholderImages["student-8"].src
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden min-h-[90vh] flex items-center bg-gradient-to-br from-[#EFF6FF] to-[#CCFBF1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-blob rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-blob rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight text-left">
                  Empowering Students from <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Class 1 to 12</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-normal text-left">
                  Interactive coaching for CBSE and Samacheer with personalized mentorship.
                </p>
              </div>

              <div className="flex flex-col sm:row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="px-8 py-7 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/contact">
                    <CalendarCheck className="mr-2 h-6 w-6" />
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-7 bg-white text-gray-700 font-bold text-lg rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                  <Link href="/courses">
                    <Clock className="mr-2 h-6 w-6" />
                    View Timetable
                  </Link>
                </Button>
              </div>

              <div className="pt-8 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="text-blue-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">5000+</div>
                      <div className="text-sm text-gray-600 font-bold">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-teal-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">95%</div>
                      <div className="text-sm text-gray-600 font-bold">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">10+</div>
                      <div className="text-sm text-gray-600 font-bold">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] lg:h-[650px] flex items-center justify-center">
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a8a9fae2e1-8efab94f8657d56caa94.png"
                alt="Empowering Education"
                width={600}
                height={800}
                className="w-full h-full object-contain relative z-10"
                priority
                data-ai-hint="student success"
              />

              <div className="absolute top-8 right-4 lg:right-8 floating-card bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Book className="text-white w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500 font-bold">Board</div>
                    <div className="text-lg font-bold text-gray-900">CBSE</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-4 lg:left-8 floating-card-delay-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm text-gray-500 font-bold">Board</div>
                    <div className="text-lg font-bold text-gray-900">Samacheer</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 lg:right-0 transform -translate-y-1/2 floating-card-delay-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Laptop className="text-white w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">Online</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Building className="text-white w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">Offline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              How We Help Students <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              Comprehensive learning solutions designed to ensure academic success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center space-y-4 transition-all duration-300"
              >
                <div 
                  className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-shadow duration-300", feature.color)}
                  style={{ boxShadow: `0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)` }}
                >
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-normal">{feature.desc}</p>
              </motion.div>
            ))}
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl">
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
              <div className="relative min-w-[220px]">
                <select className="appearance-none w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none shadow-sm bg-white cursor-pointer text-sm">
                  <option>All Subjects</option>
                  <option>Mathematics</option>
                  <option>Science</option>
                  <option>English</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {materials.map((material, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "group rounded-[2.5rem] p-8 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative flex flex-col h-full",
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
                    <span className={cn("px-5 py-2 text-white text-[12px] font-bold rounded-full shadow-sm", material.themeColor)}>{material.grade}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#182d45] mb-2 tracking-tight text-left">{material.title}</h3>
                  <p className="text-base text-gray-500 mb-8 font-normal leading-relaxed font-body flex-grow text-left">{material.desc}</p>
                  <Button
                    className={cn(
                      "w-full text-white font-bold rounded-2xl h-14 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-auto",
                      material.themeColor,
                      material.hoverThemeColor
                    )}
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Explore Our <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Academic Programs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              Choose the perfect learning path for your child's academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-3xl p-8 flex flex-col h-full border-2 transition-all duration-500 hover:shadow-2xl relative",
                  program.popular ? "bg-gradient-to-br from-purple-50 to-white border-purple-300 lg:scale-105" : "bg-white border-gray-100 shadow-lg"
                )}
              >
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg text-sm">
                      <Star className="w-4 h-4 mr-1 inline" /> MOST POPULAR
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-4 text-white shadow-lg", program.iconBg)}>
                    <program.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left tracking-tight">{program.title}</h3>
                  <p className="text-gray-600 font-bold text-left text-sm uppercase tracking-wider">{program.subtitle}</p>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  {program.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm", program.iconBg)}>
                        <Check className="w-3 h-3 text-white" strokeWidth={4} />
                      </div>
                      <span className="text-gray-700 text-left font-normal">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full py-6 font-bold rounded-xl bg-gray-50 border-gray-200 flex items-center justify-center gap-2">
                    <Clock className="h-5 w-5" />
                    View Timetable
                  </Button>
                  <Button
                    className={cn(
                      "w-full py-6 font-bold rounded-xl text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2",
                      program.popular ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gradient-to-r from-blue-600 to-blue-700"
                    )}
                  >
                    <UserPlus className="h-5 w-5" />
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section id="timetable-section" className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Offline Class <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Timetable</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              View our structured class schedules for offline sessions
            </p>
          </div>

          <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden bg-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl">
                <button
                  onClick={() => setActiveScheduleBoard("cbse")}
                  className={cn(
                    "px-10 py-3.5 font-bold rounded-2xl transition-all duration-500 text-sm tracking-tight",
                    activeScheduleBoard === "cbse"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-lg"
                      : "text-gray-500 hover:bg-gray-200"
                  )}
                >
                  CBSE
                </button>
                <button
                  onClick={() => setActiveScheduleBoard("samacheer")}
                  className={cn(
                    "px-10 py-3.5 font-bold rounded-2xl transition-all duration-500 text-sm tracking-tight",
                    activeScheduleBoard === "samacheer"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-lg"
                      : "text-gray-500 hover:bg-gray-200"
                  )}
                >
                  Samacheer
                </button>
              </div>
              <div className="relative min-w-[200px]">
                <select className="appearance-none w-full px-6 py-3 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none shadow-sm bg-white cursor-pointer text-sm">
                  <option>Class 10</option>
                  {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="overflow-x-auto rounded-[1.5rem] border border-gray-100 shadow-inner">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] text-white">
                    <th className="px-8 py-6 font-bold text-base whitespace-nowrap">Day / Time</th>
                    <th className="px-8 py-6 font-bold text-base text-center whitespace-nowrap border-l border-white/10">9:00 AM - 10:30 AM</th>
                    <th className="px-8 py-6 font-bold text-base text-center whitespace-nowrap border-l border-white/10">11:00 AM - 12:30 PM</th>
                    <th className="px-8 py-6 font-bold text-base text-center whitespace-nowrap border-l border-white/10">2:00 PM - 3:30 PM</th>
                    <th className="px-8 py-6 font-bold text-base text-center whitespace-nowrap border-l border-white/10">4:00 PM - 5:30 PM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    { day: "Monday", slots: [
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200 text-blue-900", tc: "text-[#4b5563]" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200 text-teal-900", tc: "text-[#4b5563]" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200 text-purple-900", tc: "text-[#4b5563]" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200 text-orange-900", tc: "text-[#4b5563]" },
                    ]},
                    { day: "Tuesday", slots: [
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200 text-teal-900", tc: "text-[#4b5563]" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200 text-blue-900", tc: "text-[#4b5563]" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200 text-pink-900", tc: "text-[#4b5563]" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200 text-purple-900", tc: "text-[#4b5563]" },
                    ]},
                    { day: "Wednesday", slots: [
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200 text-purple-900", tc: "text-[#4b5563]" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200 text-orange-900", tc: "text-[#4b5563]" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200 text-blue-900", tc: "text-[#4b5563]" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200 text-teal-900", tc: "text-[#4b5563]" },
                    ]},
                    { day: "Thursday", slots: [
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200 text-blue-900", tc: "text-[#4b5563]" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200 text-pink-900", tc: "text-[#4b5563]" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200 text-teal-900", tc: "text-[#4b5563]" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200 text-orange-900", tc: "text-[#4b5563]" },
                    ]},
                    { day: "Friday", slots: [
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200 text-orange-900", tc: "text-[#4b5563]" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200 text-purple-900", tc: "text-[#4b5563]" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200 text-pink-900", tc: "text-[#4b5563]" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200 text-blue-900", tc: "text-[#4b5563]" },
                    ]},
                  ].map((row) => (
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
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-[#182d45]">Saturday</td>
                    <td className="px-4 py-4 border-l border-gray-50" colSpan={2}>
                      <div className="bg-green-100 rounded-2xl p-5 text-center border border-green-200 shadow-sm">
                        <div className="font-bold text-green-900 text-sm">Doubt Clearing Session</div>
                        <div className="text-[11px] text-gray-600 font-bold mt-1">All Teachers Available</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-l border-gray-50" colSpan={2}>
                      <div className="bg-yellow-100 rounded-2xl p-5 text-center border border-yellow-200 shadow-sm">
                        <div className="font-bold text-yellow-900 text-sm">Practice & Revision</div>
                        <div className="text-[11px] text-gray-600 font-bold mt-1">Self Study with Mentors</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-10 p-8 bg-[#eff6ff] rounded-[1.5rem] border border-[#dbeafe] flex items-start gap-4 shadow-inner">
              <div className="bg-blue-600 rounded-full p-1.5 mt-0.5 shadow-md">
                <Info className="text-white h-4 w-4" />
              </div>
              <div className="space-y-2 text-left">
                <h4 className="font-bold text-gray-900 text-base">Important Notes:</h4>
                <ul className="space-y-1.5 text-gray-600 text-[13px] font-bold leading-relaxed font-body">
                  <li className="flex items-center gap-2 text-left"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Sunday is a holiday for all classes</li>
                  <li className="flex items-center gap-2 text-left"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Each session includes a 15-minute break</li>
                  <li className="flex items-center gap-2 text-left"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Extra classes are conducted before exams</li>
                  <li className="flex items-center gap-2 text-left"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Timetable may vary based on class requirements</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* One-to-One Mentorship Section */}
      <section id="mentorship-section" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2b65e2]/10 to-[#2abfaf]/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                <Image
                  src={placeholderImages["one-to-one-mentorship"].src}
                  alt={placeholderImages["one-to-one-mentorship"].alt}
                  fill
                  className="object-cover"
                  data-ai-hint={placeholderImages["one-to-one-mentorship"].hint}
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight text-left">
                  One-to-One <span className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] bg-clip-text text-transparent">Mentorship</span>
                </h2>
                <p className="text-lg text-gray-600 font-normal text-left">
                  Personalized attention to help every student reach their full potential
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { 
                    icon: SolidUserCheck, 
                    title: "Individual Attention", 
                    desc: "Dedicated mentor assigned to each student for personalized guidance and support throughout their academic journey.",
                    bg: "bg-blue-100",
                    text: "text-blue-600"
                  },
                  { 
                    icon: SolidClipboardList, 
                    title: "Customized Study Plan", 
                    desc: "Tailored learning strategies based on individual strengths, weaknesses, and learning pace for optimal results.",
                    bg: "bg-teal-100",
                    text: "text-teal-600"
                  },
                  { 
                    icon: SolidLineChart, 
                    title: "Weekly Academic Tracking", 
                    desc: "Regular monitoring of progress with detailed performance analysis and timely interventions when needed.",
                    bg: "bg-purple-100",
                    text: "text-purple-600"
                  },
                  { 
                    icon: SolidUsers, 
                    title: "Parent Performance Updates", 
                    desc: "Comprehensive reports shared with parents weekly, keeping them informed about their child's academic progress.",
                    bg: "bg-orange-100",
                    text: "text-orange-600"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-6 group">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110", item.bg)}>
                      <item.icon className={cn("w-7 h-7", item.text)} />
                    </div>
                    <div className="space-y-1 text-left">
                      <h3 className="text-xl font-bold text-[#182d45]">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-normal font-body">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-start">
                <Button size="lg" className="px-10 py-8 bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] text-white font-bold text-xl rounded-2xl shadow-xl hover:shadow-[#2b65e2]/30 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3">
                  <CalendarCheck className="h-6 w-6" />
                  Book Personal Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials-section" className="py-24 bg-gradient-to-br from-blue-50 to-teal-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              What Students & Parents <span className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-lg text-gray-500 font-bold">
              Real stories from our successful students and satisfied parents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Priya Sharma", role: "Class 10, CBSE", text: "The teachers at Bharath Academy are amazing! They explain every concept so clearly and are always available for doubt clearing. I improved my marks from 75% to 92% in just one year!", img: "/priya-sharma.jpg" },
              { name: "Rajesh Kumar", role: "Parent, Class 12", text: "As a parent, I'm very impressed with the regular updates and personalized attention my son receives. The weekly performance reports help me stay connected with his progress. Highly recommended!", img: "/rajesh-kumar.jpg" },
              { name: "Arun Reddy", role: "Class 11, Samacheer", text: "The study materials and practice worksheets are excellent. The one-to-one mentorship helped me overcome my weak areas in physics and chemistry. Now I'm confident about my board exams!", img: "/arun-reddy.jpg" },
              { name: "Kavya Iyer", role: "Class 9, CBSE", text: "I love the interactive classes! The teachers make learning fun with real-life examples. The doubt clearing sessions are super helpful and I never feel hesitant to ask questions anymore.", img: "/kavya-iyer.jpg" },
              { name: "Sunita Patel", role: "Parent, Class 8", text: "The academy's structured approach to learning is commendable. My daughter's confidence has increased significantly. The regular tests and feedback system keeps her motivated and focused.", img: "/sunita-patel.jpg" },
              { name: "Vikram Singh", role: "Class 12, CBSE", text: "Preparing for JEE alongside board exams seemed impossible until I joined Bharath Academy. The integrated approach and expert teachers made it achievable. Got 95% in boards and cleared JEE!", img: "/vikram-singh.jpg" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-gray-50 flex flex-col items-start text-left transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#2abfaf]/20 shadow-inner bg-gray-100">
                    <Image src={testimonial.img} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-[18px] font-bold text-gray-900 leading-tight">{testimonial.name}</h4>
                    <p className="text-[16px] text-[#4b5563] font-normal mt-0.5">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[18px] h-[18px] text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[#374151] text-base leading-relaxed font-normal font-body text-left">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="why-choose-section" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] bg-clip-text text-transparent">Bharath Academy?</span>
            </h2>
            <p className="text-lg text-gray-500 font-bold">
              Comprehensive features designed for complete academic excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Parent Academic Tracking",
                desc: "Real-time access to student performance, attendance, and progress through our dedicated parent portal with detailed analytics.",
                icon: PieChart,
                iconBg: "bg-[#3b82f6]",
                cardBg: "bg-[#eff6ff]"
              },
              {
                title: "Daily Performance Monitoring",
                desc: "Track daily homework completion, class participation, and understanding levels with instant notifications to parents.",
                icon: Calendar,
                iconBg: "bg-[#10b981]",
                cardBg: "bg-[#f0fdf4]"
              },
              {
                title: "Weekly Tests & Evaluation",
                desc: "Regular assessments every week to measure progress and identify areas needing improvement with detailed performance reports.",
                icon: ClipboardCheck,
                iconBg: "bg-[#8b5cf6]",
                cardBg: "bg-[#f5f3ff]"
              },
              {
                title: "Structured Test Hierarchy",
                desc: "Progressive testing system from unit tests to term exams, designed to build confidence and exam readiness systematically.",
                icon: Layers,
                iconBg: "bg-[#f97316]",
                cardBg: "bg-[#fff7ed]"
              },
              {
                title: "Term-wise Parent Meetings",
                desc: "Scheduled one-on-one meetings with teachers to discuss student progress, challenges, and customized improvement strategies.",
                icon: Handshake,
                iconBg: "bg-[#d946ef]",
                cardBg: "bg-[#fdf4ff]"
              },
              {
                title: "Specialized Learning Materials",
                desc: "Curated study materials, practice papers, and reference books specifically designed for CBSE and Samacheer curricula.",
                icon: BookOpen,
                iconBg: "bg-[#4f46e5]",
                cardBg: "bg-[#eef2ff]"
              }
            ].map((item, idx) => (
              <div key={idx} className={cn("p-10 rounded-[2rem] border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-500 hover:shadow-xl hover:-translate-y-1 text-left", item.cardBg)}>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white mb-8 shadow-lg", item.iconBg)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#182d45] mb-4 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Our Students' <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">Celebrating exceptional achievements and academic excellence</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Trophy, val: "95%", label: "Pass Rate", color: "bg-blue-500" },
              { icon: Medal, val: "120+", label: "Distinctions", color: "bg-teal-500" },
              { icon: GraduationCap, val: "5000+", label: "Students", color: "bg-purple-500" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-xl p-8 text-center border border-gray-100 transition-all hover:-translate-y-2">
                <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-white", stat.color)}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-bold text-gray-900 mb-2">{stat.val}</div>
                <div className="text-lg text-gray-600 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Top Performers Header */}
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-3xl font-bold text-[#182d45] tracking-tight">Top Performers 2025</h3>
            <div className="w-full md:w-auto min-w-[180px]">
              <Select defaultValue="2025">
                <SelectTrigger className="h-12 bg-[#f8fafc] border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm">
                  <SelectValue placeholder="Year 2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025">Year 2025</SelectItem>
                  <SelectItem value="2024">Year 2024</SelectItem>
                  <SelectItem value="2023">Year 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Top Performers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPerformers.map((student, idx) => (
              <div key={idx} className="group bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 text-left">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={student.img} 
                    alt={student.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-ai-hint="student portrait"
                  />
                  <div className={cn("absolute top-4 right-4 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5", student.badgeColor)}>
                    {student.rankIcon && <student.rankIcon className="w-3 h-3" />}
                    {student.rank}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-[#182d45] tracking-tight mb-1">{student.name}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-8">{student.grade}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className={cn("text-4xl font-bold tracking-tighter", student.marksColor)}>{student.marks}</div>
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Total Marks</div>
                    </div>
                    <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-500 group-hover:rotate-12", student.iconColor)}>
                      <Star className="w-7 h-7 fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
