
"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  FileText,
  GraduationCap,
  ArrowRight,
  Download,
  ChevronDown,
  Loader2,
  Search,
  FileCheck,
  Award
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useFirestore, useCollection, useDoc } from "@/firebase";
import { collection, query, orderBy, doc, updateDoc, increment } from "firebase/firestore";
import { DownloadLeadDialog } from "@/components/download-lead-dialog";

const materialStyles = [
  {
    themeColor: "bg-blue-600",
    hoverThemeColor: "hover:bg-blue-700",
    lightBg: "bg-blue-50/50",
    iconContainerBg: "bg-blue-100/50",
    borderColor: "border-blue-100",
    hoverBorderColor: "hover:border-blue-300",
    iconColor: "text-blue-600",
  },
  {
    themeColor: "bg-teal-600",
    hoverThemeColor: "hover:bg-teal-700",
    lightBg: "bg-teal-50/50",
    iconContainerBg: "bg-teal-100/50",
    borderColor: "border-teal-100",
    hoverBorderColor: "hover:border-teal-300",
    iconColor: "text-teal-600",
  },
  {
    themeColor: "bg-purple-600",
    hoverThemeColor: "hover:bg-purple-700",
    lightBg: "bg-purple-50/50",
    iconContainerBg: "bg-purple-100/50",
    borderColor: "border-purple-100",
    hoverBorderColor: "hover:border-purple-300",
    iconColor: "text-purple-600",
  },
  {
    themeColor: "bg-orange-600",
    hoverThemeColor: "hover:bg-orange-700",
    lightBg: "bg-orange-50/50",
    iconContainerBg: "bg-orange-100/50",
    borderColor: "border-orange-100",
    hoverBorderColor: "hover:border-orange-300",
    iconColor: "text-orange-600",
  },
  {
    themeColor: "bg-pink-600",
    hoverThemeColor: "hover:bg-pink-700",
    lightBg: "bg-pink-50/50",
    iconContainerBg: "bg-pink-100/50",
    borderColor: "border-pink-100",
    hoverBorderColor: "hover:border-pink-300",
    iconColor: "text-pink-600",
  },
  {
    themeColor: "bg-indigo-600",
    hoverThemeColor: "hover:bg-indigo-700",
    lightBg: "bg-indigo-50/50",
    iconContainerBg: "bg-indigo-100/50",
    borderColor: "border-indigo-100",
    hoverBorderColor: "hover:border-indigo-300",
    iconColor: "text-indigo-600",
  },
  {
    themeColor: "bg-green-600",
    hoverThemeColor: "hover:bg-green-700",
    lightBg: "bg-green-50/50",
    iconContainerBg: "bg-green-100/50",
    borderColor: "border-green-100",
    hoverBorderColor: "hover:border-green-300",
    iconColor: "text-green-600",
  },
  {
    themeColor: "bg-amber-600",
    hoverThemeColor: "hover:bg-amber-700",
    lightBg: "bg-orange-50/50",
    iconContainerBg: "bg-amber-100/50",
    borderColor: "border-amber-100",
    hoverBorderColor: "hover:border-amber-300",
    iconColor: "text-amber-600",
  },
];

const iconMap: Record<string, any> = {
  BookOpen: BookOpen,
  FileText: FileText,
  GraduationCap: GraduationCap,
  FileCheck: FileCheck,
  Award: Award
};

const AnimatedSection = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  const { setElement, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <section
      ref={setElement}
      id={id}
      className={cn(
        "animate-on-scroll",
        { "is-visible": isIntersecting },
        className
      )}
    >
      {children}
    </section>
  );
};

