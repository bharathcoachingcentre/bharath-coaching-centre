
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Twitter, Send, Gitlab, Rss, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";
import { BccFooterLogo } from "./bcc-footer-logo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import React from "react";


export function Footer() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const isHome2 = pathname === '/' || pathname === '/home2' || pathname === '/home-new' || pathname === '/cbse' || pathname === '/samacheer' || pathname === '/cbse-class-12-pcm' || pathname === '/courses/12th-compartment' || pathname === '/courses/cbse-class-11-pcm' || pathname === '/courses/cbse-10th-grade';
  const currentYear = new Date().getFullYear();
  
  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/blog", label: "Blog" },
    { href: "/our-results", label: "Our results" },
  ];

  const otherLinks = [
    { href: "#", label: "Free Live Classes" },
    { href: "/free-study-material", label: "Study Material" },
    { href: "/training-methodology", label: "Our Training Methodology" },
    { href: "/student-registration", label: "To Apply" },
    { href: "/become-a-teacher", label: "Become a Teacher" },
  ];

  const coursesLinks = [
    { href: "/cbse", label: "CBSE" },
    { href: "/samacheer", label: "SAMACHEER" },
    { href: "/one-to-one-classes", label: "ONE to ONE" },
  ];

  if (!isMounted) {
    return (
        <footer className={cn("border-t text-foreground", "footer-gradient")}>
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-6 md:mb-0">
                        <BccFooterLogo />
                    </div>
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-lg font-semibold text-center md:text-left">Get link in sms to download the app</p>
                        <div className="flex w-full md:w-auto items-center gap-2">
                            <Input type="tel" placeholder="Enter mobile number" />
                            <Button>Get the link</Button>
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
                    <div>
                        <h3 className="text-lg font-semibold">Company</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {companyLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Other Links</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {otherLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Courses</h3>
                        <ul className="mt-4 space-y-2 text-sm">
                            {coursesLinks.map(link => (
                                <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-6 col-span-2 md:col-span-1">
                        <h3 className="text-lg font-semibold">Contact us</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex items-start gap-3">
                                <Mail className="h-6 w-6 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <a href="mailto:bcc_try@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">bcc_try@hotmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="h-6 w-6 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <a href="tel:+917200030307" className="text-muted-foreground hover:text-primary transition-colors">+91 7200030307</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="h-6 w-6 mt-1 text-muted-foreground"/>
                                <div>
                                    <p className="font-semibold">Address</p>
                                    <p className="text-muted-foreground">C-109, 5th Cross, Thillainagar (East),<br />Trichy - 18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4">
                <Separator />
                <div className="py-8 text-center">
                    <p className="text-base text-black">© {currentYear} Bharath Academy. All rights reserved</p>
                </div>
            </div>
        </footer>
    );
  }

  return (
    <footer className={cn(
        !isHome2 && "border-t",
        "text-foreground",
        isHome2 ? 'home2-footer' : 'footer-gradient'
      )}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
                <BccFooterLogo />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold text-center md:text-left">Get link in sms to download the app</p>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <Input type="tel" placeholder="Enter mobile number" className={cn(isHome2 && "bg-white text-black")} />
                    <Button className={cn(isHome2 && "home2-footer-button")}>Get the link</Button>
                </div>
            </div>
        </div>
        
        <Separator className={cn(isHome2 && "bg-white/20")} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {companyLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className={cn("transition-colors", isHome2 ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")}>{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Other Links</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {otherLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className={cn("transition-colors", isHome2 ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")}>{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Courses</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {coursesLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className={cn("transition-colors", isHome2 ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")}>{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div className="space-y-6 col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold">Contact us</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                        <Mail className={cn("h-6 w-6 mt-1", isHome2 ? "text-white" : "text-muted-foreground")}/>
                        <div>
                            <p className="font-semibold">Email</p>
                            <a href="mailto:bcc_try@hotmail.com" className={cn("transition-colors", isHome2 ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")}>bcc_try@hotmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className={cn("h-6 w-6 mt-1", isHome2 ? "text-white" : "text-muted-foreground")}/>
                        <div>
                            <p className="font-semibold">Phone</p>
                            <a href="tel:+917200030307" className={cn("transition-colors", isHome2 ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-primary")}>+91 7200030307</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className={cn("h-6 w-6 mt-1", isHome2 ? "text-white" : "text-muted-foreground")}/>
                        <div>
                            <p className="font-semibold">Address</p>
                            <p className={cn(isHome2 ? "text-white/80" : "text-muted-foreground")}>C-109, 5th Cross, Thillainagar (East),<br />Trichy - 18</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
      </div>
      <div className="container mx-auto px-4">
        <Separator className={cn(isHome2 && "bg-white/20")} />
        <div className="py-8 text-center">
            <p className={cn("text-base", isHome2 ? "text-white" : "text-black")}>© {currentYear} Bharath Academy. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
