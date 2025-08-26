import Link from "next/link";
import { Twitter, Send, Gitlab, Rss, Phone, Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import { FooterLogo } from "./footer-logo";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Send, label: "Telegram" },
    { href: "#", icon: Gitlab, label: "Gitlab" },
    { href: "#", icon: Rss, label: "RSS" },
];

export function Footer() {
  const companyLinks = [
    { href: "/about", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "Child safety" },
    { href: "#", label: "Why Bharath Academy" },
    { href: "#", label: "Our results" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Help india learn" },
  ];

  const otherLinks = [
    { href: "#", label: "Free live classes" },
    { href: "#", label: "Why teach with Bharath Academy" },
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
      { href: "#", label: "Spoken English" },
  ];

  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
                <FooterLogo />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold">Get link in sms to download the app</p>
                <div className="flex items-center gap-2">
                    <Input type="tel" placeholder="Enter mobile number" className="w-64" />
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
            <div>
                <h3 className="text-lg font-semibold">Bharath Academy Super Kids</h3>
                <ul className="mt-4 space-y-2 text-sm">
                    {superKidsLinks.map(link => (
                        <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                    ))}
                </ul>
                <div className="mt-4 space-y-2 text-sm">
                    <a href="tel:+917200030307" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Phone className="h-4 w-4" />
                        <span>+91 7200030307</span>
                    </a>
                    <a href="mailto:bcc_try@hotmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                        <Mail className="h-4 w-4" />
                        <span>bcc_try@hotmail.com</span>
                    </a>
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
