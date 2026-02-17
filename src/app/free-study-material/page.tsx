
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, FileText, GraduationCap, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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

export default function FreeStudyMaterialPage() {
  return (
    <div className="font-body-home2">
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Study-material.png"
          alt="Free Study Material"
          fill
          className="object-cover"
          data-ai-hint="books on a table"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            Free Study Material
          </h1>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        {/* Background Blobs for Modern UI feel */}
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
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#182d45] tracking-tight">Access Premium Learning</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* CBSE Card */}
            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-[#35a3be]" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53, 163, 190, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <BookOpen className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-extrabold text-[#182d45]">CBSE</CardTitle>
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
                          <Button key={cls} variant="outline" size="sm" className="rounded-lg border-gray-200 hover:border-[#35a3be] hover:text-[#35a3be] transition-colors">{cls}</Button>
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

            {/* Model Papers Card */}
            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-green-500" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center shadow-[0_10px_20px_rgba(34, 197, 94, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <FileText className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-extrabold text-[#182d45]">Model Papers</CardTitle>
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
                          <Button key={cls} variant="outline" size="sm" className="rounded-lg border-gray-200 hover:border-green-500 hover:text-green-600 transition-colors">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Samacheer Card */}
            <Card className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-purple-500" />
              <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-400 flex items-center justify-center shadow-[0_10px_20px_rgba(168, 85, 247, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <GraduationCap className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div>
                  <CardTitle className="text-2xl font-extrabold text-[#182d45]">Samacheer</CardTitle>
                  <p className="text-sm text-gray-500 font-medium mt-2">Book back solutions and comprehensive test materials for state board</p>
                </div>
              </CardHeader>
              <CardContent className="p-8 pt-0 flex-grow">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="samacheer-book-back" className="border-gray-100">
                    <AccordionTrigger className="hover:no-underline font-bold text-[#182d45] text-sm">Book Back Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {['Class 9', 'Class 10', 'Class 11'].map(cls => (
                          <Button key={cls} variant="outline" size="sm" className="rounded-lg border-gray-200 hover:border-purple-500 hover:text-purple-600 transition-colors">{cls}</Button>
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
        </div>
      </AnimatedSection>
    </div>
  );
}
