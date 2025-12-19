
'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Quote, Users, ClipboardCheck, PenTool, HelpCircle, Book, UserCheck, Phone, Building, ChevronLeft, ChevronRight, Check, Sun, Languages, Calculator, Code, Presentation, Award, GraduationCap, Laptop, Flame, X, Clock, Youtube, MessageCircleQuestion, Globe, CheckCircle, Brain, Target, Download, Star, Users2, Eye, TestTube2, FileText, CalendarClock, Plus, Pencil, Ruler, FlaskConical, Atom, Mail, TrendingUp } from "lucide-react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import placeholderImages from '@/app/lib/placeholder-images.json';


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
    { src: '/stu-1.png', alt: 'AARAV K VORA', hint: 'student portrait', name: 'AARAV K Vora', score: 'Maths 95 | Total 470' },
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


export default function Home2() {
  const [activeResultFilter, setActiveResultFilter] = React.useState<ResultCategory>("All");
  const [isClient, setIsClient] = React.useState(false);
  const [isTimetableOpen, setTimetableOpen] = React.useState(false);
  
  // State for the "Download Study Material" section
  const [dsmIsDialogOpen, setDsmIsDialogOpen] = React.useState(false);
  const [dsmSelectedMaterial, setDsmSelectedMaterial] = React.useState<string | null>(null);
  const [dsmShowBoardSelection, setDsmShowBoardSelection] = React.useState(false);
  const [dsmSelectedBoard, setDsmSelectedBoard] = React.useState<string | null>(null);
  const [dsmSelectedClass, setDsmSelectedClass] = React.useState<string | null>(null);
  const [dsmSelectedClassPdf, setDsmSelectedClassPdf] = React.useState<string | null>(null);

  const [newTestimonialApi, setNewTestimonialApi] = React.useState<CarouselApi>()
  const [newTestimonialSelectedIndex, setNewTestimonialSelectedIndex] = React.useState(0)

  const [timetableBoard, setTimetableBoard] = React.useState<string | null>(null);
  const [selectedTimetableClass, setSelectedTimetableClass] = React.useState<any | null>(null);
  const [showTimetableDownload, setShowTimetableDownload] = React.useState(false);
  
  const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (!newTestimonialApi) {
      return
    }
 
    const onSelect = () => {
      setNewTestimonialSelectedIndex(newTestimonialApi.selectedScrollSnap())
    }
    
    newTestimonialApi.on("select", onSelect);
    newTestimonialApi.on("reInit", onSelect);

    return () => {
        newTestimonialApi.off("select", onSelect);
        newTestimonialApi.off("reInit", onSelect);
    }
  }, [newTestimonialApi]);

  const createBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        particle.style.left = `${'${x}'}px`;
        particle.style.top = `${'${y}'}px`;
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 50 + 50;
        
        particle.style.setProperty('--x', `${'${Math.cos(angle * Math.PI / 180) * distance}'}px`);
        particle.style.setProperty('--y', `${'${Math.sin(angle * Math.PI / 180) * distance}'}px`);
        
        particle.style.backgroundColor = `hsl(${'${Math.random() * 360}'}, 100%, 50%)`;
        
        button.parentElement?.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 700);
    }
  };

  const createHoverBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        
        particle.style.left = `${'${x}'}px`;
        particle.style.top = `${'${y}'}px`;
        
        const angle = Math.random() * 360;
        const distance = Math.random() * 50 + 50;
        
        particle.style.setProperty('--x', `${'${Math.cos(angle * Math.PI / 180) * distance}'}px`);
        particle.style.setProperty('--y', `${'${Math.sin(angle * Math.PI / 180) * distance}'}px`);
        
        particle.style.backgroundColor = `hsl(${'${Math.random() * 360}'}, 100%, 50%)`;
        
        button.parentElement?.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 700);
    }
  };

  const sliderItems = [
    {
      src: '/slide-1.jpg',
      alt: 'Slider Image 1',
      hint: 'cityscape trichy',
      heading: 'Welcome to Bharath Academy',
      description: 'Your journey to academic excellence starts here. Explore our courses and unlock your potential.',
      buttonText: 'Explore Courses',
      buttonLink: '/courses',
    },
    {
      src: '/slide-2.jpg',
      alt: 'Slider Image 2',
      hint: 'modern building',
      heading: 'Expert-Led Tutoring',
      description: 'Benefit from personalized attention and expert guidance from our experienced faculties.',
      buttonText: 'Meet Our Tutors',
      buttonLink: '/about',
    },
    {
      src: '/slide-3.jpg',
      alt: 'Slider Image 3',
      hint: 'cityscape trichy',
      heading: 'Achieve Your Goals',
      description: 'We are committed to helping you achieve your academic goals and succeed in your career.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
    },
  ];

  const features = [
    {
      icon: <Presentation className="w-8 h-8" style={{ color: '#2abfaf' }} />,
      text: "Daily Interactive Class",
    },
    {
      icon: <ClipboardCheck className="w-8 h-8" style={{ color: '#2abfaf' }} />,
      text: "Unit Test, Full Test, Practice Worksheet",
    },
    {
      icon: <MessageCircleQuestion className="w-8 h-8" style={{ color: '#2abfaf' }} />,
      text: "Instant Doubt Solving Session",
    },
    {
      icon: <BookOpen className="w-8 h-8" style={{ color: '#2abfaf' }} />,
      text: "Printed Study Material",
    },
    {
      icon: <UserCheck className="w-8 h-8" style={{ color: '#2abfaf' }} />,
      text: "Personalised Mentor Support",
    },
  ];

  const exploreCourses = [
    {
      classRange: "Class 1 - 5",
      title: "Courses for Kids",
      features: [
        { text: "School Tuition", icon: BookOpen },
        { text: "1:5 Teachers & Students Ratio", icon: Users },
        { text: "Handwriting Improvement", icon: Pencil },
        { text: "Phonics-based Training", icon: Languages },
        { text: "Fun and Engaging Learning Every Day", icon: Sun },
      ],
      imageUrl: "/kids-one.png",
      imageHint: "female teacher",
      bgColor: "bg-blue-50",
      circle: {
        icon: "/book.png",
        style: {
          backgroundColor: '#f0f7ff',
          border: 'dashed #aac9ff',
        }
      }
    },
    {
      classRange: "Class 6 - 8",
      title: "Courses for Kids",
      features: [
        { text: "1:10 Teachers & Students Ratio", icon: Users },
        { text: "CBSE Board", icon: Award },
        { text: "ICSE Board", icon: Award },
        { text: "Samacheer Board", icon: Award },
        { text: "NEET / JEE Foundation", icon: FlaskConical },
        { text: "One to One Sessions", icon: UserCheck },
        { text: "Parent–Teacher Meeting", icon: Users2 },
      ],
      imageUrl: "/Super-kid-2.png",
      imageHint: "male teacher",
      bgColor: "bg-purple-50",
      circle: {
        icon: "/reading.png",
        style: {
          backgroundColor: '#faf5ff',
          border: 'dashed #d0c1ff',
        }
      }
    },
    {
      classRange: "Class 9 - 12",
      title: "Courses for Kids",
      features: [
        { text: "1:25 Teacher–Student Ratio", icon: Users },
        { text: "CBSE Board", icon: Award },
        { text: "ICSE Board", icon: Award },
        { text: "Samacheer Board", icon: Award },
        { text: "One-to-One Sessions", icon: UserCheck },
        { text: "Test Series", icon: FileText },
        { text: "Online Classes", icon: Laptop },
        { text: "Parent–Teacher Meeting", icon: Users2 },
      ],
      imageUrl: "/super-kid-three.jpg",
      imageHint: "happy student",
      bgColor: "bg-yellow-50",
      circle: {
        icon: "/class9-12.png",
        style: {
          backgroundColor: '#fefcec',
          border: 'dashed #ffe6ab',
        }
      }
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
        icon: Target,
        title: "Individual Concern",
    },
    {
        icon: CalendarClock,
        title: "Personalized Schedules",
    },
    {
        icon: BookOpen,
        title: "Customized Study Material",
    },
    {
        icon: TrendingUp,
        title: "Weekly Academic Growth Tracking",
    }
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

  const timetableClasses = [
    { name: "Class 6", icon: Book },
    { name: "Class 7", icon: Pencil },
    { name: "Class 8", icon: Ruler },
    { name: "Class 9", icon: Calculator },
    { name: "Class 10", icon: FlaskConical },
    { name: "Class 11", icon: Atom },
    { name: "Class 12", icon: GraduationCap },
  ];


  const boardMaterials = {
    CBSE: {
      "NCERT Books": [
        { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_ncert.pdf" },
        { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_ncert.pdf" },
        { class: "Class 10", pdf: "/pdfs/cbse_10_ncert.pdf" },
        { class: "Class 9", pdf: "/pdfs/cbse_9_ncert.pdf" },
      ],
      "NCERT Solutions": [
        { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_solutions.pdf" },
        { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_solutions.pdf" },
        { class: "Class 10", pdf: "/pdfs/cbse_10_solutions.pdf" },
        { class: "Class 9", pdf: "/pdfs/cbse_9_solutions.pdf" },
      ],
      "Formula Booklet": [
        { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_formula.pdf" },
        { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_formula.pdf" },
        { class: "Class 10", pdf: "/pdfs/cbse_10_formula.pdf" },
        { class: "Class 9", pdf: "/pdfs/cbse_9_formula.pdf" },
      ],
      "Unit wise Question Papers": [
        { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_unit_questions.pdf" },
        { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_unit_questions.pdf" },
        { class: "Class 10", pdf: "/pdfs/cbse_10_unit_questions.pdf" },
        { class: "Class 9", pdf: "/pdfs/cbse_9_unit_questions.pdf" },
      ],
      "Model Board Question Paper": [
        { class: "Class 12 PCM", pdf: "/pdfs/cbse_12_pcm_model_paper.pdf" },
        { class: "Class 11 PCM", pdf: "/pdfs/cbse_11_pcm_model_paper.pdf" },
        { class: "Class 10", pdf: "/pdfs/cbse_10_model_paper.pdf" },
        { class: "Class 9", pdf: "/pdfs/cbse_9_model_paper.pdf" },
      ],
    },
    Samacheer: {
        "NCERT Books": [
            { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_ncert.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_ncert.pdf" },
            { class: "Class 10", pdf: "/pdfs/samacheer_10_ncert.pdf" },
            { class: "Class 9", pdf: "/pdfs/samacheer_9_ncert.pdf" },
        ],
        "NCERT Solutions": [
            { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_solutions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_solutions.pdf" },
            { class: "Class 10", pdf: "/pdfs/samacheer_10_solutions.pdf" },
            { class: "Class 9", pdf: "/pdfs/samacheer_9_solutions.pdf" },
        ],
        "Formula Booklet": [
            { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_formula.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_formula.pdf" },
            { class: "Class 10", pdf: "/pdfs/samacheer_10_formula.pdf" },
            { class: "Class 9", pdf: "/pdfs/samacheer_9_formula.pdf" },
        ],
        "Unit wise Question Papers": [
            { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_unit_questions.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_unit_questions.pdf" },
            { class: "Class 10", pdf: "/pdfs/samacheer_10_unit_questions.pdf" },
            { class: "Class 9", pdf: "/pdfs/samacheer_9_unit_questions.pdf" },
        ],
        "Model Board Question Paper": [
            { class: "Class 12 PCM", pdf: "/pdfs/samacheer_12_pcm_model_paper.pdf" },
            { class: "Class 11 PCM", pdf: "/pdfs/samacheer_11_pcm_model_paper.pdf" },
            { class: "Class 10", pdf: "/pdfs/samacheer_10_model_paper.pdf" },
            { class: "Class 9", pdf: "/pdfs/samacheer_9_model_paper.pdf" },
        ],
    },
  };
  
  const studyMaterials = [
    "NCERT Books",
    "NCERT Solutions",
    "Formula Booklet",
    "Unit wise Question Papers",
    "Model Board Question Paper",
  ];

  const timetablePdfs = {
    CBSE: [
        { class: "Class 12", pdf: "/pdfs/timetable_cbse_12.pdf" },
        { class: "Class 11", pdf: "/pdfs/timetable_cbse_11.pdf" },
        { class: "Class 10", pdf: "/pdfs/timetable_cbse_10.pdf" },
        { class: "Class 9", pdf: "/pdfs/timetable_cbse_9.pdf" },
    ],
    Samacheer: [
        { class: "Class 12", pdf: "/pdfs/timetable_samacheer_12.pdf" },
        { class: "Class 11", pdf: "/pdfs/timetable_samacheer_11.pdf" },
        { class: "Class 10", pdf: "/pdfs/timetable_samacheer_10.pdf" },
        { class: "Class 9", pdf: "/pdfs/timetable_samacheer_9.pdf" },
    ]
  };

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
      quote: 'I am very grateful to be a part of BCC. It was only possible due to the extraordinary support of experienced and well professional teachers that me successful in academics. Your motivation gave me a much needed boost to the confidence I had in myself. I am so grateful and I can’t thank you enough!',
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
      image: '/testi-1.png',
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
      image: '/testi-3.png',
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
    quote: 'I am very grateful to be a part of BCC. It was only possible due to the extraordinary support of experienced and well professional teachers that me successful in academics. Your motivation gave me a much needed boost to the confidence I had in myself. I am so grateful and I can’t thank you enough!',
    author: 'MBBS Student, Theni Government college',
    image: '/testi-5.png',
    imageHint: 'man portrait',
},
{
  company: 'Manisha M S',
  quote: 'BCC is an exemplary institution with very efficient n specialized staffs. Personalized individual attention to every student. Immediate clarification of doubts n queries by the staffs. Daily ,weekly n regular test schedule n timely correction n analysis of the answers . Reliable n a lucky charm for every student who is a part of BCC. Wishing success to Barath sir ,all the staffs and to every student who enrolls in BCC. May this institute achieve great heights in the field of education',
  author: 'MBBS Student',
  image: '/testi-6.png',
  imageHint: 'man portrait',
},
  ];
  
  const samacheerTimetableClasses = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  const benefits = [
    "18+ years experienced faculties specialized in each subjects.",
    "Weekly tests",
    "25% & 50% portion tests.",
    "Full mock tests.",
    "Quick evaluation",
    "Term based parents' meeting",
    "Specialized study materials.",
    "Previous year ques. paper discussion",
  ];

  const howItWorksSteps = [
    {
      number: "1",
      description: "Daily interaction with parents through Academic Record.",
    },
    {
      number: "2",
      description: "Daily awareness about student’s performance for the academic inputs to parents through academic record.",
    },
    {
        number: "3",
        description: "Weekly tests and quick evaluation.",
    },
    {
      number: "4",
      description: "Hierarchy of test sessions.",
    },
    {
      number: "5",
      description: "Term wise parents’ meeting.",
    },
    {
      number: "6",
      description: "Specialized materials.",
    }
  ];

  const onlineCourseFeatures = [
    { icon: CalendarClock, title: "Customized Time Table", description: "Flexible learning schedule tailored to your needs." },
    { icon: Users2, title: "18+ year experienced faculties", description: "Learn from seasoned experts in the field." },
    { icon: Eye, title: "Individual attention", description: "Personalized guidance to help you succeed." },
    { icon: ClipboardCheck, title: "Weekly test", description: "Regular assessments to track your progress." },
    { icon: TestTube2, title: "25% & 50% portion test", description: "Targeted tests to ensure thorough understanding." },
    { icon: FileText, title: "Full mock test", description: "Comprehensive mock exams to prepare you for the real thing." },
  ];

  const whyChooseUsPoints = [
    {
      icon: (
        <Image src="/Student-report.png" alt="Academic Record" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Daily interaction with parents through Academic Record.",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/Intraction-with-parents.png" alt="Daily awareness" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Daily awareness about student’s performance for the academic inputs to parents through academic record",
      description: "Weekly tests and quick evaluation.",
      bgColor: "bg-purple-100",
    },
    {
      icon: (
        <Image src="/Quick-evaluation.png" alt="Quick evaluation" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Weekly tests and quick evaluation.",
      description: "Weekly tests and quick evaluation.",
      bgColor: "bg-red-100",
    },
    {
      icon: (
        <Image src="/Test-Sessions.png" alt="Test sessions" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Hierarchy of test sessions.",
      description: "Eu semper velit tristique semper. Laoreet mi lacus nisi diam in.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/meeting.png" alt="Parents meeting" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Term wise parents’ meeting.",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/Special-material.png" alt="Specialized materials" width={130} height={130} className="why-choose animate-move-up-right"/>
      ),
      title: "Specialized materials.",
      description: "Specialized materials.",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col relative font-body-home2">
      {/* Hero Slider Section */}
      <AnimatedSection className="w-full" id="slider-sec">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="w-full"
        >
          <CarouselContent>
            {sliderItems.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full" id="slide-img">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    data-ai-hint={item.hint}
                  />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white p-4" style={{backgroundColor: 'rgb(0 0 0 / 61%)'}}>
                    <h1 className="text-4xl md:text-6xl font-bold font-heading-home2 mb-4">
                        {item.heading.split(' ').slice(0, -1).join(' ')} <span style={{color: '#2abfaf'}}>{item.heading.split(' ').pop()}</span>
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mb-8">{item.description}</p>
                    <Button asChild size="lg" style={{backgroundColor: '#2abfaf'}}>
                      <Link href={item.buttonLink}>{item.buttonText}</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>
      </AnimatedSection>
      
      {/* Features Section */}
      <AnimatedSection className="py-16 md:py-24" style={{ backgroundColor: '#faf8f7' }}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group relative bg-white rounded-2xl shadow-lg border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden" style={{backgroundColor: '#fdfbfb', height: '230px'}}>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl mb-4" style={{ backgroundColor: '#2abfaf1f' }}>
                    {feature.icon}
                  </div>
                  <p className="font-semibold text-base text-gray-700 font-body-home2">{feature.text}</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#2abfaf] transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-bottom-left"></div>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Study Material Section */}
      <AnimatedSection className="py-16 md:py-24" style={{ backgroundColor: '#fff' }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase" style={{color: '#2abfaf'}}>RESOURCES</p>
              <h2 className="text-4xl font-bold font-heading-home2 mt-2" style={{color: '#182d45'}}>Download Study Material</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get access to high-quality study materials designed by expert educators to help you excel in your exams.
              </p>
              <Button asChild variant="outline" className="mt-8 rounded-full px-8 py-6 text-lg border-2" style={{borderColor: '#d1f3ef', backgroundColor: '#dffffc', color: '#2abfaf'}}>
                <Link href="/free-study-material">
                  Browse All Materials <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <Link href="/study-material-cbse" target="_blank">
                <Card className="relative group text-center p-8 cursor-pointer hover:bg-blue-50/50 transition-all duration-300 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl">
                  <div className="absolute top-0 left-0 -mt-2 -ml-2 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl" style={{borderColor: '#2abfaf'}}>
                    <div className="absolute top-2 right-2 flex gap-0.5">
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 -mb-2 -mr-2 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl" style={{borderColor: '#2abfaf'}}>
                    <div className="absolute bottom-2 left-2 flex gap-0.5">
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-blue-100/70 mx-auto mb-4">
                    <BookOpen className="w-10 h-10 text-blue-600" />
                  </div>
                  <p className="font-extrabold text-2xl mt-4 text-black font-heading-home2">CBSE</p>
                </Card>
              </Link>
              <Link href="/study-material-samacheer" target="_blank">
                <Card className="relative group text-center p-8 cursor-pointer hover:bg-purple-50/50 transition-all duration-300 border-gray-200 shadow-sm hover:shadow-xl rounded-2xl">
                    <div className="absolute top-0 left-0 -mt-2 -ml-2 w-16 h-16 border-t-4 border-l-4 rounded-tl-2xl" style={{borderColor: '#2abfaf'}}>
                      <div className="absolute top-2 right-2 flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 -mb-2 -mr-2 w-16 h-16 border-b-4 border-r-4 rounded-br-2xl" style={{borderColor: '#2abfaf'}}>
                      <div className="absolute bottom-2 left-2 flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                        <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                      </div>
                    </div>
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-purple-100/70 mx-auto mb-4">
                    <GraduationCap className="w-10 h-10 text-purple-600" />
                  </div>
                  <p className="font-extrabold text-2xl mt-4 text-black font-heading-home2">SAMACHEER</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Explore Courses Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
            <AnimatedElement animation="fade-up">
                <h2 className="text-3xl font-bold text-center mb-12 font-heading-home2" style={{ marginBottom: '20px' }}>Explore Courses (Class 1 - 12)</h2>
            </AnimatedElement>
            <Dialog open={isTimetableOpen} onOpenChange={setTimetableOpen}>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {exploreCourses.map((course, index) => (
                  <div key={index} className="group [perspective:1000px] mt-10 md:mt-12">
                     <div className="relative w-28 h-28 mx-auto -mb-14 z-10">
                        <div className="relative w-full h-full [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-transform duration-1000">
                            {/* Front Face */}
                            <div 
                                className="absolute w-full h-full rounded-full flex items-center justify-center font-semibold text-primary [backface-visibility:hidden]"
                                style={course.circle.style}
                            >
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <Image src={course.circle.icon} alt="Icon" width={40} height={40} />
                                    <span style={{ color: '#2abfaf' }}>{course.classRange}</span>
                                </div>
                            </div>
                            {/* Back Face */}
                            <div 
                                className="absolute w-full h-full rounded-full flex items-center justify-center font-semibold text-primary [backface-visibility:hidden] [transform:rotateY(180deg)]"
                                style={course.circle.style}
                            >
                                <div className="flex flex-col items-center justify-center w-full h-full">
                                    <Image src={course.circle.icon} alt="Icon" width={40} height={40} />
                                    <span style={{ color: '#2abfaf' }}>{course.classRange}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Card className={`relative overflow-hidden rounded-2xl shadow-lg ${course.bgColor} flex flex-col h-full transition-all duration-300 hover:shadow-2xl hover:scale-105 pt-14`}>
                        <div className="flex flex-row flex-grow">
                          <div className="flex flex-col w-2/3 p-6">
                              <CardTitle className="text-2xl font-bold mt-2 font-heading-home2" style={{ marginTop: '25px' }}>{course.title}</CardTitle>
                              <CardContent className="p-0 mt-4">
                                  <ul className="space-y-3">
                                      {course.features.map((feature, i) => (
                                          <li key={i} className="flex items-center gap-3">
                                              <div className="flex items-center justify-center h-6 w-6 rounded-full" style={{ backgroundColor: '#2abfaf1f' }}>
                                                  <feature.icon className="w-4 h-4" style={{ color: '#2abfaf' }}/>
                                              </div>
                                              <span>{feature.text}</span>
                                          </li>
                                      ))}
                                  </ul>
                              </CardContent>
                          </div>
                          <div className="w-1/3 relative overflow-hidden">
                              <Image
                                  src={course.imageUrl}
                                  alt={course.title}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                                  data-ai-hint={course.imageHint}
                              />
                          </div>
                        </div>
                        <CardFooter className="p-6 mt-auto relative">
                            <DialogTrigger asChild>
                                <Button 
                                    className="w-full text-white font-bold"
                                    onClick={createBurst}
                                    onMouseEnter={createHoverBurst}
                                    style={{ backgroundColor: '#2abfaf' }}
                                >
                                    Explore Offline Timetable
                                </Button>
                            </DialogTrigger>
                        </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
                <DialogContent className="sm:max-w-[600px] p-8">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl font-bold mb-8 font-heading-home2">OFFLINE TIME TABLE</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4 font-heading-home2">CBSE</h3>
                            <div className="flex flex-wrap gap-4">
                                {timetableClasses.map(cls => <Button key={cls.name} variant="outline" className="bg-gray-100 border-gray-200">{cls.name}</Button>)}
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4 font-heading-home2">SAMACHEER</h3>
                            <div className="flex flex-wrap gap-4">
                                {timetableClasses.map(cls => <Button key={cls.name} variant="outline" className="bg-gray-100 border-gray-200">{cls.name}</Button>)}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
      </AnimatedSection>
      
      {/* Offline Time Table Section */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedElement animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading-home2">Offline Timetable</h2>
          </AnimatedElement>
          <div
            className="rounded-xl p-8"
            style={{
              backgroundColor: '#2abfaf1f',
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232abfaf33' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            <div className="grid md:grid-cols-10 items-center gap-8">
              <div className="md:col-span-3">
                <Image
                  src="/Timetable.png"
                  alt="Offline Timetable"
                  width={400}
                  height={400}
                  className="mx-auto animate-move-up-down"
                  data-ai-hint="illustration of people studying"
                />
              </div>
              <div className="md:col-span-7">
                <h2 className="text-3xl font-bold text-left md:text-right text-gray-800 mb-6 flex items-center justify-start md:justify-end gap-4 font-heading-home2">
                  <Image src="/CBSE.gif" alt="CBSE" width={40} height={40} />
                  CBSE
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="rounded-full p-1 mb-1" style={{ backgroundColor: '#2abfaf1f' }}>
                        <item.icon className="w-4 h-4" style={{ color: '#2abfaf' }}/>
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-left md:text-right text-gray-800 mb-6 mt-8 flex items-center justify-start md:justify-end gap-4 font-heading-home2">
                  <Image src="/CBSE.gif" alt="SAMACHEER" width={40} height={40} />
                  SAMACHEER
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                     <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="rounded-full p-1 mb-1" style={{ backgroundColor: '#2abfaf1f' }}>
                        <item.icon className="w-4 h-4" style={{ color: '#2abfaf' }} />
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* One-to-One Tutoring Section */}
      <AnimatedSection className="py-16 md:py-24" style={{backgroundColor: '#faf8f7'}}>
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
                <p className="text-sm font-semibold tracking-widest uppercase" style={{color: '#2abfaf'}}>Personalized Learning</p>
                <h2 className="text-4xl font-bold font-heading-home2 mt-2" style={{color: '#182d45'}}>One-to-One Sessions</h2>
                <p className="mt-4 text-lg text-gray-600">
                    For students who need focused attention, our one-to-one sessions provide the perfect environment to thrive. Get undivided attention from our best mentors.
                </p>
                <div className="grid sm:grid-cols-2 gap-8 mt-8">
                    {tutoringCourses.map((course, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-full" style={{ backgroundColor: '#2abfaf1f' }}>
                                <course.icon className="w-7 h-7" style={{ color: '#2abfaf' }} />
                            </div>
                            <div className="flex items-center">
                                <h3 className="text-lg font-bold font-heading-home2">{course.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src={placeholderImages['one-to-one-tutoring-session'].src}
                    alt={placeholderImages['one-to-one-tutoring-session'].alt}
                    width={placeholderImages['one-to-one-tutoring-session'].width}
                    height={placeholderImages['one-to-one-tutoring-session'].height}
                    className="object-cover w-full h-full"
                    data-ai-hint={placeholderImages['one-to-one-tutoring-session'].hint}
                />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* New Testimonial Section */}
      <AnimatedSection className="py-16 md:py-24 bg-testimonial">
        <div className="container mx-auto text-white">
          <Carousel
            setApi={setNewTestimonialApi}
            plugins={[autoplay.current]}
            opts={{
              align: "start",
              containScroll: "keepSnaps",
              loop: true,
            }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-8 md:mb-0">
                <p className="font-semibold text-lg mb-2">What Our Students Say</p>
                <h2 className="text-3xl font-bold font-heading-home2" style={{color: '#182d45'}}>
                  Students Academic{" "}
                  <span className="relative inline-block font-heading-home2" style={{color: '#2abfaf'}}>
                    Experience
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 -z-10"></span>
                  </span>
                </h2>
              </div>
              <div className="flex gap-2" id="nav-gap">
                <CarouselPrevious onClick={() => newTestimonialApi?.scrollPrev()} className="static translate-y-0 testimonial-nav" />
                <CarouselNext onClick={() => newTestimonialApi?.scrollNext()} className="static translate-y-0 testimonial-nav" />
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8 items-center">
              <div className="md:col-span-4">
                <CarouselContent>
                  {newTestimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        <div className="col-span-1 mx-auto md:mx-0">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={250}
                            height={300}
                            className="rounded-lg object-cover w-[250px] h-[300px] md:w-[250px] md:h-[300px]"
                            data-ai-hint={testimonial.imageHint}
                          />
                        </div>
                        <div className="col-span-2 space-y-4 text-center md:text-left">
                          <h3 className="text-2xl font-bold font-heading-home2" id="testi-head" style={{color: '#2abfaf'}}>
                            {testimonial.company}
                          </h3>
                          <p className="text-lg text-gray-300" id="testi-text">
                            "{testimonial.quote}"
                          </p>
                          <p className="font-semibold mt-4 font-heading-home2" id="testi-txt">
                            {testimonial.author}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <div className="md:col-span-1 hidden md:block">
                <div className="h-[350px] overflow-y-auto no-scrollbar">
                  <div className="flex flex-col items-center justify-center gap-4">
                    {newTestimonials.map((testimonial, index) => (
                      <div
                        key={index}
                        id="testi-thumb"
                        className={cn(
                          "h-[120px] w-full aspect-square relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
                          newTestimonialSelectedIndex === index
                            ? "opacity-100 scale-105"
                            : "opacity-50 scale-95"
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
          </Carousel>
        </div>
      </AnimatedSection>
      
      {/* Why to choose BCC? Section */}
      <AnimatedSection className="py-16 md:py-24 bg-white" style={{backgroundImage: "url('/newsbanner11.webp')", backgroundSize: "cover", backgroundPosition: "center"}}>
          <div className="container mx-auto">
              <AnimatedElement animation="fade-up" className="text-center">
                <h2 className="text-3xl font-bold mb-12 font-heading-home2" style={{color: '#182d45'}}>Why Choose <span className="font-heading-home2" style={{color: '#2abfaf'}}>BCC</span></h2>
              </AnimatedElement>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
                  {whyChooseUsPoints.map((point, index) => (
                      <div key={index} className="flex flex-col items-center text-center gap-4">
                          <div className="relative w-32 h-32 flex items-center justify-center">
                            {point.icon}
                          </div>
                          <div>
                              <h3 className="text-xl font-bold font-heading-home2">{point.title}</h3>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </AnimatedSection>
      
      {/* Inspired Results Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <AnimatedElement animation="fade-left-up">
                <div>
                  <h2 className="text-4xl font-bold font-heading-home2" style={{color: '#182d45'}}>Academic Excellence <span className="relative inline-block font-heading-home2" style={{color: '#2abfaf'}}> Results<span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-300 -z-10"></span></span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">Our results reflect the passion, hardwork and efforts of our students and teachers.</p>
                </div>
            </AnimatedElement>
            <div className="relative h-64 md:h-auto">
              <Image 
                src="/Excellent-result.png"
                alt="Inspired students"
                width={600}
                height={400}
                className="rounded-lg object-contain w-full h-full"
                data-ai-hint="happy students"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4 my-12 justify-center md:justify-start" id="inspired-btn">
            {resultsFilters.map((filter) => (
                <Button
                    key={filter}
                    variant={activeResultFilter === filter ? 'default' : 'outline'}
                    onClick={() => setActiveResultFilter(filter)}
                    className="rounded-full px-6"
                    style={activeResultFilter === filter ? { backgroundColor: '#2abfaf' } : {}}
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
                            height={500}
                            className="w-full h-auto aspect-[4/5] object-cover"
                            data-ai-hint={result.hint}
                          />
                          <div className="p-4">
                            <h3 className="text-xl font-bold font-heading-home2">{result.name}</h3>
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
      
      {/* Floating Action Buttons */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          <Button asChild size="icon" className="rounded-full bg-purple-200 hover:bg-purple-300 w-12 h-12">
            <a href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" target="_blank" rel="noopener noreferrer">
                <Building className="w-6 h-6 text-purple-700" />
            </a>
          </Button>
          <Button asChild size="icon" className="rounded-full w-12 h-12" style={{ backgroundColor: '#2abfaf' }}>
            <a href="tel:+917200030307">
              <Phone className="w-6 h-6 text-white" />
            </a>
          </Button>
          <Button asChild size="icon" className="rounded-full bg-blue-500 hover:bg-blue-600 w-12 h-12">
            <a href="mailto:bcc_try@hotmail.com">
              <Mail className="w-6 h-6 text-white" />
            </a>
          </Button>
      </div>
    </div>
  );
}



