// Centralized portfolio data source
// This file serves as the single source of truth for all portfolio information

export interface Skill {
  name: string;
  icon: string;
  color: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  description: string;
  certificates?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
}

export interface PortfolioData {
  name: string;
  about: string;
  contact: ContactInfo;
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  education: EducationItem[];
}

export const portfolioData: PortfolioData = {
  name: "Joshua Tesch",
  about: "Full-Stack Developer and Computer Science student at Salt Lake Community College, specializing in modern web applications with React, Next.js, and TypeScript. Experienced in building production-ready solutions—from complex e-learning platforms with Stripe payments and CMS integration, to custom WordPress sites and API-driven dashboards. Passionate about creating seamless user experiences and writing clean, scalable code that solves real-world problems.",
  contact: {
    email: "atreusassociates@gmail.com",
    phone: "+1 (385) 313-0636",
    location: "Salt Lake City, UT"
  },
  skills: [
    { name: 'HTML', icon: '/html5-without-wordmark-color-logo-png_seeklogo-184157.png', color: '' },
    { name: 'CSS', icon: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Official_CSS_Logo.svg', color: '' },
    { name: 'JavaScript', icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png', color: '' },
    { name: 'TypeScript', icon: '/ts-logo-round-128.svg', color: '' },
    { name: 'Kotlin', icon: '/Kotlin Full Color Logo Mark RGB.svg', color: '' },
    { name: 'Next.js', icon: '/Next.js_Symbol_Alternative_1.png', color: '' },
    { name: 'React', icon: '/react.png', color: '' },
    { name: 'Git', icon: '/icons8-git.svg', color: '' },
    { name: 'Linux', icon: '/500px-NewTux.svg.png', color: '' },
    { name: 'Cisco', icon: '/Cisco_logo_blue_2016.svg.png', color: '' },
    { name: 'WordPress', icon: '/WordPress-logotype-simplified.png', color: '' },
  ],
  experience: [
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
  ],
  projects: [
    {
      title: 'The Piped Peony Academy',
      description: 'Full-featured e-learning platform for buttercream piping courses with subscription management, e-commerce shop, video library, recipe database, user authentication, and Stripe payment integration.',
      technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Clerk Auth', 'Stripe', 'Strapi CMS', 'Radix UI', 'shadcn/ui'],
      github: 'https://github.com/stoneinhat',
      demo: 'https://example.com',
    },
    {
      title: 'Modern Metals Website',
      description: 'Custom WordPress marketing site with portfolio galleries, team profiles, testimonials, and a contact modal.',
      technologies: ['WordPress', 'PHP', 'JavaScript', 'HTML', 'CSS'],
      github: 'https://github.com/stoneinhat',
      demo: 'https://example.com',
    },
    {
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with forecasts, maps, and location-based weather alerts.',
      technologies: ['React', 'TypeScript', 'OpenWeather API', 'Tailwind CSS'],
      github: 'https://github.com/stoneinhat',
      demo: 'https://example.com',
    },
  ],
  education: [
    {
      degree: 'Associate of Science in Computer Science',
      school: 'Salt Lake Community College',
      period: '2024 - 2025',
      certificates: 'With Certificates of Proficiency in Network & Cybersecurity, Network & Systems Administration, and Linux Administration.',
      description: 'Focused on securing and administering mixed Windows/Linux environments: network design and hardening, identity and access management, virtualization and containerization, scripting and automation, monitoring and SIEM-driven analysis, backup and recovery, and incident response across on-prem and cloud. Graduated with honors.',
    },
  ],
};

