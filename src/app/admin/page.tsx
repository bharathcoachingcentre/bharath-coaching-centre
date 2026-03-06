
"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Users, 
  BookOpen, 
  Trophy, 
  GraduationCap, 
  ArrowUpRight,
  ChevronRight
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

const stats = [
  { label: "Total Enrollments", value: "2,847", trend: "+12.5% from last month", icon: Users, iconColor: "text-purple-600", iconBg: "bg-purple-100" },
  { label: "Study Materials", value: "1,234", trend: "+8 new this week", icon: BookOpen, iconColor: "text-blue-600", iconBg: "bg-blue-100" },
  { label: "Top Performers", value: "156", trend: "+23 this semester", icon: Trophy, iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  { label: "Active Courses", value: "48", trend: "3 launching soon", icon: GraduationCap, iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
];

const enrollmentData = [
  { name: "Jan", total: 120 },
  { name: "Feb", total: 180 },
  { name: "Mar", total: 210 },
  { name: "Apr", total: 290 },
  { name: "May", total: 350 },
  { name: "Jun", total: 380 },
];

const distributionData = [
  { name: "CBSE (9-12)", value: 45, color: "#4f46e5" },
  { name: "Samacheer (9-12)", value: 30, color: "#10b981" },
  { name: "Foundation (1-8)", value: 15, color: "#f59e0b" },
  { name: "Competitive", value: 10, color: "#3b82f6" },
];

const recentEnrollments = [
  { name: "Ananya Krishnan", course: "Class 10 CBSE Maths", status: "Active", time: "2 hours ago", img: "https://picsum.photos/seed/ananya/100" },
  { name: "Arjun Mehta", course: "Class 12 Samacheer Physics", status: "Active", time: "4 hours ago", img: "https://picsum.photos/seed/arjun/100" },
  { name: "Divya Nair", course: "Class 9 CBSE Science", status: "Pending", time: "6 hours ago", img: "https://picsum.photos/seed/divya/100" },
  { name: "Rohan Kapoor", course: "NEET Crash Course", status: "Active", time: "8 hours ago", img: "https://picsum.photos/seed/rohan/100" },
  { name: "Sanya Gupta", course: "Class 11 Samacheer Chemistry", status: "Active", time: "12 hours ago", img: "https://picsum.photos/seed/sanya/100" },
];

const topPerformers = [
  { name: "Vikram Malhotra", category: "Class 12 CBSE", score: "98%", rank: "#1", color: "bg-orange-100 text-orange-600" },
  { name: "Nisha Reddy", category: "Class 10 Samacheer", score: "96%", rank: "#2", color: "bg-gray-100 text-gray-600" },
  { name: "Kabir Singh", category: "JEE Advanced Prep", score: "95%", rank: "#3", color: "bg-amber-100 text-amber-600" },
  { name: "Zara Ali", category: "Class 9 CBSE", score: "94%", rank: "#4", color: "bg-slate-100 text-slate-600" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.iconBg)}>
                  <stat.icon className={cn("w-7 h-7", stat.iconColor)} />
                </div>
                <div className="flex flex-col">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Enrollment Trends</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">
                <ArrowUpRight className="w-3.5 h-3.5" /> +18%
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
                      <Cell key={`cell-${index}`} fill="#4f46e5" fillOpacity={0.8 + (index * 0.04)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Distribution Chart */}
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

      {/* Bottom Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enrollments */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Recent Enrollments</h3>
            <Button variant="link" className="text-indigo-600 font-bold text-sm h-auto p-0 flex items-center gap-1 group">
              View all <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <CardContent className="p-4 pt-0">
            <div className="space-y-1">
              {recentEnrollments.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                  <Avatar className="h-12 w-12 rounded-xl">
                    <AvatarImage src={item.img} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-900 truncate">{item.name}</span>
                    <span className="text-[11px] font-medium text-gray-500">{item.course}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                      item.status === "Active" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                    )}>
                      {item.status}
                    </Badge>
                    <span className="text-[10px] font-medium text-gray-400">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <div className="p-8 pb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Top Performers</h3>
            <Button variant="link" className="text-indigo-600 font-bold text-sm h-auto p-0 flex items-center gap-1 group">
              View all <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2 px-4">
              {topPerformers.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-sm font-black", item.color)}>
                    {item.rank}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-900 truncate">{item.name}</span>
                    <span className="text-[11px] font-medium text-gray-500">{item.category}</span>
                  </div>
                  <span className="text-xl font-black text-gray-900">{item.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
