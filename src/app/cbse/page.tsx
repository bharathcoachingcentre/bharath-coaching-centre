
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

export default function CbsePage() {
    const boardMaterials = {
        CBSE: {
          "NCERT Book PDF": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_ncert.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_ncert.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_ncert.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_ncert.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_ncert.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_ncert.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_ncert.pdf" },
          ],
          "NCERT Book Back Solution": [
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
          "NCERT Chapterwise Test QP": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_unit_questions.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_unit_questions.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_unit_questions.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_unit_questions.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_unit_questions.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_unit_questions.pdf" },
          ],
          "Model Board Question Paper": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
            { class: "Class 11", pdf: "/pdfs/cbse_11_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
            { class: "Class 9", pdf: "/pdfs/cbse_9_model_paper.pdf" },
            { class: "Class 8", pdf: "/pdfs/cbse_8_model_paper.pdf" },
            { class: "Class 7", pdf: "/pdfs/cbse_7_model_paper.pdf" },
            { class: "Class 6", pdf: "/pdfs/cbse_6_model_paper.pdf" },
          ],
          "Previous Year Board QP": [
            { class: "Class 12", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
          ],
        },
      };

  return (
    <div>
        <section className="relative w-full flex items-center justify-center text-center text-white overflow-hidden pt-20 bg-gradient-to-r from-blue-600 to-teal-500" style={{ height: '500px' }}>
            <Award className="absolute -left-8 -bottom-8 w-32 h-32 text-white/10" />
            <GraduationCap className="absolute -right-8 -top-8 w-32 h-32 text-white/10" />
            <div className="z-10 relative px-4 pt-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 relative inline-block">
                CBSE
                <BookOpen className="absolute -right-12 -top-2 w-16 h-16 text-white/10" />
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                Excel in your board exams with our comprehensive coaching program designed by expert faculty members
              </p>
            </div>
        </section>
        <div className="w-full py-16 md:py-24 px-4 bg-gradient-to-br from-blue-50/50 to-teal-50/50">
            <div className="container mx-auto text-center">
                <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200 px-4 py-1.5 font-bold uppercase tracking-widest text-[10px]">
                <BookOpen className="w-4 h-4 mr-2" />
                CBSE Board Curriculum
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Select Your <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Class</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
                Access comprehensive study materials, NCERT solutions, formula booklets, and practice papers for classes 6 to 12.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {classes.map((item, index) => (
                    <div key={index} className="group [perspective:1000px] mx-auto" style={{ minHeight: '350px', width: '100%', maxWidth: '310px' }}>
                        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                            {/* Front side */}
                            <Card className="absolute h-full w-full [backface-visibility:hidden] bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center p-8 flex flex-col justify-between border border-white">
                                <CardContent className="p-0 flex flex-col items-center">
                                    <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-blue-600 to-teal-500 shadow-lg shadow-blue-200">
                                        <span className="text-4xl font-black text-white">{item.number}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-gray-500 text-sm font-medium">Complete study materials & resources</p>
                                </CardContent>
                                <div className="mt-6">
                                    <span className="font-bold text-sm text-blue-600">
                                        Hover to explore <ArrowRight className="inline-block w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Card>

                            {/* Back side */}
                            <Card className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-[2rem] shadow-2xl p-6 flex flex-col justify-center border-none bg-gradient-to-br from-blue-600 to-teal-500">
                                <CardHeader className="p-2 text-center">
                                    <CardTitle className="text-white text-xl font-black uppercase tracking-tight mb-4">Class {item.number} Materials</CardTitle>
                                </CardHeader>
                                <CardContent className="p-2 flex flex-col gap-2.5">
                                    {studyMaterials.map((material) => {
                                        const materialKeyMap: { [key: string]: string } = {
                                            "NCERT Book PDF": "NCERT Book PDF",
                                            "NCERT Book Back Solution": "NCERT Book Back Solution",
                                            "NCERT Chapterwise Test QP": "NCERT Chapterwise Test QP",
                                            "Model Board Question Paper": "Model Board Question Paper",
                                            "Previous Year Board QP": "Previous Year Board QP",
                                        };
                                        const boardMaterialKey = materialKeyMap[material.name];
                                        const materialLinks = (boardMaterials.CBSE as any)[boardMaterialKey] || [];
                                        const classNumber = item.number;
                                        
                                        const relevantLink = materialLinks.find((link: any) => link.class.includes(`Class ${classNumber}`));
                                        const href = relevantLink ? relevantLink.pdf : "#";

                                        return (
                                            <Button asChild key={material.name} variant="ghost" className="bg-white/10 hover:bg-white/20 text-white justify-start w-full font-bold text-xs h-11 rounded-xl border border-white/20 backdrop-blur-sm" disabled={!relevantLink}>
                                                <a href={href} download>
                                                    <material.icon className="h-4 w-4 mr-3" />
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
