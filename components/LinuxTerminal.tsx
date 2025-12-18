'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '@/lib/portfolioData';

interface LinuxTerminalProps {
  onBack: () => void;
}

export default function LinuxTerminal({ onBack }: LinuxTerminalProps) {
  const [output, setOutput] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
	const [messageFlow, setMessageFlow] = useState<'idle' | 'awaitStart' | 'composing' | 'submitting'>('idle');

  useEffect(() => {
    // Show welcome message on mount
    setOutput([getWelcomeMessage()]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const getWelcomeMessage = () => `
    <div class="mb-4">
      <p>Welcome to jtesch-portfolio CLI (GNU/Linux 5.10.0-1-amd64 x86_64)</p>
      <p>System information as of ${new Date().toUTCString()}</p>
      <br>
      <p class="terminal-glow text-green-400">To view more regarding Joshua Tesch and his work type 'help' in the command line.</p>
    </div>
  `;

  const escapeHtml = (unsafe: string): string => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const commands: { [key: string]: () => string } = {
    help: () => `
      <div class="p-2">
        <p class="font-bold mb-2">Available commands:</p>
        <ul class="list-disc list-inside space-y-1">
          <li><span class="font-bold text-green-400">about</span>      - Display summary about Joshua Tesch.</li>
          <li><span class="font-bold text-green-400">skills</span>     - List technical skills.</li>
          <li><span class="font-bold text-green-400">experience</span> - Show work experience.</li>
          <li><span class="font-bold text-green-400">projects</span>   - View personal and professional projects.</li>
          <li><span class="font-bold text-green-400">education</span>  - Display educational background.</li>
          <li><span class="font-bold text-green-400">contact</span>    - Show contact information.</li>
          <li><span class="font-bold text-green-400">resume</span>     - Get a link to the resume.</li>
          <li><span class="font-bold text-green-400">whoami</span>     - Displays the current user.</li>
          <li><span class="font-bold text-green-400">date</span>       - Shows the current date.</li>
          <li><span class="font-bold text-green-400">clear</span>      - Clear the terminal screen.</li>
          <li><span class="font-bold text-green-400">back</span>       - Go back to MacWindow view.</li>
          <li><span class="font-bold text-green-400">sudo</span>       - Request superuser privileges.</li>
          <li><span class="font-bold text-green-400">message</span>    - Send a Slack message to Joshua.</li>
        </ul>
      </div>
    `,
    about: () => `
      <div class="p-2">
        <h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">About Me</h2>
        <p class="whitespace-pre-wrap">${portfolioData.about}</p>
      </div>
    `,
    skills: () => `
      <div class="p-2">
        <h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">Skills & Technologies</h2>
        <div class="flex flex-wrap gap-4">
          ${portfolioData.skills.map(skill => `<span class="bg-gray-800 px-3 py-1 rounded">${skill.name}</span>`).join('')}
        </div>
      </div>
    `,
    experience: () => {
      const experienceHtml = portfolioData.experience.map(exp => `
        <div class="mb-4">
          <p class="font-bold text-lg">${exp.title} <span class="text-green-400">@ ${exp.company}</span></p>
          <p class="text-gray-400 text-sm mb-1">${exp.period}</p>
          <p class="whitespace-pre-wrap">${exp.description}</p>
        </div>
      `).join('');
      return `<div class="p-2"><h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">Work Experience</h2>${experienceHtml}</div>`;
    },
    projects: () => {
      const projectsHtml = portfolioData.projects.map(proj => `
        <div class="mb-6">
          <p class="font-bold text-lg text-green-400">${proj.title}</p>
          <p class="my-2 whitespace-pre-wrap">${proj.description}</p>
          <div class="flex flex-wrap gap-2">
            <span class="font-bold">Tech:</span> ${proj.technologies.map(tech => `<span class="text-cyan-400">${tech}</span>`).join(', ')}
          </div>
        </div>
      `).join('');
      return `<div class="p-2"><h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">Projects</h2>${projectsHtml}</div>`;
    },
    education: () => {
      const eduHtml = portfolioData.education.map(edu => `
        <div class="mb-4">
          <p class="font-bold text-lg">${edu.degree}</p>
          <p class="text-green-400">${edu.school}</p>
          <p class="text-gray-400 text-sm mb-1">${edu.period}</p>
          <p class="whitespace-pre-wrap">${edu.description}</p>
        </div>
      `).join('');
      return `<div class="p-2"><h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">Education</h2>${eduHtml}</div>`;
    },
    contact: () => `
      <div class="p-2">
        <h2 class="text-2xl font-bold mb-4 text-blue-400 terminal-glow">Contact Information</h2>
        <p><span class="font-bold text-green-400">Email:</span>    <a href="mailto:${portfolioData.contact.email}" class="underline hover:text-green-300">${portfolioData.contact.email}</a></p>
        <p><span class="font-bold text-green-400">Phone:</span>    ${portfolioData.contact.phone}</p>
        <p><span class="font-bold text-green-400">Location:</span> ${portfolioData.contact.location}</p>
      </div>
    `,
    resume: () => {
      // Trigger download
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Joshua_Tesch_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return `
        <div class="p-2">
          <p>Downloading resume...</p>
          <p>Find it at <a href="/resume.pdf" download="Joshua_Tesch_Resume.pdf" class="underline text-green-400 hover:text-green-300">/resume.pdf</a></p>
        </div>
      `;
    },
    whoami: () => '<div class="p-2">guest</div>',
    date: () => `<div class="p-2">${new Date()}</div>`,
    clear: () => {
      setOutput([getWelcomeMessage()]);
      return '';
    },
    back: () => {
      onBack();
      return '<div class="p-2">Navigating back to MacWindow...</div>';
    },
    sudo: () => '<div class="p-2 text-red-500">user is not in the sudoers file. This incident will be reported.</div>',
    message: () => {
      setMessageFlow('awaitStart');
      return `
        <div class="p-2">
          <p>Please press ENTER to begin a message to Joshua via Slack. Please include your email in your message then press ENTER again to send. Press ESC if you'd rather not.</p>
        </div>
      `;
    },
  };

  const handleCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();
    
    if (trimmedCommand === '') {
      return;
    }

    // Add command to history
    setCommandHistory(prev => [trimmedCommand, ...prev]);
    setHistoryIndex(-1);

    // Add command to output
    const commandOutput = `
      <div class="flex items-center">
        <span class="text-green-400">user@jtesch-portfolio:~$</span>
        <span class="ml-2">${escapeHtml(trimmedCommand)}</span>
      </div>
    `;

    if (trimmedCommand === 'clear') {
      commands.clear();
    } else if (commands[trimmedCommand]) {
      const result = commands[trimmedCommand]();
      if (result) {
        setOutput(prev => [...prev, commandOutput, result]);
      } else {
        setOutput(prev => [...prev, commandOutput]);
      }
    } else {
      setOutput(prev => [...prev, commandOutput, `<div class="p-2">bash: command not found: ${escapeHtml(trimmedCommand)}</div>`]);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Message flow handling
    if (messageFlow !== 'idle') {
      if (e.key === 'Escape') {
        // Cancel flow
        setMessageFlow('idle');
        setInputValue('');
        setOutput(prev => [...prev, '<div class="p-2 text-gray-400">Message cancelled.</div>']);
        return;
      }

      if (messageFlow === 'awaitStart') {
        if (e.key === 'Enter') {
          // Enter compose mode
          setMessageFlow('composing');
          setInputValue('');
          setOutput(prev => [...prev, '<div class="p-2 text-gray-400">Compose mode started. Type your message and press ENTER to send. Press ESC to cancel.</div>']);
        }
        return;
      }

      if (messageFlow === 'composing') {
        if (e.key === 'Enter') {
          const message = inputValue.trim();
          if (!message) {
            // ignore empty send
            return;
          }
          setMessageFlow('submitting');
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message }),
            });
            if (!response.ok) {
              throw new Error(`Server responded with ${response.status}`);
            }
            setOutput(prev => [
              ...prev,
              '<div class="p-2 text-green-400">Message sent to Slack.</div>'
            ]);
            setInputValue('');
            setMessageFlow('idle');
          } catch (err) {
            console.error('Failed to send message', err);
            setOutput(prev => [
              ...prev,
              '<div class="p-2 text-red-500">Failed to send. Try again.</div>'
            ]);
            setMessageFlow('idle');
          }
        }
        return;
      }

      // When submitting, block input
      if (messageFlow === 'submitting') {
        e.preventDefault();
        return;
      }
    }

    // Normal terminal handling
    if (e.key === 'Enter') {
      handleCommand(inputValue);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={terminalRef}
      className="w-full h-full p-4 overflow-y-auto overflow-x-hidden bg-black text-white terminal-scrollbar break-words"
      onClick={handleTerminalClick}
      style={{ fontFamily: "'Fira Code', monospace" }}
    >
      <style jsx>{`
        .terminal-glow {
          text-shadow: 0 0 5px #60a5fa, 0 0 10px #60a5fa;
        }
        .terminal-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        .terminal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        #terminal-output, #terminal-output * {
          word-break: break-word;
          overflow-wrap: anywhere;
        }
      `}</style>
      
      <div id="terminal-output">
        {output.map((line, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
      
      <div className="flex items-center mt-2 min-w-0">
        <span className={messageFlow === 'composing' ? 'text-accent' : 'text-green-400'}>user@jtesch-portfolio:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`bg-transparent border-none flex-grow min-w-0 ml-2 p-0 focus:outline-none ${messageFlow === 'composing' ? 'text-accent' : 'text-white'}`}
          autoComplete="off"
          spellCheck="false"
        />
        {messageFlow === 'composing' && (
          <span className="ml-2 inline-block bg-white animate-pulse" style={{ width: '6px', height: '1.2em' }} />
        )}
      </div>
    </div>
  );
}

