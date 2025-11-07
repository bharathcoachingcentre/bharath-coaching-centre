
'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const resultsData: Record<string, { src: string; alt: string; hint: string }> = {
  '2025': { src: 'https://placehold.co/800x600/png?text=Result+2025', alt: 'Result 2025', hint: 'result chart' },
  '2024': { src: '/2024-Result.jpg', alt: 'Result 2024', hint: 'result chart' },
  '2023': { src: 'https://placehold.co/800x600/png?text=Result+2023', alt: 'Result 2023', hint: 'result chart' },
  '2022': { src: '/2022-Result.jpg', alt: 'Result 2022', hint: 'result chart' },
  '2021': { src: '/2021-Result.png', alt: 'Result 2021', hint: 'result chart' },
};

const years = Object.keys(resultsData);

export default function OurResultsPage() {
  const [selectedYear, setSelectedYear] = React.useState<string>(years[0]);

  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Our-result.jpg"
          alt="Our Results Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Our Results
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Achievements</h2>
          <div className="flex justify-center gap-4 mb-12">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? 'default' : 'outline'}
                onClick={() => setSelectedYear(year)}
              >
                {year}
              </Button>
            ))}
          </div>
          <div className="mt-8">
            <Image
              src={resultsData[selectedYear].src}
              alt={resultsData[selectedYear].alt}
              width={800}
              height={600}
              className="w-full max-w-4xl mx-auto rounded-lg shadow-lg"
              data-ai-hint={resultsData[selectedYear].hint}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
