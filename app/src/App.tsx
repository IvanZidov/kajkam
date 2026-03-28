import { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ScannerScreen from './components/ScannerScreen';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Tab = 'skener' | 'karta' | 'chat' | 'profil';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState<Tab>('profil');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative bg-surface shadow-2xl overflow-hidden">
      <TopBar />
      
      <main className={`absolute inset-0 pt-16 pb-20 hide-scrollbar flex flex-col ${currentTab !== 'karta' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
        {currentTab === 'skener' && <ScannerScreen />}
        {currentTab === 'karta' && <MapScreen />}
        {currentTab === 'chat' && <ChatScreen />}
        {currentTab === 'profil' && <ProfileScreen />}
      </main>

      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
    </div>
  );
}
