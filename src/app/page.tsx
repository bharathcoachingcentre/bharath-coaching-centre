

'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Quote, Users, ClipboardCheck, PenTool, HelpCircle, Book, UserCheck, Phone, Building, ChevronLeft, ChevronRight, Check, Sun, Languages, Calculator, Code, Presentation, Award, GraduationCap, Laptop, Flame, X, Clock, Youtube, MessageCircleQuestion, Globe, CheckCircle, Brain, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { courses, testimonials, events } from "@/lib/mock-data";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { CountUpNumber } from "@/components/count-up-number";
import { motion, AnimatePresence } from "framer-motion";
import { quotelessJson } from "zod";

const resultsData = {
  "All": [
    { src: '/stu-1.png', alt: 'AARAV K VORA', hint: 'student portrait', name: 'AARAV K VORA', score: 'Maths 95 | Total 470' },
    { src: '/stu-4.png', alt: 'Results slide 2', hint: 'students results chart', name: 'JHEGADHEESH S', score: 'Maths 97 | Total 470' },
    { src: '/stu-5.png', alt: '', hint: 'student portrait', name: 'CHARAN K', score: 'MATHS 98 | TOTAL 456' },
    { src: '/stu-2.png', alt: 'JESMITHA', hint: 'student portrait', name: 'JESMITHA G R', score: 'MATHS 95 | TOTAL 452' },
    { src: '/stu-3.jpg', alt: 'SAJITHAA C.L', hint: 'student portrait', name: 'SAJITHAA C.L', score:' TOTAL 474' },
    { src: '/stu-6.png', alt: 'MANASWINI R', hint: 'student portrait', name: 'MANASWINI R', score:'TOTAL 458' },
   
  ],
  "10th Board": [
    
    { src: '/stu-5.png', alt: '', hint: 'student portrait', name: 'CHARAN K', score: 'MATHS 98 | TOTAL 456' },
    { src: '/stu-2.png', alt: 'JESMITHA', hint: 'student portrait', name: 'JESMITHA G R', score: 'MATHS 95 | TOTAL 452' },
    { src: '/stu-3.jpg', alt: 'SAJITHAA C.L', hint: 'student portrait', name: 'SAJITHAA C.L', score:' TOTAL 474' },
    { src: '/stu-6.png', alt: 'MANASWINI R', hint: 'student portrait', name: 'MANASWINI R', score:'TOTAL 458' },
    { src: '/stu-1.png', alt: 'AARAV K VORA', hint: 'student portrait', name: 'AARAV K VORA', score: 'Maths 95 | Total 470' },
    { src: '/stu-4.png', alt: 'Results slide 2', hint: 'students results chart', name: 'JHEGADHEESH S', score: 'Maths 97 | Total 470' },
  ],
  "12th Board": [
    {  src: '/stu-1.png', alt: 'HARETA ROSNI', hint: 'student portrait', name: 'HARETA ROSNI', score: 'Total 501 / 600' },
  ],
};

type ResultCategory = keyof typeof resultsData;

