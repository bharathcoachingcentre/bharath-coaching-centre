'use client';

import React from "react";
import Image from "next/image";
import { Star, FileText, CheckCircle, UserCheck, BookCopy, Clipboard, Edit, X, Download, BookOpen, FileCheck, Layers, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Link from "next/link";
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

export default function CompartmentPage() {
      const studyMaterials = [
        {
          title: "NCERT Books",
          description: "Complete NCERT textbooks in PDF format",
          icon: BookOpen,
          pdf: "/pdfs/cbse_12_pcm_ncert.pdf",
          iconBg: "bg-blue-500/20",
          iconColor: "text-blue-400",
        },
        {
          title: "NCERT Solutions",
          description: "Detailed solutions for all exercises",
          icon: FileCheck,
          pdf: "/pdfs/cbse_12_pcm_solutions.pdf",
          iconBg: "bg-green-500/20",
          iconColor: "text-green-400",
        },
        {
          title: "Formula Booklet",
          description: "All important formulas in one place",
          icon: FileText,
          pdf: "/pdfs/cbse_12_pcm_formula.pdf",
          iconBg: "bg-yellow-500/20",
          iconColor: "text-yellow-400",
        },
        {
          title: "Unit wise question papers",
          description: "Practice papers for each chapter",
          icon: Layers,
          pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf",
          iconBg: "bg-purple-500/20",
          iconColor: "text-purple-400",
        },
        {
          title: "Model Board question paper",
          description: "Latest model papers for practice",
          icon: GraduationCap,
          pdf: "/pdfs/cbse_12_pcm_model_paper.pdf",
          iconBg: "bg-orange-500/20",
          iconColor: "text-orange-400",
        },
      ];

      const benefits = [
        "Daily test",
        "Unit-wise test",
        "Full mock test",
        "Quick evaluation",
        "Parents’ meeting",
        "Specialized study material"
      ];
      
      const benefitIcons = {
        "Daily test": Clipboard,
        "Unit-wise test": Edit,
        "Full mock test": FileText,
        "Quick evaluation": CheckCircle,
        "Parents’ meeting": UserCheck,
        "Specialized study material": BookCopy
      };

  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Online-Course.jpg"
          alt="12th Compartment Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            12th Compartment
          </h1>
        </div>
      </section>

      <section className="pt-16 md:pt-24 pb-36 text-gray-800" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-gray-800"></div>
                <div className="w-4 h-px bg-gray-800"></div>
              </div>
              <h2 className="text-4xl font-bold">Benefits</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 md:col-span-3">
              {benefits.map((benefit, index) => {
                const Icon = benefitIcons[benefit as keyof typeof benefitIcons] || Star;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 bg-[#35a3be] rounded-full">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{benefit}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-16 -mt-36 relative z-10">
        <div className="flex justify-center">
          <div className="flex items-center">
              <Image
                id="benefit-img"
                src="https://picsum.photos/seed/adultsession/600/400"
                alt="Adult session"
                width={350}
                height={170}
                className="rounded-l-lg shadow-lg object-cover"
                style={{ height: '170px' }}
                data-ai-hint="woman working"
              />
              <div style={{ width: '550px', marginLeft: '0px', height: '170px' }} className="bg-white p-8 shadow-lg relative w-full flex flex-col justify-center rounded-r-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#35a3be] rounded-full">
                    <Star className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Customized Timetable</h3>
                    <p className="text-gray-600">(based on exam date)</p>
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 flex gap-1">
                    <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                    <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                </div>
              </div>
          </div>
        </div>
      </div>

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
