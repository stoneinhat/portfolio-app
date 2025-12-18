import { portfolioData } from '@/lib/portfolioData';

export default function Experience() {
  const experiences = portfolioData.experience;

  return (
    <section id="experience" className="py-20 px-4 md:px-6 bg-dark-olive-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="rounded-lg p-6 bg-primary"
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

