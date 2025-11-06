import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="https://picsum.photos/seed/about-us-banner/1200/400"
          alt="About Us Banner"
          fill
          className="object-cover"
          data-ai-hint="woman yoga"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            About Us
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                Our Story & <span className="text-primary">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Founded with a passion for excellence, Bharath Academy has been a beacon of knowledge and a nurturing ground for young minds. We believe in an education that goes beyond textbooks, one that sparks curiosity and builds character.
              </p>
              <p className="text-muted-foreground">
                Our mission is to empower students to achieve their full academic and personal potential. We are committed to creating a community of learners who are not just successful in their careers but are also compassionate and responsible global citizens.
              </p>
            </div>
            <div>
              <Image 
                src="https://picsum.photos/seed/about-story/600/500"
                alt="Students learning together"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
                data-ai-hint="students learning"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}