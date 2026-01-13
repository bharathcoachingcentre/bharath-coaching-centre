
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BccLogo } from "./bcc-logo";

const offlineCourses = [
    { label: "Class 12 PCM", href: "/courses/cbse-class-12-pcm" },
    { label: "Class 12 Compartment", href: "/courses/12th-compartment" },
    { label: "Class 11 PCM", href: "/courses/cbse-class-11-pcm" },
    { label: "Class 10", href: "/courses/cbse-10th-grade" },
    { label: "Class 9", href: "/courses/cbse-9th-grade" },
    { label: "Class 8", href: "/courses/cbse-class-8" },
    { label: "Class 7", href: "/courses/cbse-class-7" },
    { label: "Class 6", href: "/courses/cbse-class-6" },
];
const samacheerCourses = [
    { label: "Class 12 PCM", href: "/courses/samacheer-class-12-pcm" },
    { label: "Class 12 Compartment", href: "/courses/samacheer-12th-compartment" },
    { label: "Class 11 PCM", href: "/courses/samacheer-class-11-pcm" },
    { label: "Class 10", href: "/courses/samacheer-class-10" },
    { label: "Class 9", href: "/courses/samacheer-class-9" },
    { label: "Class 8", href: "/courses/samacheer-class-8" },
    { label: "Class 7", href: "/courses/samacheer-class-7" },
    { label: "Class 6", href: "/courses/samacheer-class-6" },
];

const ncertLinks = (material: string) => [
    { label: "Class 12", href: `/courses/cbse-12th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 11", href: `/courses/cbse-11th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 10", href: `/courses/cbse-10th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 9", href: `/courses/cbse-9th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 8", href: `/courses/cbse-class-8?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 7", href: `/courses/cbse-class-7?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 6", href: `/courses/cbse-class-6?showMaterial=true&material=${encodeURIComponent(material)}` },
];


