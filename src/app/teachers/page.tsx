"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { 
  Contact2, 
  Mail, 
  Award, 
  BookMarked,
  Sparkles,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FacultyPage() {
  const firestore = useFirestore();

  const teachersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'users'),
      where('role', '==', 'teacher'),
      where('status', '==', 'active'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  const { data: teachers, loading } = useCollection(teachersQuery);

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src="/Teacher-banner-bcc.jpg"
          alt="Our Faculty Banner"
          fill
          className="object-cover"
          data-ai-hint="teacher classroom"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Our Expert Faculty
          </h1>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-medium">
            Meet the mentors dedicated to transforming every student into an achiever through unique teaching methodologies.
          </p>
        </div>
      </section>

      {/* Faculty List Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
              <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Syncing Faculty Profiles...</p>
            </div>
          ) : !teachers || teachers.length === 0 ? (
            <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white border-dashed">
              <Contact2 className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">Faculty Profiles Coming Soon</h3>
              <p className="text-gray-500 mt-2">We are currently updating our faculty directory. Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {teachers.map((teacher, idx) => (
                <Card key={teacher.id} className="group border-none shadow-[0_20px_50px_rgba(8,112,184,0.05)] rounded-[2.5rem] overflow-hidden bg-white/80 backdrop-blur-md transition-all duration-500 hover:shadow-[0_30px_80px_rgba(8,112,184,0.12)] hover:-translate-y-3 border border-white">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={teacher.photoURL || `https://api.dicebear.com/7.x/micah/svg?seed=${teacher.email}`}
                      alt={teacher.displayName}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      data-ai-hint="teacher portrait"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white/50">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
                          <Award className="w-3.5 h-3.5" /> 18+ Years Exp
                        </span>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8 text-left">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-2xl font-black text-[#182d45] tracking-tight group-hover:text-blue-600 transition-colors">
                          {teacher.displayName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-teal-500"></div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {teacher.specialty || "Faculty Member"}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 space-y-3">
                        <div className="flex items-center gap-2 text-blue-600">
                          <BookMarked className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">About Mentor</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium line-clamp-3">
                          {teacher.bio || "Dedicated educator focused on delivering conceptual clarity through interactive teaching methods at Bharath Academy."}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span className="text-xs font-bold truncate max-w-[120px]">{teacher.email}</span>
                        </div>
                        <Button asChild variant="link" className="p-0 h-auto font-black text-[10px] uppercase tracking-widest text-blue-600 group/btn">
                          <Link href="/enrollment" className="flex items-center gap-2">
                            Enroll Now <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-teal-500 rounded-[3rem] p-12 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
            <div className="relative z-10 space-y-6">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-md shadow-inner">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Want to Join Our Expert Team?</h2>
              <p className="text-blue-50 text-lg max-w-2xl mx-auto font-medium">
                If you have the passion to transform a student into an achiever, we want to hear from you.
              </p>
              <div className="pt-4">
                <Link href="/become-a-teacher">
                  <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-10 py-4 rounded-2xl text-lg shadow-xl transition-all active:scale-95 border-none">
                    View Career Opportunities
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

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={cn("animate-spin", className)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);
