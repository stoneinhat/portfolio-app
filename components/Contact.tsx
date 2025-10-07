'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-dark-olive-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-primary">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Contact Information</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-primary">Email</h4>
                <a
                  href="mailto:john@example.com"
                  className="transition-colors text-accent hover:text-primary"
                >
                  john@example.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-primary">Phone</h4>
                <a
                  href="tel:+1234567890"
                  className="transition-colors text-accent hover:text-primary"
                >
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium mb-1 text-primary">Location</h4>
                <p className="text-primary">San Francisco, CA</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-lg p-6 bg-primary">
            <h3 className="text-2xl font-semibold mb-6 text-primary">Send a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2 text-primary">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-background-light text-primary border-2 border-secondary focus:border-accent transition-colors"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-primary">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-background-light text-primary border-2 border-secondary focus:border-accent transition-colors"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-primary">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-background-light text-primary border-2 border-secondary focus:border-accent transition-colors resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 font-medium rounded-lg transition-colors bg-secondary text-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="mt-4 p-3 rounded-lg bg-green-600 text-white text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mt-4 p-3 rounded-lg bg-red-600 text-white text-center">
                  Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

