'use client';

import React, { useEffect, useState } from 'react';
import ReactCalendar from 'react-calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import type { Event } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getBadgeVariant = (category: Event['category']) => {
    switch (category) {
      case 'Workshop':
        return 'default';
      case 'Seminar':
        return 'secondary';
      case 'Deadline':
        return 'destructive';
      case 'Holiday':
        return 'outline';
      default:
        return 'default';
    }
  }

  // Function to determine if a tile should have an event marker
  const tileContent = ({ date: tileDate, view }: { date: Date, view: string }) => {
    if (view === 'month') {
      const hasEvent = events.some(
        event => 
          event.date.getDate() === tileDate.getDate() &&
          event.date.getMonth() === tileDate.getMonth() &&
          event.date.getFullYear() === tileDate.getFullYear()
      );
      return hasEvent ? <div className="h-1 w-1 bg-[#35a3be] rounded-full mx-auto mt-1" /> : null;
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Events Calendar</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Stay informed about all the important happenings at Bharath Academy.
        </p>
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
            <Card className="border-none shadow-xl rounded-2xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#182d45]">Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                        {events.sort((a,b) => a.date.getTime() - b.date.getTime()).map((event) => (
                             <li key={event.id} className="flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gray-50 border border-transparent hover:border-gray-100">
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#174f5f] to-[#35a3be] text-white rounded-xl h-20 w-20 shadow-lg">
                                    <span className="text-xs font-black uppercase tracking-tighter">{event.date.toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-3xl font-black">{event.date.getDate()}</span>
                                    <span className="text-[10px] font-bold opacity-80">{event.date.getFullYear()}</span>
                                </div>
                                <div className="flex-grow pt-1">
                                    <Badge variant={getBadgeVariant(event.category)} className="mb-2">{event.category}</Badge>
                                    <h4 className="font-extrabold text-xl text-[#182d45]">{event.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{event.description}</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <Card className="flex flex-col items-center justify-center p-6 border-none shadow-2xl rounded-[2rem] bg-white">
              {isMounted && (
                <ReactCalendar
                  onChange={(val) => setDate(val as Date)}
                  value={date}
                  tileContent={tileContent}
                  calendarType="gregory"
                  className="border-none"
                />
              )}
              <div className="mt-8 w-full space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 px-2">Priority Legend</h4>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-bold">
                    <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-200"></div>
                    <span>Deadlines</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-cyan-50 text-cyan-700 text-sm font-bold">
                    <div className="w-3 h-3 rounded-full bg-[#35a3be] shadow-sm shadow-cyan-200"></div>
                    <span>Academy Events</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
