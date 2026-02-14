import Image from "next/image";
import { Target, Lightbulb, Brain, Trophy } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/About-Us.jpg"
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

      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-[radial-gradient(hsl(var(--primary)/0.1)_2px,transparent_2px)] [background-size:16px_16px] -z-0"></div>
              <div className="relative z-10">
                <Image
                  src="/about-image-vector.jpg"
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
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#35a3be]/10 border border-[#35a3be]/20 mb-6">
                  <span className="h-2 w-2 rounded-full bg-[#35a3be] animate-pulse"></span>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#35a3be' }}>ABOUT</p>
                </div>
                <h2 className="text-4xl font-bold font-serif leading-tight" style={{ color: '#182d45' }}>
                  What Makes Us Different
                </h2>
              </div>

              <div className="relative space-y-10">
                
                <div className="relative flex items-start gap-8">
                   <div className="relative flex h-16 w-16 items-center justify-center rounded-full text-white flex-shrink-0 z-10 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default" style={{ backgroundColor: '#0d4f5c' }}>
                    <Target className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600 font-medium">
                      Everyone is an achiever.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-8">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full text-white flex-shrink-0 z-10 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default" style={{ backgroundColor: '#0d4f5c' }}>
                    <Lightbulb className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600 font-medium">
                      Every student needs a unique method to deliver the concept.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-8">
                   <div className="relative flex h-16 w-16 items-center justify-center rounded-full text-white flex-shrink-0 z-10 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default" style={{ backgroundColor: '#0d4f5c' }}>
                    <Brain className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600 font-medium">
                      BEC works in many unique ways to deliver the concepts to the students' mind which is more efficient than a common teaching methodology for different personalities.
                    </p>
                  </div>
                </div>

                 <div className="relative flex items-start gap-8">
                   <div className="relative flex h-16 w-16 items-center justify-center rounded-full text-white flex-shrink-0 z-10 transition-all duration-300 hover:scale-110 hover:shadow-md cursor-default" style={{ backgroundColor: '#0d4f5c' }}>
                    <Trophy className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="mt-2 text-gray-600 font-medium">
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
