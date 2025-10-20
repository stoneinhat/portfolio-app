'use client';

import { GraduationCap } from 'lucide-react';
import { portfolioData } from '@/lib/portfolioData';

export default function Education() {
  const education = portfolioData.education;

  return (
    <section id="education" className="py-20 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Education</h2>
        <div className="space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="rounded-lg p-6 transition-all hover-scale bg-primary hover-bg-teal-light"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg flex-shrink-0 bg-secondary">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-semibold text-primary">{edu.degree}</h3>
                    <span className="text-sm md:text-base text-accent">{edu.period}</span>
                  </div>
                  <p className="mb-3 text-secondary">{edu.school}</p>
                  <p className="leading-relaxed text-primary">{edu.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

