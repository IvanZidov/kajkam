import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import NagradeScreen from './components/NagradeScreen';
import ScannerScreen from './components/ScannerScreen';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import InfoScreen from './components/InfoScreen';
import ScanHistoryScreen from './components/ScanHistoryScreen';
import ZanimljivostiScreen from './components/ZanimljivostiScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Tab = 'skener' | 'karta' | 'chat' | 'nagrade' | 'zanimljivosti';

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();

  const [currentTab, setCurrentTab] = useState<Tab>('skener');
  const [showInfo, setShowInfo] = useState(false);
  const [showScanHistory, setShowScanHistory] = useState(false);

  const handleTabChange = (tab: Tab) => {
    setShowInfo(false);
    setShowScanHistory(false);
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
      <div className="w-full max-w-[450px] flex flex-col relative bg-surface h-dvh overflow-hidden md:my-4 md:min-h-0 md:h-[calc(100vh-2rem)] md:shadow-2xl md:border md:border-outline-variant/20 md:rounded-2xl md:overflow-hidden">
        <TopBar onInfoOpen={() => setShowInfo(true)} onLogoClick={() => handleTabChange('skener')} />

        <main className={`flex-1 pt-16 pb-20 hide-scrollbar flex flex-col ${!showInfo && !showScanHistory && currentTab === 'karta' ? 'overflow-hidden' : 'overflow-y-auto'}`}>
          {showInfo ? (
            <InfoScreen onBack={() => setShowInfo(false)} />
          ) : showScanHistory ? (
            <ScanHistoryScreen onBack={() => setShowScanHistory(false)} />
          ) : (
            <>
              {currentTab === 'skener' && <ScannerScreen onShowHistory={() => setShowScanHistory(true)} />}
              {currentTab === 'karta' && <MapScreen />}
              {currentTab === 'chat' && <ChatScreen />}
              {currentTab === 'nagrade' && <NagradeScreen />}
              {currentTab === 'zanimljivosti' && <ZanimljivostiScreen />}
            </>
          )}
        </main>

        <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />
      </div>
    </div>
  );
}
