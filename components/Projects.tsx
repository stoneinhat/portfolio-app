'use client';

import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demo: string;
}

export default function Projects() {
  const projects: Project[] = [
    {
      title: 'The Piped Peony Academy',
      description: 'Full-featured e-learning platform for buttercream piping courses with subscription management, e-commerce shop, video library, recipe database, user authentication, and Stripe payment integration.',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Clerk Auth', 'Stripe', 'Strapi CMS', 'Radix UI', 'shadcn/ui'],
      demo: 'https://thepipedpeony.com',
    },
    {
      title: 'Modern Metals Website',
      description: 'Custom WordPress marketing site with portfolio galleries, team profiles, testimonials, and a contact modal.',
      technologies: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS'],
      demo: 'https://modernmetalsutah.com',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-lg p-6 hover-scale-105 transition-all bg-primary hover-bg-teal-light"
            >
              <h3 className="text-xl font-semibold mb-3 text-primary">{project.title}</h3>
              <p className="mb-4 text-primary">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm rounded-full bg-teal-light text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors text-accent hover:text-primary"
                  aria-label={`View ${project.title} live demo`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

