import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";

export function Footer() {
  const companyLinks = [
    { href: "#", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/blog", label: "Vedantu Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "Child safety" },
    { href: "#", label: "Why Vedantu" },
    { href: "#", label: "Our results" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Help india learn" },
  ];

  const otherLinks = [
    { href: "#", label: "Free live classes" },
    { href: "#", label: "Why teach with Vedantu" },
    { href: "#", label: "Try WAVE" },
    { href: "#", label: "Try Whiteboard" },
    { href: "#", label: "Vedantu improvement promise" },
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
                <div className="flex items-center gap-4">
                  <Link href="#">
                    <Image src="/google-play.svg" alt="Get it on Google Play" width={150} height={60} data-ai-hint="Google Play store" />
                  </Link>
    
                </div>
                <Card className="bg-background shadow-lg">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div>
                            <p className="font-semibold">Know more about our courses. Book a free counselling session.</p>
                            <Button variant="destructive" className="mt-2 bg-red-500 hover:bg-red-600">Speak to an expert</Button>
                        </div>
                        <Image src="/newsletter-icon.png" alt="Newsletter" width={60} height={60} data-ai-hint="newsletter icon" />
                    </CardContent>
                </Card>
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
                    <h3 className="text-lg font-semibold mt-6">Vedantu Super Kids</h3>
                    <ul className="mt-4 space-y-2 text-sm">
                    {superKidsLinks.map(link => (
                        <li key={link.label}><Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">{link.label}</Link></li>
                    ))}
                    </ul>
                </div>
            </div>
        </div>
        <div className="mt-12 border-t pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="font-semibold text-lg">TOLL FREE: 1800-120-456-456</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>91 988-660-2456 (9 AM to 9:30 PM on all days)</span>
                    </div>
                     <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <a href="mailto:vcare@vedantu.com" className="hover:text-primary">vcare@vedantu.com</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background font-bold text-xl">
                        N
                    </div>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
