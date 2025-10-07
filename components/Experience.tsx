'use client';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading development of enterprise web applications using React, Next.js, and Node.js. Mentoring junior developers and architecting scalable solutions.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Built and maintained multiple client websites and web applications. Implemented responsive designs and optimized performance.',
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc',
      period: '2018 - 2020',
      description: 'Developed user interfaces for SaaS products. Collaborated with designers and backend engineers to deliver high-quality features.',
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 md:px-6 bg-dark-olive-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="rounded-lg p-6 transition-all hover-scale bg-primary hover-bg-teal-light"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-2xl font-semibold text-primary">{exp.title}</h3>
                <span className="text-sm md:text-base text-accent">{exp.period}</span>
              </div>
              <p className="mb-3 text-secondary">{exp.company}</p>
              <p className="leading-relaxed text-primary">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

