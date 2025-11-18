

'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Quote, Users, ClipboardCheck, PenTool, HelpCircle, Book, UserCheck, Phone, Building, ChevronLeft, ChevronRight, Check, Sun, Languages, Calculator, Code, Presentation, Award, GraduationCap, Laptop, Flame, X, Clock, Youtube, MessageCircleQuestion, Globe, CheckCircle, Brain, Target, Download, Star, Users2, Eye, TestTube2, FileText, CalendarClock, Plus, Pencil, Ruler, FlaskConical, Atom } from "lucide-react";

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


export default function Home() {
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
      text: "Unit Test, Full Test, Practice Work Sheet",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: HelpCircle,
      text: "Instant Doubt Solving Session",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Book,
      text: "Printed Study Material",
      color: "bg-pink-100 text-pink-600",
    },
    {
      icon: UserCheck,
      text: "Personalised Mentor Support",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  const exploreCourses = [
    {
      classRange: "Class 1 - 5",
      title: "Courses for Kids",
      features: [
        "School Tuition",
        "1:5 Teachers & Students Ratio",
        "Handwriting Improvement",
        "Phonics-based Training",
        "Fun and Engaging Learning Every Day",
      ],
      imageUrl: "/kids-one.png",
      imageHint: "female teacher",
      bgColor: "bg-blue-50",
    },
    {
      classRange: "Class 6 - 8",
      title: "Courses for Kids",
      features: [
        "1:10 Teachers & Students Ratio",
        "CBSE Board",
        "ICSE Board",
        "Samacheer Board",
        "NEET / JEE Foundation",
        "One to One Sessions",
        "Parent–Teacher Meeting",
      ],
      imageUrl: "/Super-kid-2.png",
      imageHint: "male teacher",
      bgColor: "bg-purple-50",
    },
    {
      classRange: "Class 9 - 12",
      title: "Courses for Kids",
      features: [
        "1:25 Teacher–Student Ratio",
        "CBSE Board",
        "ICSE Board",
        "Samacheer Board",
        "One-to-One Sessions",
        "Test Series",
        "Online Classes",
        "Parent–Teacher Meeting",
      ],
      imageUrl: "/super-kid-three.jpg",
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
      title: "Individual Concern",
      description: "",
      price: "",
    },
    {
      icon: Award,
      title: "Personalized Schedule",
      description: "",
      price: "",
    },
    {
      icon: GraduationCap,
      title: "Personalized Study Material",
      description: "",
      price: "",
    },
    {
      icon: Laptop,
      title: "Weekly Academic Growth Tracking",
      description: "",
      price: "",
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
      image: '/testi-1.png',
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
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-armchair text-primary"><path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3"/><path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M5 18v2"/><path d="M19 18v2"/></svg>
      ),
      title: "Less Time in the Chair",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-pulse text-purple-600"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/></svg>
      ),
      title: "More Efficient",
      description: "Eu semper velit tristique semper. Laoreet mi lacus nisi diam in.",
      bgColor: "bg-purple-100",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-plus text-red-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="M12 8v8"/><path d="M16 12H8"/></svg>
      ),
      title: "Longer Lasting",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-red-100",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bug"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 9.3 3 11 3 13v3c0 .54.07 1.05.18 1.55"/><path d="M20.82 14.55c.11-.5.18-1.01.18-1.55v-3c0-2-1.6-3.7-3.47-4"/><path d="M4 16.5h16"/><path d="m15 11-.5-1-.5 1"/><path d="m9 11-.5-1-.5 1"/></svg>
      ),
      title: "Fast Pest Removal",
      description: "Eu semper velit tristique semper. Laoreet mi lacus nisi diam in.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-timer"><path d="M10 2h4"/><path d="M12 14v-4"/><path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6"/><path d="M9 17H4v-5"/></svg>
      ),
      title: "One-Time Extermination",
      description: "Justo non dolor lectus ac egestas dictum. Leo tempus nec amet fringilla.",
      bgColor: "bg-blue-100",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><path d="M12 15h.01"/><path d="m8.6 11.5 1.5 1.5a1 1 0 0 0 1.4 0l4-4"/><path d="M12.01 15.01 12 15"/><path d="M12 3a4 4 0 0 0-4 4v2c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V7a4 4 0 0 0-4-4"/><path d="M16 11.1V13a8 8 0 1 1-8 0v-1.9"/><path d="m15.7 6.3 1 1"/><path d="m7.3 6.3-1 1"/></svg>
      ),
      title: "Licensed & Protected",
      description: "Eu semper velit tristique semper. Laoreet mi lacus nisi diam in.",
      bgColor: "bg-blue-100",
    },
  ];

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
                  <div className={cn(
                    "group flex flex-col items-center justify-center p-6 rounded-xl h-40 transition-transform duration-300 hover:scale-105",
                    feature.color
                  )}>
                    <feature.icon className="w-8 h-8 mb-2 transition-transform duration-300 group-hover:-translate-y-1" />
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
            <h2 className="text-3xl font-bold text-center mb-12">Explore Courses (Class 1 - 12)</h2>
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
                        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold">Explore Offline Timetable</Button>
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
                            {timetableClasses.map(cls => <Button key={cls.name} variant="outline" className="bg-gray-100 border-gray-200">{cls.name}</Button>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">SAMACHEER</h3>
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
            <h2 className="text-3xl font-bold">Offline Timetable</h2>
          </AnimatedElement>
          <div
            className="rounded-xl p-8 bg-blue-100/50"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23bfdbfe' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
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
                <h2 className="text-3xl font-bold text-right text-gray-800 mb-6 flex items-center justify-end gap-4">
                  <Image src="/CBSE.gif" alt="CBSE" width={40} height={40} />
                  CBSE
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                    <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="bg-blue-100 rounded-full p-1 mb-1">
                        <item.icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="font-semibold text-gray-700 text-sm">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
                <h2 className="text-3xl font-bold text-right text-gray-800 mb-6 mt-8 flex items-center justify-end gap-4">
                  <Image src="/CBSE.gif" alt="SAMACHEER" width={40} height={40} />
                  SAMACHEER
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                  {timetableClasses.map((item) => (
                     <div
                      key={item.name}
                      className="bg-white rounded-lg p-4 text-center shadow-md flex flex-col items-center justify-center h-24 transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-translate-y-2"
                    >
                      <div className="bg-blue-100 rounded-full p-1 mb-1">
                        <item.icon className="w-4 h-4 text-primary" />
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
      <AnimatedSection className="py-16 md:py-24 bg-[#FFF9F5]">
        <div className="container mx-auto">
          <div className="flex justify-between items-start mb-12">
            <AnimatedElement animation="fade-up">
              <div>
                <h2 className="text-4xl font-bold"><span className="text-orange-500">One-to-One</span> Sessions</h2>
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
                  {course.description && <p className="text-sm text-gray-600 mb-4">{course.description}</p>}
                </div>
                <div>
                  <div className="border-t border-gray-200 my-4"></div>
                  {course.price && <p className="text-sm text-green-600 font-semibold mb-4">Starts At <span className="text-lg font-bold text-black">₹ {course.price}/hr</span></p>}
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Find a Personal Tutor <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </Card>
            ))}
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
            <div className="flex justify-between items-center mb-12">
              <div>
                <p className="font-semibold text-lg mb-2">What Our Students Say</p>
                <h2 className="text-3xl font-bold">
                  Students Academic{" "}
                  <span className="relative inline-block">
                    Experience
                    <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"></span>
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
                      <div className="grid grid-cols-3 gap-8 items-center">
                        <div className="col-span-1">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={300}
                            height={400}
                            className="rounded-lg object-cover w-full h-auto aspect-[3/4]"
                            data-ai-hint={testimonial.imageHint}
                          />
                        </div>
                        <div className="col-span-2 space-y-4">
                          <h3 className="text-2xl font-bold" id="testi-head">
                            {testimonial.company}
                          </h3>
                          <p className="text-lg text-gray-300" id="testi-text">
                            "{testimonial.quote}"
                          </p>
                          <p className="font-semibold mt-4" id="testi-txt">
                            {testimonial.author}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </div>

              <div className="md:col-span-1">
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
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <AnimatedElement animation="fade-up">
          <h2 className="text-3xl font-bold text-center mb-12">
              Why to Choose <span className="relative inline-block text-primary">BCC?<span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 -z-10"></span></span>
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
      
      <AnimatedSection className="py-16 md:py-24 bg-blue-50">
          <div className="container mx-auto">
              <AnimatedElement animation="fade-up">
                  <h2 className="text-3xl font-bold text-center mb-12">
                      Why Choose Us?
                      <span className="block w-24 h-1 bg-yellow-400 mx-auto mt-2"></span>
                  </h2>
              </AnimatedElement>
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="md:col-span-1 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {whyChooseUsPoints.map((point, index) => (
                              <Card key={index} className="flex flex-col items-center text-center gap-4 p-6 bg-white rounded-lg shadow-md">
                                  <div className={`flex-shrink-0 ${point.bgColor} p-3 rounded-full`}>
                                      {point.icon}
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-bold">{point.title}</h3>
                                  </div>
                              </Card>
                          ))}
                      </div>
                  </div>
                  <div className="relative p-4 md:col-span-1">
                      <div className="absolute -top-4 -left-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] rounded-lg bg-gradient-to-tr from-blue-300/50 to-transparent -z-10"></div>
                      <div className="absolute -bottom-4 -right-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] rounded-lg bg-gradient-to-tr from-transparent to-blue-300/50 -z-10"></div>
                      <Image 
                          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxlZHVjYXRpb24lMjB8ZW58MHx8fHwxNzYzNDYzNjI4fDA&ixlib=rb-4.1.0&q=80&w=1080" 
                          alt="Education"
                          width={600}
                          height={700}
                          className="rounded-lg shadow-2xl object-cover relative z-10"
                          data-ai-hint="education learning"
                      />
                  </div>
              </div>
          </div>
      </AnimatedSection>
      
      {/* Study Material Section */}
      <AnimatedSection className="py-16 md:py-24">
        <div className="container mx-auto">
          <div className="bg-[#45b4e8] rounded-lg shadow-lg overflow-hidden" style={{backgroundImage: "url('/study-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay'}}>
            <div className="grid md:grid-cols-5 items-center">
              <div className="p-8 md:p-12 text-white md:col-span-3">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Study Material</h2>
                 <div className="flex flex-wrap gap-4">
                    {studyMaterials.map((material) => (
                      <Dialog key={material} open={dsmIsDialogOpen && dsmSelectedMaterial === material} onOpenChange={(isOpen) => {
                        if (!isOpen) {
                          setDsmSelectedMaterial(null);
                          setDsmIsDialogOpen(false);
                          setDsmShowBoardSelection(false);
                          setDsmSelectedBoard(null);
                          setDsmSelectedClass(null);
                          setDsmSelectedClassPdf(null);
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="bg-white text-primary hover:bg-gray-100 shadow-[4px_4px_0px_#000] border-black"
                            onClick={() => {
                              setDsmSelectedMaterial(material);
                              setDsmIsDialogOpen(true);
                              setDsmShowBoardSelection(true);
                            }}
                          >
                            {material}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                              <DialogTitle className="text-center text-2xl font-bold">
                                Select Board
                              </DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center gap-4 py-4">
                              <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
                                setDsmSelectedBoard('CBSE'); 
                                setDsmIsDialogOpen(false);
                              }}>CBSE</Button>
                              <Button className="bg-orange-500 hover:bg-orange-600 text-white" onClick={() => {
                                setDsmSelectedBoard('Samacheer');
                                setDsmIsDialogOpen(false);
                              }}>Samacheer</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                </div>
                {dsmSelectedBoard && dsmSelectedMaterial && (
                    <div className="relative mt-8 py-6 px-4 bg-white/90 rounded-lg shadow-inner">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 text-gray-700" onClick={() => setDsmSelectedBoard(null)}>
                            <X className="h-5 w-5" />
                        </Button>
                        <h3 className="text-xl font-bold text-center mb-4 text-gray-800">{dsmSelectedMaterial} - {dsmSelectedBoard}</h3>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {(boardMaterials[dsmSelectedBoard as keyof typeof boardMaterials] as any)[dsmSelectedMaterial!]?.map((item: any, idx: number) => (
                                <Button
                                    key={idx}
                                    variant={dsmSelectedClass === item.class ? "secondary" : "outline"}
                                    className="bg-gray-200 text-gray-800"
                                    onClick={() => {
                                        setDsmSelectedClass(item.class);
                                        setDsmSelectedClassPdf(item.pdf);
                                    }}
                                >
                                    {item.class}
                                </Button>
                            ))}
                            <Button asChild disabled={!dsmSelectedClassPdf}>
                                <a href={dsmSelectedClassPdf || undefined} download className="bg-green-500 hover:bg-green-600 text-white">
                                    <Download className="mr-2 h-4 w-4" /> Download
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
              </div>
              <div className="h-64 md:h-full md:col-span-2 relative">
                <Image
                  src="/Study-material.png"
                  alt="Study Material"
                  width={600}
                  height={600}
                  className="object-cover w-full h-full"
                  data-ai-hint="modern building"
                />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
      {/* Inspired Results Section */}
      <AnimatedSection className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <AnimatedElement animation="fade-left-up">
                <div>
                  <h2 className="text-4xl font-bold">Academic Excellence <span className="relative inline-block"> Results<span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-300 -z-10"></span></span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">Our results reflect the passion, hardwork and efforts of our students and teachers.</p>
                </div>
            </AnimatedElement>
            <div className="relative h-64 md:h-auto">
              <Image 
                src="/Excellent-result.png"
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
                    onClick={() => setActiveResultFilter(filter)}
                    className="rounded-full px-6"
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
                            className="w-full h-auto aspect-[4/5]"
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

    

    


