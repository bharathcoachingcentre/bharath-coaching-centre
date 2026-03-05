import { getPostBySlug } from '@/lib/mock-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '@/lib/mock-data';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined } }) {
  const { slug } = params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="font-body-home2" style={{ backgroundColor: 'rgb(245 250 255)' }}>
      <section className="relative w-full flex items-center justify-center" style={{ height: '400px', marginTop: '-140px' }}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          data-ai-hint={post.imageHint}
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 container mx-auto px-4 pt-24 text-center">
            <div className="flex flex-col items-center max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">Article</span>
                <h1 className="font-headline text-3xl font-bold text-white md:text-5xl drop-shadow-2xl leading-tight mb-8">
                    {post.title}
                </h1>
                <div className="flex justify-center items-center space-x-6 text-sm font-bold text-white/80">
                    <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-[#35a3be]" />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-[#35a3be]" />
                        <span>{post.date}</span>
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
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-[#182d45] prose-headings:font-bold prose-p:text-gray-600 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-[#182d45]"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </div>
      </article>
    </div>
  );
}
