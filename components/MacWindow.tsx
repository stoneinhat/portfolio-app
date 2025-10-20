'use client';

import { useState } from 'react';
import { X, Minus, Maximize2 } from 'lucide-react';

interface MacWindowProps {
  children: React.ReactNode;
}

export default function MacWindow({ children }: MacWindowProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden" style={{ backgroundColor: 'rgba(0, 16, 17, 0.6)' }}>
        {/* Title Bar */}
        <div className="px-4 py-3 flex items-center gap-2 flex-shrink-0" style={{ backgroundColor: 'rgba(65, 69, 53, 0.6)' }}>
          {/* Traffic Light Buttons */}
          <div className="flex gap-2">
            {/* Red - Close (decorative) */}
            <button
              className="group w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
              aria-label="Close"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            {/* Yellow - Minimize (decorative) */}
            <button
              className="group w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-all"
              aria-label="Minimize"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            {/* Green - Maximize (functional) */}
            <button
              onClick={toggleFullscreen}
              className="group w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition-all"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* Content Area with Sidebar Layout */}
        <div className="flex-grow flex overflow-hidden" style={{ backgroundColor: 'rgba(0, 16, 17, 0.6)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

