import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Quote, Users, ClipboardCheck, PenTool, HelpCircle, Book, UserCheck, Phone, Building, ChevronLeft, ChevronRight, Check, Sun, Languages, Calculator, Code } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { courses, testimonials, events } from "@/lib/mock-data";

export default function Home() {
  const sliderImages = [
    { src: '/Trichy.jpeg', alt: 'Trichy', hint: 'cityscape trichy' },
    { src: '/slider2.jpg', alt: 'Slider Image 2', hint: 'modern building' },
    { src: '/trichy.jpeg', alt: 'Slider Image 3', hint: 'cityscape trichy' },
  ];

  const features = [
    {
      icon: ClipboardCheck,
      text: "Daily Interactive Class",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: PenTool,
      text: "Unit Test, full test, Practice work Sheet",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: HelpCircle,
      text: "Instant Doubt Solving Session",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Book,
      text: "Printed Study material",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: UserCheck,
      text: "Personalised Mentor support",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const exploreCourses = [
    {
      classRange: "Class 1 - 5",
      title: "Courses for Kids",
      features: [
        "School tuition",
        "1:5 ratio Teachers & Students",
        "Handwriting Improvement",
        "Phonics based Training",
        "Fun and engaging learning every day",
      ],
      imageUrl: "/member1.png",
      imageHint: "female teacher",
      bgColor: "bg-blue-50",
    },
    {
      classRange: "Class 6 - 8",
      title: "Courses for Kids",
      features: [
        "1:10 ratio",
        "CBSE Board",
        "ICSE Board",
        "Samacheer",
        "NEET / JEE Foundation",
        "One to one Session",
        "Parent Teacher Meeting",
      ],
      imageUrl: "/member2.png",
      imageHint: "male teacher",
      bgColor: "bg-purple-50",
    },
    {
      classRange: "Class 3 - 13",
      title: "Courses for Kids",
      features: [
        "1:25 ratio",
        "CBSE Board",
        "ICSE Board",
        "Samacheer",
        "One to one Session",
        "Test Series",
        "Online Class",
        "Parent Teachers Meeting",
      ],
      imageUrl: "/member3.png",
      imageHint: "happy student",
      bgColor: "bg-yellow-50",
    },
  ];

  const kidsCourses = [
    {
      classRange: "Class 1 - 6",
      title: "Spoken English Program",
      description: "Master fluency in English speaking",
      icon: Sun,
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      isNew: true,
    },
    {
      classRange: "Class LKG - 5",
      title: "Learn English",
      description: "Level based holistic English Program",
      icon: Languages,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      isNew: false,
    },
    {
      classRange: "Class 1 to 5",
      title: "Learn math",
      description: "Turn your child into a Math wizard",
      icon: Calculator,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      isNew: false,
    },
    {
      classRange: "Class 1 - 8",
      title: "Coding classes",
      description: "Learn to build apps and games, be future ready",
      icon: Code,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      isNew: false,
    },
  ];

  return (
    <div className="flex flex-col relative">
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
      
      {/* Features Carousel Section */}
      <section className="bg-blue-50 py-8">
        <div className="container mx-auto">
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {features.map((feature, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className={`flex flex-col items-center justify-center p-6 rounded-xl h-40 ${feature.color}`}>
                    <feature.icon className="w-8 h-8 mb-2" />
                    <p className="text-center font-semibold">{feature.text}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10 bg-white border-primary text-primary" />
            <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10 bg-white border-primary text-primary" />
          </Carousel>
        </div>
      </section>

      {/* Explore Courses Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Explore courses (Class 3 - 13)</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {exploreCourses.map((course, index) => (
              <Card key={index} className={`overflow-hidden rounded-2xl shadow-lg ${course.bgColor} flex flex-row`}>
                <div className="flex flex-col w-2/3">
                  <CardHeader>
                    <p className="font-semibold text-primary">{course.classRange}</p>
                    <CardTitle className="text-2xl font-bold">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                      <ul className="space-y-3">
                        {course.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                  </CardContent>
                  <CardFooter className="p-6 mt-auto">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">Explore Offline Time Table</Button>
                  </CardFooter>
                </div>
                <div className="w-1/3 relative">
                  <Image
                    src={course.imageUrl}
                    alt={course.title}
                    fill
                    className="object-cover"
                    data-ai-hint={course.imageHint}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses for Kids Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12">
            Courses for <span className="relative inline-block">kids<span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"></span></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {kidsCourses.map((course, index) => (
                <Card key={index} className={`rounded-xl shadow-lg relative overflow-hidden ${course.bgColor}`}>
                  {course.isNew && <Badge className="absolute top-3 right-3 bg-red-500 text-white">NEW</Badge>}
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className={`p-3 rounded-lg ${course.iconColor} bg-white`}>
                      <course.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">{course.classRange}</p>
                      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                      <p className="text-gray-500 mt-1">{course.description}</p>
                    </div>
                    <Button className="mt-4 w-full bg-gray-800 text-white hover:bg-gray-900">Explore</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="hidden md:block">
              <Image 
                src="/super-kid.webp"
                alt="Courses for kids"
                width={600}
                height={600}
                className="rounded-lg"
                data-ai-hint="child learning"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Floating Action Buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <Button size="icon" className="rounded-full bg-purple-200 hover:bg-purple-300 w-12 h-12">
            <Building className="w-6 h-6 text-purple-700" />
          </Button>
          <Button size="icon" className="rounded-full bg-orange-400 hover:bg-orange-500 w-12 h-12">
            <Phone className="w-6 h-6 text-white" />
          </Button>
          <Button size="icon" className="rounded-full bg-green-500 hover:bg-green-600 w-12 h-12">
            <Phone className="w-6 h-6 text-white" />
          </Button>
      </div>


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