const modelAndPreviousLinks = (material: string) => [
    { label: "Class 12", href: `/courses/cbse-12th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 10", href: `/courses/cbse-10th-grade?showMaterial=true&material=${encodeURIComponent(material)}` },
];

const samacheerModelAndPreviousLinks = (material: string) => [
    { label: "Class 12", href: `/courses/samacheer-class-12-pcm?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 10", href: `/courses/samacheer-class-10?showMaterial=true&material=${encodeURIComponent(material)}` },
];

const samacheerChapterWiseLinks = (material: string) => [
    { label: "Class 12", href: `/courses/samacheer-class-12-pcm?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 11", href: `/courses/samacheer-class-11-pcm?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 10", href: `/courses/samacheer-class-10?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 9", href: `/courses/samacheer-class-9?showMaterial=true&material=${encodeURIComponent(material)}` },
];

const samacheerBookLinks = (material: string) => [
    { label: "Class 12", href: `/courses/samacheer-class-12-pcm?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 11", href: `/courses/samacheer-class-11-pcm?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 10", href: `/courses/samacheer-class-10?showMaterial=true&material=${encodeURIComponent(material)}` },
    { label: "Class 9", href: `/courses/samacheer-class-9?showMaterial=true&material=${encodeURIComponent(material)}` },
];

const cbseStudyLinks = [
    { label: "NCERT Book PDF", nestedLinks: ncertLinks("NCERT Book PDF") },
    { label: "NCERT Book Back Solution", nestedLinks: ncertLinks("NCERT Book Back Solution") },
    { label: "NCERT Chapterwise Test Question Paper", nestedLinks: ncertLinks("NCERT Chapterwise Test Question Paper") },
    { label: "Model Board Question Paper", nestedLinks: modelAndPreviousLinks("Model Board Question Paper") },
    { label: "Previous Year Board Question Paper", nestedLinks: modelAndPreviousLinks("Previous Year Board Question Paper") },
];

const samacheerStudyLinks = [
    { label: "Samacheer Book", nestedLinks: samacheerBookLinks("Samacheer Book") },
    { label: "Book Back Solutions", nestedLinks: samacheerBookLinks("Book Back Solutions") },
    { label: "Chapter-wise Test Question Papers", nestedLinks: samacheerChapterWiseLinks("Chapter-wise Test Question Papers") },
    { label: "Model Board Question Papers", nestedLinks: samacheerModelAndPreviousLinks("Model Board Question Papers") },
    { label: "Previous Year Board Question Papers", nestedLinks: samacheerModelAndPreviousLinks("Previous Year Board Question Papers") },
];

const onlineCbseCourses = [
    { label: "Class 12", href: "/courses/cbse-12th-grade" },
    { label: "Class 11", href: "/courses/cbse-11th-grade" },
    { label: "Class 10", href: "/courses/cbse-10th-grade" },
    { label: "Class 9", href: "/courses/cbse-9th-grade" },
];

const onlineSamacheerCourses = [
    { label: "Class 12", href: "/courses/samacheer-class-12-pcm" },
    { label: "Class 11", href: "/courses/samacheer-class-11-pcm" },
    { label: "Class 10", href: "/courses/samacheer-class-10" },
    { label: "Class 9", href: "/courses/samacheer-class-9" },
];

const oneToOneCourses = [
    { label: "Class 12", href: "/one-to-one-classes" },
    { label: "Class 11", href: "/one-to-one-classes" },
    { label: "Class 10", href: "/one-to-one-classes" },
    { label: "Class 9", href: "/one-to-one-classes" },
];

const navLinks = [
  { 
    label: "Offline Courses",
    isDropdown: true,
    subLinks: [
        { 
            label: "CBSE",
            nestedLinks: offlineCourses
        },
        { 
            label: "SAMACHEER",
            nestedLinks: samacheerCourses
        },
        { 
            label: "ONE to ONE",
            nestedLinks: oneToOneCourses
        },
    ]
  },
  { 
    label: "Online Courses",
    isDropdown: true,
    subLinks: [
        { 
            label: "CBSE",
            nestedLinks: onlineCbseCourses
        },
        { 
            label: "SAMACHEER",
            nestedLinks: onlineSamacheerCourses
        },
        { 
            label: "ONE to ONE",
            nestedLinks: oneToOneCourses
        },
    ]
  },
  {
    label: "Free Study Material",
    isDropdown: true,
    subLinks: [
      {
        label: "CBSE",
        nestedLinks: cbseStudyLinks,
      },
      {
        label: "SAMACHEER",
        nestedLinks: samacheerStudyLinks,
      },
    ],
  },
  { href: "/our-results", label: "Our Results" },
  { href: "/one-to-one-classes", label: "One to One Classes" },
  { 
    label: "More",
    isDropdown: true,
    subLinks: [
        { href: "/about", label: "About Us" },
        { href: "/training-methodology", label: "Our Training Methodology" },
        { href: "/student-registration", label: "To Apply" },
        { href: "/contact", label: "Contact Us" },
        { href: "/become-a-teacher", label: "Become a Teacher" },
    ]
  },
];

export function Header() {
  const pathname = usePathname();
  const isHome2 = pathname === '/home2' || pathname === '/home-new';

  const NavLink = ({ href, label, className, children }: { href: string; label:string, className?: string, children?: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        "text-lg",
        className
      )}
    >
      {label}
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className={cn(
          "bg-[hsl(199,78%,59%)]",
          isHome2 && "bg-[#2abfaf]"
        )}>
            <div className={cn("container mx-auto flex h-10 items-center justify-between px-4 sm:px-6 lg:px-8 text-sm", isHome2 && 'font-home2-header')}>
                <div className="flex items-center gap-2 text-white">
                    <Phone className="h-4 w-4" />
                    <p>Talk to our experts: <a href="tel:+917200030307" className="font-semibold hover:underline">+91 7200030307</a></p>
                </div>
                <Button asChild size="sm" className={cn(
                    "text-sm h-auto px-3 py-1 bg-white text-primary hover:bg-gray-100",
                    isHome2 && "bg-[#2abfaf] text-white border border-white hover:bg-white hover:text-[#2abfaf]"
                )}>
                    <Link href="/signin">Sign in</Link>
                </Button>
            </div>
        </div>
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        
        <nav className={cn("hidden items-center justify-center space-x-6 md:flex", isHome2 && 'font-home2-header')} id="nav-menu">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                             <Button 
                                variant='ghost' 
                                className={cn("flex items-center gap-1 font-medium text-lg text-muted-foreground hover:text-primary", isHome2 && "text-base")}
                            >
                                {link.label}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className={cn(isHome2 && 'font-home2-header')}>
                           {(link as any).href && (
                            <DropdownMenuItem asChild>
                               <Link href={(link as any).href}>{(link as any).label} Home</Link>
                            </DropdownMenuItem>
                          )}
                           {(link as any).subLinks!.map((subLink: any) => (
                                'nestedLinks' in subLink && subLink.nestedLinks ? (
                                    <DropdownMenuSub key={subLink.label}>
                                        <DropdownMenuSubTrigger>
                                            <span>{subLink.label}</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent className={cn(isHome2 && 'font-home2-header')}>
                                                {subLink.nestedLinks.map((nestedLink: any) => (
                                                   'nestedLinks' in nestedLink && nestedLink.nestedLinks ? (
                                                    <DropdownMenuSub key={nestedLink.label}>
                                                        <DropdownMenuSubTrigger>
                                                            <span>{nestedLink.label}</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent className={cn(isHome2 && 'font-home2-header')}>
                                                                {nestedLink.nestedLinks.map((deepLink: any) => (
                                                                    <DropdownMenuItem key={deepLink.label} asChild>
                                                                        <Link href={deepLink.href}>{deepLink.label}</Link>
                                                                    </DropdownMenuItem>
                                                                ))}
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                ) : (
                                                    <DropdownMenuItem key={nestedLink.label} asChild>
                                                        <Link href={nestedLink.href!}>{nestedLink.label}</Link>
                                                    </DropdownMenuItem>
                                                )
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                ) : (
                                    <DropdownMenuItem key={(subLink as any).label} asChild>
                                        <Link href={(subLink as any).href!}>{(subLink as any).label}</Link>
                                    </DropdownMenuItem>
                                )
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
              }
              return <NavLink key={link.label} href={link.href!} label={link.label} className={cn(isHome2 && "text-base")} />
            })}
        </nav>
   
        <div className="md:hidden justify-self-end">
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo className="h-8 w-auto" />
                    </Link>
                    <Accordion type="multiple" className="w-full">
                        {navLinks.map((link) => (
                            'subLinks' in link ? (
                                <AccordionItem value={link.label} key={link.label}>
                                    <AccordionTrigger className="text-base">{link.label}</AccordionTrigger>
                                    <AccordionContent>
                                        <Accordion type="multiple" className="w-full pl-4">
                                            {link.subLinks.map((subLink: any) => (
                                                'nestedLinks' in subLink ? (
                                                    <AccordionItem value={`${link.label}-${subLink.label}`} key={subLink.label}>
                                                        <AccordionTrigger className="text-sm">{subLink.label}</AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-col space-y-2 pl-4">
                                                            {subLink.nestedLinks.map((nestedLink: any) => (
                                                                'nestedLinks' in nestedLink ? (
                                                                    <AccordionItem value={`${link.label}-${subLink.label}-${nestedLink.label}`} key={nestedLink.label}>
                                                                        <AccordionTrigger className="text-xs">{nestedLink.label}</AccordionTrigger>
                                                                        <AccordionContent>
                                                                            <div className="flex flex-col space-y-2 pl-4">
                                                                            {nestedLink.nestedLinks.map((deepLink: any) => (
                                                                                <SheetClose asChild key={deepLink.label}>
                                                                                    <Link href={deepLink.href} className="text-muted-foreground hover:text-primary text-xs">{deepLink.label}</Link>
                                                                                </SheetClose>
                                                                            ))}
                                                                            </div>
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                ) : (
                                                                <SheetClose asChild key={nestedLink.label}>
                                                                    <Link href={nestedLink.href} className="text-muted-foreground hover:text-primary text-sm">{nestedLink.label}</Link>
                                                                </SheetClose>
                                                                )
                                                            ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ) : (
                                                    <SheetClose asChild key={subLink.label}>
                                                        <Link href={subLink.href} className="block py-2 text-muted-foreground hover:text-primary text-sm">{subLink.label}</Link>
                                                    </SheetClose>
                                                )
                                            ))}
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                            ) : (
                                <SheetClose asChild key={link.label}>
                                    <Link href={link.href!} className="flex w-full items-center py-4 text-lg font-medium text-muted-foreground hover:text-primary border-b">{link.label}</Link>
                                </SheetClose>
                            )
                        ))}
                    </Accordion>
                    <SheetClose asChild>
                        <Button asChild className="mt-6 w-full">
                            <Link href="/signin">Sign in</Link>
                        </Button>
                    </SheetClose>
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
