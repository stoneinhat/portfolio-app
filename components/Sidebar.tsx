'use client';

import Image from 'next/image';
import { Folder, Target, Briefcase, Code, GraduationCap, Linkedin, Github, Phone, Mail } from 'lucide-react';

interface SidebarProps {
  activeSection?: string;
}

export default function Sidebar({ activeSection = 'about' }: SidebarProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = document.querySelector('.custom-scrollbar') as HTMLElement | null;
    if (element && container) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const targetTop = elementRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: targetTop, behavior: 'smooth' });
    } else if (element) {
      // Fallback: smooth scroll if container not found
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const categories = [
    { id: 'about', label: 'About', icon: Folder },
    { id: 'skills', label: 'Skills', icon: Target },
    { id: 'experience', label: 'Jobs', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'education', label: 'Education', icon: GraduationCap },
  ];

  const socialLinks = [
    { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { label: 'GitHub', icon: Github, href: 'https://github.com' },
    { label: 'Phone', icon: Phone, href: 'tel:+1234567890' },
    { label: 'Email', icon: Mail, href: 'mailto:john@example.com' },
  ];

  return (
    <aside className="w-16 md:w-64 backdrop-blur-sm border-r flex flex-col h-full bg-dark-olive-light" style={{ borderColor: 'rgba(97, 153, 133, 0.3)' }}>
      {/* Profile Picture Section */}
      <div className="hidden md:flex p-3 md:p-5 justify-center flex-shrink-0">
        <div className="relative w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 shadow-lg ring-[rgba(97,153,133,0.5)]">
          <Image
            src="/Joshua (2).JPG"
            alt="Profile Picture"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      
      <div className="px-2 md:px-5 flex-1 flex flex-col pb-4">
      {/* Categories Section */}
      <div className="mb-8">
        <h2 className="hidden md:block text-xs font-semibold uppercase tracking-wider mb-3 text-accent">
          Categories
        </h2>
        <nav className="space-y-1.5">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.id)}
                className="w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-2.5 py-2 md:py-2 rounded-md transition-all group relative hover:scale-105 text-primary hover:bg-teal-medium hover:text-accent"
                title={category.label}
                aria-label={category.label}
              >
                <Icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="hidden md:inline text-sm">{category.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Divider on mobile between categories and social */}
      <div className="md:hidden border-t my-2 mx-1" style={{ borderColor: 'rgba(97, 153, 133, 0.25)' }} />

      {/* Social Links Section */}
      <div className="mt-4 md:mt-auto">
        <h2 className="hidden md:block text-xs font-semibold uppercase tracking-wider mb-3 text-accent">
          Social Link
        </h2>
        <nav className="space-y-1.5">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center md:justify-start gap-2.5 px-2 md:px-2.5 py-2 md:py-2 rounded-md transition-all group relative hover:scale-105 text-primary hover:bg-teal-medium hover:text-accent"
                title={link.label}
                aria-label={link.label}
              >
                <Icon className="w-4.5 h-4.5 group-hover:scale-110 transition-transform flex-shrink-0" />
                <span className="hidden md:inline text-sm">{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
      </div>
    </aside>
  );
}

