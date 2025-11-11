
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
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
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const offlineCourses = [
    { label: "Class 12 PCM", href: "/courses/cbse-class-12-pcm" },
    { label: "12 Compartment", href: "/courses/12th-compartment" },
    { label: "Class 11 PCM", href: "/courses/cbse-class-11-pcm" },
    { label: "Class 10 All subjects", href: "/courses/cbse-10th-grade" },
    { label: "Class 9 All subjects", href: "/courses/cbse-9th-grade" },
    { label: "Class 8 All subjects", href: "/courses/cbse-class-8" },
    { label: "Class 7 All subjects", href: "/courses/cbse-class-7" },
    { label: "Class 6 All subjects", href: "/courses/cbse-class-6" },
    { label: "Class 5 All subjects", href: "/courses" },
    { label: "Class 4 All subjects", href: "/courses" },
    { label: "Class 3 All subjects", href: "/courses" },
    { label: "Class 2 All subjects", href: "/courses" },
    { label: "Class 1 All subjects", href: "/courses" },
];
const samacheerCourses = [
    { label: "Class 12 PCM", href: "/courses/samacheer-class-12-pcm" },
    { label: "12 Compartment", href: "/courses/samacheer-12th-compartment" },
    { label: "Class 11 PCM", href: "/courses/samacheer-class-11-pcm" },
    { label: "Class 10 All subjects", href: "/courses/samacheer-class-10" },
    { label: "Class 9 All subjects", href: "/courses/samacheer-class-9" },
    { label: "Class 8 All subjects", href: "/courses/samacheer-class-8" },
    { label: "Class 7 All subjects", href: "/courses/samacheer-class-7" },
    { label: "Class 6 All subjects", href: "/courses/samacheer-class-6" },
    { label: "Class 5 All subjects", href: "/courses" },
    { label: "Class 4 All subjects", href: "/courses" },
    { label: "Class 3 All subjects", href: "/courses" },
    { label: "Class 2 All subjects", href: "/courses" },
    { label: "Class 1 All subjects", href: "/courses" },
];

const studyMaterialLinks = [
    { label: "NCERT Book PDF", href: "/free-study-material" },
    { label: "NCERT Book Back Solution", href: "/free-study-material" },
    { label: "NCERT CHAPTER WISED Test Question Papper", href: "/free-study-material" },
    { label: "Model Question Paper", href: "/free-study-material" },
    { label: "Previous year Board Question Paper", href: "/free-study-material" },
];

const samacheerStudyMaterialLinks = [
    { label: "SAMACHEER Book Back Solution", href: "/free-study-material" },
    { label: "SAMACHEER Chapter Wize Test Question Papper", href: "/free-study-material" },
    { label: "SAMACHEER Question Papper", href: "/free-study-material" },
    { label: "Previous year Board Question Papper", href: "/free-study-material" },
];

const navLinks = [
  { 
    href: "/", 
    label: "Offline Courses",
    isButton: true,
    subLinks: [
        { 
            label: "CBSE",
            href: "/courses",
            nestedLinks: offlineCourses
        },
        { 
            label: "Samacheer",
            href: "/courses",
            nestedLinks: samacheerCourses
        },
    ]
  },
  { 
    href: "/online-courses", 
    label: "Online Courses",
  },
  {
    href: "/free-study-material",
    label: "Free study material",
    subLinks: [
      {
        label: "CBSE",
        href: "/free-study-material",
        nestedLinks: studyMaterialLinks,
      },
      {
        label: "SAMACHEER",
        href: "/free-study-material",
        nestedLinks: samacheerStudyMaterialLinks,
      },
    ],
  },
  { href: "/our-results", label: "Our Results" },
  { href: "/one-to-one-classes", label: "One to One Clases" },
  { 
    href: "/", 
    label: "More",
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

  const NavLink = ({ href, label, className, children }: { href: string; label:string, className?: string, children?: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center font-medium transition-colors hover:text-primary text-base",
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
        <div className="bg-[hsl(199,78%,59%)]">
            <div className="container mx-auto flex h-10 items-center justify-between px-4 sm:px-6 lg:px-8 text-sm">
                <div className="flex items-center gap-2 text-white">
                    <Phone className="h-4 w-4" />
                    <p>Talk to our experts: <a href="tel:+917200030307" className="font-semibold hover:underline">+91 7200030307</a></p>
                </div>
                <Button asChild size="sm" className="text-sm h-auto px-3 py-1 bg-white text-primary hover:bg-gray-100">
                    <Link href="/signin">Sign in</Link>
                </Button>
            </div>
        </div>
      <div className="container mx-auto flex h-24 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Logo className="h-12 w-auto" />
          </Link>
        </div>
        
        <nav className="hidden items-center justify-center space-x-6 md:flex" id="nav-menu">
            {navLinks.map((link) => {
              if (link.subLinks) {
                return (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                variant={link.isButton ? 'outline' : 'ghost'} 
                                className={cn(
                                    "flex items-center gap-1 font-medium text-base text-lg",
                                    link.isButton ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20" : (pathname.startsWith(link.href) && link.href !== "/") || pathname === link.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                                )}
                            >
                                {link.label}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {link.subLinks.map((subLink: any) => (
                                subLink.nestedLinks ? (
                                    <DropdownMenuSub key={subLink.label}>
                                        <DropdownMenuSubTrigger>
                                            <span>{subLink.label}</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                {subLink.nestedLinks.map((nestedLink: any) => (
                                                    <DropdownMenuItem key={nestedLink.label} asChild>
                                                        <Link href={nestedLink.href}>{nestedLink.label}</Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                ) : (
                                    <DropdownMenuItem key={subLink.label} asChild>
                                        <Link href={subLink.href}>{subLink.label}</Link>
                                    </DropdownMenuItem>
                                )
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
              }
              return <NavLink key={link.label} href={link.href} label={link.label} />
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
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium p-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo className="h-8 w-auto" />
                    </Link>
                    {navLinks.map((link) => (
                         <SheetClose asChild key={link.label}>
                         {link.subLinks ? (
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button
                                 variant={link.isButton ? "outline" : "ghost"}
                                 className="flex justify-start items-center gap-1 font-medium text-base text-lg text-muted-foreground hover:text-primary"
                               >
                                 {link.label}
                                 <ChevronDown className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent>
                               {link.subLinks.map((subLink: any) => (
                                 <DropdownMenuItem key={subLink.label} asChild>
                                   <Link href={subLink.href}>{subLink.label}</Link>
                                 </DropdownMenuItem>
                               ))}
                             </DropdownMenuContent>
                           </DropdownMenu>
                         ) : (
                           <NavLink
                             href={link.href}
                             label={link.label}
                             className="text-muted-foreground hover:text-foreground"
                           />
                         )}
                       </SheetClose>
                    ))}
                    <SheetClose asChild>
                        <Button asChild className="mt-4">
                            <Link href="/signin">Sign in</Link>
                        </Button>
                    </SheetClose>
                </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
