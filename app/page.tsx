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
import InteractiveBackground from '@/components/InteractiveBackground';

type ViewMode = 'mac' | 'terminal';

export default function Home() {
  const [viewMode, setViewMode] = useState<ViewMode>('mac');
  const [isMinimized, setIsMinimized] = useState(false);
  const [interactionRadius, setInteractionRadius] = useState(75);
  const [ballCount, setBallCount] = useState(1000);

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
    </>
  );
}
