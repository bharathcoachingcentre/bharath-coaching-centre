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
  FileText,
  Download,
  Star,
  CheckCircle2,
  Trophy,
  Medal,
  ChevronRight,
  ShieldCheck,
  Zap,
  UserRound,
  PieChart,
  CalendarDays,
  Layers,
  Handshake,
  BookMarked,
  Search,
  MonitorPlay,
  School,
  Lightbulb,
  Apple,
  PartyPopper,
  Pencil,
  Ruler,
  FlaskConical,
  Atom,
  Languages,
  Sun,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const [activeBoard, setActiveBoard] = useState("cbse");

  const topPerformers = [
    { name: "Ananya Krishnan", grade: "Class 10, CBSE", marks: "98.6%", rank: 1, image: "https://picsum.photos/seed/student1/400/500", color: "text-[#35a3be]" },
    { name: "Arjun Mehta", grade: "Class 12, CBSE", marks: "97.8%", rank: 2, image: "https://picsum.photos/seed/student2/400/500", color: "text-teal-600" },
    { name: "Divya Nair", grade: "Class 10, Samacheer", marks: "96.4%", rank: 3, image: "https://picsum.photos/seed/student3/400/500", color: "text-purple-600" },
    { name: "Rohan Kapoor", grade: "Class 12, CBSE", marks: "95.2%", rank: 4, image: "https://picsum.photos/seed/student4/400/500", color: "text-orange-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-[#EFF6FF] to-[#CCFBF1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#35a3be]/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 blur-[100px] rounded-full"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left space-y-8"
            >
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#182d45] leading-tight">
                  Empowering Students from{" "}
                  <span className="text-[#35a3be]">Class 1 to 12</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium">
                  Interactive coaching for CBSE and Samacheer with personalized mentorship and academic growth tracking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="px-8 py-7 bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold text-lg rounded-xl shadow-xl transition-all duration-300 transform hover:scale-105">
                  <Link href="/contact">
                    <CalendarCheck className="mr-2 h-6 w-6" />
                    Book Free Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-7 bg-white text-gray-700 font-bold text-lg rounded-xl border-2 border-gray-200 hover:border-[#35a3be] hover:text-[#35a3be] transition-all duration-300 transform hover:scale-105">
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
                      <Users className="text-[#35a3be] w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-[#182d45]">5000+</div>
                      <div className="text-sm text-gray-600">Students</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="text-teal-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-[#182d45]">95%</div>
                      <div className="text-sm text-gray-600">Success Rate</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="text-purple-600 w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold text-[#182d45]">10+</div>
                      <div className="text-sm text-gray-600">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] lg:h-[650px] flex items-center justify-center"
            >
              <Image
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a8a9fae2e1-8efab94f8657d56caa94.png"
                alt="Empowering Education"
                width={600}
                height={800}
                className="w-full h-full object-contain rounded-3xl relative z-10"
                priority
                data-ai-hint="student success"
              />

              <div className="absolute top-8 right-4 lg:right-8 animate-bounce bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-[#35a3be] rounded-xl flex items-center justify-center">
                    <Book className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Curriculum</div>
                    <div className="text-lg font-bold text-[#182d45]">CBSE</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-24 left-4 lg:left-8 animate-pulse bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/50 z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">Excellence</div>
                    <div className="text-lg font-bold text-[#182d45]">Samacheer</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#182d45]">
              How We Help Students <span className="text-[#35a3be]">Excel</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Comprehensive learning solutions designed to ensure academic success through innovative methods.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              { icon: Presentation, title: "Daily Interactive Classes", desc: "Engaging live sessions with expert teachers ensuring concept clarity", color: "bg-blue-100 text-[#35a3be]" },
              { icon: FilePenLine, title: "Practice Worksheets", desc: "Comprehensive practice materials for every chapter and topic", color: "bg-teal-100 text-teal-600" },
              { icon: MessagesSquare, title: "Instant Doubt Solving", desc: "Get your questions answered immediately by dedicated mentors", color: "bg-purple-100 text-purple-600" },
              { icon: BookOpen, title: "Study Materials", desc: "High-quality printed notes and reference materials delivered", color: "bg-orange-100 text-orange-600" },
              { icon: UserCheck, title: "Mentor Support", desc: "One-on-one guidance tailored to your learning pace and goals", color: "bg-pink-100 text-pink-600" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col items-center text-center space-y-4 transition-all duration-300"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm", feature.color)}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#182d45]">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Study Materials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#182d45] mb-4">
              Download Free <span className="text-[#35a3be]">Study Materials</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Access comprehensive study resources for all subjects and classes
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-white">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
              <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                <Button 
                  onClick={() => setActiveBoard("cbse")}
                  variant={activeBoard === "cbse" ? "default" : "ghost"}
                  className={cn("rounded-xl px-8 font-bold", activeBoard === "cbse" ? "bg-[#35a3be] text-white shadow-lg" : "text-gray-500")}
                >
                  CBSE
                </Button>
                <Button 
                  onClick={() => setActiveBoard("samacheer")}
                  variant={activeBoard === "samacheer" ? "default" : "ghost"}
                  className={cn("rounded-xl px-8 font-bold", activeBoard === "samacheer" ? "bg-[#35a3be] text-white shadow-lg" : "text-gray-500")}
                >
                  Samacheer
                </Button>
              </div>
              <select className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 font-bold text-gray-700 focus:ring-2 focus:ring-[#35a3be] outline-none">
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Mathematics", grade: "Class 10", color: "bg-blue-50 border-blue-100", iconColor: "text-blue-600" },
                { title: "Science", grade: "Class 10", color: "bg-teal-50 border-teal-100", iconColor: "text-teal-600" },
                { title: "English", grade: "Class 9", color: "bg-purple-50 border-purple-100", iconColor: "text-purple-600" },
                { title: "Social Science", grade: "Class 12", color: "bg-orange-50 border-orange-100", iconColor: "text-orange-600" },
              ].map((material, idx) => (
                <div key={idx} className={cn("rounded-2xl p-6 border-2 hover:border-[#35a3be] hover:shadow-xl transition-all duration-300", material.color)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <FileText className={cn("w-8 h-8", material.iconColor)} />
                    </div>
                    <Badge variant="outline" className="bg-white font-bold">{material.grade}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-[#182d45] mb-2">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">Comprehensive notes and formulas</p>
                  <Button className="w-full bg-[#35a3be] hover:bg-[#174f5f] text-white font-bold rounded-xl h-12 shadow-md">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
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
            <h2 className="text-4xl sm:text-5xl font-black text-[#182d45] mb-4">
              Explore Our <span className="text-[#35a3be]">Academic Programs</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Choose the perfect learning path designed for your child's academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { title: "Classes 1–5", subtitle: "Foundation Program", icon: Zap, color: "bg-blue-100 text-[#35a3be]", points: ["Strong subject fundamentals", "Interactive learning activities", "Focus on basic arithmetic", "Regular parent updates", "Personalized attention"] },
              { title: "Classes 6–8", subtitle: "Middle School Program", icon: BookOpen, color: "bg-teal-100 text-teal-600", points: ["Comprehensive subject coverage", "Concept-based learning", "Regular tests & assessments", "Project-based learning", "Competitive exam prep"] },
              { title: "Classes 9–12", subtitle: "Senior Secondary Program", icon: GraduationCap, color: "bg-purple-100 text-purple-600", popular: true, points: ["Board exam focused coaching", "JEE & NEET integrated prep", "Advanced problem solving", "Weekly mock analysis", "Career counseling"] },
            ].map((program, idx) => (
              <Card key={idx} className={cn(
                "relative rounded-[2.5rem] p-10 flex flex-col h-full border-2 transition-all duration-500 hover:shadow-2xl",
                program.popular ? "border-[#35a3be]/30 shadow-2xl scale-105" : "border-gray-100 shadow-lg"
              )}>
                {program.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#35a3be] text-white px-6 py-2 rounded-full font-bold shadow-lg">MOST POPULAR</Badge>
                  </div>
                )}
                <div className="mb-8">
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg", program.color)}>
                    <program.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-[#182d45]">{program.title}</h3>
                  <p className="text-gray-500 font-bold mt-1 uppercase tracking-widest text-xs">{program.subtitle}</p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {program.points.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-teal-500 w-5 h-5 mt-0.5" />
                      <span className="text-gray-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
                <Button className={cn(
                  "w-full py-7 font-black rounded-2xl text-lg shadow-xl transition-all",
                  "bg-[#35a3be] hover:bg-[#174f5f] text-white"
                )}>
                  Enroll Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="py-24 bg-blue-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black text-[#182d45] mb-4">
              Offline Class <span className="text-[#35a3be]">Timetable</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              View our structured class schedules for comprehensive learning.
            </p>
          </div>

          <Card className="rounded-[3rem] shadow-2xl border-none overflow-hidden bg-white p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
              <div className="flex p-1.5 bg-gray-100 rounded-2xl">
                <Button variant="ghost" className="bg-white shadow-sm font-bold px-8 rounded-xl text-[#35a3be]">CBSE</Button>
                <Button variant="ghost" className="text-gray-500 font-bold px-8 rounded-xl">Samacheer</Button>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-[#182d45]">Select Grade:</span>
                <select className="bg-gray-100 border-none rounded-xl px-6 py-3 font-bold text-[#35a3be] focus:ring-2 focus:ring-[#35a3be] outline-none">
                  {Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-gray-100">
              <table className="w-full text-left">
                <thead className="bg-[#35a3be] text-white">
                  <tr>
                    <th className="px-8 py-6 font-black text-lg">Day / Time</th>
                    <th className="px-8 py-6 font-black text-lg text-center">9:00 AM - 10:30 AM</th>
                    <th className="px-8 py-6 font-black text-lg text-center">11:00 AM - 12:30 PM</th>
                    <th className="px-8 py-6 font-black text-lg text-center">2:00 PM - 3:30 PM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, dIdx) => (
                    <tr key={day} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-8 py-6 font-black text-[#182d45]">{day}</td>
                      {[
                        { s: "Mathematics", t: "Mr. Rajesh K." },
                        { s: "Science", t: "Dr. Priya S." },
                        { s: "English", t: "Ms. Anjali V." }
                      ].map((item, iIdx) => (
                        <td key={iIdx} className="px-8 py-6">
                          <div className={cn(
                            "rounded-2xl p-4 text-center border-2",
                            iIdx === 0 ? "bg-blue-50 border-blue-100" : iIdx === 1 ? "bg-teal-50 border-teal-100" : "bg-purple-50 border-purple-100"
                          )}>
                            <div className="font-bold text-[#182d45]">{item.s}</div>
                            <div className="text-xs text-gray-500 font-bold uppercase mt-1">{item.t}</div>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Success Stories Stats */}
      <section className="py-24 bg-[#182d45] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              { icon: Trophy, val: "95%", label: "Pass Rate", color: "from-[#35a3be] to-blue-600" },
              { icon: Medal, val: "120+", label: "Distinctions", color: "from-teal-500 to-teal-600" },
              { icon: Users, val: "5000+", label: "Happy Students", color: "from-purple-500 to-purple-600" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className={cn("w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl", stat.color)}>
                  <stat.icon className="text-white w-10 h-10" />
                </div>
                <div className="text-5xl font-black mb-2">{stat.val}</div>
                <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#35a3be] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-black leading-tight max-w-3xl mx-auto">
            Ready to Start Your Journey to Academic Excellence?
          </h2>
          <Button asChild size="lg" className="bg-white text-[#35a3be] hover:bg-gray-100 font-black py-8 px-12 rounded-2xl text-xl shadow-2xl transform transition-all duration-300 hover:scale-105">
            <Link href="/contact">Book Free Consultation Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