const AnimatedSection = ({ children, className, id, style }: { children: React.ReactNode; className?: string; id?: string, style?: React.CSSProperties }) => {
    const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  
    return (
      <section
        ref={setElement}
        id={id}
        className={cn('animate-on-scroll', { 'is-visible': isIntersecting }, className)}
        style={style}
      >
        {children}
      </section>
    );
  };
  
  const AnimatedElement = ({ children, className, animation }: { children: React.ReactNode; className?: string; animation: 'fade-left' | 'fade-up' | 'fade-left-up' | 'shake' }) => {
      const { setElement, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
    
      const animationClass = 
          animation === 'fade-left' ? 'animate-on-scroll-left' : 
          animation === 'fade-left-up' ? 'animate-on-scroll-left-up' : 
          animation === 'shake' ? 'animate-on-scroll-shake' : 
          'animate-on-scroll';
  
      return (
        <div
          ref={setElement}
          className={cn(animationClass, { 'is-visible': isIntersecting }, className)}
        >
          {children}
        </div>
      );
    };


export default function Home() {
  const [activeResultFilter, setActiveResultFilter] = React.useState<ResultCategory>("All");
  const [isClient, setIsClient] = React.useState(false);
  const [isTimetableOpen, setTimetableOpen] = React.useState(false);

  const [newTestimonialApi, setNewTestimonialApi] = React.useState<CarouselApi>()
  const [newTestimonialSelectedIndex, setNewTestimonialSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!newTestimonialApi) {
      return
    }

    setNewTestimonialSelectedIndex(newTestimonialApi.selectedScrollSnap())

    const onSelect = () => {
        setNewTestimonialSelectedIndex(newTestimonialApi.selectedScrollSnap())
    }
    newTestimonialApi.on("select", onSelect)

    return () => {
      newTestimonialApi.off("select", onSelect)
    }
  }, [newTestimonialApi])


  const sliderImages = [
    { src: '/slide-1.jpg', alt: 'Slider Image 1', hint: 'cityscape trichy' },
    { src: '/slide-2.jpg', alt: 'Slider Image 2', hint: 'modern building' },
    { src: '/slide-3.jpg', alt: 'Slider Image 3', hint: 'cityscape trichy' },
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
      imageUrl: "/member-1.png",
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
      imageUrl: "/member-2.png",
      imageHint: "male teacher",
      bgColor: "bg-purple-50",
    },
    {
      classRange: "Class 9 - 12",
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
      imageUrl: "/member-3.png",
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

  const tutoringCourses = [
    {
      icon: Presentation,
      title: "Ace your CBSE/ICSE results!",
      description: "Highest personal attention, One teacher One student",
      price: "888",
    },
    {
      icon: Award,
      title: "Your best bet to JEE / NEET!",
      description: "Individual Attention, Maximum Results! One teacher One student",
      price: "1,049",
    },
    {
      icon: GraduationCap,
      title: "Get tailored learning for IB & IGCSE board!",
      description: "Your path to Academic Excellence!",
      price: "1,249",
    },
    {
      icon: Laptop,
      title: "Learn Java & Python with Bharath Academy!",
      description: "From Good to Great: Improve your skills!",
      price: "999",
    },
  ];

  const newOnVedantuItems = [
    {
      src: '/carousel-slide1.png',
      alt: 'NEET Tatva Books',
      hint: 'educational books',
    },
    {
      src: '/carousel-slide2.png',
      alt: 'Revision JEE Cards',
      hint: 'revision cards',
    },
    {
      src: '/carousel-slide3.png',
      alt: 'JEE preparation course',
      hint: 'online learning',
    },
    {
      src: '/carousel-slide4.png',
      alt: 'Coding classes for kids',
      hint: 'child coding',
    }
  ];

  const classFilters = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const studyMaterials = [
    {
      title: "NCERT Books",
    },
    {
      title: "NCERT Solutions",
    },
    {
      title: "Formula Booklet",
    },
    {
      title: "Unit wise question papers",
    },
    {
      title: "Model Board question paper",
    },
  ];

  const resultsFilters: ResultCategory[] = ["All", "10th Board", "12th Board"];
  const inspiredStories = [
    {
      image: '/testi-1.png',
      imageHint: 'student portrait',
      quote: 'BCC is an excellent place for learning and overall development,it has the best faculty and infrastructure. Teachers deal with students with great patience and adhere to their slightest doubts. I had an amazing experience here and BCC helped me improve immensely.',
      name: 'Gayathri',
      details: 'B.E. Student'
    },

    {
      image: '/testi-2.png',
      imageHint: 'student graduate',
      quote: 'It is an supreme art of a teacher to awaken joy in creative exposure and knowledge. Staffs in BCC did that. The atmosphere in BCC was exemplary that made us to gain more knowledge. Thanking them for building my foundation during 10th.',
      name: 'S Akshaya',
      details: 'MBBS Student'
    },
    {
      image: '/testi-3.png',
      imageHint: 'student graduate',
      quote: 'I guess I’m in the first few students that had joined in his trichy branch. First of all, the warmth and the confidence of Bharath anna, made me comfortable as well as confident. Bharath tuition centre honestly has a caring and stimulating learning environment. I can proudly say, his efforts are what I scored. Not to mention the regular tests. The other teachers are the same as well. They teach what’s in their mind, through their heart. My chemistry teacher was one of the reasons for me, pursuing Bsc.Chemistry. You guys still have time. It’s never late. Join here and change your future.',
      name: 'Reethika',
      details: 'RJ'
    },
    {
      image: '/testi-4.png',
      imageHint: 'student graduate',
      quote: 'I had the privilege of studying at BCC for 6 yrs. It’s been a wonderful journey. To start with, I had aversion towards the subject ‘ MATHS’. But after joining BCC, the concepts was thought to us in a simple way without much complications and made very intresting to understand the subject. More practical approaches are used to make us understand the concepts. In a nutshell, well trained staffs with good value system is all about BCC. Thank you Bharat sir for what am today!!',
      name: 'Dhanya B S K Janani Priya',
      details: 'B.Com LL.b(Hons) Student'
    },
    {
      image: '/testi-7.png',
      imageHint: 'smiling student',
      quote: 'I studied 11th and 12th grade. I scored 89 in 11th and in 12 92 .I ever had best coaching centre is bcc only because the teacher are very good in teaching, good infrastructure, digital class and (Bharath Coaching Centre = worth it) I never feel even one rupees wasted in bcc I spend worth it (for who poor student in maths blindly join in bcc).',
      name: 'Mohamed Niyas',
      details: 'MBBS Student'
    },
    {
      image: '/testi-5.png',
      imageHint: 'student graduate',
      quote: 'I am very grateful to be a part of BCC. It was only possible due to the extraordinary support of experienced and well professional teachers that made me successful in academics. Your motivation gave me a much needed boost to the confidence I had in myself. I am so grateful and I can’t thank you enough!',
      name: 'S K Janani Priya',
      details: 'MBBS Student, Theni Government college'
    },
    {
      image: '/testi-6.png',
      imageHint: 'student graduate',
      quote: 'BCC is an exemplary institution with very efficient n specialized staffs. Personalized individual attention to every student. Immediate clarification of doubts n queries by the staffs. Daily ,weekly n regular test schedule n timely correction n analysis of the answers . Reliable n a lucky charm for every student who is a part of BCC. Wishing success to Barath sir ,all the staffs and to every student who enrolls in BCC. May this institute achieve great heights in the field of education',
      name: 'Manisha M S',
      details: 'MBBS Student'
    }
  ];

  const newTestimonials = [
    {
      company: 'Gayathri',
      quote: 'BCC is an excellent place for learning and overall development,it has the best faculty and infrastructure. Teachers deal with students with great patience and adhere to their slightest doubts. I had an amazing experience here and BCC helped me improve immensely.',
      author: 'B.E. Student',
      image: '/testi-3.png',
      imageHint: 'B.E. Student',
    },
    {
      company: 'S Akshaya',
      quote: 'It is an supreme art of a teacher to awaken joy in creative exposure and knowledge. Staffs in BCC did that. The atmosphere in BCC was exemplary that made us to gain more knowledge. Thanking them for building my foundation during 10th.',
      author: 'MBBS Student',
      image: '/testi-2.png',
      imageHint: 'woman smiling',
    },
    {
      company: 'Reethika',
      quote: 'I guess I’m in the first few students that had joined in his trichy branch. First of all, the warmth and the confidence of Bharath anna, made me comfortable as well as confident. Bharath tuition centre honestly has a caring and stimulating learning environment. I can proudly say, his efforts are what I scored. Not to mention the regular tests. The other teachers are the same as well. They teach what’s in their mind, through their heart. My chemistry teacher was one of the reasons for me, pursuing Bsc.Chemistry. You guys still have time. It’s never late. Join here and change your future.',
      author: 'RJ',
      image: 'testi-1.png',
      imageHint: 'man portrait',
  },
   {
        company: 'Dhanya B S K Janani Priya',
        quote: 'I had the privilege of studying at BCC for 6 yrs. It’s been a wonderful journey. To start with, I had aversion towards the subject ‘ MATHS’. But after joining BCC, the concepts was thought to us in a simple way without much complications and made very intresting to understand the subject. More practical approaches are used to make us understand the concepts. In a nutshell, well trained staffs with good value system is all about BCC. Thank you Bharat sir for what am today!!',
        author: 'B.Com LL.b(Hons) Student',
        image: '/testi-4.png',
        imageHint: 'man portrait',
    },
    {
      company: 'Mohamed Niyas',
      quote: 'I studied 11th and 12th grade. I scored 89 in 11th and in 12 92 .I ever had best coaching centre is bcc only because the teacher are very good in teaching, good infrastructure, digital class and (Bharath Coaching Centre = worth it) I never feel even one rupees wasted in bcc I spend worth it (for who poor student in maths blindly join in bcc).',
      author: 'MBBS Student',
      image: '/testi-7.png',
      imageHint: 'man portrait',
  },
  {
    company: 'S K Janani Priya',
    quote: 'I am very grateful to be a part of BCC. It was only possible due to the extraordinary support of experienced and well professional teachers that made me successful in academics. Your motivation gave me a much needed boost to the confidence I had in myself. I am so grateful and I can’t thank you enough!',
    author: 'MBBS Student, Theni Government college',
    image: '/testi-5.png',
    imageHint: 'man portrait',
},
{
  company: 'S K Janani Priya',
  quote: 'BCC is an exemplary institution with very efficient n specialized staffs. Personalized individual attention to every student. Immediate clarification of doubts n queries by the staffs. Daily ,weekly n regular test schedule n timely correction n analysis of the answers . Reliable n a lucky charm for every student who is a part of BCC. Wishing success to Barath sir ,all the staffs and to every student who enrolls in BCC. May this institute achieve great heights in the field of education',
  author: 'MBBS Student, Theni Government college',
  image: '/testi-6.png',
  imageHint: 'man portrait',
},
  ];
  
  const timetableClasses = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  return (
    <div className="flex flex-col relative">
      {/* Hero Slider Section */}
      <AnimatedSection className="w-full" id="slider-sec">
        <Carousel
          opts={{ loop: true }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {sliderImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full" id="slide-img">
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
      </AnimatedSection>
      
      {/* Features Carousel Section */}
      <AnimatedSection className="bg-blue-50 py-8">
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
      </AnimatedSection>

      {/* Explore Courses Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">Explore courses (Class 1 - 12)</h2>
          </AnimatedElement>
          <Dialog open={isTimetableOpen} onOpenChange={setTimetableOpen}>
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
                      <DialogTrigger asChild>
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">Explore Offline Time Table</Button>
                      </DialogTrigger>
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
             <DialogContent className="sm:max-w-[600px] p-8">
                <DialogHeader className="text-center">
                  <DialogTitle className="text-2xl font-bold mb-8">OFFLINE TIME TABLE</DialogTitle>
                </DialogHeader>
                <div className="space-y-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">CBSE</h3>
                        <div className="flex flex-wrap gap-4">
                            {timetableClasses.map(cls => <Button key={cls} variant="outline" className="bg-gray-100 border-gray-200">{cls}</Button>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">SAMACHEER</h3>
                        <div className="flex flex-wrap gap-4">
                            {timetableClasses.map(cls => <Button key={cls} variant="outline" className="bg-gray-100 border-gray-200">{cls}</Button>)}
                        </div>
                    </div>
                </div>
              </DialogContent>
          </Dialog>
        </div>
      </AnimatedSection>
      
      {/* Offline Time Table Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">Offline  <span className="relative inline-block text-primary">Time Table<span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span></span></h2>
          </AnimatedElement>
          <div className="space-y-8">
              <div>
                  <h3 className="font-bold text-xl mb-4">CBSE</h3>
                  <div className="flex flex-wrap gap-4">
                      {timetableClasses.map(cls => <Button key={cls} variant="outline" className="bg-gray-100 border-gray-200">{cls}</Button>)}
                  </div>
              </div>
              <div>
                  <h3 className="font-bold text-xl mb-4">SAMACHEER</h3>
                  <div className="flex flex-wrap gap-4">
                      {timetableClasses.map(cls => <Button key={cls} variant="outline" className="bg-gray-100 border-gray-200">{cls}</Button>)}
                  </div>
              </div>
          </div>
        </div>
      </AnimatedSection>

      {/* New Testimonial Section */}
      <AnimatedSection className="py-16 md:py-24 bg-testimonial">
          <div className="container mx-auto text-white">
              <Carousel 
                  setApi={setNewTestimonialApi}
                  plugins={[
                      Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                      }),
                  ]}
                  opts={{
                      align: "start",
                      containScroll: "keepSnaps",
                      loop: true,
                  }}
              >
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <p className="font-semibold text-lg mb-2">What Our Students Say</p>
                        <h2 className="text-3xl font-bold">Students Academic <span className="relative inline-block">Experience
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
              </span></h2>
                    </div>
                    <div className="flex gap-2" id="nav-gap">
                        <CarouselPrevious className="static translate-y-0 testimonial-nav" />
                        <CarouselNext className="static translate-y-0 testimonial-nav" />
                    </div>
                </div>
              
              <div className="grid md:grid-cols-5 gap-8 items-center">
                  <div className="md:col-span-2 relative h-[350px] w-full max-w-sm mx-auto">
                      <AnimatePresence>
                          <motion.div
                              key={newTestimonialSelectedIndex}
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 50 }}
                              transition={{ duration: 0.5 }}
                              className="absolute inset-0"
                          >
                              <Image
                                  src={newTestimonials[newTestimonialSelectedIndex].image}
                                  alt={newTestimonials[newTestimonialSelectedIndex].author}
                                  fill
                                  className="rounded-lg object-cover"
                                  data-ai-hint={newTestimonials[newTestimonialSelectedIndex].imageHint}
                              />
                          </motion.div>
                      </AnimatePresence>
                  </div>

                  <div className="md:col-span-3 flex items-center gap-4">
                      <div className="w-2/3 space-y-4">
                          <AnimatePresence mode="wait">
                              <motion.div
                                  key={newTestimonialSelectedIndex}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -20 }}
                                  transition={{ duration: 0.5 }}
                              >
                                  <h3 className="text-2xl font-bold" id="testi-head">{newTestimonials[newTestimonialSelectedIndex].company}</h3>
                                  <p className="text-lg text-gray-300" id="testi-text">"{newTestimonials[newTestimonialSelectedIndex].quote}"</p>
                                  <p className="font-semibold mt-4" id="testi-txt">{newTestimonials[newTestimonialSelectedIndex].author}</p>
                              </motion.div>
                          </AnimatePresence>
                      </div>

                      <div className="w-1/3">
                          <div className="flex justify-end gap-4 mb-4">
                          </div>
                          <CarouselContent className="-mt-4 h-full hidden">
                              {/* This is a dummy carousel content to make the parent carousel work. The actual vertical one is below */}
                              {newTestimonials.map((testimonial, index) => (
                                  <CarouselItem key={index}></CarouselItem>
                              ))}
                          </CarouselContent>
                          <div className="h-[350px] overflow-y-auto no-scrollbar">
                              <div className="flex flex-col items-center justify-center gap-4">
                                  {newTestimonials.map((testimonial, index) => (
                                      <div key={index}
                                         id="testi-thumb" className={cn(
                                              "h-[120px] w-full aspect-square relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
                                              newTestimonialSelectedIndex === index ? 'opacity-100 scale-105' : 'opacity-50 scale-95'
                                          )}
                                          onClick={() => newTestimonialApi?.scrollTo(index)}
                                      >
                                          <Image
                                              src={testimonial.image}
                                              alt={testimonial.author}
                                              fill
                                              className="object-cover"
                                              data-ai-hint={testimonial.imageHint}
                                          />
                                      </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
            </Carousel>
          </div>
      </AnimatedSection>

      {/* Why to choose BCC? Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
              Why to choose <span className="relative inline-block text-primary">BCC?<span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span></span>
            </h2>
          </AnimatedElement>
          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#fef9c3' }}>
                  <BookOpen className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                    Daily interaction with parents through Academic Record.
                  </p>
              </Card>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#f5d0fe' }}>
                  <Users className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                    Daily awareness about student’s performance for the academic inputs to parents through academic record.
                  </p>
              </Card>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#fed7aa' }}>
                  <Calendar className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                  Weekly tests and quick evaluation.
                  </p>
              </Card>
            </AnimatedElement>
             <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#dcfce7' }}>
                  <CheckCircle className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                  Hierarchy of test sessions.
                  </p>
              </Card>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#e0f2fe' }}>
                  <Brain className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                  Term wise parents’ meeting.
                  </p>
              </Card>
            </AnimatedElement>
            <AnimatedElement animation="fade-up">
              <Card id="card-box" className="flex flex-col p-6 text-left border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all" style={{ backgroundColor: '#fee2e2' }}>
                  <Target className="h-8 w-8 mb-4 text-black" />
                  <p className="mt-2 text-muted-foreground">
                  Specialized materials.
                  </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Study Materials Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12">
              Study <span className="relative inline-block text-primary">Materials
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
              </span>
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {studyMaterials.map((material, index) => (
              <AnimatedElement animation="fade-up" key={index}>
                <Card className="text-center p-6 border-black shadow-[7px_7px_0px_#000] hover:shadow-[10px_10px_12px_#000] hover:-translate-y-1 transition-all flex flex-col justify-center items-center h-14" style={{ backgroundColor: '#45b4e8' }}>
                  <CardTitle className="text-lg font-semibold">{material.title}</CardTitle>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Courses for Kids Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold mb-12">
              Courses for <span className="relative inline-block">kids<span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"></span></span>
            </h2>
          </AnimatedElement>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {kidsCourses.map((course, index) => (
                <Card key={index} className={`rounded-xl shadow-lg relative overflow-hidden group ${course.bgColor}`}>
                  {course.isNew && <Badge className="absolute top-3 right-3 bg-red-500 text-white">NEW</Badge>}
                  <CardContent className="p-8 flex flex-col items-start gap-4">
                    <div className={`p-3 rounded-lg ${course.iconColor} bg-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}>
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
            <div className="hidden md:flex justify-center">
              <Image 
                src="/super-kid.webp"
                alt="Courses for kids"
                width={500}
                height={550}
                className="rounded-lg"
                data-ai-hint="child learning"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* One-to-One Tutoring Section */}
      <AnimatedSection className="py-16 md:py-24 bg-[#FFF9F5]">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-12">
            <AnimatedElement animation="fade-up">
              <div>
                <h2 className="text-4xl font-bold"><span className="text-orange-500">One-to-One</span> Tutoring</h2>
                <p className="text-2xl mt-2 text-gray-700">Highest Personal <span className="underline decoration-purple-500 decoration-2 underline-offset-4">Attention</span></p>
              </div>
            </AnimatedElement>
            <div className="hidden md:block">
              <Image
                src="/discuss.png"
                alt="Tutoring discussion"
                width={300}
                height={200}
                data-ai-hint="students tutoring"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tutoringCourses.map((course, index) => (
              <Card key={index} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:-translate-y-2">
                <div className="flex-grow">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
                    <course.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                </div>
                <div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <p className="text-sm text-green-600 font-semibold mb-4">Starts At <span className="text-lg font-bold text-black">₹ {course.price}/hr</span></p>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Find personal tutor <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Book a Free Demo Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="fade-up" className="space-y-6">
              <h2 className="text-4xl font-bold">
                Book your <span className="relative inline-block text-orange-500">Free Demo
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 -z-10"></span>
                </span> session
              </h2>
              <p className="text-lg text-muted-foreground">Get a free academic counselling session</p>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg">Book a free demo</Button>
            </AnimatedElement>
            <AnimatedElement animation="fade-left">
              <Image 
                src="/demo-open-form.webp"
                alt="Students in a demo session"
                width={600}
                height={400}
                className="rounded-lg"
                data-ai-hint="students learning"
              />
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

      {/* What's New Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
              What's <Flame className="text-orange-500" /> New on 
              <span className="relative inline-block">Bharath Academy
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"></span>
              </span>
            </h2>
          </AnimatedElement>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {newOnVedantuItems.map((item, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-4">
                    <Card className="overflow-hidden rounded-2xl">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        data-ai-hint={item.hint}
                      />
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </AnimatedSection>

      {/* Explore all our offerings Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
            <h2 className="text-4xl font-bold mb-8">
              Explore all our <span className="relative inline-block text-orange-500">offerings
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 -z-10"></span>
              </span>
            </h2>
          </AnimatedElement>
          <div className="flex flex-wrap gap-4 mb-12">
            {classFilters.map((filter, index) => (
              <Button key={index} variant={index === 0 ? 'default' : 'outline'} className={index === 0 ? 'bg-gray-800 hover:bg-gray-900' : 'border-gray-300'}>{filter}</Button>
            ))}
             <div className="relative">
                <Button variant="outline" className="border-gray-300 pr-10">LKG - UKG</Button>
                <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-black">NEW</Badge>
            </div>
          </div>
          <AnimatedElement animation="fade-up">
            <h3 className="text-3xl font-bold mb-8">Study Materials</h3>
          </AnimatedElement>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[]/*studyMaterials.map((material, index) => (
              <Card key={index} className={`${material.bgColor} rounded-2xl shadow-lg p-6 flex flex-col items-start text-left`}>
                 <CardHeader className="p-0">
                    <CardTitle className="text-2xl font-bold" dangerouslySetInnerHTML={{ __html: material.title }}></CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow flex items-center justify-center w-full mt-4">
                  <div className="w-48 h-48 rounded-full flex items-center justify-center overflow-hidden">
                    <Image
                      src={material.src}
                      alt={material.alt}
                      width={200}
                      height={200}
                      className="object-contain"
                      data-ai-hint={material.hint}
                    />
                  </div>
                </CardContent>
              </Card>
            ))*/.map((o: any) => o)}
          </div>
        </div>
      </AnimatedSection>

      {/* Inspired Results Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <AnimatedElement animation="fade-left-up">
                <div>
                  <h2 className="text-4xl font-bold">Academic Excellence<span className="relative inline-block">Results<span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-300 -z-10"></span></span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">Our results reflect the passion, hardwork and efforts of our students and teachers.</p>
                  <div className="flex gap-4 mt-8">
                    <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Explore courses</Button>
                    <Button size="lg" variant="outline">View our results</Button>
                  </div>
                </div>
            </AnimatedElement>
            <div className="relative h-64 md:h-auto">
              <Image 
                src="/results-hero-image-new.png"
                alt="Inspired students"
                width={600}
                height={400}
                className="rounded-lg object-contain"
                data-ai-hint="happy students"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 my-12 justify-left" id="inspired-btn">
            {resultsFilters.map((filter) => (
              <Button 
                key={filter} 
                variant={activeResultFilter === filter ? 'default' : 'outline'} 
                className={activeResultFilter === filter ? 'bg-gray-800 hover:bg-gray-900' : 'border-gray-300'}
                onClick={() => setActiveResultFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
                <CarouselContent>
                  {resultsData[activeResultFilter].map((result, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                      <Card className="text-center overflow-hidden rounded-lg">
                        <CardContent className="p-0">
                          <Image
                            src={result.src}
                            alt={result.alt}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover aspect-[4/5]"
                            data-ai-hint={result.hint}
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-bold">{result.name}</h3>
                            <p className="text-muted-foreground mt-1">{result.score}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-1rem] top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-[-1rem] top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </div>
        </div>
      </AnimatedSection>

      {/* Achieve more Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto text-center">
          <AnimatedElement animation="fade-up">
            <h2 className="text-3xl font-bold">
              Achieve more with Bharath Academy, get <span className="text-orange-500">Free</span> online counselling now
            </h2>
          </AnimatedElement>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Book a demo</Button>
            <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600" id="learn-live">Learn LIVE</Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Stories that Inspire Section */}
      {/*
      <AnimatedSection className="py-16 md:py-24 bg-blue-50">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up" className="flex items-center gap-4 mb-12">
            <Image src="/hand-with-mic.svg" alt="Stories that inspire icon" width={60} height={60} />
            <h2 className="text-3xl font-bold">
              Stories that <span className="relative inline-block">inspire
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
              </span>
            </h2>
          </AnimatedElement>
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[
                Autoplay({
                  delay: 5000,
                }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {inspiredStories.map((story, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-2xl shadow-lg">
                    <CardContent className="p-0 flex flex-col md:flex-row items-center">
                      <div className="relative w-full md:w-[45%] h-80 md:h-[500px]" id="testimonial-image">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="object-cover" id="testi-img"
                          data-ai-hint={story.imageHint}
                        />
                      </div>
                      <div className="w-full md:w-[55%] p-8 md:p-12 text-center md:text-left" id="testimonial-text">
                        <Quote className="w-12 h-12 text-purple-400 transform rotate-180" />
                        <p className="text-xl md:text-2xl font-medium mt-4">{story.quote}</p>
                        <p className="font-bold mt-6">{story.name}</p>
                        <p className="text-sm text-muted-foreground">{story.details}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      </AnimatedSection>
      */}
      

      {/* Impact at Scale Section */}
      <AnimatedSection className="py-16 md:py-24" style={{ backgroundColor: '#fcf8f5' }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <AnimatedElement animation="fade-up">
                <Image src="/graph-chart-icon.svg" alt="Impact Icon" width={80} height={80} data-ai-hint="impact icon" />
                <h2 className="text-4xl font-bold">
                  Impact. At <span className="relative inline-block">scale
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300"></span>
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">Making education affordable and accessible across the globe</p>
              </AnimatedElement>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold"><CountUpNumber end={2.1} precision={1} />+ <span className="text-2xl">C</span></p>
                    <p className="text-muted-foreground">hours of LIVE learning</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Youtube className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold"><CountUpNumber end={10} />+ <span className="text-2xl">L</span></p>
                    <p className="text-muted-foreground">monthly youtube views</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                   <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <MessageCircleQuestion className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold"><CountUpNumber end={25} />+ <span className="text-2xl">L</span></p>
                    <p className="text-muted-foreground">doubts resolved on the app</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 text-purple-600 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold"><CountUpNumber end={57} />+</p>
                    <p className="text-muted-foreground">countries where students take LIVE classes</p>
                  </div>
                </div>
              </div>
            </div>
            <AnimatedElement animation="shake">
              <Image
                src="/stats-map.webp"
                alt="World map with student interactions"
                width={800}
                height={600}
                className="rounded-lg"
                data-ai-hint="world map education"
              />
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

       {/* Learn from anywhere Section */}
       <AnimatedSection>
        <div className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <AnimatedElement animation="fade-up">
                <h2 className="text-4xl font-bold">
                  Learn from <span className="relative inline-block">anywhere
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-300 -z-10"></span>
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We're available on Android devices and platforms. Study from anywhere at your convenience.
                </p>
              </AnimatedElement>
              <Link href="#">
                <Image src="/google-play.svg" id="google-play" alt="Get it on Google Play" width={180} height={70} data-ai-hint="Google Play store" />
              </Link>
            </div>
            <div>
              <Image src="/Download-app.webp" alt="Learn from anywhere" width={600} height={600} data-ai-hint="mobile app screenshot" />
            </div>
          </div>
        </div>
        <div className="bg-blue-500 text-white" id="happy-help">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center" id="help-you">
            <div className="space-y-6">
              <AnimatedElement animation="fade-up">
                <h2 className="text-4xl font-bold">Happy to help you!</h2>
                <p className="text-lg">
                  Need more details? Our expert academic counsellors will be happy to patiently explain everything that you want to know.
                </p>
              </AnimatedElement>
              <Button size="lg" className="bg-gray-800 hover:bg-gray-900 text-white font-bold text-lg transition-transform duration-300 hover:scale-105">Speak to an expert</Button>
            </div>
            <AnimatedElement animation="fade-left">
              <Image src="/speak-our-expert.png" alt="Speak to our expert" width={600} height={400} data-ai-hint="expert support" />
            </AnimatedElement>
          </div>
        </div>
      </AnimatedSection>

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
    </div>
  );
}

    

    























    








