"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Calendar, Loader2, FileText } from "lucide-react";
import placeholderImages from "@/app/lib/placeholder-images.json";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, where, orderBy } from "firebase/firestore";

export default function BlogPage() {
  const firestore = useFirestore();
  const bannerImage = placeholderImages["blog-banner"];

  const blogsQuery = useMemo(() => {
    if (!firestore) return null;
    // We fetch only published blogs, ordered by creation date
    return query(
      collection(firestore, 'blogs'),
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
  }, [firestore]);

  const { data: blogs, loading } = useCollection(blogsQuery);

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src={bannerImage.src}
          alt={bannerImage.alt}
          fill
          className="object-cover"
          data-ai-hint={bannerImage.hint}
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Our Blog
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
              Latest Updates
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Insights & <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 font-normal text-center">
              Insights, articles, and success stories from the heart of Bharath Academy.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
              <p className="font-bold">Syncing Articles...</p>
            </div>
          ) : !blogs || blogs.length === 0 ? (
            <div className="text-center py-32 bg-white/50 backdrop-blur-sm rounded-[3rem] border border-white border-dashed">
              <FileText className="w-16 h-16 text-gray-200 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900">Articles Coming Soon</h3>
              <p className="text-gray-500 mt-2">We are currently composing fresh content for you. Check back shortly!</p>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2">
              {blogs.map((post) => (
                <Card key={post.id} className="group flex flex-col md:flex-row overflow-hidden transition-all duration-500 bg-white/70 backdrop-blur-md rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-2">
                  <div className="md:w-2/5 relative h-64 md:min-h-[350px] overflow-hidden bg-gray-100">
                    <Image
                      src={post.featuredImage || placeholderImages["blog-card-future"].src}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:opacity-0" />
                  </div>
                  <div className="flex flex-col justify-between p-8 md:w-3/5 text-left">
                    <div className="text-left">
                      <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-bold text-blue-600 mb-4 justify-start">
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                              <User className="h-3.5 w-3.5" />
                              <span>{post.author || 'Staff'}</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{post.date || 'Recent'}</span>
                          </div>
                      </div>
                      <CardHeader className="p-0 text-left">
                        <CardTitle className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors leading-tight text-left line-clamp-3">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 mt-4 text-left">
                        <CardDescription className="text-gray-500 font-medium line-clamp-3 leading-relaxed text-left">
                          {post.excerpt}
                        </CardDescription>
                      </CardContent>
                    </div>
                    <div className="mt-8 text-left">
                      <Button asChild variant="link" className="p-0 h-auto text-blue-600 font-bold uppercase tracking-widest text-xs group/btn">
                        <Link href={`/blog/${post.slug}`} className="flex items-center">
                          Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
