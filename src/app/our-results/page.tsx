'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const resultsData: Record<string, { src: string; alt: string; hint: string }> = {
  '2025': { src: '/2025-Result.png', alt: 'Result 2025', hint: 'result chart' },
  '2024': { src: '/2024-Result.jpg', alt: 'Result 2024', hint: 'result chart' },
  '2023': { src: '/2023-Result.jpg', alt: 'Result 2023', hint: 'result chart' },
  '2022': { src: '/2022-Result.jpg', alt: 'Result 2022', hint: 'result chart' },
  '2021': { src: '/2021-Result.png', alt: 'Result 2021', hint: 'result chart' },
};

const years = Object.keys(resultsData).sort((a, b) => Number(b) - Number(a));

export default function OurResultsPage() {
  const [selectedYear, setSelectedYear] = React.useState<string>(years[0]);

  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/Our-result.jpg"
          alt="Our Results Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
            Our Results
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        {/* Decorative background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-[0.2em] mb-4 shadow-sm" style={{ color: '#35a3be', backgroundColor: 'white', borderColor: 'rgba(53, 163, 190, 0.2)' }}>
                Achievements
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#182d45] tracking-tight">Our Achievements</h2>
          </div>

          <div className="flex justify-center mb-16">
            <div className="inline-flex p-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-[0_20px_50px_rgba(8,112,184,0.05)]">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={cn(
                            "relative px-8 py-3.5 rounded-full text-sm font-black transition-all duration-500 uppercase tracking-widest overflow-hidden group",
                            selectedYear === year 
                                ? "text-white" 
                                : "text-[#182d45] hover:text-[#35a3be]"
                        )}
                    >
                        {selectedYear === year && (
                            <motion.div 
                                layoutId="activeYearTab"
                                className="absolute inset-0 bg-gradient-to-tr from-[#35a3be] to-[#174f5f] shadow-[0_10px_20px_rgba(53,163,190,0.3)]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{year}</span>
                    </button>
                ))}
            </div>
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedYear}
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex justify-center"
                >
                    <div className="relative group w-full max-w-5xl">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#35a3be]/20 to-transparent rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        {/* Consistent Size Image Wrapper */}
                        <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(8,112,184,0.15)] border border-white/60 bg-white/50 z-10">
                            <Image
                                src={resultsData[selectedYear].src}
                                alt={resultsData[selectedYear].alt}
                                fill
                                className="object-contain p-4 md:p-8"
                                data-ai-hint={resultsData[selectedYear].hint}
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
