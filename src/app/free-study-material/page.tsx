'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { X, Download } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AnimatedSection = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
    return (
      <section
        ref={setElement}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
      >
        {children}
      </section>
    );
};

export default function FreeStudyMaterialPage() {
    const [dsmIsDialogOpen, setDsmIsDialogOpen] = React.useState(false);
    const [dsmSelectedMaterial, setDsmSelectedMaterial] = React.useState<string | null>(null);
    const [dsmShowBoardSelection, setDsmShowBoardSelection] = React.useState(false);
    const [dsmSelectedBoard, setDsmSelectedBoard] = React.useState<string | null>(null);
    const [dsmSelectedClass, setDsmSelectedClass] = React.useState<string | null>(null);
    const [dsmSelectedClassPdf, setDsmSelectedClassPdf] = React.useState<string | null>(null);

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

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Study-material.png"
          alt="Free Study Material"
          fill
          className="object-cover"
          data-ai-hint="books on a table"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Free Study Material
          </h1>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="bg-[#45b4e8] rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-5 items-center">
              <div className="p-8 md:p-12 text-white md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Download Study Material</h2>
                <div className="flex flex-wrap gap-4">
                    {studyMaterials.map((material) => (
                      <Dialog key={material} open={dsmIsDialogOpen && dsmSelectedMaterial === material} onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          setDsmSelectedMaterial(null);
                          setDsmIsDialogOpen(false);
                          setDsmShowBoardSelection(false);
                          setDsmSelectedBoard(null);
                          setDsmSelectedClass(null);
                          setDsmSelectedClassPdf(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-white text-primary hover:bg-gray-100 shadow-[4px_4px_0px_#000] border-black"
                            onClick={() => {
                              setDsmSelectedMaterial(material);
                              setDsmIsDialogOpen(true);
                              setDsmShowBoardSelection(true);
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
                                setDsmShowBoardSelection(false);
                              }}>CBSE</Button>
                              <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => {
                                setDsmSelectedBoard('Samacheer');
                                setDsmShowBoardSelection(false);
                              }}>Samacheer</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
                {dsmSelectedBoard && dsmSelectedMaterial && (
                    <div className="relative mt-8 py-6 px-4 bg-white/90 rounded-lg shadow-inner">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-gray-700" onClick={() => setDsmSelectedBoard(null)}>
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