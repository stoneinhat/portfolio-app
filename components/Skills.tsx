import { portfolioData } from '@/lib/portfolioData';
import Image from 'next/image';

export default function Skills() {
  const skills = portfolioData.skills;

  return (
    <section id="skills" className="py-20 px-4 md:px-6 bg-dark-olive-light">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-2xl bg-primary"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg overflow-hidden bg-transparent">
                <Image
                  src={skill.icon}
                  alt={`${skill.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain w-16 h-16"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-center text-primary">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

