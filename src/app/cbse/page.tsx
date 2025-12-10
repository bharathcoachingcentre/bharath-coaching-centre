
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, CheckCircle, Book, Pencil, Ruler, Calculator, FlaskConical, Atom, GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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

export default function CbsePage() {
    const [showTimetableDownload, setShowTimetableDownload] = React.useState(false);
    const [timetableBoard, setTimetableBoard] = React.useState<string | null>(null);
    const [selectedTimetableClass, setSelectedTimetableClass] = React.useState<any | null>(null);
    const [activePagination, setActivePagination] = React.useState(6);

    // State for the "Download Study Material" section
    const [dsmIsStudyMaterialOpen, setDsmIsStudyMaterialOpen] = React.useState(false);
    const [dsmSelectedMaterial, setDsmSelectedMaterial] = React.useState<string | null>(null);
    const [dsmShowDownloadOptions, setDsmShowDownloadOptions] = React.useState(false);
    const [dsmSelectedBoard, setDsmSelectedBoard] = React.useState<string | null>(null);
    const [dsmSelectedClass, setDsmSelectedClass] = React.useState<string | null>(null);
    const [dsmSelectedClassPdf, setDsmSelectedClassPdf] = React.useState<string | null>(null);

    const benefits = [
        "18+ years experienced faculties specialized in each subjects.",
        "Weekly tests",
        "25% & 50% portion tests.",
        "Full mock tests.",
        "Quick evaluation",
        "Term based parents' meeting",
        "Specialized study materials.",
        "Previous year ques. paper discussion",
      ];
    
      const timetablePdfs = {
        CBSE: [
            { class: "Class 12", pdf: "/pdfs/timetable_cbse_12.pdf" },
            { class: "Class 11", pdf: "/pdfs/timetable_cbse_11.pdf" },
            { class: "Class 10", pdf: "/pdfs/timetable_cbse_10.pdf" },
            { class: "Class 9", pdf: "/pdfs/timetable_cbse_9.pdf" },
        ],
        Samacheer: [
            { class: "Class 12", pdf: "/pdfs/timetable_samacheer_12.pdf" },
            { class: "Class 11", pdf: "/pdfs/timetable_samacheer_11.pdf" },
            { class: "Class 10", pdf: "/pdfs/timetable_samacheer_10.pdf" },
            { class: "Class 9", pdf: "/pdfs/timetable_samacheer_9.pdf" },
        ]
      };

      const boardMaterials = {
        CBSE: {
          "NCERT Books": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_ncert.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_ncert.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_ncert.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_ncert.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_ncert.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_ncert.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_ncert.pdf" },
          ],
          "NCERT Solutions": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_solutions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_solutions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_solutions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_solutions.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_solutions.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_solutions.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_solutions.pdf" },
          ],
          "Formula Booklet": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_formula.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_formula.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_formula.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_formula.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_formula.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_formula.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_formula.pdf" },
          ],
          "Unit wise question papers": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_unit_questions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_unit_questions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_unit_questions.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_unit_questions.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_unit_questions.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_unit_questions.pdf" },
          ],
          "Model Board question paper": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_model_paper.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_model_paper.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_model_paper.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_model_paper.pdf" },
          ],
        },
        Samacheer: {
            "NCERT Books": [
                { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_ncert.pdf" },
                { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_ncert.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_ncert.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_ncert.pdf" },
            ],
            "NCERT Solutions": [
                { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_solutions.pdf" },
                { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_solutions.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_solutions.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_solutions.pdf" },
            ],
            "Formula Booklet": [
                { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_formula.pdf" },
                { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_formula.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_formula.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_formula.pdf" },
            ],
            "Unit wise question papers": [
                { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_unit_questions.pdf" },
                { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_unit_questions.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_unit_questions.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_unit_questions.pdf" },
            ],
            "Model Board question paper": [
                { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_model_paper.pdf" },
                { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_model_paper.pdf" },
                { class: "Class 10", pdf: "/pdfs/samacheer_10_model_paper.pdf" },
                { class: "Class 9", pdf: "/pdfs/samacheer_9_model_paper.pdf" },
            ],
        },
      };
      
      const studyMaterials = [
        "NCERT Books",
        "NCERT Solutions",
        "Formula Booklet",
        "Unit wise question papers",
        "Model Board question paper",
      ];
      const timetableClasses = [
        { name: "Class 6", icon: "/cls-6.gif", isGif: true },
        { name: "Class 7", icon: "/cls-7.gif", isGif: true },
        { name: "Class 8", icon: "/cls-8.gif", isGif: true },
        { name: "Class 9", icon: "/cls-9.gif", isGif: true },
        { name: "Class 10", icon: "/cls-10.gif", isGif: true },
        { name: "Class 11", icon: "/cls-11.gif", isGif: true },
        { name: "Class 12", icon: "/cls-12.gif", isGif: true },
      ];

      const cardColors = [
        'bg-blue-100/70',
        'bg-red-100/70',
        'bg-green-100/70',
        'bg-yellow-100/70',
        'bg-purple-100/70',
        'bg-pink-100/70',
        'bg-indigo-100/70',
      ];
    
      const iconColors = [
        'text-blue-500',
        'text-red-500',
        'text-green-500',
        'text-yellow-500',
        'text-purple-500',
        'text-pink-500',
        'text-indigo-500',
      ];
    
      const hoverColors = [
        'hover:bg-blue-100/70',
        'hover:bg-red-100/70',
        'hover:bg-green-100/70',
        'hover:bg-yellow-100/70',
        'hover:bg-purple-100/70',
        'hover:bg-pink-100/70',
        'hover:bg-indigo-100/70',
      ];


  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/CBSE_BG.jpg"
          alt="CBSE Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            CBSE
          </h1>
        </div>
      </section>

      <section
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8">
            {timetableClasses.map((item, index) => {
              const isActive = activePagination === Number(item.name.split(' ')[1]);
              return (
                <Card
                  key={index}
                  onClick={() => setActivePagination(Number(item.name.split(' ')[1]))}
                  className={cn(
                    "group flex flex-col items-center justify-center p-6 rounded-xl shadow-lg transition-all duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer",
                    isActive ? "bg-black text-white" : "bg-white",
                    hoverColors[index % hoverColors.length]
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center h-16 w-16 rounded-full mb-4 transition-all duration-300 relative sunbeam-parent",
                    isActive ? "bg-white" : cardColors[index % cardColors.length]
                  )}>
                    {item.isGif ? (
                        <Image src={item.icon as string} alt={item.name} width={45} height={45} unoptimized />
                    ) : (
                        <item.icon className={cn(
                            "w-8 h-8 transition-all duration-300",
                            isActive ? "text-black" : iconColors[index % iconColors.length]
                        )} />
                    )}
                  </div>
                  <p className={cn(
                    "font-bold text-lg",
                    isActive ? "text-white" : "text-gray-800"
                  )}>{item.name}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24" style={{ background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)' }}>
            <div className="container mx-auto flex justify-center">
                <div className="relative w-full max-w-4xl">
                    <Card className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden">
                        <CardContent className="p-0">
                            <div className="relative h-96 grid grid-cols-2">
                                <div className="relative p-8 flex flex-col justify-center items-center">
                                    
                                    <h2 className="text-7xl font-black text-red-500" style={{ fontFamily: 'Impact, sans-serif', textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.1)' }}>CLASS</h2>
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
                                </div>
                                <div className="relative p-8 flex flex-col justify-center">
                                    <div className="flex flex-col gap-4 items-center">
                                    {studyMaterials.map((material, index) => {
                                        const materialLinks = (boardMaterials.CBSE as any)[material] || [];
                                        const relevantLink = materialLinks.find((item: any) => item.class.includes(`Class ${activePagination}`));

                                        return (
                                            <a key={index} href={relevantLink?.pdf} download={!!relevantLink} className="w-full">
                                                <Button
                                                    variant="outline"
                                                    className="w-full text-black font-bold bg-gradient-to-br from-cyan-200 to-cyan-400 border-white/50 shadow-lg shadow-cyan-500/20 rounded-xl transition-all duration-300 hover:shadow-cyan-500/40 hover:scale-105 h-[50px]"
                                                    disabled={!relevantLink}
                                                >
                                                    {material}
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
  );
}
