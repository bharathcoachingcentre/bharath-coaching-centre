
'use client';

import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ClipboardCheck, Eye, FileText, CalendarClock, TestTube2, Users2, BookCopy, ClipboardList } from "lucide-react";
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
        { icon: CalendarClock, title: "Customized Time Table", description: "Flexible learning schedule tailored to your needs." },
        { icon: Users2, title: "18+ year experienced faculties", description: "Learn from seasoned experts in the field." },
        { icon: Eye, title: "Individual attention", description: "Personalized guidance to help you succeed." },
        { icon: ClipboardCheck, title: "Weekly test", description: "Regular assessments to track your progress." },
        { icon: TestTube2, title: "25% & 50% portion test", description: "Targeted tests to ensure thorough understanding." },
        { icon: FileText, title: "Full mock test", description: "Comprehensive mock exams to prepare you for the real thing." },
        { icon: BookCopy, title: "Specialized study materials", description: "Access to curated and comprehensive study resources." },
        { icon: ClipboardList, title: "Previous year question paper discussion", description: "In-depth analysis and discussion of past papers." },
      ];

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Online-Course.jpg"
          alt="Online Courses Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Online Courses
          </h1>
        </div>
      </section>

      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-4xl font-bold mb-12">Online <span className="text-primary">Courses</span></h2>
          </AnimatedElement>
          <div className="grid md:grid-cols-2 gap-12">
            <AnimatedElement animation="fade-up">
              <Accordion type="single" collapsible defaultValue="cbse" className="w-full">
                <AccordionItem value="cbse" className="border-b-0">
                  <AccordionTrigger className="bg-blue-100 hover:bg-blue-200/80 text-blue-800 font-bold text-lg rounded-lg px-6 py-4 no-underline">CBSE BATCH</AccordionTrigger>
                  <AccordionContent className="pt-0">
                    <ul className="bg-white rounded-b-lg border border-t-0">
                        <li className="px-6 py-3 border-b text-muted-foreground hover:bg-gray-50 cursor-pointer">12th Grade</li>
                        <li className="px-6 py-3 border-b text-muted-foreground hover:bg-gray-50 cursor-pointer">11th Grade</li>
                        <li className="px-6 py-3 border-b text-muted-foreground hover:bg-gray-50 cursor-pointer">10th Grade</li>
                        <li className="px-6 py-3 text-muted-foreground hover:bg-gray-50 cursor-pointer">9th Grade</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="samacheer" className="border-b-0 mt-4">
                  <AccordionTrigger className="bg-green-100 hover:bg-green-200/80 text-green-800 font-bold text-lg rounded-lg px-6 py-4 no-underline">SAMACHEER BATCH</AccordionTrigger>
                  <AccordionContent>
                    <p>Samacheer batch content goes here.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="1to1" className="border-b-0 mt-4">
                  <AccordionTrigger className="bg-yellow-100 hover:bg-yellow-200/80 text-yellow-800 font-bold text-lg rounded-lg px-6 py-4 no-underline">1 TO 1</AccordionTrigger>
                  <AccordionContent>
                    <p>1 to 1 content goes here.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <div className="relative">
                {onlineCourseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-6 relative pl-12 pb-10">
                    {index !== onlineCourseFeatures.length - 1 && (
                      <div className="absolute left-6 top-6 h-full w-px bg-gray-200"></div>
                    )}
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
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
