
import Image from "next/image";

export default function OurResultsPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Our-result.jpg"
          alt="Our Results Banner"
          fill
          className="object-cover"
          data-ai-hint="celebrating success"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Our Results
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Achievements</h2>
          <p className="text-lg text-muted-foreground">
            Details about our results and student achievements will be displayed here.
          </p>
        </div>
      </section>
    </div>
  );
}
