'use client';

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const contentArea = document.querySelector('.custom-scrollbar');
    if (contentArea) {
      contentArea.addEventListener('scroll', handleScroll);
      return () => contentArea.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-800/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Name/Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold text-white hover:text-gray-300 transition-colors"
          >
            John Doe
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('experience')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Resume Button */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

