'use client';

import React from "react";
import Image from "next/image";
import { Star, FileText, CheckCircle, Users, BookOpen, Clipboard, Download, FileCheck, Layers, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";


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

export default function Samacheer12thCompartmentPage() {
      const studyMaterials = [
        {
          title: "Samacheer Book",
          description: "Complete Samacheer textbooks in PDF format",
          icon: BookOpen,
          pdf: "/pdfs/samacheer_12_pcm_ncert.pdf",
          iconBg: "bg-blue-500/20",
          iconColor: "text-blue-400",
        },
        {
          title: "Book Back Solutions",
          description: "Detailed solutions for all exercises",
          icon: FileCheck,
          pdf: "/pdfs/samacheer_12_pcm_solutions.pdf",
          iconBg: "bg-green-500/20",
          iconColor: "text-green-400",
        },
        {
          title: "Chapter-wise Test Question Papers",
          description: "Practice papers for each chapter",
          icon: Layers,
          pdf: "/pdfs/samacheer_12_pcm_unit_questions.pdf",
          iconBg: "bg-purple-500/20",
          iconColor: "text-purple-400",
        },
        {
          title: "Model Board Question Papers",
          description: "Latest model papers for practice",
          icon: GraduationCap,
          pdf: "/pdfs/samacheer_12_pcm_model_paper.pdf",
          iconBg: "bg-orange-500/20",
          iconColor: "text-orange-400",
        },
        {
          title: "Previous Year Board Question Papers",
          description: "Last 10 years question papers",
          icon: FileText,
          pdf: "/pdfs/samacheer_12_pcm_previous_questions.pdf",
          iconBg: "bg-pink-500/20",
          iconColor: "text-pink-400",
        },
      ];

      const benefits = [
        { title: "Daily test", icon: Clipboard },
        { title: "Unit-wise test", icon: FileText },
        { title: "Full mock test", icon: BookOpen },
        { title: "Quick evaluation", icon: CheckCircle },
        { title: "Parents' meeting", icon: Users },
        { title: "Specialized study material", icon: Star }
      ];

  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Online-Course.jpg"
          alt="Samacheer 12th Compartment Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Samacheer 12th Compartment
          </h1>
        </div>
      </section>

      {/* Redesigned Benefits Section */}
      <section className="py-16 md:py-24 bg-white text-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="w-12 h-1 bg-[#2abfaf] rounded-full mb-4"></div>
              <h2 className="text-4xl font-bold text-[#182d45]">Benefits</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl bg-white p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#35a3be]" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{benefit.title}</h3>
                </Card>
              ))}
            </div>

            {/* Highlight Card */}
            <div className="bg-[#f1f5f9] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
              <div className="w-full md:w-5/12 aspect-video relative overflow-hidden rounded-2xl shadow-lg border border-gray-200">
                <Image 
                    src="/bcc-time-table.jpeg" 
                    alt="BCC Timetable" 
                    fill 
                    className="object-cover"
                    priority 
                />
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg flex-shrink-0">
                  <Star className="w-7 h-7 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#182d45]">Customized Timetable</h3>
                  <p className="text-gray-500 text-lg">(based on exam date)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24" style={{ backgroundColor: 'rgb(21 49 61)' }}>
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
      </AnimatedSection>
    </div>
  );
}