export default function StudyMaterialPage() {
  const firestore = useFirestore();
  const [materialSearchQuery, setMaterialSearchQuery] = useState("");

  // Fetch Page Content
  const pageRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "study-material");
  }, [firestore]);
  const { data: pageData, loading: pageLoading } = useDoc(pageRef);

  const content = useMemo(() => {
    const defaults = {
      heroTitle: "Free Study Material",
      heroImageUrl: "/study-materials-banner.jpg",
      premiumTitleMain: "Access ",
      premiumTitleHighlight: "Premium Learning",
      premiumCards: [
        {
          icon: "BookOpen",
          title: "CBSE",
          description: "Complete NCERT solutions and chapter-wise practice questions",
          accentColor: "blue",
          accordions: [
            { title: "CBSE NCERT Solutions", content: "Select your class below to access full NCERT book back solutions for all core subjects." },
            { title: "CBSE Chapter Wise Test Questions", content: "Deep dive into specific chapters with our curated list of test questions designed to test core conceptual understanding." }
          ]
        },
        {
          icon: "FileText",
          title: "Model Papers",
          description: "Board question papers and previous year papers for preparation",
          accentColor: "teal",
          accordions: [
            { title: "Board Question Papers", content: "Practice with the latest model board papers to understand the exam pattern and marking schemes." },
            { title: "Previous Year Board QP", content: "Review actual papers from previous years to gauge the difficulty and recurring topics." }
          ]
        },
        {
          icon: "GraduationCap",
          title: "Samacheer",
          description: "Book back solutions and comprehensive test materials for state board",
          accentColor: "purple",
          accordions: [
            { title: "Book Back Solutions", content: "Comprehensive solutions for all textbook exercises across the Samacheer Kalvi syllabus." },
            { title: "Chapter Wise Test Questions", content: "Structured test questions for every chapter in the Samacheer Kalvi syllabus." },
            { title: "Model Board Question Papers", content: "Expertly drafted model papers following the state board guidelines." },
            { title: "Previous Years Board QP", content: "Review actual papers from previous years to gauge the difficulty and recurring topics." }
          ]
        }
      ],
      materialsTitleMain: "Download Free ",
      materialsTitleHighlight: "Study Materials",
      materialsSubtitle: "Search for specific resources for your curriculum across all grades and boards"
    };

    if (!pageData?.content) return defaults;
    return { ...defaults, ...pageData.content };
  }, [pageData]);

  // Fetch Entity Collections
  const materialsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "study-materials"),
      orderBy("createdAt", "desc")
    );
  }, [firestore]);

  const { data: allMaterials, loading: materialsLoading } =
    useCollection(materialsQuery);

  const subjectsLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'subjects')) : null, [firestore]);
  const { data: allSubjectsLookup } = useCollection(subjectsLookupQuery);

  const classesLookupQuery = useMemo(() => firestore ? query(collection(firestore, 'classes')) : null, [firestore]);
  const { data: allClassesLookup } = useCollection(classesLookupQuery);

  const displayMaterials = useMemo(() => {
    if (!allMaterials) return [];

    const lowerQuery = materialSearchQuery.toLowerCase();

    const filtered = allMaterials
      .filter((m) => {
        const matchesVisibility = m.isVisible !== false;
        if (!matchesVisibility) return false;

        // GLOBAL SEARCH
        if (materialSearchQuery) {
          const subjectName = allSubjectsLookup?.find(s => s.id === m.subject)?.name || m.subject || "";
          const className = allClassesLookup?.find(c => c.id === m.grade)?.name || m.grade || "";
          
          return (
            m.title?.toLowerCase().includes(lowerQuery) || 
            m.description?.toLowerCase().includes(lowerQuery) ||
            subjectName.toLowerCase().includes(lowerQuery) ||
            className.toLowerCase().includes(lowerQuery) ||
            m.board?.toLowerCase().includes(lowerQuery)
          );
        }

        return true;
      });

    // 1. Sort by subject name alphabetically
    const sorted = filtered.sort((a, b) => {
      const subA = (allSubjectsLookup?.find(s => s.id === a.subject)?.name || a.subject || "").toLowerCase();
      const subB = (allSubjectsLookup?.find(s => s.id === b.subject)?.name || b.subject || "").toLowerCase();
      return subA.localeCompare(subB);
    });

    // 2. Default to 2 rows of 4 (8 items total) if not searching
    const result = !materialSearchQuery ? sorted.slice(0, 8) : sorted;

    return result.map((m, idx) => {
      const styleIdx = idx % materialStyles.length;
      return {
        ...m,
        subject: allSubjectsLookup?.find(s => s.id === m.subject)?.name || m.subject,
        grade: allClassesLookup?.find(c => c.id === m.grade)?.name || m.grade,
        desc: m.description,
        ...materialStyles[styleIdx],
      };
    });
  }, [allMaterials, allSubjectsLookup, allClassesLookup, materialSearchQuery]);

  const handleTrackDownload = async (id: string) => {
    if (!firestore) return;
    const docRef = doc(firestore, 'study-materials', id);
    updateDoc(docRef, {
      downloads: increment(1)
    }).catch(err => console.error("Failed to track download:", err));
  };

  if (pageLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Syncing Resources...</p>
      </div>
    );
  }

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{ height: "500px" }}
      >
        <Image
          src={content.heroImageUrl}
          alt={content.heroTitle}
          fill
          className="object-cover"
          data-ai-hint="books on a table"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            {content.heroTitle}
          </h1>
        </div>
      </section>

      {/* Section 1: Access Premium Learning */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight text-center">
              {content.premiumTitleMain}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                {content.premiumTitleHighlight}
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 mb-24">
            {(content.premiumCards || []).map((card: any, idx: number) => {
              const Icon = iconMap[card.icon] || BookOpen;
              const accentColors: Record<string, string> = {
                blue: "bg-blue-600",
                teal: "bg-teal-500",
                purple: "bg-purple-500",
              };
              const accent = card.accentColor || (idx === 0 ? "blue" : idx === 1 ? "teal" : "purple");
              
              return (
                <Card key={idx} className="group relative bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col overflow-hidden text-left min-h-[350px] justify-center">
                  <div className={cn("absolute top-0 left-0 w-full h-1.5", accentColors[accent] || "bg-blue-600")} />
                  <CardHeader className="flex flex-col items-center gap-6 text-center p-8">
                    <div className="relative">
                      <div className={cn("absolute inset-0 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100", accent === 'blue' ? "bg-blue-600/20" : accent === 'teal' ? "bg-teal-500/20" : "bg-purple-500/20")}></div>
                      <div className={cn("relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 bg-gradient-to-tr text-white", 
                        accent === 'blue' ? "from-blue-600 to-blue-400" : accent === 'teal' ? "from-teal-500 to-teal-400" : "from-purple-500 to-indigo-400")}>
                        <Icon className="h-10 w-10" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        {card.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500 font-medium mt-2">
                        {card.description}
                      </p>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>

          {/* Section 2: Download Free Study Materials Hub */}
          <div
            id="study-materials-section"
            className="bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-gray-100"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight text-center">
                {content.materialsTitleMain}
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  {content.materialsTitleHighlight}
                </span>
              </h2>
              <p className="text-lg text-gray-500 font-normal text-center">
                {content.materialsSubtitle}
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative w-full text-left">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search materials by name, class, or subject..." 
                  value={materialSearchQuery}
                  onChange={(e) => setMaterialSearchQuery(e.target.value)}
                  className="h-16 pl-12 bg-white border-2 border-gray-100 rounded-2xl focus-visible:ring-blue-600 shadow-sm font-bold text-lg"
                />
              </div>
            </div>

            {materialsLoading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
                <p className="font-bold">Syncing Resources...</p>
              </div>
            ) : displayMaterials.length === 0 ? (
              <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-bold">
                  {materialSearchQuery ? `No materials found matching "${materialSearchQuery}"` : "Enter a search term above to find study materials."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                {displayMaterials.map((material, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "group rounded-[16px] p-6 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative flex flex-col h-full",
                      material.lightBg,
                      material.borderColor,
                      material.hoverBorderColor
                    )}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={cn(
                          "w-16 h-16 rounded-2xl flex items-center justify-center relative",
                          material.iconContainerBg
                        )}
                      >
                        <div
                          className={cn(
                            "relative flex items-center justify-center",
                            material.iconColor
                          )}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                          >
                            <path d="M6 2C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2H6Z" />
                          </svg>
                          <span className="absolute bottom-[6px] text-[8px] font-bold text-white tracking-tighter">
                            PDF
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-right">
                        <span
                          className={cn(
                            "px-3 py-1 text-white text-[12px] font-bold rounded-full shadow-sm",
                            material.themeColor
                          )}
                        >
                          {material.grade}
                        </span>
                        {material.subject && (
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                            {material.subject}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-[20px] font-bold text-gray-900 mb-2 tracking-tight text-left line-clamp-2 min-h-[3rem]">
                      {material.title}
                    </h3>
                    <p className="text-[14px] text-gray-600 font-normal mb-4 flex-grow text-left line-clamp-3">
                      {material.desc}
                    </p>
                    <DownloadLeadDialog
                      materialTitle={material.title}
                      pdfUrl={material.pdfUrl}
                      onDownload={() => handleTrackDownload(material.id)}
                      trigger={
                        <Button
                          className={cn(
                            "w-full text-white font-bold rounded-2xl h-14 shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-3 mt-auto border-none",
                            material.themeColor,
                            material.hoverThemeColor
                          )}
                        >
                          <Download className="w-5 h-5" />
                          Download PDF
                        </Button>
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
