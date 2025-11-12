
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
    { label: "Class 10", href: "/courses/cbse-10th-grade" },
    { label: "Class 9", href: "/courses/cbse-9th-grade" },
    { label: "Class 8", href: "/courses/cbse-class-8" },
    { label: "Class 7", href: "/courses/cbse-class-7" },
    { label: "Class 6", href: "/courses/cbse-class-6" },
];
const samacheerCourses = [
    { label: "Class 12 PCM", href: "/courses/samacheer-class-12-pcm" },
    { label: "12 Compartment", href: "/courses/samacheer-12th-compartment" },
    { label: "Class 11 PCM", href: "/courses/samacheer-class-11-pcm" },
    { label: "Class 10", href: "/courses/samacheer-class-10" },
    { label: "Class 9", href: "/courses/samacheer-class-9" },
    { label: "Class 8", href: "/courses/samacheer-class-8" },
    { label: "Class 7", href: "/courses/samacheer-class-7" },
    { label: "Class 6", href: "/courses/samacheer-class-6" },
];

const ncertLinks = [
    { label: "Class 12", href: "/free-study-material" },
    { label: "Class 11", href: "/free-study-material" },
    { label: "Class 10", href: "/free-study-material" },
    { label: "Class 9", href: "/free-study-material" },
    { label: "Class 8", href: "/free-study-material" },
    { label: "Class 7", href: "/free-study-material" },
    { label: "Class 6", href: "/free-study-material" },
];

const modelAndPreviousLinks = [
    { label: "Class 12", href: "/free-study-material" },
    { label: "Class 10", href: "/free-study-material" },
];

const cbseStudyLinks = [
    { label: "NCERT Book PDF", nestedLinks: ncertLinks },
    { label: "NCERT Book Back Solution", nestedLinks: ncertLinks },
    { label: "NCERT Chapter wise Test Question Paper", nestedLinks: ncertLinks },
    { label: "Model Question Paper", nestedLinks: modelAndPreviousLinks },
    { label: "Previous year Board Question Paper", nestedLinks: modelAndPreviousLinks },
];

const samacheerStudyLinks = [
    { label: "Book Back Solution", nestedLinks: ncertLinks },
    { label: "Chapterwise Test Question Paper", nestedLinks: ncertLinks },
    { label: "Model Question Paper", nestedLinks: modelAndPreviousLinks },
    { label: "Previous year Board Question Paper", nestedLinks: modelAndPreviousLinks },
];

const onlineCbseCourses = [
    { label: "12th Grade", href: "/courses/cbse-12th-grade" },
    { label: "11th Grade", href: "/courses/cbse-11th-grade" },
    { label: "10th Grade", href: "/courses/cbse-10th-grade" },
    { label: "9th Grade", href: "/courses/cbse-9th-grade" },
];

const onlineSamacheerCourses = [
    { label: "12th Grade", href: "/courses/samacheer-class-12-pcm" },
    { label: "11th Grade", href: "/courses/samacheer-class-11-pcm" },
    { label: "10th Grade", href: "/courses/samacheer-class-10" },
    { label: "9th Grade", href: "/courses/samacheer-class-9" },
];

const oneToOneCourses = [
    { label: "12th Grade", href: "/courses/1-to-1-12th-grade" },
    { label: "11th Grade", href: "/courses/1-to-1-11th-grade" },
    { label: "10th Grade", href: "/courses/1-to-1-10th-grade" },
    { label: "9th Grade", href: "/courses/1-to-1-9th-grade" },
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
            label: "1 to 1",
            nestedLinks: oneToOneCourses
        },
    ]
  },
  { 
    label: "Online Courses",
    isDropdown: true,
    subLinks: [
        { 
            label: "CBSE BATCH",
            nestedLinks: onlineCbseCourses
        },
        { 
            label: "SAMACHEER BATCH",
            nestedLinks: onlineSamacheerCourses
        },
        { 
            label: "1 to 1",
            nestedLinks: oneToOneCourses
        },
    ]
  },
  {
    label: "Free study material",
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
  { href: "/one-to-one-classes", label: "One to One Clases" },
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
              const isButton = (link as any).isButton;
              if (link.isDropdown || isButton) {
                return (
                    <DropdownMenu key={link.label}>
                        <DropdownMenuTrigger asChild>
                             <Button 
                                variant='ghost' 
                                className="flex items-center gap-1 font-medium text-lg text-muted-foreground hover:text-primary"
                            >
                                {link.label}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
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
                                            <DropdownMenuSubContent>
                                                {subLink.nestedLinks.map((nestedLink: any) => (
                                                   'nestedLinks' in nestedLink && nestedLink.nestedLinks ? (
                                                    <DropdownMenuSub key={nestedLink.label}>
                                                        <DropdownMenuSubTrigger>
                                                            <span>{nestedLink.label}</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
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
              return <NavLink key={link.label} href={link.href!} label={link.label} />
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
                <SheetHeader>
                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
                <nav className="grid gap-6 text-lg font-medium p-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo className="h-8 w-auto" />
                    </Link>
                    {navLinks.map((link) => (
                         <SheetClose asChild key={link.label}>
                         {'subLinks' in link && link.subLinks ? (
                           <DropdownMenu>
                             <DropdownMenuTrigger asChild>
                               <Button
                                 variant="ghost"
                                 className="flex justify-between items-center gap-1 font-medium text-base text-lg text-muted-foreground hover:text-primary w-full"
                               >
                                 {link.label}
                                 <ChevronDown className="h-4 w-4" />
                               </Button>
                             </DropdownMenuTrigger>
                             <DropdownMenuContent>
                                {(link as any).subLinks.map((subLink: any) => (
                                    'nestedLinks' in subLink && subLink.nestedLinks ? (
                                        <DropdownMenuSub key={subLink.label}>
                                            <DropdownMenuSubTrigger>
                                                <span>{subLink.label}</span>
                                            </DropdownMenuSubTrigger>
                                            <DropdownMenuPortal>
                                                <DropdownMenuSubContent>
                                                    {subLink.nestedLinks.map((nestedLink: any) => (
                                                        'nestedLinks' in nestedLink && nestedLink.nestedLinks ? (
                                                            <DropdownMenuSub key={nestedLink.label}>
                                                                <DropdownMenuSubTrigger>
                                                                    <span>{nestedLink.label}</span>
                                                                </DropdownMenuSubTrigger>
                                                                <DropdownMenuPortal>
                                                                    <DropdownMenuSubContent>
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
                         ) : (
                           <NavLink
                             href={link.href!}
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
