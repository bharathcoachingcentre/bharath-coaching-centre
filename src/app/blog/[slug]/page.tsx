import { getPostBySlug } from '@/lib/mock-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User } from 'lucide-react';
import { blogPosts } from '@/lib/mock-data';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-4xl py-12 md:py-16">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">{post.title}</h1>
        <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground mt-4">
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span>{post.date}</span>
          </div>
        </div>
      </div>
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={1200}
        height={600}
        className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg mb-8"
        data-ai-hint={post.imageHint}
        priority
      />
      <div
        className="prose prose-lg dark:prose-invert max-w-none mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
