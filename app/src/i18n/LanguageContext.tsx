import { createContext, useContext, useState, type ReactNode } from 'react';
import { hr, en, type Translations } from './translations';

export type Language = 'hr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations: Record<Language, Translations> = { hr, en };

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('kajkam_lang');
    return stored === 'en' ? 'en' : 'hr';
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem('kajkam_lang', lang);
    setLanguageState(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
}
