
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
      <section className="py-12 bg-gray-50 text-center">
        <div className="container mx-auto px-4">
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We'd love to hear from you. Please fill out the form below or reach out to us through our contact details.
          </p>
        </div>
      </section>
       <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-lg text-primary font-semibold">Get in touch</p>
            <h2 className="text-4xl font-bold font-serif text-gray-800">With Bharath Academy</h2>
          </div>
          <div className="border-t border-gray-200 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4">
                  <MapPin className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Our Address</h3>
                  <p className="text-muted-foreground mt-1">123 Education Lane, Knowledge City, 12345</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4">
                  <Mail className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email Us</h3>
                  <p className="text-muted-foreground mt-1">contact@bharathacademy.com</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full border-2 border-primary/50 text-primary mb-4">
                  <Phone className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Call Us</h3>
                  <p className="text-muted-foreground mt-1">(123) 456-7890</p>
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
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <ContactForm />
            </div>
            <div className="relative rounded-lg overflow-hidden min-h-[400px]">
                <Image 
                    src="https://picsum.photos/seed/contactForm/800/600"
                    alt="Contact form background"
                    fill
                    className="object-cover"
                    data-ai-hint="library student"
                />
                 <div className="absolute inset-0 bg-black/30"></div>
                 <div className="relative z-10 p-8 flex flex-col justify-end h-full text-white">
                     <h3 className="text-2xl font-bold">Connect with Our Experts</h3>
                     <p className="mt-2">Have a question? Our team is here to help you on your educational journey.</p>
                 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
