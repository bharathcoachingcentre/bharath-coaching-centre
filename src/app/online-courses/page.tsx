
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClipboardCheck, Eye, FileText, CalendarClock, TestTube2, Users2, BookCopy, ClipboardList, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

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
  
const AnimatedElement = ({ children, className, animation }: { children: React.ReactNode; className?: string; animation: 'fade-up' }) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
    return (
      <div
        ref={setElement}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
      >
        {children}
      </div>
    );
};

export default function OnlineCoursesPage() {

    const onlineCourseFeatures = [
        { icon: CalendarClock, title: "Customized Time Table", description: "Flexible learning schedule tailored to your needs.", color: "bg-blue-500", shadow: "shadow-blue-500/20" },
        { icon: Users2, title: "18+ year experienced faculties", description: "Learn from seasoned experts in the field.", color: "bg-teal-500", shadow: "shadow-teal-500/20" },
        { icon: Eye, title: "Individual attention", description: "Personalized guidance to help you succeed.", color: "bg-purple-500", shadow: "shadow-purple-500/20" },
        { icon: ClipboardCheck, title: "Weekly test", description: "Regular assessments to track your progress.", color: "bg-orange-500", shadow: "shadow-orange-500/20" },
        { icon: TestTube2, title: "25% & 50% portion test", description: "Targeted tests to ensure thorough understanding.", color: "bg-pink-500", shadow: "shadow-pink-500/20" },
        { icon: FileText, title: "Full mock test", description: "Comprehensive mock exams to prepare you for the real thing.", color: "bg-indigo-500", shadow: "shadow-indigo-500/20" },
        { icon: BookCopy, title: "Specialized study materials", description: "Access to curated and comprehensive study resources.", color: "bg-blue-600", shadow: "shadow-blue-600/20" },
        { icon: ClipboardList, title: "Previous year question paper discussion", description: "In-depth analysis and discussion of past papers.", color: "bg-teal-600", shadow: "shadow-teal-600/20" },
      ];

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src="/Online-Course.jpg"
          alt="Online Courses Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Online Courses
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
              Digital Learning
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Our <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Digital Classrooms</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Batch Selectors */}
            <AnimatedElement animation="fade-up">
              <Accordion type="single" collapsible defaultValue="cbse" className="w-full space-y-4">
                <AccordionItem value="cbse" className="border-none">
                  <AccordionTrigger className="bg-white/80 backdrop-blur-sm border border-white hover:bg-blue-50 text-[#182d45] font-bold text-lg rounded-2xl px-8 py-6 no-underline shadow-[0_10px_30px_rgba(8,112,184,0.05)] transition-all group data-[state=open]:rounded-b-none data-[state=open]:border-blue-200 data-[state=open]:bg-blue-50">
                    <span className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      CBSE BATCH
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0">
                    <ul className="bg-white/90 backdrop-blur-md rounded-b-2xl border border-t-0 border-white shadow-[0_20px_40px_rgba(8,112,184,0.08)]">
                        {[
                          { label: "12th Grade", href: "/courses/cbse-12th-grade" },
                          { label: "11th Grade", href: "/courses/cbse-11th-grade" },
                          { label: "10th Grade", href: "/courses/cbse-10th-grade" },
                          { label: "9th Grade", href: "/courses/cbse-9th-grade" }
                        ].map((item, i) => (
                          <li key={i} className="border-b last:border-b-0 border-gray-50">
                            <Link href={item.href} className="px-8 py-4 flex items-center justify-between text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 transition-all font-bold group/link">
                              {item.label}
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="samacheer" className="border-none">
                  <AccordionTrigger className="bg-white/80 backdrop-blur-sm border border-white hover:bg-teal-50 text-[#182d45] font-bold text-lg rounded-2xl px-8 py-6 no-underline shadow-[0_10px_30px_rgba(8,112,184,0.05)] transition-all group data-[state=open]:rounded-b-none data-[state=open]:border-teal-200 data-[state=open]:bg-teal-50">
                    <span className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500"></div>
                      SAMACHEER BATCH
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="bg-white/90 backdrop-blur-md rounded-b-2xl border border-t-0 border-white shadow-[0_20px_40px_rgba(8,112,184,0.08)]">
                        {[
                          { label: "12th Grade", href: "/courses/samacheer-class-12-pcm" },
                          { label: "11th Grade", href: "/courses/samacheer-class-11-pcm" },
                          { label: "10th Grade", href: "/courses/samacheer-class-10" },
                          { label: "9th Grade", href: "/courses/samacheer-class-9" }
                        ].map((item, i) => (
                          <li key={i} className="border-b last:border-b-0 border-gray-50">
                            <Link href={item.href} className="px-8 py-4 flex items-center justify-between text-gray-600 hover:text-teal-600 hover:bg-teal-50/50 transition-all font-bold group/link">
                              {item.label}
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="1to1" className="border-none">
                  <AccordionTrigger className="bg-white/80 backdrop-blur-sm border border-white hover:bg-purple-50 text-[#182d45] font-bold text-lg rounded-2xl px-8 py-6 no-underline shadow-[0_10px_30px_rgba(8,112,184,0.05)] transition-all group data-[state=open]:rounded-b-none data-[state=open]:border-purple-200 data-[state=open]:bg-purple-50">
                    <span className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      1 TO 1 PERSONALIZED
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="bg-white/90 backdrop-blur-md rounded-b-2xl border border-t-0 border-white shadow-[0_20px_40px_rgba(8,112,184,0.08)]">
                        {[
                          { label: "12th Grade", href: "/courses/1-to-1-12th-grade" },
                          { label: "11th Grade", href: "/courses/1-to-1-11th-grade" },
                          { label: "10th Grade", href: "/courses/1-to-1-10th-grade" },
                          { label: "9th Grade", href: "/courses/1-to-1-9th-grade" }
                        ].map((item, i) => (
                          <li key={i} className="border-b last:border-b-0 border-gray-50">
                            <Link href={item.href} className="px-8 py-4 flex items-center justify-between text-gray-600 hover:text-purple-600 hover:bg-purple-50/50 transition-all font-bold group/link">
                              {item.label}
                              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedElement>

            {/* Feature Timeline */}
            <AnimatedElement animation="fade-up">
              <div className="relative pt-2">
                {onlineCourseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-8 relative pl-12 pb-12 last:pb-0">
                    {index !== onlineCourseFeatures.length - 1 && (
                      <div className="absolute left-[23px] top-10 h-full w-[2px] bg-gray-200"></div>
                    )}
                    <div className={cn(
                      "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-transform hover:scale-110",
                      feature.color,
                      feature.shadow
                    )}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-xl text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="text-gray-500 font-medium text-sm mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
