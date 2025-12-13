
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, CheckCircle, Book, Pencil, Ruler, Calculator, FlaskConical, Atom, GraduationCap, BookOpen, FileCheck, FunctionSquare, FileText, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const AnimatedSection = ({ children, className, id, style }: { children: React.ReactNode; className?: string; id?: string, style?: React.CSSProperties }) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
    return (
      <section
        ref={setElement}
        id={id}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
        style={style}
      >
        {children}
      </section>
    );
  };
  
  const AnimatedElement = ({ children, className, animation }: { children: React.ReactNode; className?: string; animation: 'fade-left' | 'fade-up' | 'fade-left-up' | 'shake' }) => {
      const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
    
      const animationClass = 
          animation === 'fade-left' ? 'animate-on-scroll-left' : 
          animation === 'fade-left-up' ? 'animate-on-scroll-left-up' : 
          animation === 'shake' ? 'animate-on-scroll-shake' : 
          'animate-on-scroll';
  
      return (
        <div
          ref={setElement}
          className={cn(animationClass, { 'is-visible': isIntersecting }, className)}
        >
          {children}
        </div>
      );
    };

export default function StudyMaterialSamacheerPage() {
    const searchParams = useSearchParams();
    const [activePagination, setActivePagination] = React.useState(12);
    const studyMaterialSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const classParam = searchParams.get('class');
        if (classParam && !isNaN(Number(classParam))) {
            const classNumber = Number(classParam);
            if(classNumber >= 6 && classNumber <= 12) {
                setActivePagination(classNumber);
                setTimeout(() => {
                    studyMaterialSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [searchParams]);

      const boardMaterials = {
        Samacheer: {
            "Book Back Solution": [
                { class: "Class 12", pdf: "/pdfs/samacheer_12_pcm_book_back.pdf" },
                { class: "Class 11", pdf: "/pdfs/samacheer_11_pcm_book_back.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_book_back.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_book_back.pdf" },
                { class: "Class 8", pdf: "/pdfs/samacheer_8_book_back.pdf" },
                { class: "Class 7", pdf: "/pdfs/samacheer_7_book_back.pdf" },
                { class: "Class 6", pdf: "/pdfs/samacheer_6_book_back.pdf" },
            ],
            "Chapter-wise Test Question paper": [
                { class: "Class 12", pdf: "/pdfs/samacheer_12_pcm_chapter_wise.pdf" },
                { class: "Class 11", pdf: "/pdfs/samacheer_11_pcm_chapter_wise.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_chapter_wise.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_chapter_wise.pdf" },
                { class: "Class 8", pdf: "/pdfs/samacheer_8_chapter_wise.pdf" },
                { class: "Class 7", pdf: "/pdfs/samacheer_7_chapter_wise.pdf" },
                { class: "Class 6", pdf: "/pdfs/samacheer_6_chapter_wise.pdf" },
            ],
            "Model Board Question paper": [
                { class: "Class 12", pdf: "/pdfs/samacheer_12_pcm_model_paper.pdf" },
                { class: "Class 11", pdf: "/pdfs/samacheer_11_pcm_model_paper.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_model_paper.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_model_paper.pdf" },
                { class: "Class 8", pdf: "/pdfs/samacheer_8_model_paper.pdf" },
                { class: "Class 7", pdf: "/pdfs/samacheer_7_model_paper.pdf" },
                { class: "Class 6", pdf: "/pdfs/samacheer_6_model_paper.pdf" },
            ],
            "Previous Year Board Question Paper": [
                { class: "Class 12", pdf: "/pdfs/samacheer_12_pcm_previous_questions.pdf" },
                { class: "Class 11", pdf: "/pdfs/samacheer_11_pcm_previous_questions.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_previous_questions.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_previous_questions.pdf" },
                { class: "Class 8", pdf: "/pdfs/samacheer_8_previous_questions.pdf" },
                { class: "Class 7", pdf: "/pdfs/samacheer_7_previous_questions.pdf" },
                { class: "Class 6", pdf: "/pdfs/samacheer_6_previous_questions.pdf" },
            ],
        },
      };
      
      const studyMaterials = [
        { name: "Book Back Solution", icon: BookOpen },
        { name: "Chapter-wise Test Question paper", icon: FileText },
        { name: "Model Board Question paper", icon: Award },
        { name: "Previous Year Board Question Paper", icon: FileCheck },
      ];


  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/breadcrumb.jpg"
          alt="Samacheer Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          
        </div>
      </section>

      <div ref={studyMaterialSectionRef}>
        <AnimatedSection id="study-materials-section" className="py-16 md:py-24" style={{ backgroundImage: "url('/bred.png')", backgroundPosition: 'center' }}>
              <div className="container mx-auto flex justify-center">
                  <div className="relative w-full max-w-4xl">
                      <Card className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
                          <CardContent className="p-0">
                              <div className="relative md:h-96 grid grid-cols-1 md:grid-cols-2">
                                  <div className="relative p-8 flex flex-col justify-center items-center">
                                      <Image src="/book_shapes.png" alt="Book Shapes" width={100} height={100} className="absolute top-4 left-4 animate-pulse" />
                                      <h2 className="text-7xl font-black text-black pt-12 md:pt-0" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.1)' }}>CLASS</h2>
                                      <div className="relative mt-8" style={{ width: '200px', height: '200px'}}>
                                          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full">
                                              <path fill="#3ab0e7" d="M39.6,-53.4C54,-47,70.3,-36.5,75.8,-22.3C81.4,-8.1,76.2,9.8,67.8,24.1C59.3,38.3,47.6,48.8,34.4,56.7C21.2,64.6,6.6,69.9,-8.8,70.5C-24.2,71.1,-40.5,67,-52.3,57.7C-64.1,48.4,-71.4,33.9,-75.6,18.1C-79.9,2.3,-81,-14.8,-74.6,-28.4C-68.2,-42,-54.3,-52,-40.1,-58.5C-25.9,-65,-11.5,-68,3.6,-69.1C18.7,-70.2,37.4,-69.4,39.6,-53.4Z" transform="translate(100 100) scale(1.2)" />
                                          </svg>
                                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                              <div className="relative">
                                                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-9xl text-white" style={{fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'}}>{activePagination}</span>
                                              </div>
                                          </div>
                                      </div>
                                      <Image src="/pen_shapes.png" alt="Pen Shapes" width={40} height={40} className="absolute bottom-12 right-12 animate-spin-slow" />
                                  </div>
                                  <div className="relative p-8 flex flex-col justify-center">
                                      <div className="flex flex-col gap-4 items-center">
                                      {studyMaterials.map((material, index) => {
                                          const materialLinks = (boardMaterials.Samacheer as any)[material.name] || [];
                                          const relevantLink = materialLinks.find((item: any) => item.class.includes(String(activePagination)));

                                          return (
                                              <a key={index} href={relevantLink?.pdf} download={!!relevantLink} className="w-full">
                                                  <Button
                                                      variant="outline"
                                                      className="w-full text-black font-bold bg-gradient-to-br from-cyan-200 to-cyan-400 border-white/50 shadow-lg shadow-cyan-500/20 rounded-xl transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105 h-[50px]"
                                                      disabled={!relevantLink}
                                                  >
                                                      <material.icon className="mr-2 h-5 w-5" />
                                                      {material.name}
                                                  </Button>
                                              </a>
                                          );
                                      })}
                                      </div>
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>
          </AnimatedSection>
        </div>
    </div>
  );
}
