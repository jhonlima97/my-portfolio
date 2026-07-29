import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

/**
 * Typing/deleting animation. Rendered with key={lang} so switching language
 * remounts it and restarts cleanly (no state resets inside effects).
 */
function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const pauseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));

        if (text.length + 1 === currentWord.length) {
          pauseTimeout.current = setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));

        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  // El setTimeout de la pausa de 2s sobrevive a los re-render
  useEffect(() => {
    return () => {
      if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    };
  }, []);

  return (
    <span className="inline-block relative">
      <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
        {text}
      </span>
      <motion.span
        animate={{ opacity: showCursor ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
        className="inline-block w-0.5 h-[0.7em] bg-purple-400 ml-1 align-middle rounded-full"
      />
    </span>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Font size scales with the viewport so the longest word
              ("DESARROLLADOR", 13 chars) still fits on small phones. */}
          <h1 className="text-[clamp(2rem,9vw,3rem)] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              {t.hero.greeting}
            </span>
            {/* h1 only allows phrasing content: span, not div */}
            <Typewriter key={lang} words={t.hero.words} />
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          {/* Primary CTA: contact (conversion). Secondary: outline style. */}
          <a
            href="#contact"
            className="px-8 py-4 text-base font-semibold rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.hero.contactMe}
          </a>
          <a
            href="#projects"
            className="px-8 py-4 text-base font-semibold rounded-full border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 dark:border-indigo-400 hover:bg-indigo-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.hero.viewWork}
          </a>
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" aria-label={t.hero.scrollDown} className="flex flex-col items-center text-gray-700 dark:text-white">
          {/* <span className="text-sm mb-2">SCROLL DOWN</span> */}
          <svg className="w-6 h-6 animate-bounce motion-reduce:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
