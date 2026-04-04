"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Loader2,
  Maximize2,
  Calendar,
  Tag
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import placeholderImages from "@/app/lib/placeholder-images.json";
import { cn } from "@/lib/utils";

const categories = ["All", "Classrooms", "Events", "Achievements", "Campus"];

const galleryItems = [
  { id: 1, category: "Classrooms", image: placeholderImages["gallery-1"], title: "Concept-Based Learning" },
  { id: 2, category: "Events", image: placeholderImages["gallery-2"], title: "Cultural Festival 2024" },
  { id: 3, category: "Campus", image: placeholderImages["gallery-3"], title: "Science Lab Experiments" },
  { id: 4, category: "Achievements", image: placeholderImages["gallery-4"], title: "State-Level Excellence" },
  { id: 5, category: "Campus", image: placeholderImages["gallery-5"], title: "Collaborative Study Hub" },
  { id: 6, category: "Events", image: placeholderImages["gallery-6"], title: "Annual Sports Meet" },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src="https://picsum.photos/seed/galleryhero/1920/1080"
          alt="Academy Life Gallery"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Life at Bharath Academy
          </h1>
          <p className="text-white/80 text-lg md:text-xl mt-6 max-w-2xl mx-auto font-medium">
            Explore the moments that define our journey of excellence, learning, and growth.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Controls Bar */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-6 shadow-xl border border-white mb-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300",
                    activeCategory === cat 
                      ? "bg-gradient-to-r from-blue-600 to-teal-500 text-white shadow-lg scale-105" 
                      : "text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search moments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-white border-2 border-gray-50 rounded-2xl pl-11 pr-4 font-bold text-sm text-gray-700 focus:border-blue-600 focus:outline-none shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Image Grid */}
          {filteredItems.length === 0 ? (
            <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white border-dashed">
              <ImageIcon className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">No moments found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your category filter or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="group relative overflow-hidden bg-white rounded-[2rem] border-none shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer">
                      <div className="relative h-80 w-full overflow-hidden">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          data-ai-hint={item.image.hint}
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-left">
                          <Badge className="w-fit mb-3 bg-blue-500 text-white border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                            {item.category}
                          </Badge>
                          <h3 className="text-white font-bold text-xl leading-tight">
                            {item.title}
                          </h3>
                          <div className="mt-4 flex items-center gap-4 text-white/60">
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
                              <Calendar className="w-3.5 h-3.5" /> 2024-25
                            </div>
                            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-tighter">
                              <Tag className="w-3.5 h-3.5" /> {item.category}
                            </div>
                          </div>
                        </div>
                        
                        {/* Static Badge (Top Right) */}
                        <div className="absolute top-6 right-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-blue-600">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Simple CTA Footer */}
          <div className="mt-20 text-center">
            <div className="inline-flex flex-col items-center p-10 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-xl max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Become an Achiever</h3>
              <p className="text-gray-600 mb-8 font-medium">
                Every picture tells a story of success. Start your own story with us today.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold h-14 px-10 rounded-2xl shadow-xl transition-all active:scale-95 border-none">
                <Link href="/enrollment">Join the Academy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
