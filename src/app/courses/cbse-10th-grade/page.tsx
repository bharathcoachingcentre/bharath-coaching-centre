'use client';

import React, { useMemo } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Download, CheckCircle, BookOpen, FileCheck, Layers, GraduationCap, FileText, ArrowRight, Calendar, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { DownloadLeadDialog } from "@/components/download-lead-dialog";

const AnimatedSection = ({ children, className, id, style, ...props }: { children: React.ReactNode; className?: string; id?: string, style?: React.CSSProperties } & React.HTMLAttributes<HTMLDivElement>) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
    const internalRef = useRef<HTMLDivElement>(null);

    React.useImperativeHandle((props as any).ref, () => internalRef.current);

    useEffect(() => {
        if (internalRef.current) {
            setElement(internalRef.current);
        }
    }, [setElement]);
  
    return (
      <section
        ref={internalRef}
        id={id}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
        style={style}
      >
        {children}
      </section>
    );
};

export default function Cbse10thGradePage() {
    const searchParams = useSearchParams();
    const firestore = useFirestore();
    const studyMaterialSectionRef = useRef<HTMLDivElement>(null);
    const materialButtonsRef = useRef<(HTMLDivElement | null)[]>([]);
    
    const [showTimetableDownload, setShowTimetableDownload] = React.useState(false);
    const [timetableBoard, setTimetableBoard] = React.useState<string | null>(null);
    const [selectedTimetableClass, setSelectedTimetableClass] = React.useState<any | null>(null);

    // Fetch dynamic materials from Firestore
    const materialsQuery = useMemo(() => {
      if (!firestore) return null;
      return query(
        collection(firestore, 'study-materials'),
        where('grade', '==', 'Class 10'),
        where('board', '==', 'CBSE'),
        where('isVisible', '==', true)
      );
    }, [firestore]);

    const { data: materials, loading: materialsLoading } = useCollection(materialsQuery);

    useEffect(() => {
        const showMaterial = searchParams.get('showMaterial');
        const materialToHighlight = searchParams.get('material');

        if (showMaterial === 'true' && studyMaterialSectionRef.current) {
            setTimeout(() => {
                studyMaterialSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                if (materialToHighlight && materials) {
                    const buttonIndex = materials.findIndex(m => m.title === materialToHighlight);
                    if (buttonIndex !== -1) {
                        const buttonElement = materialButtonsRef.current[buttonIndex];
                        if (buttonElement) {
                            buttonElement.style.animation = 'highlight 1.5s ease-out';
                            setTimeout(() => {
                                buttonElement.style.animation = '';
                            }, 1500);
                        }
                    }
                }
            }, 500);
        }
    }, [searchParams, materials]);

    const benefits = [
        "18+ years experienced faculties specialized in each subject.",
        "Weekly tests.",
        "25% & 50% portion tests.",
        "Full mock tests.",
        "Quick evaluation.",
        "Term-based parents’ meeting.",
        "Specialized study materials.",
        "Previous year question paper discussion",
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

  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Online-Course.jpg"
          alt="CBSE 10th Grade Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            CBSE 10th Grade
          </h1>
        </div>
      </section>
      
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-0"></div>

        <div className="container mx-auto px-4 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Left Side: Content */}
            <div className="space-y-12">
                <div className="space-y-6 text-left">
                    <Badge className="bg-cyan-100 text-cyan-800 border-none px-4 py-1.5 font-bold hover:bg-cyan-100 inline-flex items-center rounded-full shadow-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Class Schedule
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-left" style={{ color: '#182d45', textAlign: 'left' }}>
                        Structured <span style={{ color: 'rgb(53 163 190)' }} className="relative inline-block">
                            Timetable
                            <span className="absolute bottom-1 left-0 w-full h-2 bg-[#35a3be]/10 -z-10 rounded-full"></span>
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed max-w-xl font-medium text-left">
                        Our meticulously planned schedule ensures comprehensive coverage of the entire CBSE 10th Grade syllabus with dedicated time for revision and doubt clearing sessions.
                    </p>
                </div>

                <div className="space-y-8 bg-white/40 backdrop-blur-sm p-8 rounded-3xl border border-white/60 shadow-inner text-left">
                    <h2 className="text-3xl font-bold flex items-center gap-3 text-left" style={{ color: 'rgb(53 163 190)', textAlign: 'left' }}>
                        <span className="w-1.5 h-8 bg-[#35a3be] rounded-full"></span>
                        Our <span>Benefits</span>
                    </h2>
                    <div className="flex flex-col gap-y-1">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="flex items-start gap-4 group p-1.5 rounded-xl transition-all duration-300 hover:bg-white/60">
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform" style={{ backgroundColor: '#0d4f5c' }}>
                                    <CheckCircle style={{ width: '16px', height: '16px' }} className="text-white" />
                                </div>
                                <span className="text-lg leading-snug font-medium text-gray-800 text-left">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Interactive Timetable */}
            <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#35a3be]/20 to-transparent rounded-[2.5rem] blur-2xl group-hover:scale-105 transition-transform duration-500"></div>
                <Card className="relative border border-white bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(8,112,184,0.1)] rounded-[2.5rem] overflow-hidden">
                    <CardContent className="p-8 flex flex-col items-center gap-8">
                        <div className="relative w-full overflow-hidden rounded-3xl shadow-lg border border-gray-100">
                            <Image
                                src="/download-timetable-1.png"
                                alt="Download Timetable"
                                width={800}
                                height={575}
                                className="w-full h-[575px] object-cover"
                            />
                        </div>
                        <div className="w-full text-left">
                            {!showTimetableDownload ? (
                                <Button size="lg" onClick={() => setShowTimetableDownload(true)} className="w-full bg-[#35a3be] text-white hover:bg-[#174f5f] font-extrabold rounded-2xl py-8 text-xl shadow-xl transition-all duration-300 border-none">
                                    Download Timetable
                                </Button>
                            ) : (
                                <div className="w-full p-6 bg-gray-50/50 rounded-2xl shadow-inner border border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-lg text-gray-800">Select Board</h3>
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
                                            <Button onClick={() => setTimetableBoard('CBSE')} className="w-full bg-white border-2 border-[#35a3be] text-[#35a3be] hover:bg-[#35a3be] hover:text-white">CBSE</Button>
                                            <Button onClick={() => setTimetableBoard('Samacheer')} className="w-full bg-white border-2 border-[#35a3be] text-[#35a3be] hover:bg-[#35a3be] hover:text-white">Samacheer</Button>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex flex-wrap gap-2">
                                                {(timetablePdfs[timetableBoard as keyof typeof timetablePdfs] as any[]).map((item: any, idx: number) => (
                                                    <Button
                                                        key={idx}
                                                        variant={selectedTimetableClass?.class === item.class ? "default" : "outline"}
                                                        onClick={() => setSelectedTimetableClass(item)}
                                                        className={selectedTimetableClass?.class === item.class ? "bg-[#35a3be]" : "border-[#35a3be] text-[#35a3be]"}
                                                    >
                                                        {item.class}
                                                    </Button>
                                                ))}
                                            </div>
                                            <DownloadLeadDialog
                                              materialTitle={`Timetable ${selectedTimetableClass?.class || ''} ${timetableBoard}`}
                                              pdfUrl={selectedTimetableClass?.pdf || '#'}
                                              trigger={
                                                <Button disabled={!selectedTimetableClass} className="w-full bg-[#35a3be] hover:bg-[#174f5f] border-none text-white font-bold h-12 rounded-xl">
                                                  <Download className="mr-2 h-4 w-4" /> Download Now
                                                </Button>
                                              }
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(21 49 61)' }} ref={studyMaterialSectionRef}>
        <div className="container mx-auto text-center px-4">
          <Badge className="mb-4 bg-[#cffafe] text-[#0d4f5c] border-transparent px-4 py-1.5 font-semibold hover:bg-[#cffafe]">
            <Download className="w-4 h-4 mr-2" />
            Free Resources
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Download Study Material</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Access our comprehensive collection of CBSE 10th Grade study materials to boost your preparation
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {materialsLoading ? (
              <div className="col-span-full py-12 flex flex-col items-center gap-4 text-white/60">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Loading latest materials...</p>
              </div>
            ) : !materials || materials.length === 0 ? (
              <div className="col-span-full py-12 text-white/40">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No materials available for Class 10 CBSE yet.</p>
              </div>
            ) : (
              materials.map((material, index) => (
                <div key={index} ref={el => materialButtonsRef.current[index] = el} className="block group text-left">
                  <DownloadLeadDialog
                    materialTitle={material.title}
                    pdfUrl={material.pdfUrl}
                    trigger={
                      <div className="cursor-pointer h-full">
                        <Card className="bg-gray-200/10 backdrop-blur-sm border border-gray-200/10 text-white p-6 h-full text-left rounded-2xl transition-all duration-300 hover:bg-gray-200/10 hover:border-gray-200/20 hover:-translate-y-2">
                          <CardContent className="p-0 flex flex-col h-full">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg bg-blue-500/20`}>
                                    <BookOpen className={`w-8 h-8 text-blue-400`} />
                                </div>
                                <h3 className="text-lg font-bold flex-1">{material.title}</h3>
                            </div>
                            <p className="text-sm text-gray-400 mt-4 flex-grow">{material.description}</p>
                            <div className="mt-6 flex items-center text-yellow-400 group-hover:text-yellow-300 font-semibold transition-colors">
                              Download Now <ArrowRight className="ml-2 w-4 h-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    }
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
