'use client';

import { useState } from 'react';
import MacWindow from '@/components/MacWindow';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import LinuxTerminal from '@/components/LinuxTerminal';

type ViewMode = 'mac' | 'terminal';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('mac');

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'mac' ? 'terminal' : 'mac');
  };

  return (
    <MacWindow onRedButtonClick={toggleViewMode}>
      {viewMode === 'mac' ? (
        <>
          <Sidebar />
          <main className="flex-grow overflow-y-auto custom-scrollbar" data-scroll-container>
            <Hero />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>
        </>
      ) : (
        <LinuxTerminal onBack={toggleViewMode} />
      )}
    </MacWindow>
  );
}
