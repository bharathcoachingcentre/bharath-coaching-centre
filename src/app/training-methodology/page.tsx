import Image from "next/image";

export default function TrainingMethodologyPage() {
  const howItWorksSteps = [
    {
      number: "1",
      description: "We don’t believe in training students to memorize the lessons which have been taught in school.",
      position: "top-8",
    },
    {
      number: "2",
      description: "Our academy teaches each and every concept in the syllabus in a very interactive way to make them understand concepts more easily.",
      position: "top-1/4",
    },
    {
      number: "3",
      description: "Students will be questioned based on the concept as soon as it has been taught in the class to analyze their understanding.",
      position: "top-1/2 -translate-y-1/2",
    },
    {
      number: "4",
      description: "Weekly tests are conducted by piling up the concepts which has been taught in the particular week.",
      position: "bottom-1/4",
    },
    {
      number: "5",
      description: "Then the entire book will be divided as 25%, 50%, 100% and be delivered as test to pile up the lessons gradually into the students' mind.",
      position: "bottom-8",
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
                Training Methodology
              </h2>
            </div>
            <div className="md:col-span-2 relative">
                <div id="methodology-steps" className="relative w-full max-w-lg mx-auto">
                    <Image
                        src="/Coaching.png"
                        alt="Coaching"
                        width={400}
                        height={600}
                        className="rounded-lg shadow-lg"
                        data-ai-hint="coaching session"
                    />
                    <div className="absolute inset-0">
                        {howItWorksSteps.map((step) => (
                            <div key={step.number} className={`absolute right-0 flex items-center gap-6 w-96 ${step.position}`}>
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0 text-2xl shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl cursor-default">
                                    {step.number}
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
