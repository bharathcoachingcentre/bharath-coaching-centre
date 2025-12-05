
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
    { href: "/become-a-teacher", label: "Become a teacher" },
  ];

  const coursesLinks = [
    { href: "/courses", label: "CBSE" },
    { href: "/courses", label: "SAMACHEER" },
    { href: "/courses", label: "ONE to ONE" },
  ];
  
  const superKidsLinks = [
      { href: "#", label: "English Superstar for kids" },
      { href: "#", label: "Spoken English" },
  ];

  return (
    <footer className="border-t text-foreground footer-gradient">
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
                <h3 className="text-lg font-semibold">Contact</h3>
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
