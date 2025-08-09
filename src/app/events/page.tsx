'use client';

import React from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/mock-data";
import type { Event } from '@/lib/types';

export default function EventsPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  const eventDays = events.map(event => event.date);

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
            <Card>
                <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-6">
                        {events.sort((a,b) => a.date.getTime() - b.date.getTime()).map((event) => (
                             <li key={event.id} className="flex items-start space-x-4">
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-primary text-primary-foreground rounded-lg h-20 w-20">
                                    <span className="text-md font-bold uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                                    <span className="text-3xl font-bold">{event.date.getDate()}</span>
                                    <span className="text-xs">{event.date.getFullYear()}</span>
                                </div>
                                <div className="flex-grow pt-1">
                                    <Badge variant={getBadgeVariant(event.category)}>{event.category}</Badge>
                                    <h4 className="font-semibold text-xl mt-1">{event.title}</h4>
                                    <p className="text-sm text-muted-foreground">{event.description}</p>
                                </div>
                             </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="md:col-span-1">
          <Card className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="p-4"
              modifiers={{ event: eventDays }}
              modifiersStyles={{
                event: {
                    border: "2px solid hsl(var(--primary))",
                    borderRadius: 'var(--radius)',
                }
              }}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
