'use client';

import React from "react";
import Image from "next/image";
import { Star, Trophy, Medal, GraduationCap, Crown, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function OurResultsPage() {
  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Our-result.jpg"
          alt="Our Results Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            Our Results
          </h1>
        </div>
      </section>

      {/* Success Stats Section */}
      <section className="py-24 bg-white relative z-10 -mt-12 mx-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <div className="text-lg text-gray-600 font-normal">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Performers Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Our Top <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Performers</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">Celebrating the hard work and dedication of our brilliant students</p>
          </div>

          <div className="bg-white rounded-[16px] shadow-xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-[24px] font-bold text-[#182d45] tracking-tight">Top Achievers 2025</h3>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topPerformers.map((student, idx) => (
              <div key={idx} className="group bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 text-left">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={student.img} 
                    alt={student.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-ai-hint="student portrait"
                  />
                  <div className={cn("absolute top-4 right-4 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 bg-gradient-to-tr", student.badgeColor)}>
                    {student.rankIcon && <student.rankIcon className="w-3 h-3" />}
                    {student.rank}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-[20px] font-bold text-[#182d45] tracking-tight mb-1">{student.name}</h4>
                  <p className="text-[14px] text-gray-400 font-bold mb-8">{student.grade}</p>
                  
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <div className={cn("text-4xl font-bold tracking-tighter", student.marksColor)}>{student.marks}</div>
                      <div className="text-[12px] text-gray-400 font-normal">Total Marks</div>
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
