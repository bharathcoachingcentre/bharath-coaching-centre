
import Image from "next/image";
import { Rocket, Globe } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export default function CompartmentPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Online-Course.jpg"
          alt="12th Compartment Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            12th Compartment
          </h1>
        </div>
      </section>

      <section style={{ backgroundColor: 'rgb(69 180 232)' }} className="py-20 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="flex items-center justify-center text-center">
                <h2 className="font-bold mb-4" style={{ fontSize: '55px' }}>Benefits</h2>
              </div>
              <div className="text-center">
                <div className="inline-block p-5 bg-white/10 rounded-full mb-4 border border-white/20">
                  <div className="p-3 bg-white rounded-full">
                    <Globe className="w-8 h-8" style={{ color: 'rgb(69 180 232)' }} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Learn Together</h3>
                <p className="text-white/80 mb-4">
                  Join millions of people from around the world learning together. Try it now!
                </p>
              </div>
            </div>
            <div>
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
