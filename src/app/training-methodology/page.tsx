
import Image from "next/image";

export default function TrainingMethodologyPage() {
  const howItWorksSteps = [
    {
      number: "1",
      description: "Daily interaction with parents through Academic Record.",
    },
    {
      number: "2",
      description: "Daily awareness about student’s performance for the academic inputs to parents through academic record.",
    },
    {
        number: "3",
        description: "Weekly tests and quick evaluation.",
    },
    {
      number: "4",
      description: "Hierarchy of test sessions.",
    },
    {
      number: "5",
      description: "Term wise parents’ meeting.",
    },
  ];

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

      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold font-serif text-gray-800">
                How it all works
              </h2>
              <p className="text-lg text-muted-foreground">
                Placeholder text for how it all works. Donec sagittis
                sagittis vestibulum. Morbi vestibulum neque.
              </p>
            </div>
            <div className="relative">
                <Image
                    src="https://picsum.photos/seed/training/400/600"
                    alt="Training process"
                    width={400}
                    height={600}
                    className="rounded-lg shadow-lg"
                    data-ai-hint="team working"
                />
            </div>
            <div className="space-y-8">
                {howItWorksSteps.map((step) => (
                    <div key={step.number} className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                            {step.number}
                        </div>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                ))}
            </div>
          </div>
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
