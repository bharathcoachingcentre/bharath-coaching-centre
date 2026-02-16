'use client';

import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div>
      <section className="relative w-full flex items-center justify-center" style={{ height: '500px', marginTop: '-140px' }}>
        <Image
          src="/contact-bg1.png"
          alt="Contact Us Banner"
          fill
          className="object-cover"
          data-ai-hint="contact us"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">Contact</h1>
        </div>
      </section>
       <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        {/* Background Blobs for Modern UI feel */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-cyan-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span 
              className="inline-block px-4 py-1.5 rounded-full border font-bold text-xs uppercase tracking-[0.2em] mb-4 shadow-sm"
              style={{ color: '#35a3be', backgroundColor: 'white', borderColor: 'rgba(53, 163, 190, 0.2)' }}
            >
              Get in touch
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#182d45] tracking-tight">With Bharath Academy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {/* Address Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <MapPin className="absolute -right-4 -bottom-4 w-32 h-32 text-[#35a3be]/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53,163,190,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-[#182d45] mb-4 tracking-tight">Our Address</h3>
              <a 
                href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-10 text-gray-600 font-semibold hover:text-[#35a3be] transition-colors leading-relaxed group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span className="block">C-109, 5th Cross,</span>
                  <span className="block">Thillainagar (East),</span>
                  <span className="block">Trichy - 18</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#35a3be] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Navigate Now <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Email Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <Mail className="absolute -right-4 -bottom-4 w-32 h-32 text-[#35a3be]/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53,163,190,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-[#182d45] mb-4 tracking-tight">Email Us</h3>
              <a 
                href="mailto:bcc_try@hotmail.com" 
                className="relative z-10 text-gray-600 font-semibold hover:text-[#35a3be] transition-colors group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span>bcc_try@hotmail.com</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#35a3be] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Send Mail <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <Phone className="absolute -right-4 -bottom-4 w-32 h-32 text-[#35a3be]/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#35a3be]/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#35a3be] to-[#6cc4dc] flex items-center justify-center shadow-[0_10px_20px_rgba(53,163,190,0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Phone className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-extrabold text-[#182d45] mb-4 tracking-tight">Call Us</h3>
              <a 
                href="tel:+917200030307" 
                className="relative z-10 text-gray-600 font-semibold hover:text-[#35a3be] transition-colors group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span>+91 7200030307</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-black uppercase tracking-widest text-[#35a3be] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Call Now <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="py-12 md:py-16" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
          
          <div className="grid gap-12 md:grid-cols-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/60">
                <h2 className="text-2xl font-bold mb-2">SEND US A MESSAGE</h2>
                 <p className="max-w-2xl text-lg text-muted-foreground mb-6">
                    We'd love to hear from you. Please fill out the form below or reach out to us through our contact details.
                </p>
                <ContactForm />
            </div>
            <div className="relative rounded-[2rem] overflow-hidden min-h-[450px] shadow-[0_20px_50px_rgba(8,112,184,0.1)] group/map border border-white transition-all duration-500 hover:shadow-[0_30px_60px_rgba(8,112,184,0.2)] hover:-translate-y-1">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3918.833339879261!2d78.684333!3d10.824063!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5a243a17405%3A0xa5da4fee80d33420!2sBHARATH%20COACHING%20CENTRE!5e0!3m2!1sen!2sin!4v1765519531548!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade" 
                className="absolute inset-0 w-full h-full grayscale-[0.2] transition-all duration-700 group-hover/map:grayscale-0 group-hover/map:scale-[1.02]"
              ></iframe>
              <div className="absolute bottom-6 left-6 right-6 flex justify-center">
                <Button asChild className="bg-white/90 backdrop-blur-md text-[#182d45] hover:bg-white shadow-xl rounded-xl px-6 py-2 font-bold transition-all duration-300 opacity-0 translate-y-4 group-hover/map:opacity-100 group-hover/map:translate-y-0">
                    <a href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2 text-[#35a3be]" />
                        Get Directions
                    </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
