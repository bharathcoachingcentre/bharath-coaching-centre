
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Link from "next/link";

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

export default function SamacheerClass9Page() {
    const [showTimetableDownload, setShowTimetableDownload] = React.useState(false);
    const [timetableBoard, setTimetableBoard] = React.useState<string | null>(null);
    const [selectedTimetableClass, setSelectedTimetableClass] = React.useState<any | null>(null);

    const benefits = [
        "5+ years experienced faculties",
        "Weekly tests",
        "Quick evaluation",
        "Term-based parents’ meeting",
        "Specialized study materials",
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
      
      const studyMaterials = [
        { name: "NCERT Books", pdf: "/pdfs/samacheer_9_ncert.pdf" },
        { name: "NCERT Solutions", pdf: "/pdfs/samacheer_9_solutions.pdf" },
        { name: "Formula Booklet", pdf: "/pdfs/samacheer_9_formula.pdf" },
        { name: "Unit wise question papers", pdf: "/pdfs/samacheer_9_unit_questions.pdf" },
        { name: "Model Board question paper", pdf: "/pdfs/samacheer_9_model_paper.pdf" },
      ];

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Online-Course.jpg"
          alt="Samacheer 9th Grade Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Samacheer 9th Grade
          </h1>
        </div>
      </section>
      
      <AnimatedSection className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedElement animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-8">
                <span className="relative inline-block text-primary">Timetable
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                </span>
              </h2>
              <Image
                  src="/download-timetable-1.png"
                  alt="Download Timetable"
                  width={350}
                  height={350}
                  className="mx-auto my-4 rounded-lg"
                  data-ai-hint="timetable schedule"
              />
              <div className="mt-8 flex flex-col items-center">
                {!showTimetableDownload && (
                  <Button size="lg" onClick={() => setShowTimetableDownload(true)}>
                    Download Timetable
                  </Button>
                )}
                {showTimetableDownload && (
                  <div className="w-full p-6 bg-gray-50 rounded-lg shadow-inner">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg">Select Board</h3>
                        <Button variant="ghost" size="icon" onClick={() => {
                            setShowTimetableDownload(false);
                            setTimetableBoard(null);
                            setSelectedTimetableClass(null);
                        }}>
                            <X className="h-5 w-5" />
                        </Button>
                     </div>
                    {!timetableBoard ? (
                      <div className="flex gap-4">
                        <Button onClick={() => setTimetableBoard('CBSE')} className="w-full">CBSE</Button>
                        <Button onClick={() => setTimetableBoard('Samacheer')} className="w-full">Samacheer</Button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-wrap items-center gap-4">
                          {(timetablePdfs[timetableBoard as keyof typeof timetablePdfs] as any[]).map((item: any, idx: number) => (
                            <Button
                              key={idx}
                              variant={selectedTimetableClass?.class === item.class ? "default" : "outline"}
                              onClick={() => setSelectedTimetableClass(item)}
                            >
                              {item.class}
                            </Button>
                          ))}
                           <Button asChild disabled={!selectedTimetableClass}>
                                <a href={selectedTimetableClass?.pdf || undefined} download>
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </a>
                            </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <h2 className="text-3xl font-bold text-center mb-8">
                Our <span className="relative inline-block text-primary">Benefits
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
                </span>
              </h2>
              <Card className="bg-blue-50 min-h-[420px]">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="bg-[#45b4e8] rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5 items-center">
              <div className="p-8 md:p-12 text-white md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Download Study Material</h2>
                 <div className="flex flex-wrap gap-4">
                    {studyMaterials.map((material, index) => (
                        <a href={material.pdf} download key={index}>
                            <Button
                                variant="outline"
                                className="bg-white text-primary hover:bg-gray-100 shadow-[4px_4px_0px_#000] border-black"
                            >
                                {material.name}
                            </Button>
                        </a>
                    ))}
                </div>
              </div>
              <div className="h-64 md:h-full md:col-span-2 relative">
                <Image
                  src="/Study-material.png"
                  alt="Study Material"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  data-ai-hint="modern building"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
