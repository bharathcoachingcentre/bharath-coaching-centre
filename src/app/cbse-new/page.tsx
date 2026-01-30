
'use client';

import React from 'react';
import { ArrowRight, BookOpen, Award, GraduationCap, FileCheck, FunctionSquare, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const classes = [
  { name: "Class 6", number: 6, href: "/courses/cbse-class-6" },
  { name: "Class 7", number: 7, href: "/courses/cbse-class-7" },
  { name: "Class 8", number: 8, href: "/courses/cbse-class-8" },
  { name: "Class 9", number: 9, href: "/courses/cbse-9th-grade" },
  { name: "Class 10", number: 10, href: "/courses/cbse-10th-grade" },
  { name: "Class 11", number: 11, href: "/courses/cbse-11th-grade" },
  { name: "Class 12", number: 12, href: "/courses/cbse-12th-grade" },
];

const studyMaterials = [
    { name: "NCERT Book PDF", icon: BookOpen },
    { name: "NCERT Book Back Solution", icon: FileCheck },
    { name: "NCERT Chapterwise Test QP", icon: FileText },
    { name: "Model Board Question Paper", icon: Award },
    { name: "Previous Year Board QP", icon: Award },
];

export default function CbseNewPage() {
    const boardMaterials = {
        CBSE: {
          "NCERT Books": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_ncert.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_ncert.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_ncert.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_ncert.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_ncert.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_ncert.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_ncert.pdf" },
          ],
          "NCERT Solutions": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_solutions.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_solutions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_solutions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_solutions.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_solutions.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_solutions.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_solutions.pdf" },
          ],
          "Formula Booklet": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_formula.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_formula.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_formula.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_formula.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_formula.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_formula.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_formula.pdf" },
          ],
          "Unit wise question papers": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_unit_questions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_unit_questions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_unit_questions.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_unit_questions.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_unit_questions.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_unit_questions.pdf" },
          ],
          "Model Board question paper": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_model_paper.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_model_paper.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_model_paper.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_model_paper.pdf" },
          ],
        },
      };

  return (
    <div>
        <section className="relative w-full flex items-center justify-center text-center text-white overflow-hidden" style={{ background: 'linear-gradient(120deg, #174f5f, #35a3be, #6cc4dc)', height: '500px', marginTop: '-140px' }}>
            <Award className="absolute -left-8 -bottom-8 w-32 h-32 text-white/10" />
            <GraduationCap className="absolute -right-8 -top-8 w-32 h-32 text-white/10" />
            <div className="z-10 relative" style={{ marginTop: '20px' }}>
              <h1 className="text-5xl md:text-6xl font-bold font-heading-home2 mb-4 relative inline-block text-gradient-home-new">
                CBSE
                <BookOpen className="absolute -right-12 -top-2 w-16 h-16 text-white/10" />
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto">
                Excel in your board exams with our comprehensive coaching program designed by expert faculty members
              </p>
            </div>
        </section>
        <div className="w-full py-16 md:py-24 px-4" style={{ background: 'linear-gradient(to bottom, #e0f7fa, #ffffff)' }}>
            <div className="container mx-auto text-center">
                <Badge className="mb-4 bg-cyan-100 text-cyan-800 border-cyan-200 px-3 py-1">
                <BookOpen className="w-4 h-4 mr-2" />
                CBSE Board Curriculum
                </Badge>
                <h1 className="text-5xl font-bold font-heading-home2 mb-4" style={{ color: '#182d45' }}>
                Select Your <span style={{ color: '#35a3be' }}>Class</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
                Access comprehensive study materials, NCERT solutions, formula booklets, and practice papers for classes 6 to 12.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {classes.map((item, index) => (
                    <div key={index} className="group [perspective:1000px]" style={{ minHeight: '350px' }}>
                        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            {/* Front side */}
                            <Card className="absolute h-full w-full [backface-visibility:hidden] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center p-8 flex flex-col justify-between">
                                <CardContent className="p-0 flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110" style={{ background: 'linear-gradient(135deg, #35a3be, #6cc4dc)' }}>
                                        <span className="text-4xl font-bold text-white">{item.number}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading-home2 mb-2" style={{ color: '#182d45' }}>{item.name}</h3>
                                    <p className="text-gray-500 text-sm">Complete study materials & resources</p>
                                </CardContent>
                                <div className="mt-6">
                                    <span className="font-semibold text-sm transition-colors duration-300" style={{ color: '#35a3be' }}>
                                        Hover to explore <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Card>

                            {/* Back side */}
                            <Card className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl shadow-lg p-6 flex flex-col justify-center" style={{ background: 'linear-gradient(120deg, #174f5f, #35a3be, #6cc4dc)' }}>
                                <CardHeader className="p-2 text-center">
                                    <CardTitle className="text-white text-xl font-bold">Class {item.number} Materials</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col gap-2">
                                    {studyMaterials.map((material) => {
                                        const materialKeyMap: { [key: string]: string } = {
                                            "NCERT Book PDF": "NCERT Books",
                                            "NCERT Book Back Solution": "NCERT Solutions",
                                            "NCERT Chapterwise Test QP": "Unit wise question papers",
                                            "Model Board Question Paper": "Model Board question paper",
                                            "Previous Year Board QP": "Model Board question paper",
                                        };
                                        const boardMaterialKey = materialKeyMap[material.name];
                                        const materialLinks = (boardMaterials.CBSE as any)[boardMaterialKey] || [];
                                        const classNumber = item.number;
                                        
                                        const relevantLink = materialLinks.find((link: any) => link.class.includes(`Class ${classNumber}`));
                                        const href = relevantLink ? relevantLink.pdf : "#";

                                        return (
                                            <Button asChild key={material.name} variant="ghost" className="bg-white/90 hover:bg-white text-cyan-900 justify-start w-full" disabled={!relevantLink}>
                                                <a href={href} download>
                                                    <material.icon className="mr-2 h-4 w-4" />
                                                    {material.name}
                                                </a>
                                            </Button>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    </div>
  );
}
