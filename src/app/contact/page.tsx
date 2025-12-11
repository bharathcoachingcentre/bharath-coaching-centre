
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
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="bg-card p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                <ContactForm />
            </div>
            <div className="space-y-8 flex flex-col justify-center">
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <MapPin className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Our Address</h3>
                        <p className="text-muted-foreground">123 Education Lane, Knowledge City, 12345</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <Mail className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Email Us</h3>
                        <p className="text-muted-foreground">contact@bharathacademy.com</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                        <Phone className="h-8 w-8" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">Call Us</h3>
                        <p className="text-muted-foreground">(123) 456-7890</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
