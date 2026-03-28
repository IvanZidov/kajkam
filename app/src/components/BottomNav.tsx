import { Camera, Map as MapIcon, MessageSquare, User } from 'lucide-react';
import { Tab } from '../App';
import { useTranslation } from '../i18n/LanguageContext';

interface BottomNavProps {
  currentTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function BottomNav({ currentTab, onTabChange }: BottomNavProps) {
  const { t } = useTranslation();
  const tabs = [
    { id: 'skener', label: t.nav.scanner, icon: Camera },
    { id: 'karta', label: t.nav.map, icon: MapIcon },
    { id: 'chat', label: t.nav.chat, icon: MessageSquare },
    { id: 'profil', label: t.nav.profile, icon: User },
  ] as const;

  return (
    <nav className="absolute bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 bg-surface/90 backdrop-blur-xl z-50 shadow-[0_-4px_24px_-4px_rgba(0,68,130,0.06)]">
      {tabs.map(({ id, label, icon: Icon }) => {
        const isActive = currentTab === id;
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-col items-center justify-center w-16 h-16 transition-all duration-200 ${
              isActive
                ? 'text-primary border-t-2 border-primary'
                : 'text-outline hover:text-primary/70'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-primary/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
