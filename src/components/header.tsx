"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, GraduationCap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#", label: "Study Materials" },
  { href: "/our-results", label: "Results" },
  { href: "#", label: "About" },
  { href: "#", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Bharath Academy
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-gray-700 hover:text-blue-600 font-semibold flex items-center space-x-1 transition-colors duration-200">
                  <span>Courses</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-xl shadow-xl border-gray-100 p-2">
                <DropdownMenuItem asChild>
                  <Link href="#" className="p-3 cursor-pointer hover:bg-blue-50 rounded-lg block">
                    <div className="font-bold">CBSE Curriculum</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Class 1 to 12</div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="p-3 cursor-pointer hover:bg-blue-50 rounded-lg block">
                    <div className="font-bold">Samacheer Kalvi</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Class 1 to 12</div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" className="p-3 cursor-pointer hover:bg-blue-50 rounded-lg block">
                    <div className="font-bold">Competitive Exams</div>
                    <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">JEE, NEET, Olympiad</div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className={cn(
                  "text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200",
                  pathname === link.href && "text-blue-600"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" asChild className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100 rounded-lg px-6 transition-all">
              <Link href="#">Explore Courses</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-200 transform hover:scale-105 px-8 h-11">
              <Link href="#">Book Free Demo</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="rounded-l-3xl">
                <SheetHeader>
                  <SheetTitle className="text-left font-bold text-2xl text-blue-600">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-10">
                  <Link href="#" className="text-xl font-bold text-gray-900 border-b pb-4 border-gray-100">Courses</Link>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-xl font-bold text-gray-700 hover:text-blue-600",
                          pathname === link.href && "text-blue-600"
                        )}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="pt-6 space-y-4">
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold h-14 rounded-xl text-lg shadow-lg">
                      <Link href="#">Book Free Demo</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
