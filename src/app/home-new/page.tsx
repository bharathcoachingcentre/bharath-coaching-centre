
'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Quote, Users, ClipboardCheck, PenTool, HelpCircle, Book, UserCheck, Phone, Building, ChevronLeft, ChevronRight, Check, Sun, Languages, Calculator, Code, Presentation, Award, GraduationCap, Laptop, Flame, X, Clock, Youtube, MessageCircleQuestion, Globe, CheckCircle, Brain, Target, Download, Star, Users2, Eye, TestTube2, FileText, CalendarClock, Plus, Pencil, Ruler, FlaskConical, Atom, Mail, TrendingUp, MonitorPlay, School, Lightbulb, Apple, PartyPopper, BookMarked, UserRound, Landmark, BrainCircuit, Search, BarChart } from "lucide-react";

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
    { src: '/person4.jpg', alt: 'AARAV K VORA', hint: 'student portrait', name: 'AARAV K VORA', score: 'Maths 95 | Total 470' },
    { src: '/person1.jpg', alt: 'Results slide 2', hint: 'students results chart', name: 'JHEGADHEESH S', score: 'Maths 97 | Total 470' },
    { src: '/person2.jpg', alt: '', hint: 'student portrait', name: 'CHARAN K', score: 'MATHS 98 | TOTAL 456' },
    { src: '/person3.jpg', alt: 'JESMITHA', hint: 'student portrait', name: 'JESMITHA G R', score: 'MATHS 95 | TOTAL 452' },
    { src: '/person6.jpg', alt: 'SAJITHAA C.L', hint: 'student portrait', name: 'SAJITHAA C.L', score:' TOTAL 474' },
    { src: '/person7.jpg', alt: 'MANASWINI R', hint: 'student portrait', name: 'MANASWINI R', score:'TOTAL 458' },
   
  ],
  "10th Board": [
    
    { src: '/person2.jpg', alt: '', hint: 'student portrait', name: 'CHARAN K', score: 'MATHS 98 | TOTAL 456' },
    { src: '/person3.jpg', alt: 'JESMITHA', hint: 'student portrait', name: 'JESMITHA G R', score: 'MATHS 95 | TOTAL 452' },
    { src: '/person6.jpg', alt: 'SAJITHAA C.L', hint: 'student portrait', name: 'SAJITHAA C.L', score:' TOTAL 474' },
    { src: '/person7.jpg', alt: 'MANASWINI R', hint: 'student portrait', name: 'MANASWINI R', score:'TOTAL 458' },
    { src: '/person4.jpg', alt: 'AARAV K VORA', hint: 'student portrait', name: 'AARAV K Vora', score: 'Maths 95 | Total 470' },
    { src: '/person1.jpg', alt: 'Results slide 2', hint: 'students results chart', name: 'JHEGADHEESH S', score: 'Maths 97 | Total 470' },
  ],
  "12th Board": [
    {  src: '/person4.jpg', alt: 'HARETA ROSNI', hint: 'student portrait', name: 'HARETA ROSNI', score: 'Total 501 / 600' },
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


export default function HomeNew() {
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
      src: '/banner-2.png',
      alt: 'Slider Image 1',
      hint: 'cityscape trichy',
      heading: 'Welcome to Bharath Academy',
      description: 'Your journey to academic excellence starts here. Explore our courses and unlock your potential.',
      buttonText: 'Explore Courses',
      buttonLink: '/courses',
    },
    {
      src: '/banner-slider-2.png',
      alt: 'Students in a classroom',
      hint: 'classroom students',
      heading: 'Expert-Led Tutoring',
      description: 'Benefit from personalized attention and expert guidance from our experienced faculties.',
      buttonText: 'Meet Our Tutors',
      buttonLink: '/about',
    },
    {
      src: '/hero-achieve-banner.jpg',
      alt: 'Students achieving goals',
      hint: 'students celebrating',
      heading: 'Achieve Your Goals',
      description: 'We are committed to helping you achieve your academic goals and succeed in your career.',
      buttonText: 'Contact Us',
      buttonLink: '/contact',
    },
  ];

  const features = [
    {
      icon: Presentation,
      text: "Daily Interactive Class",
    },
    {
      icon: ClipboardCheck,
      text: "Unit Test, Full Test, Practice Worksheet",
    },
    {
      icon: MessageCircleQuestion,
      text: "Instant Doubt Solving Session",
    },
    {
      icon: BookOpen,
      text: "Printed Study Material",
    },
    {
      icon: UserCheck,
      text: "Personalised Mentor Support",
    },
  ];

  const exploreCourses = [
    {
      classRange: "CLASS 1 - 5",
      title: "Foundation Years",
      features: [
        { text: "School Tuition", icon: School },
        { text: "1:5 Teachers & Students Ratio", icon: Users },
        { text: "Handwriting Improvement", icon: Pencil },
        { text: "Phonics-based Training", icon: Lightbulb },
        { text: "Fun and Engaging Learning Every Day", icon: PartyPopper },
      ],
      icon: Apple,
      colors: {
        bg: "from-blue-50 to-blue-100",
        iconBg: "bg-blue-100",
        iconText: "text-blue-600",
        button: "bg-[#2abfaf] hover:bg-[#1f9d8d]",
        text: "text-blue-600",
        title: "text-blue-900"
      },
      link: "#",
      circle: {
        icon: "/book.png",
        style: {
          backgroundColor: '#f0f7ff',
          border: 'dashed #aac9ff',
        }
      }
    },
    {
      classRange: "CLASS 6 - 8",
      title: "Middle School",
      features: [
        { text: "1:10 Teachers & Students Ratio", icon: Users },
        { text: "CBSE Board", icon: Landmark },
        { text: "ICSE Board", icon: Landmark },
        { text: "Samacheer Board", icon: Landmark },
        { text: "NEET / JEE Foundation", icon: BrainCircuit },
        { text: "One to One Sessions", icon: UserCheck },
        { text: "Parent–Teacher Meeting", icon: Users2 },
      ],
      icon: BookMarked,
      colors: {
        bg: "from-purple-50 to-purple-100",
        iconBg: "bg-purple-100",
        iconText: "text-purple-600",
        button: "bg-[#2abfaf] hover:bg-[#1f9d8d]",
        text: "text-purple-600",
        title: "text-purple-900"
      },
      link: "#",
      circle: {
        icon: "/reading.png",
        style: {
          backgroundColor: '#faf5ff',
          border: 'dashed #d0c1ff',
        }
      }
    },
    {
      classRange: "CLASS 9 - 12",
      title: "Senior Secondary",
      features: [
        { text: "1:25 Teacher–Student Ratio", icon: Users },
        { text: "CBSE Board", icon: Landmark },
        { text: "ICSE Board", icon: Landmark },
        { text: "Samacheer Board", icon: Landmark },
        { text: "One-to-One Sessions", icon: UserCheck },
        { text: "Test Series", icon: Search },
        { text: "Online Classes", icon: MonitorPlay },
        { text: "Parent–Teacher Meeting", icon: Users2 },
      ],
      icon: GraduationCap,
      colors: {
        bg: "from-orange-50 to-orange-100",
        iconBg: "bg-orange-100",
        iconText: "text-orange-600",
        button: "bg-[#2abfaf] hover:bg-[#1f9d8d]",
        text: "text-orange-600",
        title: "text-orange-900"
      },
      link: "#",
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
        description: "Sessions are tailored to address your specific doubts and learning gaps.",
    },
    {
        icon: CalendarClock,
        title: "Personalized Schedules",
        description: "Flexible scheduling to fit your routine and learning pace.",
    },
    {
        icon: BookOpen,
        title: "Customized Study Material",
        description: "Receive study materials designed specifically for your needs.",
    },
    {
        icon: TrendingUp,
        title: "Weekly Academic Growth Tracking",
        description: "We monitor your progress closely to ensure continuous improvement.",
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
      quote: 'I was one of the first students to join the Trichy branch, and the warmth and confidence of Bharath anna made me feel comfortable and motivated from the start. Bharath Tuition Centre offers a caring and inspiring learning environment with regular tests that truly helped me succeed. The teachers teach from the heart, and my chemistry teacher inspired me to pursue B.Sc. Chemistry—join here and change your future.',
      name: 'Reethika',
      details: 'RJ'
    },
    {
      image: '/testi-4.png',
      imageHint: 'student graduate',
      quote: 'I had the privilege of studying at BCC for six years, and it has been a truly wonderful journey. I once disliked Maths, but at BCC the concepts were taught in a simple, practical, and engaging way that completely changed my perspective. With well-trained staff and strong values, BCC has played a major role in shaping who I am today thank you, Bharath sir.',
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
      quote: 'I was one of the first students to join the Trichy branch, and the warmth and confidence of Bharath anna made me feel comfortable and motivated from the start. Bharath Tuition Centre offers a caring and inspiring learning environment with regular tests that truly helped me succeed. The teachers teach from the heart, and my chemistry teacher inspired me to pursue B.Sc. Chemistry—join here and change your future.',
      author: 'RJ',
      image: '/testi-3.png',
      imageHint: 'man portrait',
  },
   {
        company: 'Dhanya B S K Janani Priya',
        quote: 'I had the privilege of studying at BCC for six years, and it has been a truly wonderful journey. I once disliked Maths, but at BCC the concepts were taught in a simple, practical, and engaging way that completely changed my perspective. With well-trained staff and strong values, BCC has played a major role in shaping who I am today thank you, Bharath sir.',
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
  quote: "BCC is an exemplary institution with highly efficient and dedicated staff who provide personalized attention to every student. Regular tests, quick doubt clarification, and timely evaluation help students improve consistently. BCC is truly a reliable and fortunate place for learners, and I wish Bharath sir, the staff, and all students continued success and growth",
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
        <Image src="/check-list.png" alt="Academic Record" width={80} height={80} className="why-choose"/>
      ),
      title: "Daily interaction with parents through Academic Record.",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/service-03.png" alt="Daily awareness" width={80} height={80} className="why-choose"/>
      ),
      title: "Daily awareness about student’s performance for the academic inputs to parents through academic record",
      description: "Weekly tests and quick evaluation.",
      bgColor: "bg-purple-100",
    },
    {
      icon: (
        <Image src="/assessment.png" alt="Quick evaluation" width={80} height={80} className="why-choose"/>
      ),
      title: "Weekly tests and quick evaluation.",
      description: "Weekly tests and quick evaluation.",
      bgColor: "bg-red-100",
    },
    {
      icon: (
        <Image src="/training.png" alt="Test sessions" width={80} height={80} className="why-choose"/>
      ),
      title: "Hierarchy of test sessions.",
      description: "Eu semper velit tristique semper. Laoreet mi lacus nisi diam in.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/round-table.png" alt="Parents meeting" width={80} height={80} className="why-choose"/>
      ),
      title: "Term wise parents’ meeting.",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <Image src="/service-01.png" alt="Specialized materials" width={80} height={80} className="why-choose"/>
      ),
      title: "Specialized materials.",
      description: "Specialized materials.",
      bgColor: "bg-blue-100",
    },
  ];

  return (
    <div className="flex flex-col relative">
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
              <Card key={index} className="group relative bg-white rounded-2xl shadow-lg border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden" style={{backgroundColor: '#fdfbfb', height: '230px', borderColor: '#2abfaf69', borderWidth: '2px'}}>
                <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl mb-4" style={{ backgroundColor: '#2abfaf1f' }}>
                    <feature.icon className="w-8 h-8" style={{ color: '#2abfaf' }} />
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
      <AnimatedSection className="py-16 md:py-24" style={{ backgroundColor: '#2abfaf24' }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase" style={{color: '#2abfaf'}}>RESOURCES</p>
              <h2 className="text-4xl font-bold font-heading-home2 mt-2" style={{color: '#182d45'}}>Download Study Material</h2>
              <p className="mt-4 text-lg text-gray-600">
                Get access to high-quality study materials designed by expert educators to help you excel in your exams.
              </p>
               <Button asChild variant="outline" className="relative mt-8 rounded-full px-8 py-6 text-lg border-2 hover-swipe-right text-primary hover:text-white" style={{borderColor: '#2abfaf', backgroundColor: '#fff', height: '54px'}}>
                  <Link href="/free-study-material">
                      Browse All Materials <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <Link href="/study-material-cbse" target="_blank">
                <Card className="relative group text-center p-8 cursor-pointer hover:bg-teal-500/10 transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl" style={{ background: 'linear-gradient(180deg, #52DACD 0%, #289B8F 100%)' }}>
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#FFFFFFE6' }}>
                    <BookOpen className="w-10 h-10" style={{ color: '#2abfaf' }}/>
                  </div>
                  <p className="font-extrabold text-2xl mt-4 text-white font-heading-home2">CBSE</p>
                </Card>
              </Link>
              <Link href="/study-material-samacheer" target="_blank">
                <Card className="relative group text-center p-8 cursor-pointer hover:bg-teal-500/10 transition-all duration-300 shadow-sm hover:shadow-xl rounded-2xl" style={{ background: 'linear-gradient(180deg, #52DACD 0%, #289B8F 100%)' }}>
                  <div className="flex items-center justify-center h-20 w-20 rounded-2xl mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: '#FFFFFFE6' }}>
                    <GraduationCap className="w-10 h-10" style={{ color: '#2abfaf' }} />
                  </div>
                  <p className="font-extrabold text-2xl mt-4 text-white font-heading-home2">SAMACHEER</p>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Explore Courses Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto text-center">
            <AnimatedElement animation="fade-up">
              <Badge className="px-4 py-1.5 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                Our Programs
              </Badge>
              <h2 className="text-4xl font-bold mb-3 font-heading-home2" style={{color: '#2abfaf'}}>Explore Courses</h2>
              <p className="text-muted-foreground mb-8 text-lg">Comprehensive learning programs designed for students from Class 1 to 12</p>
              <div className="flex justify-center items-center gap-2 mb-12">
                <div className="w-10 h-0.5 bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-primary" style={{backgroundColor: '#2abfaf'}}></div>
                <div className="w-10 h-0.5 bg-gray-300"></div>
              </div>
            </AnimatedElement>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {exploreCourses.map((course, index) => (
                <Card key={index} className={`bg-gradient-to-br ${course.colors.bg} rounded-2xl shadow-lg flex flex-col h-full text-left p-8 transition-transform duration-300 hover:-translate-y-2`}>
                  <CardHeader className="p-0">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-lg ${course.colors.iconBg}`}>
                          <course.icon className={`w-8 h-8 ${course.colors.iconText}`} />
                        </div>
                        <div>
                          <p className={`font-semibold ${course.colors.text}`}>{course.classRange}</p>
                          <CardTitle className={`text-2xl font-bold ${course.colors.title}`}>{course.title}</CardTitle>
                        </div>
                      </div>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 flex-grow">
                      <ul className="space-y-3">
                          {course.features.map((feature, i) => (
                              <li key={i} className="flex items-center gap-3 text-gray-700">
                                  <feature.icon className={`w-5 h-5 ${course.colors.text}`} />
                                  <span>{feature.text}</span>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
                  <CardFooter className="p-0 mt-6">
                      <Button asChild className={`w-full text-white font-bold rounded-lg py-6 text-base ${course.colors.button}`}>
                          <Link href={course.link}>
                              Explore Timetable <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                      </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
        </div>
      </AnimatedSection>
      
      {/* Offline Time Table Section */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{backgroundColor: 'rgb(42 191 175 / 14%)'}}>
            <div className="bubble" style={{backgroundColor: '#2abfaf17'}}></div>
            <div className="bubble" style={{backgroundColor: '#2abfaf17'}}></div>
            <div className="bubble" style={{backgroundColor: '#2abfaf17'}}></div>
            <div className="bubble" style={{backgroundColor: '#2abfaf17'}}></div>
            <div className="bubble" style={{backgroundColor: '#2abfaf17'}}></div>
        </div>
        <div className="container mx-auto relative z-10">
          <AnimatedElement animation="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading-home2" style={{ fontSize: '36px', color: '#182d45' }}>Offline Timetable</h2>
          </AnimatedElement>
          <div
            className="rounded-xl p-8"
            style={{
                backgroundColor: '#2abfafe3'
            }}
          >
            <div className="grid md:grid-cols-10 items-center gap-8">
              <div className="md:col-span-3">
                <Image
                  src="/TimeTable-Left.png"
                  alt="Offline Timetable"
                  width={400}
                  height={400}
                  className="mx-auto animate-move-up-down"
                  data-ai-hint="illustration of people studying"
                />
              </div>
              <div className="md:col-span-7">
                <h2 className="text-3xl font-bold text-left md:text-right text-gray-800 mb-6 flex items-center justify-start md:justify-end gap-4">
                  <Image src="/CBSE.gif" alt="CBSE" width={40} height={40} />
                  CBSE
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="rounded-full p-1 mb-1" style={{ backgroundColor: '#e3f3f2' }}>
                        <item.icon className="w-4 h-4" style={{ color: '#2abfaf' }} />
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-left md:text-right text-gray-800 mb-6 mt-8 flex items-center justify-start md:justify-end gap-4">
                  <Image src="/CBSE.gif" alt="SAMACHEER" width={40} height={40} />
                  SAMACHEER
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                     <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="rounded-full p-1 mb-1" style={{ backgroundColor: '#e3f3f2' }}>
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
                            <h3 className="text-lg font-bold font-heading-home2">{course.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                    src="/one-to-one-image.png"
                    alt="One-to-one tutoring session"
                    fill
                    className="object-cover"
                    data-ai-hint="one-to-one tutoring"
                />
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* New Testimonial Section */}
      <AnimatedSection className="py-16 md:py-24 relative overflow-hidden bg-white">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[100%] w-1/2 rounded-l-full" style={{backgroundColor: '#dffef196'}}></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Carousel
                setApi={setNewTestimonialApi}
                className="w-full"
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
              >
                <CarouselContent>
                  {newTestimonials.map((testimonial, index) => (
                    <CarouselItem key={index}>
                      <Card className="rounded-3xl p-8 md:p-12 shadow-xl" style={{backgroundColor: '#2abfaf', height: '405px'}}>
                        <CardContent className="p-0">
                           <p
                            className="text-white italic text-lg md:text-xl"
                            style={{
                                marginTop: (testimonial.company === 'Gayathri' || testimonial.company === 'S Akshaya') ? '30px' : '0'
                            }}
                          >
                            “{testimonial.quote}”
                          </p>
                          <div className="flex items-center gap-4 mt-8">
                            <Avatar className="w-16 h-16 border-4 border-white">
                              <AvatarImage src={testimonial.image} alt={testimonial.author} data-ai-hint={testimonial.imageHint} />
                              <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-bold text-white text-lg">{testimonial.company}</p>
                              <p className="text-white/80 text-sm">{testimonial.author}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                 <div className="absolute right-[-2.5rem] top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                 <CarouselPrevious id="navi-arrow-prev" className="rounded-full -left-12 top-1/2 relative translate-x-0 translate-y-0 w-12 h-12 bg-white text-primary shadow-lg border-gray-200" >
                    <ChevronLeft style={{ width: '24px', height: '24px', color: '#2abfaf' }} />
                  </CarouselPrevious>
                  <CarouselNext id="navi-arrow-next" className="rounded-full -left-12 top-1/2 relative translate-x-0 translate-y-0 w-12 h-12 bg-white text-primary shadow-lg border-gray-200" >
                    <ChevronRight style={{ width: '24px', height: '24px', color: '#2abfaf' }} />
                  </CarouselNext>
                </div>
              </Carousel>
            <div className="space-y-4" style={{marginLeft: '45px'}}>
              <p className="text-sm font-bold uppercase tracking-widest" style={{ color: '#2abfaf' }}>TESTIMONIALS</p>
              <h2 className="text-4xl font-bold font-heading-home2" style={{color: '#182d45', lineHeight: '45px'}}>
                Students Academic <br/>Experience
              </h2>
              <p className="text-lg text-gray-500">
                Hear from our students about their transformative learning <br/> experiences and how we have helped them achieve their <br/> academic goals.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      {/* Why to choose BCC? Section */}
      <AnimatedSection className="py-16 md:py-24" style={{backgroundColor: '#faf8f7'}}>
          <div className="container mx-auto">
              <AnimatedElement animation="fade-up" className="text-center">
                <h2 className="text-3xl font-bold mb-4 font-heading-home2" style={{color: '#182d45', fontSize: '36px'}}>Why Choose <span className="text-primary" style={{color: '#2abfaf'}}>BCC</span></h2>
                <p className="text-lg text-muted-foreground mb-12">Our methodology is designed to ensure deep understanding and long-term success.</p>
              </AnimatedElement>
              <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center">
                  {whyChooseUsPoints.slice(0, 3).map((point, index) => (
                      <div key={index} className="relative pt-16">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2">
                              <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{backgroundColor: '#2abfaf'}}>
                                {point.icon}
                              </div>
                          </div>
                          <Card className="text-center rounded-2xl shadow-lg pt-20 pb-8 px-6" style={{backgroundColor:"#ecfef7",width:"350px",height:"270px"}}>
                              <h3 className="text-xl font-bold font-heading-home2 mb-2" style={{lineHeight: '36px', marginTop: '16px'}}>
                                  {index === 1 ? "Daily awareness about student’s performance for the academic inputs to parents through academic record" : point.title}
                              </h3>
                          </Card>
                      </div>
                  ))}
              </div>
              <div className="flex flex-col md:grid md:grid-cols-3 gap-8 items-center" style={{marginTop: '100px'}}>
                  {whyChooseUsPoints.slice(3).map((point, index) => (
                      <div key={index + 3} className="relative pt-16">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2">
                              <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{backgroundColor: '#2abfaf'}}>
                                {point.icon}
                              </div>
                          </div>
                          <Card className="text-center rounded-2xl shadow-lg pt-20 pb-8 px-6" style={{backgroundColor:"#ecfef7",width:"350px",height:"270px"}}>
                              <h3 className="text-xl font-bold font-heading-home2 mb-2" style={{lineHeight: '36px', marginTop: '16px'}}>
                                {point.title}
                              </h3>
                          </Card>
                      </div>
                  ))}
              </div>
          </div>
      </AnimatedSection>
      
      {/* Academic Excellence Results Section */}
      <AnimatedSection className="py-16 md:py-24 bg-white">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold font-heading-home2 mb-4" style={{color: '#182d45'}}>Academic Excellence Results</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-12">Our results reflect the passion, hardwork and efforts of our students and teachers.</p>
            
            <div className="flex flex-wrap gap-4 mb-12 justify-center">
                {resultsFilters.map((filter) => (
                    <Button
                        key={filter}
                        variant={activeResultFilter === filter ? 'default' : 'outline'}
                        onClick={() => setActiveResultFilter(filter)}
                        className={cn(
                            "rounded-full px-6 py-2 text-base",
                            activeResultFilter !== filter && "results-button-hover"
                        )}
                        style={activeResultFilter === filter ? { backgroundColor: 'rgb(42, 191, 175)', color: 'white', borderColor: 'rgb(42, 191, 175)' } : { borderColor: '#2abfaf', color: '#2abfaf' }}
                    >
                        {filter}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {resultsData[activeResultFilter].map((result, index) => (
                <Card key={index} className="text-center overflow-hidden rounded-xl shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <CardContent className="p-0">
                    <Image
                      src={result.src}
                      alt={result.alt}
                      width={250}
                      height={300}
                      className="w-full h-auto object-cover"
                      data-ai-hint={result.hint}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold font-heading-home2 uppercase">{result.name}</h3>
                      <Badge variant="secondary" className="mt-2 text-sm">{result.score}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
          <Button asChild size="icon" className="rounded-full bg-orange-400 hover:bg-orange-500 w-12 h-12">
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

    

    














