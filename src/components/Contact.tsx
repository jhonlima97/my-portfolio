import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import { SOCIAL_LINKS } from './socialLinks';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const { t } = useLanguage();

  // The form stays usable after sending: go back to "Send Message" so a second
  // message doesn't hit a button frozen on "Message Sent!".
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const timeout = setTimeout(() => setStatus('idle'), 5000);
    return () => clearTimeout(timeout);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus('sending');

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 section-surface section-surface-1">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
            {t.contact.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t.contact.namePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.contact.subject}
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t.contact.subjectPlaceholder}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t.contact.message}
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={t.contact.messagePlaceholder}
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? t.contact.sending : status === 'success' ? t.contact.sent : t.contact.send}
            </button>

            {/* Announced to screen readers when the submit result changes. */}
            <p aria-live="polite" className="text-sm">
              {status === 'success' && (
                <span className="text-green-600 dark:text-green-400">{t.contact.success}</span>
              )}
              {status === 'error' && (
                <span className="text-red-600 dark:text-red-400">{t.contact.error}</span>
              )}
            </p>
          </motion.form>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.infoTitle}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {t.contact.infoText}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t.contact.emailLabel}</p>
                    <a
                      href="mailto:jhonw.lima08@gmail.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      jhonw.lima08@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t.contact.phoneLabel}</p>
                    <a
                      href="tel:+51976411888"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      +51 976 411 888
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-indigo-600 mr-4 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t.contact.locationLabel}</p>
                    <p className="text-gray-600 dark:text-gray-400">Chiclayo, Lambayeque, Peru</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.contact.followMe}</h3>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.key}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.social[social.key]}
                    className="group relative w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                  >
                    {social.icon}
                    {/* CSS-only tooltip: visible on hover and keyboard focus */}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 dark:bg-gray-100 px-2 py-1 text-xs font-medium text-white dark:text-gray-900 opacity-0 scale-95 transition-all duration-150 group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100"
                    >
                      {t.social[social.key]}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}