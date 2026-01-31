
'use client';

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileCheck, Layers, GraduationCap, FileText, Download, ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const studyMaterials = [
  {
    title: "NCERT Book PDF",
    description: "Complete NCERT textbooks in PDF format",
    icon: BookOpen,
    pdf: "/pdfs/cbse_12_pcm_ncert.pdf",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "NCERT Book Back Solution",
    description: "Detailed solutions for all exercises",
    icon: FileCheck,
    pdf: "/pdfs/cbse_12_pcm_solutions.pdf",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    title: "NCERT Chapterwise Test Paper",
    description: "Practice papers for each chapter",
    icon: Layers,
    pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Model Board Question Paper",
    description: "Latest model papers for practice",
    icon: GraduationCap,
    pdf: "/pdfs/cbse_12_pcm_model_paper.pdf",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
  {
    title: "Previous Year Board Question Paper",
    description: "Last 10 years question papers",
    icon: FileText,
    pdf: "/pdfs/cbse_12_pcm_previous_questions.pdf",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-400",
  },
   {
    title: "Formula Booklet",
    description: "All important formulas in one place",
    icon: FileText,
    pdf: "/pdfs/cbse_12_pcm_formula.pdf",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
];

const benefits = [
    "18+ years experienced faculties specialized in each subject.",
    "Weekly tests.",
    "25% & 50% portion tests.",
    "Full mock tests.",
    "Quick evaluation.",
    "Term-based parents' meeting.",
    "Specialized study materials.",
    "Previous year question paper discussion.",
];

export default function CbseClass12PcmNewPage() {
  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/cbse-banner-bg-img.png"
          alt="CBSE Class 12 PCM Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            CBSE Class 12 PCM
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(21 49 61)' }}>
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-white">
                    <Badge className="mb-4 bg-yellow-400/20 text-yellow-300 border-yellow-400/30 px-3 py-1.5 font-semibold">
                        <Calendar className="w-4 h-4 mr-2" />
                        Class Schedule
                    </Badge>
                    <h2 className="text-4xl font-bold mb-4">Structured <span className="text-cyan-400">Timetable</span></h2>
                    <p className="text-lg text-gray-300 mb-8 max-w-lg">
                        Our meticulously planned schedule ensures comprehensive coverage of the entire CBSE syllabus with dedicated time for revision and doubt clearing sessions.
                    </p>
                    <Button asChild size="lg" className="bg-white/90 text-gray-800 hover:bg-white font-bold rounded-lg py-6 px-8">
                        <a href="/pdfs/timetable_cbse_12.pdf" download>
                            <Download className="w-5 h-5 mr-2" />
                            Download Timetable
                        </a>
                    </Button>
                </div>
                <div className="space-y-4">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-3 text-white">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-lg">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(21 49 61)' }}>
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-green-900/50 text-green-300 border-green-700 px-4 py-1.5 font-semibold">
            <Download className="w-4 h-4 mr-2" />
            Free Resources
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">Download Study Material</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12">
            Access our comprehensive collection of study materials to boost your preparation
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {studyMaterials.map((material, index) => (
              <a href={material.pdf} download key={index} className="block group">
                <Card className="bg-gray-200/10 backdrop-blur-sm border border-gray-200/10 text-white p-6 h-full text-left rounded-2xl transition-all duration-300 hover:bg-gray-200/10 hover:border-gray-200/20 hover:-translate-y-2">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${material.iconBg}`}>
                            <material.icon className={`w-8 h-8 ${material.iconColor}`} />
                        </div>
                        <h3 className="text-lg font-bold flex-1">{material.title}</h3>
                    </div>
                    <p className="text-sm text-gray-400 mt-4 flex-grow">{material.description}</p>
                    <div className="mt-6 flex items-center text-yellow-400 group-hover:text-yellow-300 font-semibold transition-colors">
                      Download Now <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
