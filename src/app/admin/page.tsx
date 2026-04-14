
"use client";

import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  ArrowUpRight,
  ChevronRight,
  Loader2,
  TableProperties,
  ExternalLink,
  FileText,
  Clock
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import Link from "next/link";

const EXTERNAL_SHEET_URL = "https://docs.google.com/spreadsheets/d/1IuzQxil2Gb5-dTyoi20ZjKpTbAtYtbHyGgG8XR1qhrg/edit?usp=sharing";

const enrollmentData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 180 },
  { name: "Mar", total: 210 },
  { name: "Apr", total: 290 },
  { name: "May", total: 350 },
  { name: "Jun", total: 380 },
];

const distributionData = [
  { name: "CBSE (9-12)", value: 45, color: "#35a3be" },
  { name: "Samacheer (9-12)", value: 30, color: "#10b981" },
  { name: "Foundation (1-8)", value: 15, color: "#f59e0b" },
  { name: "Competitive", value: 10, color: "#3b82f6" },
];

export default function AdminDashboard() {
  const firestore = useFirestore();
  
  const enrollmentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const materialsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'study-materials'), orderBy('createdAt', 'desc'), limit(5));
  }, [firestore]);

  const coursesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'courses'));
  }, [firestore]);

  const recentEnrollmentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'enrollments'), orderBy('createdAt', 'desc'), limit(5));
  }, [firestore]);

  const { data: allEnrollments } = useCollection(enrollmentsQuery);
  const { data: recentMaterials, loading: loadingMaterials } = useCollection(materialsQuery);
  const { data: allCourses } = useCollection(coursesQuery);
  const { data: recentEnrollments, loading: loadingRecent } = useCollection(recentEnrollmentsQuery);

  const stats = [
    { label: "Total Enrollments", value: allEnrollments?.length?.toString() || "0", trend: "+12.5% from last month", icon: Users, iconColor: "text-[#3b82f6]", iconBg: "bg-[#3b82f6]/10" },
    { label: "Active Courses", value: allCourses?.length?.toString() || "0", trend: "Current catalog", icon: GraduationCap, iconColor: "text-[#8b5cf6]", iconBg: "bg-[#8b5cf6]/10" },
    { label: "Success Rate", value: "95%", trend: "Exceptional results", icon: Trophy, iconColor: "text-[#f59e0b]", iconBg: "bg-[#f59e0b]/10" },
  ];

  const topPerformers = [
    { name: "Vikram Malhotra", category: "Class 12 CBSE", score: "98%", rank: "#1", color: "bg-[#f59e0b]/10 text-[#f59e0b]" },
    { name: "Nisha Reddy", category: "Class 10 Samacheer", score: "96%", rank: "#2", color: "bg-gray-100 text-gray-600" },
    { name: "Kabir Singh", category: "JEE Advanced Prep", score: "95%", rank: "#3", color: "bg-amber-100 text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.iconBg)}>
                  <stat.icon className={cn("w-7 h-7", stat.iconColor)} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-500 leading-none mb-2">{stat.label}</span>
                  <span className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</span>
                  <span className={cn("text-[11px] font-bold mt-1", stat.trend.includes("+") ? "text-emerald-500" : "text-gray-400")}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Enrollment Trends</h3>
              <div className="flex items-center gap-4">
                <Button asChild size="sm" variant="outline" className="rounded-lg h-9 font-bold text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                  <a href={EXTERNAL_SHEET_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <TableProperties className="w-3.5 h-3.5" /> Google Sheet
                  </a>
                </Button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#35a3be]/10 text-[#35a3be] rounded-lg text-xs font-bold">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18%
                </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    domain={[0, 380]}
                    ticks={[0, 95, 190, 285, 380]}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]} barSize={60}>
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#35a3be" fillOpacity={0.8 + (index * 0.04)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Board Distribution</h3>
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total</p>
                  <p className="text-2xl font-black text-gray-900">100%</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-4 mt-8">
              {distributionData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] font-bold text-gray-500 truncate">{item.name}</span>
                  <span className="text-[11px] font-black text-gray-900 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Enrollments</h3>
            <Button asChild variant="link" className="text-[#35a3be] font-bold text-sm h-auto p-0 flex items-center gap-1 group">
              <Link href="/admin/enrollments">
                View all <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              {loadingRecent ? (
                <div className="p-8 text-center text-gray-400 font-medium flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Syncing data...
                </div>
              ) : !recentEnrollments || recentEnrollments.length === 0 ? (
                <div className="p-8 text-center text-gray-400 font-medium">No recent enrollments.</div>
              ) : (
                recentEnrollments.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                    <Avatar className="h-12 w-12 rounded-xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.firstName}`} />
                      <AvatarFallback>{item.firstName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1 min-w-0 text-left">
                      <span className="text-sm font-bold text-gray-900 truncate">{item.firstName} {item.lastName}</span>
                      <span className="text-[11px] font-medium text-gray-500 capitalize">{item.course?.replace(/-/g, ' ') || item.board}</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={cn(
                        "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-none border-none",
                        item.status === "Active" || item.status === "Completed" ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-500"
                      )}>
                        {item.status || "Pending"}
                      </Badge>
                      <span className="text-[10px] font-medium text-gray-400">
                        {item.createdAt?.toDate ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Study Materials</h3>
            <Button asChild variant="link" className="text-teal-600 font-bold text-sm h-auto p-0 flex items-center gap-1 group">
              <Link href="/admin/study-materials">
                Manage Hub <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              {loadingMaterials ? (
                <div className="p-8 text-center text-gray-400 font-medium flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Syncing archives...
                </div>
              ) : !recentMaterials || recentMaterials.length === 0 ? (
                <div className="p-8 text-center text-gray-400 font-medium">No materials uploaded yet.</div>
              ) : (
                recentMaterials.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col flex-1 min-w-0 text-left">
                      <span className="text-sm font-bold text-gray-900 truncate">{item.title}</span>
                      <span className="text-[11px] font-medium text-gray-500 uppercase tracking-tighter">
                        {item.grade} • {item.board}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-[10px] font-medium">
                          {item.createdAt?.toDate ? new Date(item.createdAt.toDate()).toLocaleDateString() : 'New'}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-[9px] px-1.5 font-bold uppercase border-teal-100 text-teal-600">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
