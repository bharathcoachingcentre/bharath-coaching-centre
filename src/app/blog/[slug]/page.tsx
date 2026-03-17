"use client";

import React, { useMemo, use } from "react";
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, where, limit } from "firebase/firestore";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const firestore = useFirestore();

  const blogQuery = useMemo(() => {
    if (!firestore || !slug) return null;
    return query(
      collection(firestore, 'blogs'),
      where('slug', '==', slug),
      limit(1)
    );
  }, [firestore, slug]);

  const { data: blogs, loading } = useCollection(blogQuery);
  const post = blogs?.[0];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Syncing Article Content...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="font-body-home2 min-h-screen" style={{ backgroundColor: 'rgb(245 250 255)' }}>
      <section className="relative w-full flex items-center justify-center" style={{ height: '400px', marginTop: '-140px' }}>
        <Image
          src={post.featuredImage || "/blog-1.jpg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 container mx-auto px-4 text-center pt-20 sm:pt-24 lg:pt-28">
            <div className="flex flex-col items-center max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">Article</span>
                <h1 className="font-headline text-3xl font-bold text-white md:text-5xl drop-shadow-2xl leading-tight mb-8">
                    {post.title}
                </h1>
                <div className="flex justify-center items-center space-x-6 text-sm font-bold text-white/80">
                    <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-[#35a3be]" />
                        <span>{post.author || 'Admin Staff'}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-[#35a3be]" />
                        <span>{post.date || 'Recent'}</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <article className="container mx-auto max-w-4xl py-12 md:py-20 px-4">
        <Button asChild variant="ghost" className="mb-10 text-gray-500 hover:text-[#35a3be] hover:bg-[#35a3be]/10 rounded-xl px-4 transition-all">
            <Link href="/blog" className="flex items-center font-bold">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
        </Button>

        <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 md:p-16 shadow-[0_30px_80px_rgba(8,112,184,0.08)] border border-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#35a3be] to-[#174f5f]" />
            <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[#182d45] prose-headings:font-bold prose-p:text-gray-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-[#182d45] blog-content-wrapper text-left"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
      </article>
      <style jsx global>{`
        .blog-content-wrapper ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content-wrapper ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-content-wrapper img {
          border-radius: 1rem;
          margin: 2rem 0;
          max-width: 100%;
          height: auto;
        }
      `}</style>
    </div>
  );
}
