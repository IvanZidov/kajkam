import { useState } from 'react';
import { Camera, Map as MapIcon, MessageSquare, User, Loader2 } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import LoginScreen from './components/LoginScreen';
import ProfileScreen from './components/ProfileScreen';
import ScannerScreen from './components/ScannerScreen';
import MapScreen from './components/MapScreen';
import ChatScreen from './components/ChatScreen';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

export type Tab = 'skener' | 'karta' | 'chat' | 'profil';

const sidebarTabs = [
  { id: 'skener' as Tab, label: 'Skener', icon: Camera },
  { id: 'karta' as Tab, label: 'Karta', icon: MapIcon },
  { id: 'chat' as Tab, label: 'Chat', icon: MessageSquare },
  { id: 'profil' as Tab, label: 'Profil', icon: User },
];

export default function App() {
  const { isLoggedIn, isLoading } = useAuth();
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
    <div className="min-h-screen flex flex-col lg:flex-row bg-surface-container">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-60 lg:bg-surface lg:border-r lg:border-outline-variant/20 lg:shrink-0">
        <div className="p-6 flex items-center gap-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwwDTeCVpBkaARcp6yPTZUH7wKiblLAEW2Q1FNWS0zaObIN_ggN3DzIrtPw2bJNJU15d-mmG9uzZMdC1nWGyOLXwljjwBFGghqeF2e6UJj_j5LIWzF_bND0JN0WZN1BzgjHYtFEzoU3y-i8O6HZ0oma7rVAq3CnndvWixM7aIfiK_jKZpI_a3yl5wtJnyEaicOK4MQHh5RSLmzYIWxXq3GCzyHrRVlNUASXGIat93XN5O5FhxJLXMmc2ci6ue-FHK-9RG30etwVJzo"
            alt="Logo"
            className="w-10 h-10 object-contain"
          />
          <h1 className="font-black tracking-widest uppercase text-lg text-primary">KAJKAMO?</h1>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarTabs.map(({ id, label, icon: Icon }) => {
            const isActive = currentTab === id;
            return (
              <button
                key={id}
                onClick={() => setCurrentTab(id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-primary'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-sm font-bold uppercase tracking-wider">{label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content shell */}
      <div className="flex-1 flex flex-col relative bg-surface lg:max-w-5xl lg:w-full lg:mx-auto lg:shadow-xl lg:border-x lg:border-outline-variant/10 min-h-screen">
        <TopBar />

        <main className={`absolute inset-0 pt-16 pb-20 lg:pt-18 lg:pb-0 hide-scrollbar flex flex-col ${currentTab !== 'karta' ? 'overflow-y-auto' : 'overflow-hidden'}`}>
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
