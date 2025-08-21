import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export function Footer() {
  const companyLinks = [
    { href: "#", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "Child safety" },
    { href: "#", label: "Why Bharath Academy " },
    { href: "#", label: "Our results" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Help india learn" },
  ];

  const otherLinks = [
    { href: "#", label: "Free live classes" },
    { href: "#", label: "Why teach with  Bharath Academy" },
    { href: "#", label: "Try WAVE" },
    { href: "#", label: "Try Whiteboard" },
    { href: "#", label: "Bharath Academy improvement promise" },
    { href: "#", label: "VOLT" },
    { href: "#", label: "Micro courses" },
    { href: "#", label: "Maharastra Board" },
    { href: "#", label: "Benefits" },
    { href: "/blog", label: "Engineering Blog" },
  ];

  const coursesLinks = [
    { href: "/courses", label: "CBSE Tuitions" },
    { href: "/courses", label: "ICSE Tuitions" },
    { href: "/courses", label: "JEE (Main & Advanced)" },
    { href: "/courses", label: "NEET" },
    { href: "/courses", label: "Eklavya JEE" },
    { href: "/courses", label: "Eklavya NEET" },
    { href: "/courses", label: "Computer Science" },
  ];

  const superKidsLinks = [
      { href: "#", label: "English Superstar for kids" },
      { href: "#", label: "Spoken English"},
  ]

  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            <div className="md:col-span-4 space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Get link in sms to download the app</h3>
                    <div className="flex gap-2">
                        <Input type="tel" placeholder="Enter mobile number" className="bg-background"/>
                        <Button>Get the link</Button>
                    </div>
                </div>
               
            </div>

            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
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
                <div>
                <h3 className="text-lg font-semibold"> Bharath Academy Super Kids</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                    {superKidsLinks.map(link => (
                        <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                    ))}
                    </ul>
                    <div className="text-center md:text-left mt-6">
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <a className="phone-num" href="tel:+917200030307">+91 7200030307 </a>
                    </div>
                     <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a href="mailto:bcc_try@hotmail.com" className="hover:text-primary">bcc_try@hotmail.com</a>
                    </div>
                </div>
                    </div>
            </div>
        </div>
      
      </div>
      <div className="container mx-auto px-4">
        <Separator />
        <div className="py-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Bharath Academy. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
