"use client";

import Link from "next/link";
import { GraduationCap, Facebook, Instagram, Youtube, Phone, Mail, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#182d45] text-white pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#35a3be] rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold">Bharath Academy</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Helping students from Class 1 to 12 achieve academic excellence through structured coaching and personalized mentorship.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="w-10 h-10 bg-white/5 hover:bg-[#35a3be] rounded-lg flex items-center justify-center transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/5 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="w-10 h-10 bg-white/5 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">About Us</Link></li>
              <li><Link href="/our-results" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Our Results</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Courses</h3>
            <ul className="space-y-3">
              <li><Link href="/courses" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">CBSE Coaching</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Samacheer Coaching</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Online Classes</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">One-to-One Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="/free-study-material" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Free Study Materials</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Blog</Link></li>
              <li><Link href="/student-registration" className="text-gray-400 hover:text-[#35a3be] transition-colors duration-200">Become a Teacher</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/10 pb-2">Contact</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="text-[#35a3be] w-5 h-5 mt-1" />
                <div>
                  <div className="text-white font-medium">+91 72000 30307</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500">Mon-Sat 9AM-7PM</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-[#35a3be] w-5 h-5 mt-1" />
                <div className="text-white font-medium">info@bharathacademy.com</div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-[#35a3be] w-5 h-5 mt-1" />
                <div className="text-white font-medium">Trichy, Tamil Nadu</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#35a3be] to-teal-600 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-black mb-2">Subscribe to our newsletter</h3>
              <p className="text-white/80 font-medium">Get the latest updates and study materials delivered to your inbox.</p>
            </div>
            <div className="flex w-full sm:w-auto gap-2">
              <Input placeholder="Enter your email" className="bg-white/20 border-white/20 text-white placeholder:text-white/60 rounded-xl h-14 min-w-[250px]" />
              <Button className="bg-[#182d45] hover:bg-black text-white font-black rounded-xl h-14 px-8">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm font-medium">
              © {currentYear} Bharath Academy Hub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
              <Link href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Privacy</Link>
              <Link href="#" className="text-gray-500 hover:text-white transition-colors duration-200">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
