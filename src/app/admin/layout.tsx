import type { Metadata } from 'next';
import '../globals.css';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  Settings, 
  LogOut,
  Search,
  Bell,
  PanelLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: 'EduAdmin - Management Panel',
  description: 'Overview of your education platform',
};

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", active: true },
  { icon: Users, label: "Enrollments", href: "/admin" },
  { icon: BookOpen, label: "Study Materials", href: "/admin" },
  { icon: Trophy, label: "Results", href: "/admin" },
  { icon: GraduationCap, label: "Courses", href: "/admin" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e1e2d] text-gray-400 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg leading-none">EduAdmin</span>
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-50">Management Panel</span>
          </div>
        </div>

        <nav className="flex-1 px-4 mt-4 space-y-8">
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">Main Menu</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    item.active 
                      ? "bg-white/10 text-white" 
                      : "hover:bg-white/5 hover:text-gray-200"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${item.active ? "text-indigo-400" : "group-hover:text-gray-200"}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">System</p>
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-all group hover:text-gray-200"
            >
              <Settings className="w-5 h-5 group-hover:text-gray-200" />
              <span className="font-medium text-sm">Settings</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-10 w-10 border-2 border-white/10">
                <AvatarImage src="https://picsum.photos/seed/admin/100" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-white text-sm font-bold truncate">Admin User</span>
                <span className="text-[10px] truncate opacity-50 font-medium">admin@edu.com</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header - EXACTLY AS PER SCREENSHOT */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100">
              <PanelLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 leading-none">Dashboard</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">Overview of your education platform</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10 h-10 bg-gray-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-indigo-500" 
              />
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-100 text-gray-500">
                <Bell className="w-5 h-5" />
              </Button>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </div>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
