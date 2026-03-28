import { useState } from 'react';
import { Settings, HelpCircle, Globe } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import InfoScreen from './InfoScreen';

export default function TopBar() {
  const { language, setLanguage } = useTranslation();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <header className="absolute top-0 w-full z-50 bg-surface/80 backdrop-blur-md h-16 flex items-center justify-between px-6 shield-motif shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <h1 className="font-black tracking-widest uppercase text-xl text-primary">KAJ-KAM?</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary uppercase">{language === 'hr' ? 'EN' : 'HR'}</span>
          </button>
          <button onClick={() => setShowInfo(true)}>
            <HelpCircle className="w-6 h-6 text-primary cursor-pointer" />
          </button>
          <Settings className="w-6 h-6 text-primary cursor-pointer" />
        </div>
      </header>

      {showInfo && <InfoScreen onClose={() => setShowInfo(false)} />}
    </>
  );
}
