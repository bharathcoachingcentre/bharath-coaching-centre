"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/events", label: "Events" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className }: { href: string; label:string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="hidden font-bold sm:inline-block">
              Bharath Academy
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm">
            {navLinks.map((link) => <NavLink key={link.href} {...link} />)}
          </nav>
        </div>

        <div className="md:hidden">
        <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium p-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
                        <Logo className="h-8 w-8" />
                        <span>Bharath Academy</span>
                    </Link>
                    {navLinks.map((link) => (
                        <SheetClose asChild key={link.href}>
                            <NavLink {...link} className="text-muted-foreground hover:text-foreground" />
                        </SheetClose>
                    ))}
                    <SheetClose asChild>
                        <Button asChild className="mt-4">
                            <Link href="/courses">Enroll Now</Link>
                        </Button>
                    </SheetClose>
                </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center space-x-2 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <Logo className="h-8 w-8" />
                <span className="font-bold">
                Bharath Academy
                </span>
            </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
             <Button asChild>
                <Link href="/courses">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
