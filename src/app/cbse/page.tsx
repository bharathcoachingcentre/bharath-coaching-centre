
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
          ],
          "NCERT Solutions": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_solutions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_solutions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_solutions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_solutions.pdf" },
          ],
          "Formula Booklet": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_formula.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_formula.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_formula.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_formula.pdf" },
          ],
          "Unit wise question papers": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_unit_questions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_unit_questions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_unit_questions.pdf" },
          ],
          "Model Board question paper": [
            { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_model_paper.pdf" },
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
        { name: "Class 6", icon: Book },
        { name: "Class 7", icon: Pencil },
        { name: "Class 8", icon: Ruler },
        { name: "Class 9", icon: Calculator },
        { name: "Class 10", icon: FlaskConical },
        { name: "Class 11", icon: Atom },
        { name: "Class 12", icon: GraduationCap },
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
            {timetableClasses.map((item, index) => (
              <Card
                key={index}
                className="group flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg transition-transform duration-300 hover:scale-110 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100/70 mb-4 transition-all duration-300 group-hover:bg-blue-200">
                  <item.icon className="w-8 h-8 text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
                </div>
                <p className="font-bold text-lg text-gray-800">{item.name}</p>
              </Card>
            ))}
          </div>
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
                        <Dialog 
                            key={index}
                            open={dsmIsStudyMaterialOpen && dsmSelectedMaterial === material} 
                            onOpenChange={(isOpen) => {
                                if (!isOpen) {
                                    setDsmSelectedMaterial(null);
                                    setDsmIsStudyMaterialOpen(false);
                                }
                            }}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-white text-primary hover:bg-gray-100 shadow-[4px_4px_0px_#000] border-black"
                                    onClick={() => {
                                        setDsmSelectedMaterial(material);
                                        setDsmSelectedBoard(null);
                                        setDsmSelectedClass(null);
                                        setDsmSelectedClassPdf(null);
                                        setDsmShowDownloadOptions(false);
                                        setDsmIsStudyMaterialOpen(true);
                                    }}
                                >
                                    {material}
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-lg">
                            <DialogHeader>
                                <DialogTitle className="text-center text-2xl font-bold">
                                    Select Board
                                </DialogTitle>
                            </DialogHeader>
                                <div className="flex justify-center gap-4 py-4">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
                                      setDsmSelectedBoard('CBSE'); 
                                      setDsmShowDownloadOptions(true); 
                                      setDsmIsStudyMaterialOpen(false);
                                    }}>CBSE</Button>
                                    <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => {
                                      setDsmSelectedBoard('Samacheer');
                                      setDsmShowDownloadOptions(true); 
                                      setDsmIsStudyMaterialOpen(false);
                                    }}>Samacheer</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
                {dsmShowDownloadOptions && dsmSelectedBoard && dsmSelectedMaterial && (
                    <div className="relative mt-8 py-6 px-4 bg-white/90 rounded-lg shadow-inner">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-gray-700" onClick={() => setDsmShowDownloadOptions(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                        <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{dsmSelectedMaterial} - {dsmSelectedBoard}</h3>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {(boardMaterials[dsmSelectedBoard as keyof typeof boardMaterials] as any)[dsmSelectedMaterial!]?.map((item: any, idx: number) => (
                                <Button
                                    key={idx}
                                    variant={dsmSelectedClass === item.class ? "secondary" : "outline"}
                                    className="bg-gray-200 text-gray-800"
                                    onClick={() => {
                                        setDsmSelectedClass(item.class);
                                        setDsmSelectedClassPdf(item.pdf);
                                    }}
                                >
                                    {item.class}
                                </Button>
                            ))}
                            <Button asChild disabled={!dsmSelectedClassPdf}>
                                <a href={dsmSelectedClassPdf || undefined} download className="bg-green-500 hover:bg-green-600 text-white">
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
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
