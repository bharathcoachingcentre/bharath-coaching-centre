import Image from "next/image";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { courses } from "@/lib/mock-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Courses</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Browse our comprehensive list of courses and find the perfect one to advance your skills and career.
        </p>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} id={course.id} className="flex flex-col overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl">
            <div className="relative h-56 w-full">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                data-ai-hint={course.imageHint}
              />
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{course.description}</p>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{course.schedule}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/contact">Enroll Now</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
