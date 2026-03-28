import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ScannerScreen from './components/ScannerScreen';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import InfoScreen from './components/InfoScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Tab = 'skener' | 'karta' | 'chat' | 'profil';

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();

  const [currentTab, setCurrentTab] = useState<Tab>('profil');
  const [showInfo, setShowInfo] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setShowInfo(false);
    setCurrentTab(tab);
  };

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
        <TopBar onInfoOpen={() => setShowInfo(true)} />

        <main className={`flex-1 pt-16 pb-20 hide-scrollbar flex flex-col ${!showInfo && currentTab === 'karta' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {showInfo ? (
            <InfoScreen onBack={() => setShowInfo(false)} />
          ) : (
            <>
              {currentTab === 'skener' && <ScannerScreen />}
              {currentTab === 'karta' && <MapScreen />}
              {currentTab === 'chat' && <ChatScreen />}
              {currentTab === 'profil' && <ProfileScreen />}
            </>
          )}
        </main>

        <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
