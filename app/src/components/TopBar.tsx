import { useState, useRef, useEffect } from 'react';
import { HelpCircle, Globe, LogOut, LogIn, X } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface TopBarProps {
  onInfoOpen: () => void;
  onLogoClick?: () => void;
}

export default function TopBar({ onInfoOpen, onLogoClick }: TopBarProps) {
  const { language, setLanguage, t } = useTranslation();
  const { user, isGuest, signOut, signInWithGoogle } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = isGuest
    ? t.profile.guest
    : (user?.user_metadata?.full_name || user?.email?.split('@')[0] || t.profile.user);
  const avatarUrl = user?.user_metadata?.avatar_url;

  useEffect(() => {
    if (!showProfile) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [showProfile]);

  return (
    <header className="absolute top-0 w-full z-50 bg-surface/80 backdrop-blur-md h-16 flex items-center justify-between px-6 shield-motif shadow-sm">
      <button onClick={onLogoClick} className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Logo"
          className="w-8 h-8 object-contain"
        />
        <h1 className="font-black tracking-widest uppercase text-xl text-primary">KAJ-KAM?</h1>
      </button>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase">{language === 'hr' ? 'HR' : 'EN'}</span>
        </button>
        <button onClick={onInfoOpen}>
          <HelpCircle className="w-6 h-6 text-primary" />
        </button>

        {/* Profile Avatar */}
        <div ref={dropdownRef} className="relative">
          <button onClick={() => setShowProfile(!showProfile)}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="" className="w-8 h-8 rounded-full border-2 border-primary/20" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {displayName[0]?.toUpperCase()}
              </div>
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-72 bg-surface-container-lowest shield-motif shadow-xl z-[60] overflow-hidden">
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 border-primary/20 shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-lg shrink-0">
                        {displayName[0]?.toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-primary truncate">{displayName}</p>
                      {user?.email && (
                        <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
                      )}
                    </div>
                  </div>
                  <button onClick={() => setShowProfile(false)}>
                    <X className="w-4 h-4 text-outline" />
                  </button>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center py-4 border-t border-outline-variant/20">
                  <h3 className="text-[10px] font-bold tracking-[0.1em] text-primary uppercase mb-3">{t.profile.qrTitle}</h3>
                  <div className="p-2 bg-white border border-primary-container/20 shield-motif">
                    <img src="/kajkamqr.svg" alt="QR" className="w-28 h-28" />
                  </div>
                  <p className="text-[9px] text-on-surface-variant mt-2 text-center uppercase tracking-wide">{t.profile.qrSubtitle}</p>
                </div>

                {/* Auth Button */}
                <div className="border-t border-outline-variant/20 pt-4">
                  {isGuest ? (
                    <button
                      onClick={() => { signInWithGoogle(); setShowProfile(false); }}
                      className="w-full py-3 bg-primary text-on-primary font-bold text-xs tracking-widest uppercase shield-motif hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      {t.profile.signInWithGoogle}
                    </button>
                  ) : (
                    <button
                      onClick={() => { signOut(); setShowProfile(false); }}
                      className="w-full py-3 bg-surface-container-highest text-on-surface-variant font-bold text-xs tracking-widest uppercase shield-motif hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.profile.signOut}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
