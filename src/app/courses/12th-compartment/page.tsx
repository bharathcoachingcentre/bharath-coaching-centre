
import Image from "next/image";
import { Rocket, Globe, Leaf, Headset, HeartHandshake, Users, Star, Building, FileText, CheckCircle, UserCheck, BookCopy, Clipboard, Edit } from "lucide-react";
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

      <section className="pt-16 md:pt-24 pb-36 bg-[#2C2422] text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-px bg-white"></div>
                <div className="w-4 h-px bg-white"></div>
              </div>
              <h2 className="text-4xl font-bold">Benefits</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 md:col-span-3">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <Clipboard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Daily test</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Unit wise test</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Full mock test</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Quick evaluation</h3>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <UserCheck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Parents' meeting</h3>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                    <BookCopy className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Specialized study material</h3>
                  </div>
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
            <div style={{ width: '550px', marginLeft: '0px', height: '170px' }} className="bg-white p-8 shadow-lg relative w-full flex flex-col justify-center rounded-r-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-2 bg-[#D1A16E] rounded-full">
                  <Star className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Customized Timetable</h3>
                  <p className="text-gray-600">(based on exam date)</p>
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
