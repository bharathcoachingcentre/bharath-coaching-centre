import Link from "next/link";
import { Twitter, Send, Gitlab, Rss } from "lucide-react";
import { Separator } from "./ui/separator";
import { FooterLogo } from "./footer-logo";

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 384 512" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C39.2 141.6 0 184.2 0 241.2c0 61.6 51.4 157.4 83.5 207.4 15.8 24.5 35.2 49.9 56.2 49.9 20.9 0 27.7-13.5 56.5-13.5 28.5 0 34.1 13.5 57.3 13.5 21.2 0 40.5-25.5 55.6-50.6 7.2-12.1 15.8-26.7 24-42.6h.1c-15.8-9.5-24.9-24.9-25-41.2zM245.3 103.5c14-18.4 24.5-41.9 24.5-62.2 0-2.3-.2-4.6-.7-6.9-20.9 1.7-41.8 13.9-56.6 28.5-13.5 13.5-25.1 35.3-24.5 56.6 2.3 21.6 21.2 33.6 40.5 33.6 22.1 0 35.8-16.9 42.8-21.4z" />
    </svg>
  );
  
  const GooglePlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 512 512" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
  
  const socialLinks = [
    { href: "#", icon: Twitter, label: "Twitter" },
    { href: "#", icon: Send, label: "Telegram" },
    { href: "#", icon: Gitlab, label: "Gitlab" },
    { href: "#", icon: Rss, label: "RSS" },
  ];

export function Footer() {
  const companyLinks = [
    { href: "#", label: "About us" },
    { href: "/contact", label: "Contact us" },
    { href: "/blog", label: "Blog" },
    { href: "#", label: "News" },
    { href: "#", label: "Child safety" },
  ];

  const otherLinks = [
    { href: "#", label: "Free live classes" },
    { href: "#", label: "Why teach with  Bharath Academy" },
    { href: "#", label: "Try WAVE" },
    { href: "#", label: "Try Whiteboard" },
  ];

  const coursesLinks = [
    { href: "/courses", label: "CBSE Tuitions" },
    { href: "/courses", label: "ICSE Tuitions" },
    { href: "/courses", label: "JEE (Main & Advanced)" },
    { href: "/courses", label: "NEET" },
    { href: "/courses", label: "Computer Science" },
  ];

  return (
    <footer className="border-t bg-card text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
                <FooterLogo />
            </div>
            <div className="flex items-center gap-4">
                <p className="text-lg font-semibold">Your Education journey starts here</p>
                <div className="flex gap-2">
                    <Link href="#" className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"><AppleIcon /></Link>
                    <Link href="#" className="p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"><GooglePlayIcon /></Link>
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
                <h3 className="text-lg font-semibold">Social</h3>
                <div className="flex gap-4 mt-4">
                    {socialLinks.map(link => (
                        <Link key={link.label} href={link.href} aria-label={link.label} className="text-muted-foreground hover:text-primary transition-colors">
                            <link.icon className="h-6 w-6" />
                        </Link>
                    ))}
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
