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
    "Term-based parents’ meeting.",
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

      <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                {/* Left Side: Content */}
                <div className="space-y-12">
                    {/* Introduction Content */}
                    <div className="space-y-6">
                        <Badge className="bg-cyan-100 text-cyan-800 border-none px-3 py-1.5 font-semibold hover:bg-cyan-100 inline-flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            Class Schedule
                        </Badge>
                        <h2 className="text-4xl font-bold leading-tight" style={{ color: '#182d45' }}>
                            Structured <span style={{ color: '#35a3be' }}>Timetable</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Our meticulously planned schedule ensures comprehensive coverage of the entire CBSE syllabus with dedicated time for revision and doubt clearing sessions.
                        </p>
                    </div>

                    {/* Benefits Column */}
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold" style={{ color: '#182d45' }}>
                            Our <span style={{ color: '#35a3be' }}>Benefits</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4 text-black">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: '#0d4f5c' }}>
                                        <CheckCircle style={{ width: '14px', height: '14px' }} className="text-white" />
                                    </div>
                                    <span className="text-lg leading-snug">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Right Side: Timetable Card */}
                <div className="flex flex-col h-full justify-center">
                    <Card className="border-none shadow-2xl bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-cyan-900/10">
                        <CardContent className="p-10 flex flex-col items-center gap-10">
                            <div className="relative flex items-center justify-center w-full bg-slate-50 rounded-2xl p-6">
                                <Image 
                                    src="/bcc-time-table.jpeg" 
                                    alt="BCC Timetable" 
                                    width={260} 
                                    height={150} 
                                    className="object-contain" 
                                    priority 
                                />
                            </div>
                            <Button asChild size="lg" className="bg-[#35a3be] text-white hover:bg-[#174f5f] font-bold rounded-xl py-8 text-lg shadow-lg w-full">
                                <a href="/pdfs/timetable_cbse_12.pdf" download>
                                    <Download className="w-6 h-6 mr-3" />
                                    Download Timetable
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(21 49 61)' }}>
        <div className="container mx-auto text-center px-4">
          <Badge className="mb-4 bg-[#cffafe] text-[#0d4f5c] border-transparent px-4 py-1.5 font-semibold hover:bg-[#cffafe]">
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
