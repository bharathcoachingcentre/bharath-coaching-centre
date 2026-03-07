'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, FileText, GraduationCap, ArrowRight, Download, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

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
    hoverBorderColor: "hover:border-blue-300",
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

const AnimatedSection = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
    return (
      <section
        ref={setElement}
        id={id}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
      >
        {children}
      </section>
    );
};

export default function StudyMaterialPage() {
  const firestore = useFirestore();
  const [activeBoard, setActiveBoard] = useState("cbse");
  const [selectedClass, setSelectedClass] = useState("Class 10");

  const materialsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'study-materials'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: allMaterials, loading: materialsLoading } = useCollection(materialsQuery);

  const displayMaterials = useMemo(() => {
    if (!allMaterials) return [];
    
    return allMaterials
      .filter(m => {
        const matchesVisibility = m.isVisible !== false;
        const matchesGrade = m.grade === selectedClass;
        const matchesBoard = !m.board || m.board.toLowerCase() === activeBoard.toLowerCase();
        return matchesVisibility && matchesGrade && matchesBoard;
      })
      .map((m, idx) => {
        const styleIdx = idx % materialStyles.length;
        return {
          ...m,
          desc: m.description,
          ...materialStyles[styleIdx]
        };
      });
  }, [allMaterials, selectedClass, activeBoard]);

  return (
    <div className="font-body-home2">
      <section className="relative w-full flex items-center justify-center pt-32 pb-24" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Study-material.png"
          alt="Free Study Material"
          fill
          className="object-cover"
          data-ai-hint="books on a table"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            Free Study Material
          </h1>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-[0.2em] mb-4 shadow-sm"
              style={{ color: '#35a3be', backgroundColor: 'rgba(53, 163, 190, 0.1)', borderColor: 'rgba(53, 163, 190, 0.2)' }}
            >
              Academic Resources
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#182d45] tracking-tight">Access Premium Learning</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24">
            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#35a3be]" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53, 163, 190, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-[#182d45]">CBSE</CardTitle>
                  <p className="text-sm text-gray-500 font-medium mt-2">Complete NCERT solutions and chapter-wise practice questions</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="cbse-ncert-solutions" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">CBSE NCERT Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(cls => (
                          <Button key={cls} variant="outline" size="sm" onClick={() => {
                            setSelectedClass(cls);
                            setActiveBoard("cbse");
                            document.getElementById('study-materials-section')?.scrollIntoView({ behavior: 'smooth' });
                          }} className="rounded-lg border-gray-200 hover:border-[#35a3be] hover:text-[#35a3be] transition-colors">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cbse-chapter-wise-test" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">CBSE Chapter Wise Test Questions</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-xs py-4 leading-relaxed">
                      Deep dive into specific chapters with our curated list of test questions designed to test core conceptual understanding.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-[0_10px_20px_rgba(34, 197, 94, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-[#182d45]">Model Papers</CardTitle>
                  <p className="text-sm text-gray-500 font-medium mt-2">Board question papers and previous year papers for preparation</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="board-question-papers" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Board Question Papers</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-xs py-4 leading-relaxed">
                      Practice with the latest model board papers to understand the exam pattern and marking schemes.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="previous-year-papers" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Previous Year Board QP</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Class 10', 'Class 12'].map(cls => (
                          <Button key={cls} variant="outline" size="sm" onClick={() => {
                            setSelectedClass(cls);
                            document.getElementById('study-materials-section')?.scrollIntoView({ behavior: 'smooth' });
                          }} className="rounded-lg border-gray-200 hover:border-green-500 hover:text-green-600 transition-colors">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden text-left">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center shadow-[0_10px_20px_rgba(168, 85, 247, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-[#182d45]">Samacheer</CardTitle>
                  <p className="text-sm text-gray-500 font-medium mt-2">Book back solutions and comprehensive test materials for state board</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="samacheer-book-back" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Book Back Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Class 9', 'Class 10', 'Class 11', 'Class 12'].map(cls => (
                          <Button key={cls} variant="outline" size="sm" onClick={() => {
                            setSelectedClass(cls);
                            setActiveBoard("samacheer");
                            document.getElementById('study-materials-section')?.scrollIntoView({ behavior: 'smooth' });
                          }} className="rounded-lg border-gray-200 hover:border-purple-500 hover:text-purple-600 transition-colors">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-chapter-wise" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Chapter Wise Test Questions</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-xs py-4 leading-relaxed">
                      Structured test questions for every chapter in the Samacheer Kalvi syllabus.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-model-papers" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Model Board Question Papers</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-xs py-4 leading-relaxed">
                      Expertly drafted model papers following the state board guidelines.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-previous-year" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Previous Years Board QP</AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-xs py-4 leading-relaxed">
                      Review actual papers from previous years to gauge the difficulty and recurring topics.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div id="study-materials-section" className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                Download Free <span className="text-[#35a3be]">Study Materials</span>
              </h2>
              <p className="text-lg text-gray-500 font-normal">
                Filter by class and board to find specific resources
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6 mb-12">
              <div className="relative min-w-[180px] w-full lg:w-auto">
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="appearance-none w-full px-6 py-3.5 border-2 border-gray-100 rounded-xl font-bold text-gray-700 focus:border-[#35a3be] focus:outline-none shadow-sm bg-white cursor-pointer text-sm"
                >
                  <option value="Class 10">Class 10</option>
                  {Array.from({ length: 7 }, (_, i) => `Class ${i + 6}`).map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                  <option value="Class 3">Class 3</option>
                  <option value="Class 4">Class 4</option>
                  <option value="Class 5">Class 5</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex p-1.5 bg-[#f1f5f9] rounded-2xl mx-auto">
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

              <div className="hidden lg:block"></div>
            </div>

            {materialsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-[#35a3be]" />
                <p className="font-bold">Loading Materials...</p>
              </div>
            ) : displayMaterials.length === 0 ? (
              <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">No study materials found for {selectedClass} ({activeBoard.toUpperCase()}).</p>
                <p className="text-gray-400 text-sm mt-1">Please try another class or check back later.</p>
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
                      <span className={cn("px-3 py-1 text-white text-[12px] font-bold rounded-full shadow-sm", material.themeColor)}>{material.grade}</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#182d45] mb-2 tracking-tight text-left">{material.title}</h3>
                    <p className="text-[14px] text-[#4b5563] font-normal mb-4 flex-grow text-left">{material.desc}</p>
                    <Button
                      asChild
                      className={cn(
                        "w-full text-white font-bold rounded-2xl h-14 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-auto",
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
      </AnimatedSection>
    </div>
  );
}
