import { Leaf, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';

export default function LoginScreen() {
  const { signInWithGoogle, continueAsGuest } = useAuth();
  const { t, language, setLanguage } = useTranslation();

  return (
    <main className="min-h-screen flex items-stretch justify-center bg-surface-container">
      <div className="w-full max-w-[450px] flex flex-col justify-between items-center px-6 pt-16 pb-12 relative overflow-hidden bg-surface md:my-4 md:shadow-2xl md:border md:border-outline-variant/20 md:rounded-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === 'hr' ? 'en' : 'hr')}
          className="absolute top-6 right-6 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <Globe className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase">{language === 'hr' ? 'HR' : 'EN'}</span>
        </button>

        <div className="w-full flex flex-col items-center text-center z-10">
          <div className="mb-12">
            <img
              src="/logo.png"
              alt="KAJ-KAM? Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-4xl font-black tracking-widest text-primary mb-4 drop-shadow-sm uppercase">
            {t.login.greeting}
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed px-4">
            {t.login.subtitle}
          </p>
        </div>

        <div className="w-full flex justify-center py-8 z-10">
          <div className="shield-motif bg-surface-container-low w-full aspect-video overflow-hidden relative shadow-sm border border-outline-variant/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10"></div>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZQCK7GdnJER1MKNqkTzGJmamEk2f22eTEL5sXrtxXD8sfNXbRJKITjtPrDnuURCcQErPhtCJgtPCgzFHz6wr8K_eXZp75s12hVpba9klCpcv0pHHnS5lsXuR4FEP_CWtnFoywMweVO4IVb8N3B0BMjcC3Zg_LLU926WBzkMMyBhfYRXYMEw0YwpD9AMSpEc0cmfkc6Y2WBupBiDN09WNdj21B8pAsoorlOp-CVMdcuejz4v2KamUtnD0a9HM5DY6JXaqcGRUyu77q"
              alt="Zagreb Street"
              className="w-full h-full object-cover mix-blend-overlay opacity-60"
            />
            <div className="absolute bottom-4 left-6 right-6 z-20">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-primary fill-primary" />
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{t.login.ecoInitiative}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4 z-10">
          <button
            onClick={() => signInWithGoogle()}
            className="w-full h-14 bg-primary hover:bg-primary-container text-on-primary font-extrabold tracking-wider shield-motif flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all duration-150 uppercase"
          >
            <svg className="w-5 h-5 fill-current bg-white rounded-full p-0.5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
            </svg>
            {t.login.googleSignIn}
          </button>

          <button
            onClick={() => continueAsGuest()}
            className="w-full h-14 bg-surface-container-highest text-primary font-bold tracking-wider shield-motif hover:bg-surface-container-high transition-colors active:scale-95 duration-150 uppercase"
          >
            {t.login.continueAsGuest}
          </button>

          <div className="mt-4 px-8 text-center">
            <p className="text-sm text-on-surface-variant leading-tight opacity-80">
              {t.login.guestDisclaimer}
            </p>
          </div>

          <div className="mt-4 flex justify-center gap-6">
            <button className="text-[10px] font-bold text-outline uppercase tracking-tighter hover:text-primary transition-colors">{t.login.terms}</button>
            <div className="w-1 h-1 rounded-full bg-outline-variant mt-1.5"></div>
            <button className="text-[10px] font-bold text-outline uppercase tracking-tighter hover:text-primary transition-colors">{t.login.privacy}</button>
          </div>
        </div>
      </div>
    </main>
  );
}
