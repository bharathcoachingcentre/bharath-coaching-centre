
import Image from "next/image";
import { Rocket, Globe, Leaf, Headset, HeartHandshake, Users } from "lucide-react";
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

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold tracking-widest text-primary" style={{ fontSize: '40px', paddingBottom: '30px' }}>Benefits</p>
              <div className="flex items-center gap-4">
                <div className="inline-block p-4 bg-primary/10 rounded-full">
                    <Rocket className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold font-serif text-gray-800 leading-tight">
                  Customized Timetable
                </h2>
              </div>
            </div>
            <div>
                <p className="text-muted-foreground">Dignissim sed auctor morbi ut volutpat malesuada. Fringilla quam sit sagittis risus nullam amet tincidunt eget dictumst.</p>
            </div>
          </div>
          <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Leaf className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Natural Harmony</h3>
                <p className="text-muted-foreground">Porta fames malesuada arcu lacus. Sagittis et et facilisi commodo.</p>
            </div>
            <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Headset className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Informed Guidance</h3>
                <p className="text-muted-foreground">Porta fames malesuada arcu lacus. Sagittis et et facilisi commodo.</p>
            </div>
            <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Purpose Driven</h3>
                <p className="text-muted-foreground">Porta fames malesuada arcu lacus. Sagittis et et facilisi commodo.</p>
            </div>
            <div className="text-center">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                    <HeartHandshake className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Genuine Connection</h3>
                <p className="text-muted-foreground">Porta fames malesuada arcu lacus. Sagittis et et facilisi commodo.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
