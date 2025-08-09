import { ContactForm } from "@/components/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          We'd love to hear from you. Please fill out the form below or reach out to us through our contact details.
        </p>
      </div>
      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
            <ContactForm />
        </div>
        <div className="space-y-8">
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Our Address</h3>
                    <p className="text-muted-foreground">123 Education Lane, Knowledge City, 12345</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Email Us</h3>
                    <p className="text-muted-foreground">contact@bharathacademy.com</p>
                </div>
            </div>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" />
                </div>
                <div>
                    <h3 className="text-xl font-semibold">Call Us</h3>
                    <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
