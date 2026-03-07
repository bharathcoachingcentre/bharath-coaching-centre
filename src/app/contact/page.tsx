'use client';

import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="font-body antialiased">
      {/* Hero Section */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ height: '500px' }}>
        <Image
          src="/contact-us-banner-bcc-teaching.jpg"
          alt="Contact Us Banner"
          fill
          className="object-cover"
          data-ai-hint="contact us"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center px-4 pt-20">
          <h1 className="font-headline text-4xl font-bold text-white md:text-6xl drop-shadow-2xl tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-[100px] -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-6 shadow-sm">
              Get in touch
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Connect With <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">Bharath Academy</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            {/* Address Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <MapPin className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-600/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-[0_10px_20px_rgba(37, 99, 235, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Our Address</h3>
              <a 
                href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-10 text-gray-600 font-semibold hover:text-blue-600 transition-colors leading-relaxed group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span className="block">C-109, 5th Cross,</span>
                  <span className="block">Thillainagar (East),</span>
                  <span className="block">Trichy - 18</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Navigate Now <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Email Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <Mail className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-600/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-[0_10px_20px_rgba(37, 99, 235, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Email Us</h3>
              <a 
                href="mailto:bcc_try@hotmail.com" 
                className="relative z-10 text-gray-600 font-semibold hover:text-blue-600 transition-colors group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span>bcc_try@hotmail.com</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Send Mail <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Phone Card */}
            <div className="group relative bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(8,112,184,0.05)] border border-white transition-all duration-500 hover:shadow-[0_30px_70px_rgba(8,112,184,0.12)] hover:-translate-y-3 flex flex-col items-center text-center overflow-hidden">
              <Phone className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-600/5 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-0" />
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center shadow-[0_10px_20px_rgba(37, 99, 235, 0.3)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                  <Phone className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Call Us</h3>
              <a 
                href="tel:+917200030307" 
                className="relative z-10 text-gray-600 font-semibold hover:text-blue-600 transition-colors group/link flex flex-col items-center flex-grow w-full"
              >
                <div className="flex-grow flex flex-col justify-center">
                  <span>+91 7200030307</span>
                </div>
                <div className="mt-4 inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  Call Now <ArrowRight className="ml-1 w-3 h-3" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Form and Map Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-gray-100 text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Send Us A Message</h2>
                 <p className="text-lg text-gray-500 font-normal mb-10">
                    We'd love to hear from you. Please fill out the form below or reach out to us through our contact details.
                </p>
                <ContactForm />
            </div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] shadow-[0_30px_80px_rgba(8,112,184,0.1)] group/map border border-white transition-all duration-500 hover:shadow-[0_40px_100px_rgba(8,112,184,0.15)] hover:-translate-y-1">
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
              <div className="absolute bottom-10 left-10 right-10 flex justify-center">
                <Button asChild className="bg-white/90 backdrop-blur-md text-gray-900 hover:bg-white shadow-2xl rounded-2xl px-8 py-4 font-bold transition-all duration-300 transform group-hover/map:translate-y-0 translate-y-4 opacity-0 group-hover/map:opacity-100">
                    <a href="https://maps.app.goo.gl/gUFgpDmZH1xUzhF56" target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                        Get Directions
                    </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
