'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import MacWindow from '@/components/MacWindow';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

// Dynamically import heavy interactive components
const LinuxTerminal = dynamic(() => import('@/components/LinuxTerminal'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-white">Loading terminal...</div>
});

const InteractiveBackground = dynamic(() => import('@/components/InteractiveBackground'), {
  ssr: false
});

type ViewMode = 'mac' | 'terminal';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('mac');
  const [isMinimized, setIsMinimized] = useState(false);
  const [interactionRadius, setInteractionRadius] = useState(75);
  const [ballCount, setBallCount] = useState(400);

  // iOS fallback for viewport height
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'mac' ? 'terminal' : 'mac');
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const handleRadiusChange = (radius: number) => {
    setInteractionRadius(radius);
  };

  const handleBallCountChange = (count: number) => {
    setBallCount(count);
  };

  return (
    <>
      <InteractiveBackground 
        isInteractive={isMinimized || viewMode === 'terminal'} 
        viewMode={viewMode}
        isMinimized={isMinimized}
        interactionRadius={interactionRadius}
        ballCount={ballCount}
      />
      <MacWindow 
        onRedButtonClick={toggleViewMode} 
        onYellowButtonClick={toggleMinimize}
        isMinimized={isMinimized}
        interactionRadius={interactionRadius}
        onRadiusChange={handleRadiusChange}
        ballCount={ballCount}
        onBallCountChange={handleBallCountChange}
        viewMode={viewMode}
      >
        {viewMode === 'mac' ? (
          <>
            <Sidebar />
            <main className="flex-grow min-w-0 overflow-y-auto overflow-x-hidden custom-scrollbar pb-[env(safe-area-inset-bottom)]" data-scroll-container>
              <Hero />
              <Contact />
              <Skills />
              <Experience />
              <Projects />
              <Education />
            </main>
          </>
        ) : (
          <LinuxTerminal onBack={toggleViewMode} />
        )}
      </MacWindow>
    </>
  );
}
