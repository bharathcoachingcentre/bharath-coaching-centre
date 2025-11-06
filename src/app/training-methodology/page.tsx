import Image from "next/image";

export default function TrainingMethodologyPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Training Method.jpg"
          alt="Training Methodology Banner"
          fill
          className="object-cover"
          data-ai-hint="teacher training"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            Our Training Methodology
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Information about our training methodology will be here.
          </p>
        </div>
      </div>
    </div>
  );
}
