
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
  Crown,
  UserPlus,
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
      lightBg: "bg-[#eff6ff]",
      iconContainerBg: "bg-blue-100",
      borderColor: "border-blue-100",
      hoverBorderColor: "hover:border-[#2b65e2]",
      iconColor: "text-[#2b65e2]",
    },
    {
      title: "Science",
      grade: "Class 10",
      desc: "Physics, Chemistry & Biology notes",
      themeColor: "bg-[#2abfaf]",
      hoverThemeColor: "hover:bg-teal-700",
      lightBg: "bg-[#f0fdfa]",
      iconContainerBg: "bg-teal-100",
      borderColor: "border-teal-100",
      hoverBorderColor: "hover:border-[#2abfaf]",
      iconColor: "text-[#2abfaf]",
    },
    {
      title: "English",
      grade: "Class 9",
      desc: "Grammar, literature and writing skills",
      themeColor: "bg-[#8b5cf6]",
      hoverThemeColor: "hover:bg-violet-700",
      lightBg: "bg-[#f5f3ff]",
      iconContainerBg: "bg-purple-100",
      borderColor: "border-purple-100",
      hoverBorderColor: "hover:border-[#8b5cf6]",
      iconColor: "text-[#8b5cf6]",
    },
    {
      title: "Social Science",
      grade: "Class 12",
      desc: "History, Geography & Civics notes",
      themeColor: "bg-[#f97316]",
      hoverThemeColor: "hover:bg-orange-700",
      lightBg: "bg-[#fff7ed]",
      iconContainerBg: "bg-orange-100",
      borderColor: "border-orange-100",
      hoverBorderColor: "hover:border-[#f97316]",
      iconColor: "text-[#f97316]",
    },
    {
      title: "Physics",
      grade: "Class 11",
      desc: "Concepts, formulas and problems",
      themeColor: "bg-[#ec4899]",
      hoverThemeColor: "hover:bg-pink-700",
      lightBg: "bg-[#fdf2f8]",
      iconContainerBg: "bg-pink-100",
      borderColor: "border-pink-100",
      hoverBorderColor: "hover:border-[#ec4899]",
      iconColor: "text-[#ec4899]",
    },
    {
      title: "Chemistry",
      grade: "Class 11",
      desc: "Organic, inorganic & physical chemistry",
      themeColor: "bg-[#6366f1]",
      hoverThemeColor: "hover:bg-indigo-700",
      lightBg: "bg-[#eef2ff]",
      iconContainerBg: "bg-indigo-100",
      borderColor: "border-indigo-100",
      hoverBorderColor: "hover:border-[#6366f1]",
      iconColor: "text-[#6366f1]",
    },
    {
      title: "Biology",
      grade: "Class 12",
      desc: "Botany and zoology comprehensive notes",
      themeColor: "bg-[#22c55e]",
      hoverThemeColor: "hover:bg-green-700",
      lightBg: "bg-[#f0fdf4]",
      iconContainerBg: "bg-green-100",
      borderColor: "border-green-100",
      hoverBorderColor: "hover:border-[#22c55e]",
      iconColor: "text-[#22c55e]",
    },
    {
      title: "Hindi",
      grade: "Class 8",
      desc: "Grammar and literature study material",
      themeColor: "bg-[#eab308]",
      hoverThemeColor: "hover:bg-yellow-700",
      lightBg: "bg-[#fefce8]",
      iconContainerBg: "bg-yellow-100",
      borderColor: "border-yellow-100",
      hoverBorderColor: "hover:border-[#eab308]",
      iconColor: "text-[#eab308]",
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
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-600 rounded-xl flex items-center justify-center">
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
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
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
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-[0_10px_25px_rgba(43,101,226,0.3)]"
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
                      ? "bg-gradient-to-tr from-[#2b65e2] to-[#2abfaf] text-white shadow-[0_10px_25px_rgba(43,101,226,0.3)]"
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
                        {material.title === "Mathematics" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H16C17.1046 22 18 21.1046 18 20V8L12 2H4Z" />
                          </svg>
                        )}
                        {material.title === "Science" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.9265 4 15.5898 5.15175 16.3268 6.80937C16.8974 8.04655 17.9535 8.92728 19.2632 9.17604C19.782 9.27318 20.2541 9.61057 20.5298 10.0898C20.8055 10.5691 20.8055 11.1293 20.5298 11.6085C20.2541 12.0878 19.782 12.4252 19.2632 12.5223C17.9535 12.7711 16.8974 13.6519 16.3268 14.889C15.5898 16.5467 13.9265 17.6984 12 17.6984C10.0735 17.6984 8.41022 16.5467 7.67322 14.889C7.10264 13.6519 6.04652 12.7711 4.73682 12.5223C4.21805 12.4252 3.74597 12.0878 3.47025 11.6085C3.19453 11.1293 3.19453 10.5691 3.47025 10.0898C3.74597 9.61057 4.21805 9.27318 4.73682 9.17604C6.04652 8.92728 7.10264 8.04655 7.67322 6.80937C8.41022 5.15175 10.0735 4 12 4ZM12 6.30156C11.1574 6.30156 10.4571 6.62124 10.0152 7.21809C9.79979 7.4912 9.3879 7.4912 9.17249 7.21809C8.72993 6.62124 8.0296 6.30156 7.18698 6.30156C7.59972 6.7844 7.95405 7.37893 8.21443 8C7.56149 8.65349 7.16851 9.47959 7.16851 10.3708C7.16851 11.2619 7.56149 12.0881 8.21443 12.7415C7.95405 13.336 7.59972 13.9305 7.18698 14.4134C8.0296 14.4134 8.72993 14.0937 9.17249 13.5019C9.3879 13.2288 9.79979 13.2288 10.0152 13.5019C10.4571 14.0937 11.1574 14.4134 12 14.4134C12.8426 14.4134 13.5429 14.0937 13.9848 13.5019C14.2002 13.2288 14.6121 13.2288 14.8275 13.5019C15.2701 14.0937 15.9704 14.4134 16.813 14.4134C17.6556 14.4134 18.3559 14.0937 18.7978 13.5019C19.0132 13.2288 19.4251 13.2288 19.6405 13.5019C20.0831 14.0937 20.7834 14.4134 21.626 14.4134C21.626 13.5222 21.626 12.641 21.626 11.7598C21.626 11.7598 21.626 10.8786 21.626 9.99742C20.7834 9.99742 20.0831 10.3171 19.6405 10.9089C19.4251 11.1819 19.0132 11.1819 18.7978 10.9089C18.3559 10.3171 17.6556 9.99742 16.813 9.99742C15.9704 9.99742 15.2701 10.3171 14.8275 10.9089C14.6121 11.1819 14.2002 11.1819 13.9848 10.9089C13.5429 10.3171 12.8426 9.99742 12 9.99742C11.1574 9.99742 10.4571 10.3171 10.0152 10.9089C9.79979 11.1819 9.3879 11.1819 9.17249 10.9089C8.72993 10.3171 8.0296 9.99742 7.18698 9.99742C6.34437 9.99742 5.64405 10.3171 5.2015 10.9089C4.98609 11.1819 4.5742 11.1819 4.35878 10.9089C3.91622 10.3171 3.21589 9.99742 2.37328 9.99742C2.37328 9.11621 2.37328 8.23502 2.37328 7.35383C3.21589 7.35383 3.91622 7.03415 4.35878 6.4423C4.5742 6.1692 4.98609 6.1692 5.2015 6.4423C5.64405 7.03415 6.34437 7.35383 7.18698 7.35383C7.59972 6.7844 7.95405 6.18987 8.21443 5.59792C8.72993 5.00606 9.43026 4.68638 10.2736 4.68638C10.4571 4.68638 11.1574 4.99607 12 6.30156Z" />
                          </svg>
                        )}
                        {material.title === "English" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                           <path d="M4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H16C17.1046 22 18 21.1046 18 20V8L12 2H4Z" />
                           <path d="M7 6H12M7 10H12M7 14H12" />
                          </svg>
                        )}
                        {material.title === "Social Science" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M10 5H14C15.1046 5 16 5.89543 16 7V17C16 18.1046 15.1046 19 14 19H10C8.89543 19 8 18.1046 8 17V7C8 5.89543 8.89543 5 10 5ZM10 7V17H14V7H10ZM6 7H7V17H6V7ZM17 7H18V17H17V7Z" />
                          </svg>
                        )}
                        {material.title === "Physics" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM6.41464 6.41421L10.5858 10.5858L9.17157 12L4.99999 7.82843L6.41464 6.41421ZM14.8284 10.5858L19 6.41421L20.4146 7.82843L16.2428 12L14.8284 10.5858ZM14.8284 13.4142L16.2428 17.5858L20.4146 13.4142L19 12L14.8284 13.4142ZM9.17157 12L4.99999 16.1716L6.41464 17.5858L10.5858 13.4142L9.17157 12ZM12 17L12 10" />
                          </svg>
                        )}
                        {material.title === "Chemistry" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12ZM5 12C5 8.68629 7.68629 6 11 6V5C7.13401 5 4 8.13401 4 12C4 15.866 7.13401 19 11 19V18C7.68629 18 5 15.3137 5 12ZM11 19C15.3137 19 18 15.866 18 12C18 8.13401 15.3137 5 11 5V6C14.3137 6 17 8.68629 17 12C17 15.3137 14.3137 18 11 18V19ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" />
                          </svg>
                        )}
                         {material.title === "Biology" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM11.9999 15.5C13.3805 15.5 14.5 14.3804 14.5 13C14.5 11.6196 13.3805 10.5 11.9999 10.5C10.6193 10.5 9.49997 11.6196 9.49997 13C9.49997 14.3804 10.6193 15.5 11.9999 15.5ZM16.4999 11.9997C16.4999 10.3434 14.9997 9 12.9999 9C12.3567 9 11.7766 9.17515 11.2917 9.49964C10.6729 9.87321 9.99837 10.1601 9.38885 10.3468C8.94939 10.4993 8.52985 10.6094 8.16905 10.6721C8.04938 10.6946 7.93639 10.7099 7.83296 10.7161C7.38209 10.7454 6.96025 10.9575 6.64259 11.2996C6.31976 11.646 6.13639 12.0622 6.11504 12.4997C6.09632 12.8795 6.22384 13.2505 6.46738 13.5684C6.71485 13.8893 7.07684 14.1292 7.50298 14.2586C7.57467 14.2796 7.64757 14.294 7.72147 14.3005C8.16335 14.3418 8.59154 14.4927 8.95689 14.7358C9.59368 15.1843 10.2223 15.3409 10.9701 15.3409C11.6968 15.3409 12.3385 15.1923 12.964 14.8696C13.567 14.5606 14.1021 14.0153 14.464 13.3996C14.7865 12.8354 14.9999 12.4278 14.9999 11.9997C14.9999 10.3434 16.4999 9 16.4999 11.9997Z" />
                          </svg>
                        )}
                        {material.title === "Hindi" && (
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={cn("w-9 h-11", material.iconColor)}>
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C13.1046 4 14 4.89543 14 6H10C10 4.89543 10.8954 4 12 4ZM10 8H14C15.1046 8 16 8.89543 16 10V14C16 15.1046 15.1046 16 14 16H10C8.89543 16 8 15.1046 8 14V10C8 8.89543 8.89543 8 10 8ZM8 18H16C17.1046 18 18 17.1046 18 16H6C6 17.1046 6.89543 18 8 18Z" />
                          </svg>
                        )}
                        <span className="absolute bottom-2 text-[7px] font-black text-white leading-none uppercase">PDF</span>
                      </div>
                    </div>
                    <span className={cn("px-4 py-1.5 text-white text-[10px] font-black rounded-full shadow-sm", material.themeColor)}>{material.grade}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{material.title}</h3>
                  <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">{material.desc}</p>
                  <Button
                    className={cn(
                      "w-full text-white font-black rounded-xl h-12 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2",
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
                  <Button variant="outline" className="w-full py-6 font-semibold rounded-xl bg-gray-50 border-gray-200">
                    <Clock className="mr-2 h-5 w-5" />
                    View Timetable
                  </Button>
                  <Button
                    className={cn(
                      "w-full py-6 font-bold rounded-xl text-white shadow-lg transition-all transform active:scale-95",
                      program.popular ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gradient-to-r from-blue-600 to-blue-700"
                    )}
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Offline Class <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Timetable</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              View our structured class schedules for offline sessions
            </p>
          </div>

          <Card className="rounded-[3rem] shadow-2xl border-none overflow-hidden bg-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                <Button
                  onClick={() => setActiveScheduleBoard("cbse")}
                  variant="ghost"
                  className={cn("font-bold px-8 rounded-xl transition-all", activeScheduleBoard === "cbse" ? "bg-white shadow-sm text-blue-600" : "text-gray-500")}
                >
                  CBSE
                </Button>
                <Button
                  onClick={() => setActiveScheduleBoard("samacheer")}
                  variant="ghost"
                  className={cn("font-bold px-8 rounded-xl transition-all", activeScheduleBoard === "samacheer" ? "bg-white shadow-sm text-blue-600" : "text-gray-500")}
                >
                  Samacheer
                </Button>
              </div>
              <select className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 focus:border-blue-500 focus:outline-none min-w-[200px]">
                <option>Class 10</option>
                {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-blue-600 to-teal-500 text-white">
                  <tr>
                    <th className="px-8 py-6 font-bold text-lg">Day / Time</th>
                    <th className="px-8 py-6 font-bold text-lg text-center">9:00 AM - 10:30 AM</th>
                    <th className="px-8 py-6 font-bold text-lg text-center">11:00 AM - 12:30 PM</th>
                    <th className="px-8 py-6 font-bold text-lg text-center">2:00 PM - 3:30 PM</th>
                    <th className="px-8 py-6 font-bold text-lg text-center">4:00 PM - 5:30 PM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                    <tr key={day} className="hover:bg-blue-50 transition-colors">
                      <td className="px-8 py-6 font-bold text-gray-900">{day}</td>
                      {[
                        { s: "Mathematics", t: "Mr. Rajesh Kumar", c: "bg-blue-100", tc: "text-blue-900" },
                        { s: "Science", t: "Dr. Priya Sharma", c: "bg-teal-100", tc: "text-teal-900" },
                        { s: "English", t: "Ms. Anjali Verma", c: "bg-purple-100", tc: "text-purple-900" },
                        { s: "Social Science", t: "Mr. Suresh Reddy", c: "bg-orange-100", tc: "text-orange-900" },
                      ].map((item, iIdx) => (
                        <td key={iIdx} className="px-8 py-6 text-center">
                          <div className={cn("rounded-2xl p-4 transition-transform hover:scale-105", item.c)}>
                            <div className={cn("font-bold", item.tc)}>{item.s}</div>
                            <div className="text-xs opacity-70 mt-1">{item.t}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="hover:bg-green-50 transition-colors">
                    <td className="px-8 py-6 font-bold text-gray-900">Saturday</td>
                    <td className="px-8 py-6" colSpan={2}>
                      <div className="bg-green-100 rounded-2xl p-4 text-center font-bold text-green-900">Doubt Clearing Session - All Teachers</div>
                    </td>
                    <td className="px-8 py-6" colSpan={2}>
                      <div className="bg-yellow-100 rounded-2xl p-4 text-center font-bold text-yellow-900">Practice & Revision - Self Study</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Results Showcase Section */}
      <section className="py-24 bg-white">
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
                      <Crown className="w-3 h-3 inline mr-1" /> {student.rank}
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
