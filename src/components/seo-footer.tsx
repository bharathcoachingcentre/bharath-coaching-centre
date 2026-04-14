"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function SeoFooter() {
  const pathname = usePathname();
  
  // Hide on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const sections = [
    {
      title: "Samacheer Kalvi",
      keywords: [
        "Samacheer Kalvi Solutions",
        "Class 9 Maths Solutions",
        "Class 10 Maths Solutions",
        "Class 11 Maths Solutions",
        "Class 12 Maths Solutions",
        "Samacheer Class 9 Chapter Wise Questions Maths Science Social English",
        "Samacheer Class 10 Chapter Wise Questions Maths Science Social English",
        "Samacheer Class 10 Model Question Paper Maths Science Social English",
        "Samacheer Class 10 Previous Year Question Paper Maths Science Social English",
        "Samacheer Class 11 Chapter Wise Questions Maths Physics Chemistry",
        "Samacheer Class 11 Model & Previous Year Question Paper Maths Physics Chemistry",
        "Samacheer Class 12 Chapter Wise Questions Maths Physics Chemistry",
        "Samacheer Class 12 Model & Previous Year Question Paper Maths Physics Chemistry"
      ]
    },
    {
      title: "NCERT Class 6–8",
      keywords: [
        "NCERT Solutions",
        "NCERT Class 6 7 8 Chapter Wise Questions Maths Science Social English",
        "Class 6 NCERT Solutions Maths Science",
        "Class 7 NCERT Solutions Maths Science",
        "Class 8 NCERT Solutions Maths Science",
        "NCERT Class 6 Chapter Wise Questions",
        "NCERT Class 7 Chapter Wise Questions",
        "NCERT Class 8 Chapter Wise Questions"
      ]
    },
    {
      title: "NCERT Class 9–12",
      keywords: [
        "NCERT Class 9 Solutions & Chapter Wise Questions Maths Science Social English",
        "NCERT Class 10 Solutions Chapter Wise Model & Previous Year Question Paper Maths Science Social English",
        "NCERT Class 11 Solutions Chapter Wise Model & Previous Year Question Paper Maths Physics Chemistry",
        "NCERT Class 12 Solutions Chapter Wise Model & Previous Year Question Paper Maths Physics Chemistry",
        "NCERT Previous Year Papers Class 10 12"
      ]
    },
    {
      title: "XSEED Class 6–8",
      keywords: [
        "XSEED Solutions",
        "XSEED Class 6 7 8 Chapter Wise Questions Maths Science Social English",
        "XSEED Class 6 Chapter Wise Questions",
        "XSEED Class 7 Chapter Wise Questions",
        "XSEED Class 8 Chapter Wise Questions",
        "XSEED Maths Science Social English Resources"
      ]
    }
  ];

  return (
    <section className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {sections.map((section, idx) => (
            <div key={idx} className="text-left">
              <h4 className="text-[13px] font-black uppercase tracking-[0.15em] text-[#182d45] mb-6 border-l-4 border-blue-600 pl-3">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.keywords.map((keyword, kIdx) => (
                  <li 
                    key={kIdx} 
                    className="text-[11px] leading-relaxed text-gray-400 hover:text-blue-600 transition-colors duration-300 cursor-default font-medium"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
