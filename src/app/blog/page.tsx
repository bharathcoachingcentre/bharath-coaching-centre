import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, Calendar as CalendarIcon } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Insights, articles, and news from the heart of Bharath Academy.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="flex flex-col md:flex-row overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint={post.imageHint}
              />
            </div>
            <div className="flex flex-col justify-between p-6 md:w-2/3">
              <div>
                <CardHeader className="p-0">
                  <CardTitle className="text-2xl hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>{post.date}</span>
                      </div>
                  </div>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardContent>
              </div>
              <div className="mt-6">
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
