
import Link from "next/link";
import { Twitter, Send, Gitlab, Rss, Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BccFooterLogo } from "./bcc-footer-logo";

const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Send, label: "Telegram" },
    { href: "#", icon: Gitlab, label: "Gitlab" },
    { href: "#", icon: Rss, label: "RSS" },
];

export function Footer2() {
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
    { href: "/cbse", label: "CBSE" },
    { href: "/samacheer", label: "SAMACHEER" },
    { href: "/one-to-one-classes", label: "ONE to ONE" },
  ];

  return (
    <footer className="border-t text-foreground" style={{ backgroundColor: '#1a2e44', color: 'white' }}>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
                <BccFooterLogo />
            </div>
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-semibold text-center md:text-left">Get link in sms to download the app</p>
                <div className="flex w-full md:w-auto items-center gap-2">
                    <Input type="tel" placeholder="Enter mobile number" className="w-full md:w-64 text-black" />
                    <Button>Get the link</Button>
                </div>
            </div>
        </div>
        
        <Separator className="bg-gray-700" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
            <div>
                <h3 className="text-lg font-semibold">Company</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {companyLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Other Links</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {otherLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold">Courses</h3>
                <ul className="mt-4 space-y-2 text-sm">
                {coursesLinks.map(link => (
                    <li key={link.label}><Link href={link.href} className="text-gray-400 hover:text-primary transition-colors">{link.label}</Link></li>
                ))}
                </ul>
            </div>
            <div className="space-y-6 col-span-2 md:col-span-1">
                <h3 className="text-lg font-semibold">Contact us</h3>
                <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                        <Mail className="h-6 w-6 mt-1 text-gray-400"/>
                        <div>
                            <p className="font-semibold">Email</p>
                            <a href="mailto:bcc_try@hotmail.com" className="text-gray-400 hover:text-primary transition-colors">bcc_try@hotmail.com</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="h-6 w-6 mt-1 text-gray-400"/>
                        <div>
                            <p className="font-semibold">Phone</p>
                            <a href="tel:+917200030307" className="text-gray-400 hover:text-primary transition-colors">+91 7200030307</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="h-6 w-6 mt-1 text-gray-400"/>
                        <div>
                            <p className="font-semibold">Address</p>
                            <p className="text-gray-400">C-109, 5th Cross, Thillainagar (East),<br />Trichy - 18</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
      </div>
      <div className="container mx-auto px-4">
        <Separator className="bg-gray-700"/>
        <div className="py-8 text-center">
            <p className="text-white text-base">© {new Date().getFullYear()} Bharath Academy. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
