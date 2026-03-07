import Image from "next/image";
import { GraduationCap, Users, Heart, Lightbulb, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BecomeATeacherPage() {
  const requirements = [
    {
      icon: GraduationCap,
      title: "Expertise",
      description: "Deep subject matter expertise in your chosen field of instruction.",
      color: "bg-blue-500 shadow-blue-500/30"
    },
    {
      icon: Users,
      title: "Patience",
      description: "Ability to connect with students of varying learning speeds and styles.",
      color: "bg-teal-500 shadow-teal-500/30"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "A genuine love for teaching and witnessing student breakthroughs.",
      color: "bg-purple-500 shadow-purple-500/30"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Willingness to adopt and create unique teaching methodologies.",
      color: "bg-orange-500 shadow-orange-500/30"
    }
  ];

  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src="/Teacher-banner-bcc.jpg"
          alt="Become A Teacher Banner"
          fill
          className="object-cover"
          data-ai-hint="teacher classroom"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Become A Teacher
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
              Join Our Faculty
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight mb-6">Shape The Future With Us</h2>
            <p className="text-lg text-gray-600 font-medium">
              At Bharath Academy, we believe that everyone is an achiever. We are looking for dedicated educators who can deliver complex concepts through unique and interactive methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {requirements.map((item, index) => (
              <div key={index} className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                  <div className={cn(
                    "relative w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-white",
                    item.color
                  )}>
                    <item.icon className="w-10 h-10" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight uppercase">{item.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <div className="inline-block p-10 bg-white/80 backdrop-blur-md rounded-[3rem] border border-white shadow-xl max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Ready To Start Your Journey?</h3>
              <p className="text-gray-600 mb-8 font-medium">
                If you have the passion to transform a student into an achiever, we want to hear from you. Please send your detailed resume and a brief introduction to our team.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-teal-500 hover:from-teal-500 hover:to-blue-600 font-bold py-7 px-10 rounded-2xl text-lg shadow-xl shadow-blue-500/20 transition-all duration-500 transform active:scale-95 group">
                <Link href="/contact" className="flex items-center">
                  Apply Now <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
