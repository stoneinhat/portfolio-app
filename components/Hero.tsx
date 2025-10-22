'use client';

import Image from 'next/image';
import { FileDown } from 'lucide-react';
import { portfolioData } from '@/lib/portfolioData';

export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-[calc(50vh)] flex items-center justify-center px-4 md:px-6 py-12"
    >
      <div className="w-full max-w-6xl">
        {/* Hero Card with Gradient */}
        <div className="relative rounded-3xl p-8 md:p-12 backdrop-blur-sm border overflow-hidden bg-gradient-primary" style={{ 
          borderColor: 'rgba(97, 153, 133, 0.2)'
        }}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(97, 153, 133, 0.15)' }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: 'rgba(223, 189, 136, 0.15)' }}></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Large Profile Image (uses the same image as Sidebar top) */}
            <div className="order-1 md:order-2 flex-shrink-0 w-64 h-64 rounded-full overflow-hidden ring-2 shadow-lg ring-[rgba(97,153,133,0.5)]">
              <Image
                src="/Joshua zoomed in.png"
                alt="Profile Picture"
                width={256}
                height={256}
                className="object-cover w-64 h-64"
                priority
              />
            </div>

            {/* Text Content */}
            <div className="order-2 md:order-1 flex-1 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
                {portfolioData.name}
              </h1>
              <p className="text-lg md:text-xl mb-6 leading-relaxed max-w-2xl text-primary">
                {portfolioData.about}
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg bg-secondary text-primary hover:bg-accent"
              >
                <FileDown className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

