'use client';

import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
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
       <section className="py-16 md:py-24" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 rounded-full border font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: '#35a3be', backgroundColor: 'rgba(53, 163, 190, 0.05)', borderColor: 'rgba(53, 163, 190, 0.2)' }}
            >
              Get in touch
            </span>
            <h2 className="text-4xl font-bold font-serif text-gray-800">With Bharath Academy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Address Card */}
            <div className="group bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/60 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(8,112,184,0.1)] hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#35a3be] group-hover:rotate-[10deg]">
                <MapPin className="w-8 h-8 text-[#35a3be] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-[#182d45] mb-3">Our Address</h3>
              <a 
                href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 font-medium hover:text-[#35a3be] transition-colors leading-relaxed"
              >
                C-109, 5th Cross, Thillainagar (East),<br />Trichy - 18
              </a>
            </div>

            {/* Email Card */}
            <div className="group bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/60 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(8,112,184,0.1)] hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#35a3be] group-hover:rotate-[10deg]">
                <Mail className="w-8 h-8 text-[#35a3be] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-[#182d45] mb-3">Email Us</h3>
              <a 
                href="mailto:bcc_try@hotmail.com" 
                className="text-gray-600 font-medium hover:text-[#35a3be] transition-colors"
              >
                bcc_try@hotmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="group bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/60 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(8,112,184,0.1)] hover:-translate-y-2 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#35a3be] group-hover:rotate-[10deg]">
                <Phone className="w-8 h-8 text-[#35a3be] group-hover:text-white transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-bold text-[#182d45] mb-3">Call Us</h3>
              <a 
                href="tel:+917200030307" 
                className="text-gray-600 font-medium hover:text-[#35a3be] transition-colors"
              >
                +91 7200030307
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="py-12 md:py-16" style={{ backgroundColor: 'rgb(245 250 255)' }}>
        <div className="container mx-auto px-4">
          
          <div className="grid gap-12 md:grid-cols-2">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-white/60">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
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
