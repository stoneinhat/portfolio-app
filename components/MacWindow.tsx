'use client';

import { useState } from 'react';
import { Minus, Maximize2, Maximize } from 'lucide-react';

interface MacWindowProps {
  children: React.ReactNode;
  onRedButtonClick?: () => void;
  onYellowButtonClick?: () => void;
  isMinimized?: boolean;
  interactionRadius?: number;
  onRadiusChange?: (radius: number) => void;
  ballCount?: number;
  onBallCountChange?: (count: number) => void;
  viewMode?: 'mac' | 'terminal';
}

export default function MacWindow({ children, onRedButtonClick, onYellowButtonClick, isMinimized, interactionRadius = 75, onRadiusChange, ballCount = 1000, onBallCountChange, viewMode = 'mac' }: MacWindowProps) {
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

  // Apple logo SVG (8px x 8px)
  const AppleIcon = () => (
    <svg width="8" height="8" viewBox="0 0 10 12" fill="currentColor" className="text-red-900">
      <path d="M6.5 0.5c-0.4 0-0.9 0.3-1.2 0.7C5 1.6 4.8 2.2 4.8 2.8c0.5 0 1-0.3 1.3-0.7C6.4 1.7 6.6 1.1 6.5 0.5zM8 3c-1 0-1.4 0.5-2.2 0.5-0.8 0-1.4-0.5-2.3-0.5-0.9 0-1.9 0.6-2.5 1.6-0.8 1.4-0.7 4 0.9 6.1 0.5 0.6 1 1.2 1.7 1.2 0.6 0 0.8-0.4 1.6-0.4 0.8 0 0.9 0.4 1.6 0.4 0.7 0 1.3-0.6 1.7-1.2 0.3-0.5 0.5-0.8 0.7-1.3-1.7-0.7-2-3.3-0.3-4.3C8.5 3.5 8.3 3 8 3z"/>
    </svg>
  );

  // Linux penguin SVG (8px x 8px) - Simplified Tux
  const LinuxIcon = () => (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="currentColor" className="text-red-900">
      <path d="M3.5 0.5c-0.8 0-1.5 0.7-1.5 1.5v0.5c0 0.3 0.1 0.5 0.2 0.7-0.4 0.2-0.7 0.6-0.7 1.1v1.2c0 0.4 0.2 0.8 0.5 1v1c0 0.3 0.2 0.5 0.5 0.5h0.5c0.3 0 0.5-0.2 0.5-0.5v-0.5h1v0.5c0 0.3 0.2 0.5 0.5 0.5h0.5c0.3 0 0.5-0.2 0.5-0.5v-1c0.3-0.2 0.5-0.6 0.5-1V4.3c0-0.5-0.3-0.9-0.7-1.1C5.9 2.9 6 2.7 6 2.5V2c0-0.8-0.7-1.5-1.5-1.5H3.5zM3 2.5c0.2 0 0.3 0.1 0.3 0.3S3.2 3 3 3 2.7 2.9 2.7 2.7 2.8 2.5 3 2.5zm2 0c0.2 0 0.3 0.1 0.3 0.3S5.2 3 5 3 4.7 2.9 4.7 2.7 4.8 2.5 5 2.5z"/>
    </svg>
  );

  return (
    <div className="w-screen h-screen overflow-hidden pointer-events-none md:flex md:items-center md:justify-center md:p-4 md:min-h-screen md:w-full">
      <div 
        className={`mac-window-content rounded-none shadow-none md:rounded-xl md:shadow-2xl flex flex-col overflow-hidden transition-all duration-300 pointer-events-auto ${
          isMinimized 
            ? 'h-[50px] w-auto translate-y-0 fixed top-2 left-1/2 -translate-x-1/2 z-40 max-w-[90vw] md:mx-0 md:relative md:top-auto md:left-auto md:translate-x-0 md:translate-y-[calc(50vh-25px)]' 
            : 'w-full h-full md:w-full md:max-w-6xl md:h-[90vh]'
        }`}
        style={{ backgroundColor: 'rgba(0, 16, 17, 0.6)' }}
      >
        {/* Title Bar */}
        <div className="px-4 py-2 flex items-center gap-5 flex-shrink-0" style={{ backgroundColor: 'rgba(65, 69, 53, 0.6)' }}>
          {/* Traffic Light Buttons */}
          <div className="flex gap-2 flex-shrink-0">
            {/* Red - Terminal Mode Toggle (functional) */}
            <button
              onClick={onRedButtonClick}
              className="group w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-all"
              aria-label="Toggle Terminal Mode"
            >
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                {viewMode === 'mac' ? <LinuxIcon /> : <AppleIcon />}
              </span>
            </button>
            
            {/* Yellow - Minimize (functional) */}
            <button
              onClick={onYellowButtonClick}
              className="group w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center transition-all"
              aria-label="Minimize"
            >
              {isMinimized ? (
                <Maximize className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
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
          
          {/* Control sliders - only visible when minimized */}
          {isMinimized && (
            <>
              {/* Interaction Radius Control */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <input
                    id="radius-slider"
                    type="range"
                    min="20"
                    max="250"
                    value={interactionRadius}
                    onChange={(e) => onRadiusChange?.(parseInt(e.target.value))}
                    className="w-24 md:w-28 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #618985 0%, #618985 ${((interactionRadius - 20) / (250 - 20)) * 100}%, #4a5568 ${((interactionRadius - 20) / (250 - 20)) * 100}%, #4a5568 100%)`
                    }}
                  />
                </div>
                <span className="hidden md:inline text-xs text-gray-300 font-mono w-10 text-right flex-shrink-0">
                  {interactionRadius}
                </span>
              </div>

              {/* Ball Count Control */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <input
                    id="ball-count-slider"
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={ballCount}
                    onChange={(e) => onBallCountChange?.(parseInt(e.target.value))}
                    className="w-24 md:w-28 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #DFBD88 0%, #DFBD88 ${((ballCount - 100) / (5000 - 100)) * 100}%, #4a5568 ${((ballCount - 100) / (5000 - 100)) * 100}%, #4a5568 100%)`
                    }}
                  />
                </div>
                <span className="hidden md:inline text-xs text-gray-300 font-mono w-10 text-right flex-shrink-0">
                  {ballCount}
                </span>
              </div>
            </>
          )}
          
          <style jsx>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #E8E3E3;
              cursor: pointer;
              border: 2px solid #618985;
            }
            input[type='range']::-moz-range-thumb {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #E8E3E3;
              cursor: pointer;
              border: 2px solid #618985;
            }
          `}</style>
        </div>

        {/* Content Area with Sidebar Layout */}
        {!isMinimized && (
          <div className="flex-grow flex overflow-hidden" style={{ backgroundColor: 'rgba(0, 16, 17, 0.6)' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

