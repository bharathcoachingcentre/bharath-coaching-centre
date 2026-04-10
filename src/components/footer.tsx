
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const firestore = useFirestore();

  const footerRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "footer");
  }, [firestore]);

  const { data: footerData } = useDoc(footerRef);

  const content = useMemo(() => {
    const defaults = {
      logoUrl: "",
      logoWidth: "150",
      logoHeight: "60",
      description: "Helping students from Class 1 to 12 achieve academic excellence through structured coaching.",
      facebookLink: "#",
      instagramLink: "#",
      youtubeLink: "#",
      contactPhone: "+91 72000 30307",
      contactEmail: "bcc_try@hotmail.com",
      contactAddress: "C-109, 5th Cross, Thillainagar (East), Trichy - 18",
      contactHours: "Mon-Sat 9AM-7PM",
      appTitle: "Get the Bharath Academy App",
      appSubtitle: "Learn anytime, anywhere with our mobile app",
      playStoreLink: "#",
      appStoreLink: "#",
      copyrightText: `© ${new Date().getFullYear()} Bharath Academy Hub. All rights reserved.`,
      bottomLinks: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms", href: "#" },
        { label: "Refund Policy", href: "#" },
      ],
      menus: [
        {
          title: "Company",
          links: [
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about" },
            { label: "Our Results", href: "/our-results" },
            { label: "Contact Us", href: "/contact" },
          ]
        },
        {
          title: "Courses",
          links: [
            { label: "CBSE Coaching", href: "/cbse" },
            { label: "Samacheer Coaching", href: "/samacheer" },
            { label: "Online Classes", href: "/online-courses" },
            { label: "One-to-One Mentorship", href: "/one-to-one-classes" },
          ]
        },
        {
          title: "Resources",
          links: [
            { label: "Free Study Materials", href: "/study-material" },
            { label: "Blog", href: "/blog" },
            { label: "Become a Teacher", href: "/become-a-teacher" },
          ]
        }
      ]
    };

    if (!footerData?.content) return defaults;
    return { ...defaults, ...footerData.content };
  }, [footerData]);

  // Do not show the frontend footer on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              {content.logoUrl ? (
                <div className="relative flex items-center" style={{ height: content.logoHeight ? `${content.logoHeight}px` : '40px' }}>
                  <img 
                    src={content.logoUrl} 
                    alt="Logo" 
                    style={{ 
                      width: content.logoWidth ? `${content.logoWidth}px` : 'auto', 
                      height: content.logoHeight ? `${content.logoHeight}px` : '40px',
                      maxWidth: 'none'
                    }}
                    className="object-contain transition-transform group-hover:scale-105"
                  />
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                    <GraduationCap className="text-white w-6 h-6" />
                  </div>
                  <span className="text-2xl font-bold">Bharath Academy</span>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium text-left">
              {content.description}
            </p>
            <div className="flex gap-4">
              <Link href={content.facebookLink} className="w-11 h-11 bg-gray-800 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href={content.instagramLink} className="w-11 h-11 bg-gray-800 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href={content.youtubeLink} className="w-11 h-11 bg-gray-800 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {(content.menus || []).map((menu: any, idx: number) => (
            <div key={idx} className="text-left">
              <h3 className="text-[18px] font-bold mb-6 text-white capitalize">{menu.title}</h3>
              <ul className="space-y-4 font-medium text-[16px]">
                {menu.links.map((link: any, linkIdx: number) => (
                  <li key={linkIdx}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="text-left">
            <h3 className="text-[18px] font-bold mb-6 text-white capitalize">Contact</h3>
            <ul className="space-y-5 text-gray-400 font-medium">
              <li className="flex items-start gap-3">
                <Phone className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm">{content.contactPhone}</div>
                  <div className="text-xs opacity-70">{content.contactHours}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
                <div className="text-white font-bold text-sm truncate">{content.contactEmail}</div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-blue-500 w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-bold text-sm">Trichy, Tamil Nadu</div>
                  <div className="text-xs opacity-70 mt-1 max-w-[180px]">{content.contactAddress}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-[2.5rem] p-10 mb-[42px] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left">
              <h3 className="text-[20px] font-extrabold mb-2 text-white">{content.appTitle}</h3>
              <p className="text-blue-100 text-[14px] font-medium">{content.appSubtitle}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href={content.playStoreLink} 
                className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-[1.25rem] shadow-xl transition-all transform active:scale-95 hover:bg-gray-50 border border-white/60 min-w-[200px]"
              >
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#182d45]">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L18.81,16.23C19.46,16.55 19.46,17.45 18.81,17.77L4.56,25.53L14.41,15.68L16.81,15.12M20.16,12C20.16,12.55 19.84,13.07 19.34,13.31L17.53,14.33L14.7,11.52L17.53,8.69L19.34,9.71C19.84,9.95 20.16,10.47 20.16,11V12M14.41,8.34L4.56,-1.51L18.81,6.25C19.46,6.57 19.46,7.47 18.81,7.79L16.81,8.9L14.41,8.34Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">GET IT ON</span>
                  <span className="text-[14px] font-semibold tracking-tight">Google Play</span>
                </div>
              </Link>

              <Link 
                href={content.appStoreLink} 
                className="flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-[1.25rem] shadow-xl transition-all transform active:scale-95 hover:bg-gray-50 border border-white/60 min-w-[200px]"
              >
                <div className="flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-[#182d45]">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.24C19.47,8.31 17.39,9.37 17.41,11.87C17.43,14.89 20.08,15.89 20.11,15.91C20.09,16.01 19.67,17.4 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                </div>
                <div className="flex flex-col items-start leading-tight">
                  <span className="text-[10px] font-bold opacity-80">Download on the</span>
                  <span className="text-[14px] font-semibold tracking-tight">App Store</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm font-medium">
              {content.copyrightText}
            </p>
            <div className="flex gap-8 text-sm font-normal">
              {(content.bottomLinks || []).map((link: any, idx: number) => (
                <Link key={idx} href={link.href} className="text-gray-500 hover:text-white transition-colors duration-200">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
