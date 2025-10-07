import MacWindow from '@/components/MacWindow';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Education from '@/components/Education';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <MacWindow>
      <Sidebar />
      <main className="flex-grow overflow-y-auto custom-scrollbar">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </MacWindow>
  );
}
