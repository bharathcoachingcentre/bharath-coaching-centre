"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Star, 
  Trophy, 
  Medal, 
  Award,
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  Cell,
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const performanceStats = [
  { label: "Average Score", value: "78.4%", trend: "+3.2% vs last term", trendColor: "text-emerald-500", icon: TrendingUp, iconColor: "text-purple-600", iconBg: "bg-purple-100" },
  { label: "Pass Rate", value: "94.2%", trend: "+1.8% improvement", trendColor: "text-emerald-500", icon: Star, iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
  { label: "Top Scorers", value: "45", trend: "Students scored A+", trendColor: "text-gray-400", icon: Trophy, iconColor: "text-orange-600", iconBg: "bg-orange-100" },
  { label: "Distinctions", value: "127", trend: "+15 this semester", trendColor: "text-emerald-500", icon: Award, iconColor: "text-blue-600", iconBg: "bg-blue-100" },
];

const gradeData = [
  { name: "A+", total: 45 },
  { name: "A", total: 82 },
  { name: "B+", total: 120 },
  { name: "B", total: 95 },
  { name: "C+", total: 60 },
  { name: "C", total: 38 },
  { name: "D", total: 15 },
  { name: "F", total: 5 },
];

const leaderboard = [
  { rank: "#1", name: "Ananya Krishnan", course: "Class 10 CBSE", score: "98.6%", grade: "A+", icon: "🥇" },
  { rank: "#2", name: "Arjun Mehta", course: "Class 12 CBSE", score: "97.8%", grade: "A+", icon: "🥈" },
  { rank: "#3", name: "Divya Nair", course: "Class 10 Samacheer", score: "96.4%", grade: "A+", icon: "🥉" },
  { rank: "#4", name: "Rohan Kapoor", course: "Class 12 CBSE", score: "95.2%", grade: "A+", icon: null },
  { rank: "#5", name: "Sanya Gupta", course: "Class 10 CBSE", score: "94.8%", grade: "A", icon: null },
  { rank: "#6", name: "Vikram Malhotra", course: "Class 12 Samacheer", score: "94.2%", grade: "A", icon: null },
  { rank: "#7", name: "Nisha Reddy", course: "Class 10 CBSE", score: "93.9%", grade: "A", icon: null },
  { rank: "#8", name: "Kabir Singh", course: "Class 12 CBSE", score: "93.5%", grade: "A", icon: null },
  { rank: "#9", name: "Alex Johnson", course: "Class 10 CBSE", score: "91.5%", grade: "A", icon: null },
  { rank: "#10", name: "Maria Garcia", course: "Class 12 CBSE", score: "91%", grade: "A", icon: null },
];

export default function ResultsPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceStats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[24px] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", stat.iconBg)}>
                  <stat.icon className={cn("w-7 h-7", stat.iconColor)} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-sm font-semibold text-gray-500 leading-none mb-2">{stat.label}</span>
                  <span className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</span>
                  <span className={cn("text-[11px] font-bold mt-1", stat.trendColor)}>
                    {stat.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Grade Distribution Chart */}
        <Card className="lg:col-span-2 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Academic Grade Distribution</h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
                    domain={[0, 120]}
                    ticks={[0, 30, 60, 90, 120]}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]} barSize={60}>
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#4f46e5" fillOpacity={0.8 + (index * 0.02)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Hall of Fame */}
        <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
          <CardContent className="p-8 text-left">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl">🏆</span>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">Hall of Fame</h3>
            </div>
            <div className="space-y-4">
              {leaderboard.slice(0, 3).map((item, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-6 rounded-[24px] flex items-center justify-between transition-all duration-300",
                    idx === 0 
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg shadow-orange-200" 
                      : "bg-slate-50 text-gray-900 hover:bg-slate-100"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm",
                      idx === 0 ? "bg-white/20" : "bg-white"
                    )}>
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm leading-tight">{item.name}</span>
                      <span className={cn(
                        "text-[11px] font-medium opacity-80",
                        idx === 0 ? "text-orange-50" : "text-gray-400"
                      )}>{item.course}</span>
                    </div>
                  </div>
                  <span className="text-xl font-black">{item.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top 10 Leaderboard Table */}
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden bg-white">
        <CardContent className="p-8 text-left">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Top 10 Leaderboard</h3>
          <div className="rounded-[24px] border border-gray-100 overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50/80 border-b border-gray-100">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Rank</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Student</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Board/Class</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Score</TableHead>
                  <TableHead className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-900">Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboard.map((item, idx) => (
                  <TableRow key={idx} className="border-gray-50 hover:bg-gray-50/50 transition-colors group">
                    <TableCell className="px-8 py-6 font-bold text-gray-900 text-sm">
                      {item.icon ? (
                        <span className="text-lg">{item.icon}</span>
                      ) : (
                        item.rank
                      )}
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <span className="font-bold text-gray-900">{item.name}</span>
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <span className="font-bold text-gray-400 text-sm">{item.course}</span>
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <span className="font-black text-gray-900">{item.score}</span>
                    </TableCell>
                    <TableCell className="px-8 py-6">
                      <Badge className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-black border-none shadow-none",
                        item.grade === "A+" 
                          ? "bg-indigo-100 text-indigo-600" 
                          : "bg-blue-100 text-blue-600"
                      )}>
                        {item.grade}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}