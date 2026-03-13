
"use client";

import React, { useMemo } from "react";
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
import { useFirestore, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export function Header() {
  const pathname = usePathname();
  const firestore = useFirestore();

  const headerRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "pages", "header");
  }, [firestore]);

  const { data: headerData } = useDoc(headerRef);

  const content = useMemo(() => {
    const defaults = {
      academyName: "Bharath Academy",
      logoUrl: "",
      logoWidth: "100",
      logoHeight: "80",
      ctaText: "Explore Courses",
      ctaLink: "/enrollment",
      navMenu: [
        { id: "1", title: "Study Materials", url: "/study-material", parentId: null, order: 0 },
        { id: "2", title: "Our Faculty", url: "/teachers", parentId: null, order: 1 },
        { id: "3", title: "Results", url: "/our-results", parentId: null, order: 2 },
        { id: "4", title: "About", url: "/about", parentId: null, order: 3 },
        { id: "5", title: "Contact", url: "/contact", parentId: null, order: 4 },
        { id: "6", title: "Courses", url: "#", parentId: null, order: 5 },
        { id: "7", title: "CBSE Curriculum", subLabel: "Class 1 to 12", url: "/cbse", parentId: "6", order: 0 },
        { id: "8", title: "Samacheer Kalvi", subLabel: "Class 1 to 12", url: "/samacheer", parentId: "6", order: 1 },
        { id: "9", title: "Competitive Exams", subLabel: "JEE, NEET, Olympiad", url: "/online-courses", parentId: "6", order: 2 },
      ]
    };

    if (!headerData?.content) return defaults;
    return { ...defaults, ...headerData.content };
  }, [headerData]);

  const menuTree = useMemo(() => {
    const items = content.navMenu || [];
    // 1. Identify Root items (parentId is null)
    const roots = items.filter(item => item.parentId === null || item.parentId === undefined || item.parentId === "");
    
    // 2. Sort items by their order
    const sortedItems = [...items].sort((a, b) => (a.order || 0) - (b.order || 0));

    // 3. Build the tree structure
    return roots
      .sort((a, b) => (a.order || 0) - (b.order || 0))
      .map(root => ({
        ...root,
        children: sortedItems.filter(child => child.parentId === root.id)
      }));
  }, [content.navMenu]);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-white/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            {content.logoUrl ? (
              <div className="relative flex items-center" style={{ height: content.logoHeight ? `${content.logoHeight}px` : '40px' }}>
                <img 
                  src={content.logoUrl} 
                  alt={content.academyName} 
                  style={{ 
                    width: content.logoWidth ? `${content.logoWidth}px` : 'auto', 
                    height: content.logoHeight ? `${content.logoHeight}px` : '40px',
                    maxWidth: 'none'
                  }}
                  className="object-contain transition-transform group-hover:scale-105"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              {content.academyName}
            </span>
          </Link>

          <div className="hidden lg:flex items-center space-x-8">
            {menuTree.map((item) => {
              if (item.children && item.children.length > 0) {
                return (
                  <DropdownMenu key={item.id}>
                    <DropdownMenuTrigger asChild>
                      <button className="text-gray-700 hover:text-blue-600 font-semibold flex items-center space-x-1 transition-colors duration-200 outline-none">
                        <span>{item.title}</span>
                        <ChevronDown className="h-3 w-3" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 rounded-xl shadow-xl border-gray-100 p-2">
                      {item.children.map((child: any) => (
                        <DropdownMenuItem asChild key={child.id}>
                          <Link href={child.url} className="p-3 cursor-pointer hover:bg-blue-50 rounded-lg block">
                            <div className="font-bold text-left">{child.title}</div>
                            {child.subLabel && (
                              <div className="text-[10px] text-gray-500 font-medium uppercase tracking-widest text-left">
                                {child.subLabel}
                              </div>
                            )}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className={cn(
                    "text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200",
                    pathname === item.url && "text-blue-600"
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <Button asChild className="bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-200 transform hover:scale-105 px-8 h-11 border-none">
              <Link href={content.ctaLink}>
                {content.ctaText}
              </Link>
            </Button>
            <Button variant="ghost" asChild className="text-gray-700 font-semibold hover:text-blue-600 hover:bg-blue-50 border-2 border-transparent hover:border-blue-100 rounded-lg px-6 transition-all">
              <Link href="/signin">Login</Link>
            </Button>
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="rounded-l-3xl overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="text-left font-bold text-2xl text-blue-600">
                    {content.logoUrl ? (
                      <img 
                        src={content.logoUrl} 
                        alt={content.academyName} 
                        style={{ 
                          width: content.logoWidth ? `${parseInt(content.logoWidth) * 0.8}px` : 'auto', 
                          height: content.logoHeight ? `${parseInt(content.logoHeight) * 0.8}px` : '32px',
                          maxHeight: '40px'
                        }} 
                        className="object-contain" 
                      />
                    ) : (
                      "Menu"
                    )}
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-6 mt-10 text-left">
                  {menuTree.map((item) => (
                    <div key={item.id} className="space-y-4">
                      <Link 
                        href={item.url} 
                        className={cn(
                          "text-xl font-bold text-gray-900 block",
                          pathname === item.url && "text-blue-600"
                        )}
                      >
                        {item.title}
                      </Link>
                      {item.children && item.children.length > 0 && (
                        <div className="pl-4 space-y-4 border-l-2 border-gray-100">
                          {item.children.map((child: any) => (
                            <SheetClose asChild key={child.id}>
                              <Link
                                href={child.url}
                                className={cn(
                                  "text-lg font-bold text-gray-500 hover:text-blue-600 block",
                                  pathname === child.url && "text-blue-600"
                                )}
                              >
                                {child.title}
                              </Link>
                            </SheetClose>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-6 space-y-4">
                    <Button asChild className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold h-14 rounded-xl text-lg shadow-lg border-none">
                      <Link href={content.ctaLink}>
                        {content.ctaText}
                      </Link>
                    </Button>
                    <SheetClose asChild>
                      <Button variant="outline" asChild className="w-full h-14 rounded-xl font-bold text-lg">
                        <Link href="/signin">Login</Link>
                      </Button>
                    </SheetClose>
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
