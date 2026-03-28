import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isGuest: boolean;
  isLoading: boolean;
  isLoggedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  continueAsGuest: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const GUEST_KEY = 'kajkam_guest';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        setIsGuest(localStorage.getItem(GUEST_KEY) === 'true');
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session) {
        localStorage.removeItem(GUEST_KEY);
        setIsGuest(false);
        // Ensure profile exists (handles users created before the trigger)
        const u = session.user;
        supabase.from('profiles').upsert({
          id: u.id,
          display_name: u.user_metadata?.full_name ?? u.email?.split('@')[0],
          avatar_url: u.user_metadata?.avatar_url,
        }, { onConflict: 'id', ignoreDuplicates: true })
          .then(({ error }) => { if (error) console.error('profile upsert error:', error); });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  };

  const continueAsGuest = () => {
    localStorage.setItem(GUEST_KEY, 'true');
    setIsGuest(true);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem(GUEST_KEY);
    setIsGuest(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isGuest,
      isLoading,
      isLoggedIn: !!session || isGuest,
      signInWithGoogle,
      continueAsGuest,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
