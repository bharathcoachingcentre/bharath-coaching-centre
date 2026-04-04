
"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Target, Lightbulb, Brain, Trophy, Loader2, BookOpen, Users, Award, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const iconMap: Record<string, any> = {
  Target: Target,
  Lightbulb: Lightbulb,
  Brain: Brain,
  Trophy: Trophy,
};

export default function AboutPage() {
  const firestore = useFirestore();

  const pageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "about");
  }, [firestore]);

  const { data: pageContent, loading } = useDoc(pageRef);

  const content = useMemo(() => {
    const defaults = {
      heroTitle: "About Us",
      heroImageUrl: "/About-Us.jpg",
      philosophyTag: "Philosophy",
      philosophyTitleMain: "What Makes Us ",
      philosophyTitleHighlight: "Different",
      philosophyImageUrl: "/about-image-vector.jpg",
      philosophyItems: [
        { text: "Everyone is an achiever.", icon: "Target" },
        { text: "Every student needs a unique method to deliver the concept.", icon: "Lightbulb" },
        { text: "BEC works in many unique ways to deliver the concepts to the students' mind which is more efficient than a common teaching methodology for different personalities.", icon: "Brain" },
        { text: "Our motto \"Everyone is an achiever\" stands as our ultimate goal is to train up any student who steps into our academy and turn them into an achiever.", icon: "Trophy" }
      ],
      ctaTitle: "Start Your Journey To Success",
      ctaSubtitle: "Experience the difference with our unique teaching methodology and personalized attention.",
      ctaBtnText: "Enroll Today"
    };

    if (!pageContent?.content) return defaults;

    return {
      ...defaults,
      ...pageContent.content
    };
  }, [pageContent]);

  const colors = ["bg-blue-500 shadow-blue-500/30", "bg-teal-500 shadow-teal-500/30", "bg-purple-500 shadow-purple-500/30", "bg-orange-500 shadow-orange-500/30"];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Syncing Content...</p>
      </div>
    );
  }

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src={content.heroImageUrl}
          alt="About Us Banner"
          fill
          className="object-cover"
          data-ai-hint="woman yoga"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            {content.heroTitle}
          </h1>
        </div>
      </section>

      {/* About BCC Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              Our Legacy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#182d45] tracking-tight mb-10 leading-tight">
              About <span className="text-blue-600">BCC</span>
            </h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed font-medium">
              <p>
                BCC is an educational organization whose simple and critical goal is to make everyone an achiever by offering simple solutions for success in their exams. Recognized by students as one of the leading coaching centres in Trichy.
              </p>
              <p>
                BCC was established in 2008 with 40 students at Anna Nagar initially and eventually grew with 150 members per academic year at Thillai Nagar. 2000+ students have been successful for the past 15 years. BCC aims to change the life of students through conscious training, individual attention and increasingly consistent performance.
              </p>
              <p>
                All boards are being handled from classes 1-12. All subjects for classes 1-10; 11-12 (Mat, Phy, Che, and Business Maths). Maths classes are offered for Engineering, MBA, MCA, Polytechnic; Entrance coaching for SAINIK and NATA (I-Arch). We’ve had 800+ successful students for the past 5 years exclusively for NATA.
              </p>
              <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-110"></div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <p className="text-[#182d45] font-bold">
                    Apart from daily classes, weekly tests for students, BCC goes above and beyond in conducting daily study/learning classes towards exams for 12 hours each day helping the students to clear last minute doubts and conduct multiple revision tests to scale up and get thorough with their syllabus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              {/* Decorative grid pattern */}
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[radial-gradient(hsl(var(--primary)/0.1)_2px,transparent_2px)] [background-size:16px_16px] -z-0"></div>
              
              <div className="relative z-10 group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-teal-500/10 rounded-2xl blur-2xl group-hover:opacity-100 transition-opacity opacity-0 duration-500"></div>
                <Image
                  src={content.philosophyImageUrl}
                  alt="Counseling session"
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-2xl object-cover relative z-10 border border-white/50"
                  data-ai-hint="counseling session"
                />
              </div>
            </div>

            <div className="space-y-10 text-left">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
                  {content.philosophyTag}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  {content.philosophyTitleMain} <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">{content.philosophyTitleHighlight}</span>
                </h2>
              </div>

              <div className="space-y-8">
                {content.philosophyItems?.map((item: any, idx: number) => {
                  const Icon = iconMap[item.icon] || Target;
                  return (
                    <div key={idx} className="flex items-start gap-6 group">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0 mt-1",
                        colors[idx % colors.length]
                      )}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-600 font-medium text-lg leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-teal-500 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">{content.ctaTitle}</h2>
              <p className="text-blue-50 text-lg max-w-2xl mx-auto font-medium">
                {content.ctaSubtitle}
              </p>
              <div className="pt-4">
                <Link href="/enrollment">
                  <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-2xl text-lg shadow-xl transition-all active:scale-95 border-none">
                    {content.ctaBtnText}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
