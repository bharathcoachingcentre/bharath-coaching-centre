
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function HomePage() {
  const [activeBoard, setActiveBoard] = useState("cbse");
  const [activeScheduleBoard, setActiveScheduleBoard] = useState("cbse");

  const features = [
    { icon: Presentation, title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-500" },
    { icon: FilePenLine, title: "Unit-wise Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-500" },
    { icon: MessagesSquare, title: "Instant Doubt Solving", desc: "Get your questions answered immediately by dedicated mentors", color: "bg-purple-500" },
    { icon: BookOpen, title: "Printed Study Materials", desc: "High-quality printed notes and reference materials delivered to you", color: "bg-orange-500" },
    { icon: UserCheck, title: "Mentor Support", desc: "One-on-one guidance tailored to your learning pace and goals", color: "bg-pink-500" },
  ];

  const materials = [
    {
      title: "Mathematics",
      grade: "Class 10",
      desc: "Complete chapter-wise notes and formulas",
      themeColor: "bg-[#2b65e2]",
      hoverThemeColor: "hover:bg-blue-700",
      lightBg: "bg-blue-50",
      iconContainerBg: "bg-white",
      borderColor: "border-blue-100",
      hoverBorderColor: "hover:border-blue-600",
      iconColor: "text-blue-600",
    },
    {
      title: "Science",
      grade: "Class 10",
      desc: "Physics, Chemistry & Biology notes",
      themeColor: "bg-[#2abfaf]",
      hoverThemeColor: "hover:bg-teal-700",
      lightBg: "bg-teal-50",
      iconContainerBg: "bg-white",
      borderColor: "border-teal-100",
      hoverBorderColor: "hover:border-teal-600",
      iconColor: "text-teal-600",
    },
    {
      title: "English",
      grade: "Class 9",
      desc: "Grammar, literature and writing skills",
      themeColor: "bg-[#8b5cf6]",
      hoverThemeColor: "hover:bg-violet-700",
      lightBg: "bg-purple-50",
      iconContainerBg: "bg-white",
      borderColor: "border-purple-100",
      hoverBorderColor: "hover:border-purple-600",
      iconColor: "text-purple-600",
    },
    {
      title: "Social Science",
      grade: "Class 12",
      desc: "History, Geography & Civics notes",
      themeColor: "bg-[#f97316]",
      hoverThemeColor: "hover:bg-orange-700",
      lightBg: "bg-orange-50",
      iconContainerBg: "bg-white",
      borderColor: "border-orange-100",
      hoverBorderColor: "hover:border-orange-600",
      iconColor: "text-orange-600",
    },
    {
      title: "Physics",
      grade: "Class 11",
      desc: "Concepts, formulas and problems",
      themeColor: "bg-[#ec4899]",
      hoverThemeColor: "hover:bg-pink-700",
      lightBg: "bg-pink-50",
      iconContainerBg: "bg-white",
      borderColor: "border-pink-100",
      hoverBorderColor: "hover:border-pink-600",
      iconColor: "text-pink-600",
    },
    {
      title: "Chemistry",
      grade: "Class 11",
      desc: "Organic, inorganic & physical chemistry",
      themeColor: "bg-[#6366f1]",
      hoverThemeColor: "hover:bg-indigo-700",
      lightBg: "bg-indigo-50",
      iconContainerBg: "bg-white",
      borderColor: "border-indigo-100",
      hoverBorderColor: "hover:border-indigo-600",
      iconColor: "text-indigo-600",
    },
    {
      title: "Biology",
      grade: "Class 12",
      desc: "Botany and zoology comprehensive notes",
      themeColor: "bg-[#22c55e]",
      hoverThemeColor: "hover:bg-green-700",
      lightBg: "bg-green-50",
      iconContainerBg: "bg-white",
      borderColor: "border-green-100",
      hoverBorderColor: "hover:border-green-600",
      iconColor: "text-green-600",
    },
    {
      title: "Hindi",
      grade: "Class 8",
      desc: "Grammar and literature study material",
      themeColor: "bg-[#eab308]",
      hoverThemeColor: "hover:bg-yellow-700",
      lightBg: "bg-yellow-50",
      iconContainerBg: "bg-white",
      borderColor: "border-yellow-100",
      hoverBorderColor: "hover:border-yellow-600",
      iconColor: "text-yellow-600",
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

  const students = [
    { name: "Ananya Krishnan", grade: "Class 10, CBSE", marks: "98.6%", rank: "Rank 1", color: "text-blue-600", iconBg: "bg-blue-500" },
    { name: "Arjun Mehta", grade: "Class 12, CBSE", marks: "97.8%", rank: "Rank 2", color: "text-teal-600", iconBg: "bg-teal-500" },
    { name: "Divya Nair", grade: "Class 10, Samacheer", marks: "96.4%", rank: "Rank 3", color: "text-purple-600", iconBg: "bg-purple-500" },
    { name: "Rohan Kapoor", grade: "Class 12, CBSE", marks: "95.2%", rank: "Top 10", color: "text-orange-600", iconBg: "bg-orange-500" },
    { name: "Meera Reddy", grade: "Class 10, CBSE", marks: "94.8%", rank: "Top 10", color: "text-pink-600", iconBg: "bg-pink-500" },
    { name: "Karthik Iyer", grade: "Class 12, Samacheer", marks: "94.2%", rank: "Top 10", color: "text-green-600", iconBg: "bg-green-500" },
    { name: "Sneha Patel", grade: "Class 10, CBSE", marks: "93.6%", rank: "Top 10", color: "text-indigo-600", iconBg: "bg-indigo-500" },
    { name: "Aditya Sharma", grade: "Class 12, CBSE", marks: "92.8%", rank: "Top 10", color: "text-yellow-600", iconBg: "bg-yellow-500" },
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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                  Empowering Students from <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Class 1 to 12</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium">
                  Interactive coaching for CBSE and Samacheer with personalized mentorship.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="px-8 py-7 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold text-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/contact">
                    <CalendarCheck className="mr-2 h-6 w-6" />
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-7 bg-white text-gray-700 font-semibold text-lg rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
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
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-teal-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">95%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-gray-900">10+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
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
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Board</div>
                    <div className="text-lg font-bold text-gray-900">CBSE</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-4 lg:left-8 floating-card-delay-1 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Board</div>
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
                    <span className="text-sm font-semibold text-gray-900">Online</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Building className="text-white w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">Offline</span>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              How We Help Students <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Excel</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Comprehensive learning solutions designed to ensure academic success through innovative methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center space-y-4 transition-all duration-300"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-white", feature.color)}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Materials Section */}
      <section id="study-materials-section" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Download Free <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Study Materials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Access comprehensive study resources for all subjects and classes
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex p-2 bg-[#f1f5f9] rounded-2xl">
                <button
                  onClick={() => setActiveBoard("cbse")}
                  className={cn(
                    "px-10 py-4 font-black rounded-2xl transition-all duration-500 min-w-[160px] text-lg tracking-tight",
                    activeBoard === "cbse"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-xl"
                      : "text-[#1e293b] hover:bg-gray-200"
                  )}
                >
                  CBSE
                </button>
                <button
                  onClick={() => setActiveBoard("samacheer")}
                  className={cn(
                    "px-10 py-4 font-black rounded-2xl transition-all duration-500 min-w-[160px] text-lg tracking-tight",
                    activeBoard === "samacheer"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-xl"
                      : "text-[#1e293b] hover:bg-gray-200"
                  )}
                >
                  Samacheer
                </button>
              </div>
              <select className="px-6 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none min-w-[200px] shadow-sm">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {materials.map((material, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "group rounded-[2.5rem] p-6 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                    material.lightBg,
                    material.borderColor,
                    material.hoverBorderColor
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110", material.iconContainerBg)}>
                      <div className="relative flex items-center justify-center">
                        <BookOpen className={cn("w-8 h-8", material.iconColor)} />
                        <span className="absolute bottom-[-2px] text-[7px] font-black text-white leading-none uppercase bg-[#182d45] px-1 rounded-sm">PDF</span>
                      </div>
                    </div>
                    <span className={cn("px-4 py-1.5 text-white text-[10px] font-black rounded-full shadow-sm", material.themeColor)}>{material.grade}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{material.title}</h3>
                  <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">{material.desc}</p>
                  <Button
                    className={cn(
                      "w-full text-white font-black rounded-xl h-12 shadow-lg hover:opacity-90 transition-all transform active:scale-95 flex items-center justify-center gap-2",
                      material.themeColor,
                      material.hoverThemeColor
                    )}
                  >
                    <Download className="w-4 h-4" />
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
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Explore Our <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Academic Programs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
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
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-gray-600 font-medium">{program.subtitle}</p>
                </div>
                <div className="space-y-4 mb-8 flex-grow">
                  {program.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className={cn("w-5 h-5 mt-0.5", program.iconBg.replace("bg", "text"))} />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full py-6 font-semibold rounded-xl bg-gray-50 border-gray-200 flex items-center justify-center gap-2">
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
      <section id="timetable-section" className="relative py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Offline Class <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Timetable</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              View our structured class schedules for offline sessions
            </p>
          </div>

          <Card className="rounded-[2.5rem] shadow-2xl border-none overflow-hidden bg-white p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl">
                <button
                  onClick={() => setActiveScheduleBoard("cbse")}
                  className={cn(
                    "px-10 py-3.5 font-black rounded-2xl transition-all duration-500 text-sm tracking-tight",
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
                    "px-10 py-3.5 font-black rounded-2xl transition-all duration-500 text-sm tracking-tight",
                    activeScheduleBoard === "samacheer"
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-lg"
                      : "text-gray-500 hover:bg-gray-200"
                  )}
                >
                  Samacheer
                </button>
              </div>
              <select className="px-6 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-700 focus:border-blue-500 focus:outline-none min-w-[200px] shadow-sm">
                <option>Class 10</option>
                {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
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
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200" },
                    ]},
                    { day: "Tuesday", slots: [
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200" },
                    ]},
                    { day: "Wednesday", slots: [
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200" },
                    ]},
                    { day: "Thursday", slots: [
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200" },
                      { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100 border-teal-200" },
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200" },
                    ]},
                    { day: "Friday", slots: [
                      { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100 border-orange-200" },
                      { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100 border-purple-200" },
                      { s: "Hindi", t: "Mrs. Kavita Singh", c: "bg-pink-100 border-pink-200" },
                      { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100 border-blue-200" },
                    ]},
                  ].map((row) => (
                    <tr key={row.day} className="hover:bg-gray-50 transition-colors">
                      <td className="px-8 py-6 font-black text-[#182d45]">{row.day}</td>
                      {row.slots.map((item, iIdx) => (
                        <td key={iIdx} className="px-4 py-4 text-center border-l border-gray-50">
                          <div className={cn("rounded-2xl p-4 transition-transform hover:scale-105 border shadow-sm", item.c)}>
                            <div className="font-bold text-sm text-[#182d45]">{item.s}</div>
                            <div className="text-[11px] text-gray-500 font-medium mt-1">{item.t}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-6 font-black text-[#182d45]">Saturday</td>
                    <td className="px-4 py-4 border-l border-gray-50" colSpan={2}>
                      <div className="bg-green-100 rounded-2xl p-5 text-center border border-green-200 shadow-sm">
                        <div className="font-bold text-[#182d45] text-sm">Doubt Clearing Session</div>
                        <div className="text-[11px] text-gray-500 font-medium mt-1">All Teachers Available</div>
                      </div>
                    </td>
                    <td className="px-4 py-4 border-l border-gray-50" colSpan={2}>
                      <div className="bg-yellow-100 rounded-2xl p-5 text-center border border-yellow-200 shadow-sm">
                        <div className="font-bold text-[#182d45] text-sm">Practice & Revision</div>
                        <div className="text-[11px] text-gray-500 font-medium mt-1">Self Study with Mentors</div>
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
              <div className="space-y-2">
                <h4 className="font-black text-gray-900 text-base">Important Notes:</h4>
                <ul className="space-y-1.5 text-gray-600 text-[13px] font-medium leading-relaxed">
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Sunday is a holiday for all classes</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Each session includes a 15-minute break</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Extra classes are conducted before exams</li>
                  <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span> Timetable may vary based on class requirements</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Mentorship Section */}
      <section id="mentorship-section" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#2b65e2]/10 to-[#2abfaf]/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative h-[550px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
                <Image
                  src="https://images.unsplash.com/photo-1544717297-fa154da09f5b?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="One-to-One Mentorship"
                  fill
                  className="object-cover"
                  data-ai-hint="student portrait"
                />
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-10">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
                  One-to-One <span className="bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] bg-clip-text text-transparent">Mentorship</span>
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  Personalized attention to help every student reach their full potential
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { 
                    icon: UserCheck, 
                    title: "Individual Attention", 
                    desc: "Dedicated mentor assigned to each student for personalized guidance and support throughout their academic journey.",
                    bg: "bg-blue-100",
                    text: "text-blue-600"
                  },
                  { 
                    icon: ClipboardList, 
                    title: "Customized Study Plan", 
                    desc: "Tailored learning strategies based on individual strengths, weaknesses, and learning pace for optimal results.",
                    bg: "bg-teal-100",
                    text: "text-teal-600"
                  },
                  { 
                    icon: LineChart, 
                    title: "Weekly Academic Tracking", 
                    desc: "Regular monitoring of progress with detailed performance analysis and timely interventions when needed.",
                    bg: "bg-purple-100",
                    text: "text-purple-600"
                  },
                  { 
                    icon: Users, 
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
                    <div className="space-y-1">
                      <h3 className="text-xl font-extrabold text-[#182d45]">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button size="lg" className="px-10 py-8 bg-gradient-to-r from-[#2b65e2] to-[#2abfaf] text-white font-black text-xl rounded-2xl shadow-xl hover:shadow-[#2b65e2]/30 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-3">
                  <CalendarCheck className="h-6 w-6" />
                  Book Personal Session
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Students' <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">Celebrating exceptional achievements and academic excellence</p>
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
                <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {students.map((student, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                <div className="relative h-48 overflow-hidden">
                  <Image src={`https://picsum.photos/seed/stu${idx}/400/500`} alt={student.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
                      Rank {idx + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{student.grade}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={cn("text-3xl font-bold", student.color)}>{student.marks}</div>
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Marks</div>
                    </div>
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:rotate-12", student.iconBg)}>
                      <Star className="w-6 h-6 fill-current" />
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
