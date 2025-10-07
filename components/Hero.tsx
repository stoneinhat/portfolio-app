'use client';

import { FileDown, User } from 'lucide-react';

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
            {/* Text Content */}
            <div className="flex-1 z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-secondary">
                  <User className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-primary">
                John Doe
              </h1>
              <p className="text-lg md:text-xl mb-6 leading-relaxed max-w-2xl text-primary">
                Innovative Front-End Developer with +5 years of expertise in building 
                responsive, high-performance web applications using Angular, Vue, and React. 
                Passionate about merging user-centric design with cutting-edge technology to 
                solve complex problems. Proven ability to lead cross-functional teams, mentor 
                junior developers, and deliver scalable solutions aligned with Agile workflows.
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

            {/* Illustration/Image Placeholder */}
            <div className="flex-shrink-0 w-64 h-64 rounded-full flex items-center justify-center backdrop-blur-sm border bg-gradient-primary" style={{
              borderColor: 'rgba(97, 153, 133, 0.3)'
            }}>
              <div className="text-6xl">💻</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

