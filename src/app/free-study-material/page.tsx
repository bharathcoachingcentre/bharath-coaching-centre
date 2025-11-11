
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, FileText, GraduationCap } from 'lucide-react';
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

      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* CBSE Card */}
            <Card className="rounded-2xl shadow-lg border-t-4 border-primary">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">CBSE</CardTitle>
                  <p className="text-sm text-muted-foreground">Complete NCERT solutions and chapter-wise practice questions</p>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="cbse-ncert-solutions">
                    <AccordionTrigger>CBSE NCERT Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map(cls => (
                          <Button key={cls} variant="outline" size="sm">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cbse-chapter-wise-test">
                    <AccordionTrigger>CBSE Chapter Wise Test Questions</AccordionTrigger>
                    <AccordionContent>
                      <p>Content for CBSE Chapter Wise Test Questions.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Model Papers Card */}
            <Card className="rounded-2xl shadow-lg border-t-4 border-green-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Model Papers</CardTitle>
                  <p className="text-sm text-muted-foreground">Board question papers and previous year papers</p>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="board-question-papers">
                    <AccordionTrigger>Board Question Papers</AccordionTrigger>
                    <AccordionContent>
                      <p>Content for Board Question Papers.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="previous-year-papers">
                    <AccordionTrigger>Previous Year Board Question Papers</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {['Class 10', 'Class 12'].map(cls => (
                          <Button key={cls} variant="outline" size="sm">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Samacheer Card */}
            <Card className="rounded-2xl shadow-lg border-t-4 border-purple-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
                  <GraduationCap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Samacheer</CardTitle>
                  <p className="text-sm text-muted-foreground">Book back solutions and comprehensive test materials</p>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="samacheer-book-back">
                    <AccordionTrigger>Samacheer Book Back Solutions</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-wrap gap-2">
                        {['Class 9', 'Class 10', 'Class 11'].map(cls => (
                          <Button key={cls} variant="outline" size="sm">{cls}</Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-chapter-wise">
                    <AccordionTrigger>Samacheer Chapter Wise Test Questions</AccordionTrigger>
                    <AccordionContent>
                      <p>Content for Samacheer Chapter Wise Test Questions.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-model-papers">
                    <AccordionTrigger>Model Board Question Papers</AccordionTrigger>
                    <AccordionContent>
                      <p>Content for Samacheer Model Board Question Papers.</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="samacheer-previous-year">
                    <AccordionTrigger>Previous Years Board Question Papers</AccordionTrigger>
                    <AccordionContent>
                      <p>Content for Samacheer Previous Years Board Question Papers.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
