
import Image from "next/image";
import { Smile, CalendarCheck, Coffee, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="https://picsum.photos/seed/about-us-banner/1200/400"
          alt="About Us Banner"
          fill
          className="object-cover"
          data-ai-hint="woman yoga"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            About Us
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[radial-gradient(hsl(var(--primary)/0.1)_2px,transparent_2px)] [background-size:16px_16px] -z-0"></div>
              <div className="relative z-10">
                <Image
                  src="https://picsum.photos/seed/counseling/600/700"
                  alt="Counseling session"
                  width={600}
                  height={700}
                  className="rounded-lg shadow-2xl object-cover"
                  data-ai-hint="counseling session"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="h-2 w-2 rounded-full bg-primary"></span>
                  <p className="text-sm font-semibold tracking-widest text-primary">ABOUT</p>
                </div>
                <h2 className="text-4xl font-bold font-serif text-gray-800 leading-tight">
                  What Makes Us Different
                </h2>
              </div>

              <div className="relative space-y-10">
                <div className="absolute left-8 top-16 h-10 w-px border-l-2 border-dashed border-gray-300"></div>
                <div className="absolute left-8 top-[14.5rem] h-10 w-px border-l-2 border-dashed border-gray-300"></div>
                <div className="absolute left-8 top-[24.5rem] h-10 w-px border-l-2 border-dashed border-gray-300"></div>

                <div className="relative flex items-start gap-8">
                   <div className="flex h-16 w-16 items-center justify-center rounded-full text-primary flex-shrink-0 z-10 bg-white" style={{ backgroundColor: '#1b9df31a' }}>
                    <Smile className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600">
                      Everyone is an achiever.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full text-primary flex-shrink-0 z-10 bg-white" style={{ backgroundColor: '#1b9df31a' }}>
                    <CalendarCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600">
                      Every student needs a unique method to deliver the concept.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-8">
                   <div className="flex h-16 w-16 items-center justify-center rounded-full text-primary flex-shrink-0 z-10 bg-white" style={{ backgroundColor: '#1b9df31a' }}>
                    <Coffee className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600">
                      BEC works in many unique ways to deliver the concepts to the students' mind which is more efficient than a common teaching methodology for different personalities.
                    </p>
                  </div>
                </div>

                 <div className="relative flex items-start gap-8">
                   <div className="flex h-16 w-16 items-center justify-center rounded-full text-primary flex-shrink-0 z-10 bg-white" style={{ backgroundColor: '#1b9df31a' }}>
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600">
                      Our moto “Everyone is an achiever.” stands as our ultimate goal is to train up any student who step into our academy and turn them up into an achiever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
