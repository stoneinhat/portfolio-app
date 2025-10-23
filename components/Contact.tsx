'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Loader2, Send } from 'lucide-react'; // <-- Added Send icon

// Assuming you'll place the image in the `public` directory
import SlaSlackImage from '@/public/SLA-Slack.png';

interface FormData {
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Track viewport to switch placeholder text between mobile and desktop
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    
    // Debounce resize for performance
    let timeoutId: NodeJS.Timeout;
    const debouncedCheck = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(check, 150);
    };
    
    window.addEventListener('resize', debouncedCheck);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedCheck);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
      
      setSubmitStatus('success');
      setFormData({ message: '' }); // Clear form

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 md:px-6 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Chat bar container */}
        <div className="flex items-center gap-3 w-full rounded-full border-2 border-[var(--beige)] bg-background-light px-3 md:px-4 h-[56px] md:h-[60px] shadow-sm">
          {/* Slack image on the left */}
          <Image
            src={SlaSlackImage}
            alt="SLA Slack"
            width={40}
            height={40}
            className="rounded-lg object-cover select-none pointer-events-none"
            loading="eager"
          />

          {/* Input area */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-1 min-w-0">
            <input
              type="text"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={isDesktop ? 'Please include your email in a Slack message to me!' : 'Message me on Slack!'}
              className="flex-1 bg-transparent text-primary placeholder-accent/70 focus:outline-none min-w-0 rounded-full"
              required
              disabled={isSubmitting}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>

        {/* Subtle result toasts below bar */}
        {submitStatus === 'success' && (
          <div className="mt-3 text-sm text-green-600">Message sent to Slack. Joshua will respond shortly!</div>
        )}
        {submitStatus === 'error' && (
          <div className="mt-3 text-sm text-red-600">Failed to send. Try again.</div>
        )}
      </div>
    </section>
  );
}