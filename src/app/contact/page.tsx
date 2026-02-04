'use client';

import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
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
       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span 
              className="inline-block px-4 py-1.5 rounded-full border font-semibold text-sm uppercase tracking-widest mb-4"
              style={{ color: '#1b9df3', backgroundColor: '#1b9df30d', borderColor: '#1b9df333' }}
            >
              Get in touch
            </span>
            <h2 className="text-4xl font-bold font-serif text-gray-800">With Bharath Academy</h2>
          </div>
          <div className="border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center justify-center">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                <div className="group relative flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4 md:mb-0 transition-colors duration-300 hover:bg-[#45b4e8] hover:text-white hover:border-[#45b4e8]">
                  <MapPin className="h-10 w-10 relative" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Address</h3>
                  <a href="https://www.google.com/maps/search/?api=1&query=BHARATH+COACHING+CENTRE+-+C-109,+2nd+Floor+5th+Cross,+Thillainagar+(East+Near+CETHAR+HOSPITALS),+Tamil+Nadu+620018" target="_blank" rel="noopener noreferrer" className="text-lg text-muted-foreground mt-1 hover:text-primary">
                    C-109, 5th Cross, Thillainagar (East),<br />Trichy - 18
                  </a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                <div className="group relative flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4 md:mb-0 transition-colors duration-300 hover:bg-[#45b4e8] hover:text-white hover:border-[#45b4e8]">
                  <Mail className="h-10 w-10 relative" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <a href="mailto:bcc_try@hotmail.com" className="text-lg text-muted-foreground mt-1 hover:text-primary">bcc_try@hotmail.com</a>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
                <div className="group relative flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4 md:mb-0 transition-colors duration-300 hover:bg-[#45b4e8] hover:text-white hover:border-[#45b4e8]">
                  <Phone className="h-10 w-10 relative" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <a href="tel:+917200030307" className="text-lg text-muted-foreground mt-1 hover:text-primary">+91 7200030307</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          
          <div className="grid gap-12 md:grid-cols-2">
            <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                 <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-6">
                    We'd love to hear from you. Please fill out the form below or reach out to us through our contact details.
                </p>
                <ContactForm />
            </div>
            <div className="relative rounded-lg overflow-hidden min-h-[400px]">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3918.833339879261!2d78.684333!3d10.824063!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf5a243a17405%3A0xa5da4fee80d33420!2sBHARATH%20COACHING%20CENTRE!5e0!3m2!1sen!2sin!4v1765519531548!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 w-full h-full"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
