import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Quote, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses, testimonials, events } from "@/lib/mock-data";

export default function Home() {
  const sliderImages = [
    { src: '/trichy.jpeg', alt: 'Trichy', hint: 'cityscape trichy' },
    { src: '/slider1.jpg', alt: 'Slider Image 1', hint: 'students classroom' },
    { src: '/slider2.jpg', alt: 'Slider Image 2', hint: 'modern building' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Slider Section */}
      <section className="w-full">
        <Carousel
          opts={{ loop: true }}
          className="w-full"
        >
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={image.hint}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </section>
      
      {/* Welcome Section */}
      <section className="bg-card py-16">
        <div className="container mx-auto text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Welcome to Bharath Academy
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Committed to providing world-class education and fostering a community of lifelong learners.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Expert-Led Courses</h3>
              <p className="mt-2 text-muted-foreground">
                Learn from industry leaders and renowned academics.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Vibrant Community</h3>
              <p className="mt-2 text-muted-foreground">
                Connect and collaborate with a diverse student body.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Flexible Learning</h3>
              <p className="mt-2 text-muted-foreground">
                Choose from a range of schedules to fit your life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Featured Courses</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover our most popular courses designed for excellence and career growth.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {courses.slice(0, 4).map((course) => (
              <Card key={course.id} className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <Image src={course.imageUrl} alt={course.title} width={600} height={400} className="h-48 w-full object-cover" data-ai-hint={course.imageHint} />
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/courses#${course.id}`}>Learn More</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg text-primary">
              <Link href="/courses">View All Courses <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Success Stories</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Hear what our students have to say about their journey with us.
            </p>
          </div>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="mt-12 w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-full">
                      <CardContent className="flex h-full flex-col items-center justify-center p-6 text-center">
                        <Quote className="h-10 w-10 text-accent" />
                        <p className="mt-4 text-lg italic text-foreground">"{testimonial.quote}"</p>
                        <div className="mt-6 flex items-center">
                          <Avatar>
                            <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4 text-left">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.course}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

       {/* Events Section */}
       <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">Upcoming Events</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Stay updated with our latest workshops, seminars, and important dates.
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <Card>
                <CardContent className="p-6">
                    <ul className="space-y-4">
                        {events.slice(0, 3).map((event) => (
                             <li key={event.id} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-md h-16 w-16">
                                    <span className="text-sm font-bold uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-2xl font-bold">{event.date.getDate()}</span>
                                </div>
                                <div className="flex-grow">
                                    <Badge variant={event.category === 'Deadline' ? 'destructive' : 'secondary'}>{event.category}</Badge>
                                    <h4 className="font-semibold text-lg mt-1">{event.title}</h4>
                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="link" className="text-lg text-primary">
              <Link href="/events">View Full Calendar <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
