import { createContext, useContext } from 'react';
import type { Translations } from '../i18n/translations';

export type Language = 'en' | 'es';

interface LanguageContextType {
  lang: Language;
  toggleLang: () => void;
  /** Strings for the active language: t.hero.greeting, t.contact.send, etc. */
  t: Translations;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
