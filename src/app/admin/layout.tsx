"use client";

import '../globals.css';
import { 
  LayoutDashboard, 
  Users, 
  UserCheck,
  BookOpen, 
  Trophy, 
  GraduationCap, 
  Settings, 
  LogOut,
  Search, 
  Bell,
  PanelLeft,
  ChevronDown,
  ChevronRight,
  Loader2,
  Layout,
  CalendarClock,
  School,
  Contact2,
  Star,
  Type,
  List,
  History,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { initializeFirebase, useUser, useFirestore, useDoc } from "@/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect, useMemo } from "react";
import { doc } from "firebase/firestore";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { 
    icon: UserCheck, 
    label: "Users", 
    href: "/admin/users",
    children: [
      { label: "All Users", href: "/admin/users" },
      { label: "Admins", href: "/admin/users/admins" },
    ]
  },
  { 
    icon: Layout, 
    label: "Pages", 
    href: "/admin/pages",
    children: [
      { label: "Manage Pages", href: "/admin/pages" },
      { label: "Recovery Bin", href: "/admin/pages/recovery" },
      { label: "Header Editor", href: "/admin/pages/header" },
      { label: "Footer Editor", href: "/admin/pages/footer" },
      { label: "Blogs", href: "/admin/blogs" },
    ]
  },
  { icon: Trophy, label: "Top Performers", href: "/admin/top-performers" },
  { icon: Users, label: "Enrollments", href: "/admin/enrollments" },
  { icon: BookOpen, label: "Study Materials", href: "/admin/study-materials" },
  { 
    icon: CalendarClock, 
    label: "Timetable", 
    href: "/admin/timetable",
    children: [
      { label: "Manage Timetable", href: "/admin/timetable" },
      { label: "Add Schedule", href: "/admin/timetable/add" },
      { label: "Classes", href: "/admin/timetable/classes" },
      { label: "Subjects", href: "/admin/timetable/subjects" },
      { label: "Periods", href: "/admin/timetable/periods" },
      { label: "Teachers", href: "/admin/timetable/teachers" },
    ]
  },
  { icon: GraduationCap, label: "Courses", href: "/admin/courses" },
];

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signin');
    }
  }, [user, loading, router]);

  const settingsRef = useMemo(() => {
    if (!firestore) return null;
    return doc(firestore, "settings", "academy");
  }, [firestore]);

  const { data: academySettings } = useDoc(settingsRef);
  const academyName = academySettings?.name || "Bharath Academy";

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    Users: pathname.startsWith("/admin/users"),
    Pages: pathname.startsWith("/admin/pages") || pathname.startsWith("/admin/blogs"),
    Timetable: pathname.startsWith("/admin/timetable")
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = (label: string) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

  const handleSignOut = async () => {
    try {
        const { auth } = initializeFirebase();
        await signOut(auth);
        toast({
            title: "Signed Out",
            description: "You have been securely signed out.",
        });
        router.push("/signin");
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to sign out. Please try again.",
        });
    }
  };

  const getPageTitle = () => {
    const item = menuItems.find(item => item.href === pathname || (item.children?.some(child => child.href === pathname)));
    if (item?.children) {
      const child = item.children.find(c => c.href === pathname);
      return child ? `${item.label} / ${child.label}` : item.label;
    }
    return item ? item.label : "Admin";
  };

  const getPageSubtitle = () => {
    if (pathname === "/admin/results") return "Academic performance analytics";
    if (pathname === "/admin/top-performers") return "Manage student achievements";
    if (pathname.startsWith("/admin/users")) return "Manage system user accounts";
    if (pathname === "/admin/enrollments") return "Manage student enrollments";
    if (pathname === "/admin/study-materials") return "Resources and material hub";
    if (pathname.startsWith("/admin/pages")) return "Manage website page content";
    if (pathname.startsWith("/admin/blogs")) return "Manage articles and news";
    if (pathname.startsWith("/admin/timetable")) return "Manage class schedules";
    return "Overview of your education platform";
  };

  const NavigationMenu = () => (
    <nav className="flex-1 px-4 mt-4 space-y-8 overflow-y-auto no-scrollbar">
      <div className="text-left">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">Main Menu</p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const hasChildren = !!item.children;
            const isOpen = openMenus[item.label];

            if (hasChildren) {
              return (
                <Collapsible
                  key={item.label}
                  open={isOpen}
                  onOpenChange={() => toggleMenu(item.label)}
                  className="w-full"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={cn(
                        "flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 group outline-none",
                        isActive && !isOpen
                          ? "bg-[#35a3be]/10 text-[#35a3be] shadow-sm" 
                          : "hover:bg-white/5 hover:text-gray-200"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className={cn(
                          "w-5 h-5",
                          isActive && !isOpen ? "text-[#35a3be]" : "group-hover:text-gray-200"
                        )} />
                        <span className="font-medium text-sm">{item.label}</span>
                      </div>
                      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-1 px-4">
                    {item.children?.map((child) => {
                      const isChildActive = pathname === child.href;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-xs font-medium",
                            isChildActive 
                              ? "bg-[#35a3be]/10 text-[#35a3be]" 
                              : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                          )}
                        >
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            isChildActive ? "bg-[#35a3be]" : "bg-gray-700"
                          )} />
                          {child.label}
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-[#35a3be]/10 text-[#35a3be] shadow-sm" 
                    : "hover:bg-white/5 hover:text-gray-200"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-[#35a3be]" : "group-hover:text-gray-200"
                )} />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-left">
        <p className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-gray-500">System</p>
        <Link
          href="/admin/settings"
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
            pathname === "/admin/settings" ? "bg-[#35a3be]/10 text-[#35a3be]" : "hover:bg-white/5 hover:text-gray-200"
          )}
        >
          <Settings className={cn(
            "w-5 h-5",
            pathname === "/admin/settings" ? "text-[#35a3be]" : "group-hover:text-gray-200"
          )} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
      </div>
    </nav>
  );

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#35a3be]" />
          <p className="text-gray-500 font-bold animate-pulse">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-[#1e1e2d] text-gray-400 flex flex-col hidden md:flex sticky top-0 h-screen shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden",
            academySettings?.faviconUrl ? "bg-white" : "bg-[#14b8a6] text-white shadow-[#14b8a6]/20"
          )}>
            {academySettings?.faviconUrl ? (
              <img src={academySettings.faviconUrl} className="w-full h-full object-contain p-1" alt="Logo" />
            ) : (
              <GraduationCap className="w-6 h-6" />
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="text-white font-bold text-lg leading-none truncate w-40">{academyName}</span>
            <span className="text-[10px] font-medium uppercase tracking-wider opacity-50">Management Panel</span>
          </div>
        </div>

        <NavigationMenu />

        <div className="p-4 border-t border-white/5">
          <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <Avatar className="h-10 w-10 border-2 border-[#35a3be]/20">
                <AvatarImage src={user?.photoURL || `https://api.dicebear.com/7.x/micah/svg?seed=${user?.email || 'admin'}`} />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate text-left">
                <span className="text-white text-sm font-bold truncate">{user?.displayName || "Admin User"}</span>
                <span className="text-[10px] truncate opacity-50 font-medium">{user?.email || "admin@edu.com"}</span>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl bg-white">
                <AlertDialogHeader className="text-left">
                  <AlertDialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">Confirm Logout</AlertDialogTitle>
                  <AlertDialogDescription className="text-gray-500 font-medium text-base pt-2">
                    Are you sure you want to log out? You will need to sign in again to access the management panel.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-6 gap-3">
                  <AlertDialogCancel className="h-12 px-6 rounded-xl font-bold border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-600">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleSignOut}
                    className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 border-none transition-all active:scale-95"
                  >
                    Log Out
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 md:hidden">
                  <PanelLeft className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64 bg-[#1e1e2d] border-none text-gray-400">
                <SheetHeader className="sr-only">
                  <SheetTitle>Admin Navigation Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <div className="p-6 flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg overflow-hidden",
                      academySettings?.faviconUrl ? "bg-white" : "bg-[#14b8a6] text-white shadow-[#14b8a6]/20"
                    )}>
                      {academySettings?.faviconUrl ? (
                        <img src={academySettings.faviconUrl} className="w-full h-full object-contain p-1" alt="Logo" />
                      ) : (
                        <GraduationCap className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-white font-bold text-lg leading-none truncate w-40">{academyName}</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider opacity-50">Management Panel</span>
                    </div>
                  </div>
                  
                  <NavigationMenu />

                  <div className="p-4 border-t border-white/5">
                    <div className="bg-white/5 p-4 rounded-2xl flex items-center justify-between overflow-hidden">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar className="h-10 w-10 border-2 border-[#35a3be]/20">
                          <AvatarImage src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'admin'}`} />
                          <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate text-left">
                          <span className="text-white text-sm font-bold truncate">{user?.displayName || "Admin User"}</span>
                          <span className="text-[10px] truncate opacity-50 font-medium">{user?.email || "admin@edu.com"}</span>
                        </div>
                      </div>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10 flex items-center justify-center rounded-lg transition-colors">
                            <LogOut className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[2rem] border-none shadow-2xl bg-white">
                          <AlertDialogHeader className="text-left">
                            <AlertDialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">Confirm Logout</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-500 font-medium text-base pt-2">
                              Are you sure you want to log out?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="pt-6 gap-3">
                            <AlertDialogCancel className="h-12 px-6 rounded-xl font-bold border-gray-100 bg-gray-50 hover:bg-gray-100 text-gray-600">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleSignOut}
                              className="h-12 px-8 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 border-none"
                            >
                              Log Out
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button variant="ghost" size="icon" className="text-gray-500 hover:bg-gray-100 hidden md:flex">
              <PanelLeft className="w-5 h-5" />
            </Button>
            <div className="flex flex-col text-left">
              <h1 className="text-xl font-bold text-gray-900 leading-none">{getPageTitle()}</h1>
              <p className="text-xs text-gray-500 font-medium mt-1">{getPageSubtitle()}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block text-left">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="w-64 pl-10 h-10 bg-gray-50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-[#35a3be]" 
              />
            </div>
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-gray-100 text-gray-500">
                <Bell className="w-5 h-5" />
              </Button>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#14b8a6] rounded-full border-2 border-white"></span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8 pb-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
