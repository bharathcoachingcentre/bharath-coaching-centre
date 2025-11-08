
import Image from "next/image";
import { Rocket, Globe, Leaf, Headset, HeartHandshake, Users, Star, Building } from "lucide-react";
import { FeedbackForm } from "@/components/feedback-form";

export default function CompartmentPage() {
  return (
    <div>
      <section className="relative h-64 md:h-80 w-full flex items-center justify-center">
        <Image
          src="/Online-Course.jpg"
          alt="12th Compartment Banner"
          fill
          className="object-cover"
          data-ai-hint="online learning"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <h1 className="font-headline text-4xl font-bold text-white md:text-5xl">
            12th Compartment
          </h1>
        </div>
      </section>

      <section style={{ backgroundColor: 'rgb(69 180 232)' }} className="py-20 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="flex items-center justify-center text-center">
                <h2 className="font-bold mb-4" style={{ fontSize: '55px' }}>Benefits</h2>
              </div>
              <div className="text-center">
                <div className="inline-block p-5 bg-white/10 rounded-full mb-4 border border-white/20">
                  <div className="p-3 bg-white rounded-full">
                    <Globe className="w-8 h-8" style={{ color: 'rgb(69 180 232)' }} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Learn Together</h3>
                <p className="text-white/80 mb-4">
                  Join millions of people from around the world learning together. Try it now!
                </p>
              </div>
            </div>
            <div>
              <FeedbackForm />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 md:pt-24 pb-36 bg-[#2C2422] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-white"></div>
                <div className="w-4 h-px bg-white"></div>
              </div>
              <h2 className="text-4xl font-bold">Benefits</h2>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Adults</h3>
                  <p className="text-white/70">Life-changing sessions for adults, no matter what age group they belong to.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Children</h3>
                  <p className="text-white/70">A special session for your kids regarding personal problems and study.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Families</h3>
                  <p className="text-white/70">Join me with your family and we'll discuss your issues to make your bonds better.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Businesses</h3>
                  <p className="text-white/70">Arrange a business session for your organization to boost the outcome.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Building className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">New Point</h3>
                  <p className="text-white/70">This is the description for the new benefit point.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-[100px] py-16 -mt-36 relative z-10">
        <div className="flex items-center">
            <Image
              id="benefit-img"
              src="https://picsum.photos/seed/adultsession/600/400"
              alt="Adult session"
              width={350}
              height={170}
              className="rounded-l-lg shadow-lg object-cover"
              style={{ height: '170px' }}
              data-ai-hint="woman working"
            />
            <div style={{ width: '632px', marginLeft: '0px', height: '170px' }} className="bg-white p-8 shadow-lg relative w-full flex flex-col justify-center rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Adults</h3>
                  <p className="text-gray-600">Life-changing sessions for adults, no matter what age group they belong to.</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-1">
                  <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
                  <span className="w-3 h-3 bg-gray-200 rounded-full"></span>
              </div>
            </div>
        </div>
      </div>

    </div>
  );
}
