'use client';

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Star, Trophy, Medal, GraduationCap, Crown, Award, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFirestore, useDoc, useCollection } from "@/firebase";
import { doc, collection, query, where, orderBy } from "firebase/firestore";

const iconMap: Record<string, any> = {
  Trophy: Trophy,
  Medal: Medal,
  GraduationCap: GraduationCap,
  Crown: Crown,
  Award: Award,
  Star: Star,
};

export default function OurResultsPage() {
  const firestore = useFirestore();
  const [selectedResultYear, setSelectedResultYear] = useState("2025");

  // 1. Fetch Page Content
  const pageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "results");
  }, [firestore]);
  const { data: pageData, loading: pageLoading } = useDoc(pageRef);

  const content = useMemo(() => {
    const defaults = {
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
    };

    if (!pageData?.content) return defaults;
    return { ...defaults, ...pageData.content };
  }, [pageData]);

  // 2. Fetch Available Years
  const yearsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'years'), orderBy('year', 'desc'));
  }, [firestore]);
  const { data: yearsList, loading: yearsLoading } = useCollection(yearsQuery);

  const availableYears = useMemo(() => {
    if (!yearsList) return [];
    return [...new Set(yearsList.map(y => String(y.year).trim()))].filter(Boolean);
  }, [yearsList]);

  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedResultYear)) {
      setSelectedResultYear(availableYears[0]);
    }
  }, [availableYears, selectedResultYear]);

  // 3. Fetch Top Performers
  const performersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'top-performers'),
      where('year', '==', selectedResultYear)
    );
  }, [firestore, selectedResultYear]);
  const { data: performers, loading: performersLoading } = useCollection(performersQuery);

  const performersList = useMemo(() => {
    if (!performers) return [];
    return [...performers].sort((a, b) => {
      // Sort by marks descending (highest first)
      const marksA = parseFloat(String(a.marks).replace(/[^0-9.]/g, '')) || 0;
      const marksB = parseFloat(String(b.marks).replace(/[^0-9.]/g, '')) || 0;
      
      if (marksB !== marksA) {
        return marksB - marksA;
      }
      
      // Secondary sort by rank order if marks are equal
      return (a.rankOrder || 999) - (b.rankOrder || 999);
    });
  }, [performers]);

  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Syncing Results...</p>
      </div>
    );
  }

  return (
    <div>
      <section className="relative w-full flex items-center justify-center pt-20" style={{ height: '500px' }}>
        <Image
          src={content.heroImageUrl}
          alt="Our Results Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            {content.heroTitle}
          </h1>
        </div>
      </section>

      {/* Success Stats Section with Curvy Design */}
      <section className="relative py-20 z-10 -mt-24 px-4 overflow-hidden text-left">
        {/* Curvy Background Shape */}
        <div className="absolute inset-0 top-16 bg-white rounded-t-[100px] shadow-[0_-25px_60px_rgba(0,0,0,0.04)]"></div>
        <div className="absolute inset-0 top-16 bg-gradient-to-br from-blue-50/30 to-teal-50/30 rounded-t-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {content.successTitleMain} <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.successTitleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              {content.successSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {(content.successStats || []).map((stat: any, idx: number) => {
              const Icon = iconMap[stat.icon] || Trophy;
              return (
                <div key={idx} className="bg-white rounded-[2.5rem] shadow-[0_30px_70px_rgba(8,112,184,0.06)] p-10 text-center border border-white transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_90px_rgba(8,112,184,0.12)] group">
                  <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl text-white transform transition-transform group-hover:scale-110", stat.color || "bg-blue-500")}>
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="text-5xl font-bold text-[#182d45] mb-2 tracking-tighter">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-[#35a3be] uppercase tracking-[0.25em]">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Performers Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {content.performersTitleMain} <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.performersTitleHighlight}</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-normal">
              {content.performersSubtitle}
            </p>
          </div>

          <div className="bg-white rounded-[16px] shadow-xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
            <h3 className="text-[24px] font-bold text-[#182d45] tracking-tight">
              {content.performersYearHeader} {selectedResultYear}
            </h3>
            <div className="w-full md:w-auto min-w-[180px] text-left">
              <Select value={selectedResultYear} onValueChange={setSelectedResultYear}>
                <SelectTrigger className="h-12 bg-[#f8fafc] border-gray-200 rounded-xl font-bold text-gray-700 shadow-sm focus:ring-blue-600">
                  <SelectValue placeholder={yearsLoading ? "Loading..." : `Year ${selectedResultYear}`} />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                  {availableYears.length > 0 ? (
                    availableYears.map(year => (
                      <SelectItem key={year} value={year}>Year {year}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No years available</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {performersLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="font-bold">Syncing Records...</p>
            </div>
          ) : performersList.length === 0 ? (
            <div className="text-center py-32 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
              <Trophy className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 font-bold">No achievement records found for {selectedResultYear}.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {performersList.map((student, idx) => {
                const PerformerRankIcon = iconMap[student.rankIcon] || Star;
                return (
                  <div key={idx} className="group bg-white rounded-[16px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden transition-all duration-500 hover:shadow-[0_30px_80px_rgba(0,0,0,0.1)] hover:-translate-y-2 text-left">
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image 
                        src={student.imageUrl || "https://placehold.co/400x400.png?text=No+Photo"} 
                        alt={student.name} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        data-ai-hint="student portrait"
                      />
                      <div className={cn("absolute top-4 right-4 px-4 py-1.5 rounded-full text-white text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 bg-gradient-to-tr", student.badgeColor || "bg-blue-600")}>
                        <PerformerRankIcon className="w-3 h-3" />
                        {student.rank}
                      </div>
                    </div>
                    <div className="p-8">
                      <h4 className="text-[20px] font-bold text-[#182d45] tracking-tight mb-1">{student.name}</h4>
                      <p className="text-[14px] text-gray-400 font-bold mb-8">{student.grade}</p>
                      
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <div className={cn("text-4xl font-bold tracking-tighter", student.marksColor || "text-blue-600")}>{student.marks}</div>
                          <div className="text-[12px] text-gray-400 font-normal">{content.totalMarksLabel}</div>
                        </div>
                        <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl transition-transform duration-500 group-hover:rotate-12", student.iconColor || "bg-blue-600")}>
                          <Star className="w-7 h-7 fill-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
