import { useEffect, useState, type ReactNode } from 'react';
import { LanguageContext, type Language } from './LanguageContext';
import { translations } from '../i18n/translations';

function initialLanguage(): Language {
  const stored = localStorage.getItem('lang');
  if (stored === 'en' || stored === 'es') return stored;
  // Default: English (recruiter-facing site).
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(initialLanguage);

  // Keep <html lang> in sync for accessibility and SEO.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLang = () => {
    const next: Language = lang === 'en' ? 'es' : 'en';
    localStorage.setItem('lang', next);
    setLang(next);
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}
