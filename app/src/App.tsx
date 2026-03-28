import { useState, useMemo } from 'react';
import { Camera, Map as MapIcon, MessageSquare, User, Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { useTranslation } from './i18n/LanguageContext';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ScannerScreen from './components/ScannerScreen';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Tab = 'skener' | 'karta' | 'chat' | 'profil';

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = useState<Tab>('profil');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-surface-container flex items-stretch justify-center">
      {/* Phone-frame container */}
      <div className="w-full max-w-[450px] flex flex-col relative bg-surface min-h-screen md:my-4 md:min-h-0 md:h-[calc(100vh-2rem)] md:shadow-2xl md:border md:border-outline-variant/20 md:rounded-2xl md:overflow-hidden">
        <TopBar />

        <main className={`flex-1 pt-16 pb-20 hide-scrollbar flex flex-col ${currentTab !== 'karta' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
          {currentTab === 'skener' && <ScannerScreen />}
          {currentTab === 'karta' && <MapScreen />}
          {currentTab === 'chat' && <ChatScreen />}
          {currentTab === 'profil' && <ProfileScreen />}
        </main>

        <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
      </div>
    </div>
  );
}
