"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

const navLinks = [
    { href: "/courses", label: "Offline Courses", isButton: true, dropdown: true },
    { href: "/courses", label: "Online Courses", dropdown: true },
    { href: "/events", label: "Free study material", dropdown: true },
    { href: "/blog", label: "Our Results" },
    { href: "/contact", label: "One to One Classes" },
];

const moreLinks = [
    { href: "#", label: "About Us" },
    { href: "#", label: "Careers" },
    { href: "/blog", label: "Blog" },
];
  

export function Header() {
  const pathname = usePathname();

  const NavLink = ({ href, label, className, children }: { href: string; label:string, className?: string, children?: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "flex items-center font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground",
        className
      )}
    >
      {label}
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 sm:px-6 lg:px-8">
      <div className="flex h-24 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <Logo className="h-12 w-auto" />
          </Link>
          <nav className="hidden items-center space-x-6 text-sm md:flex">
            {navLinks.map((link) => 
              link.dropdown ? (
                <DropdownMenu key={link.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant={link.isButton ? "outline" : "ghost"} className={cn(
                        "font-medium",
                        link.isButton && "border-primary text-primary hover:bg-primary/5",
                         !link.isButton && "text-muted-foreground hover:text-primary"
                    )}>
                      {link.label} <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Option 1</DropdownMenuItem>
                    <DropdownMenuItem>Option 2</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div key={link.label} className="flex items-center">
                  <NavLink href={link.href} label={link.label} />
                </div>
              )
            )}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="font-medium text-muted-foreground hover:text-primary">
                        More <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {moreLinks.map(link => (
                        <DropdownMenuItem key={link.label} asChild>
                            <Link href={link.href}>{link.label}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                </div>
                <div className="text-sm">
                    <p className="text-muted-foreground">Talk to our experts</p>
                    <p className="font-semibold text-foreground">+91 7200030307</p>
                </div>
            </div>
            <Button variant="secondary" className="bg-primary/10 hover:bg-primary/20 text-primary font-semibold">Sign in</Button>
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
                        <Logo className="h-8 w-auto" />
                    </Link>
                    {[...navLinks, ...moreLinks].map((link) => (
                        <SheetClose asChild key={link.label}>
                            <NavLink href={link.href} label={link.label} className="text-muted-foreground hover:text-foreground" />
                        </SheetClose>
                    ))}
                    <SheetClose asChild>
                        <Button asChild className="mt-4">
                            <Link href="#">Sign in</Link>
                        </Button>
                    </SheetClose>
                </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
