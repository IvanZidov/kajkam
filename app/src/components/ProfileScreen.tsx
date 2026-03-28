import { Gift, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen() {
  const { user, isGuest, signOut, signInWithGoogle } = useAuth();

  const displayName = isGuest
    ? 'Gost'
    : (user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Korisnik');
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <div className="px-6 md:px-8 lg:px-12 py-6 space-y-6">
      <div className="mb-8 flex items-center gap-4">
        {avatarUrl ? (
          <img src={avatarUrl} alt="" className="w-14 h-14 rounded-full border-2 border-primary/20 shrink-0" />
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xl shrink-0">
            {displayName[0]?.toUpperCase()}
          </div>
        )}
        <div>
          <span className="text-xs font-bold tracking-[0.1em] text-outline uppercase mb-1 block">MOJ PROFIL</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-primary leading-none uppercase">Bok, {displayName}!</h1>
          <p className="text-on-surface-variant mt-2 text-sm md:text-base">Hvala što brineš o čistoći svog kvarta.</p>
        </div>
      </div>

      <div className="space-y-6 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
        <div className="bg-surface-container-lowest shield-motif p-8 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] flex flex-col items-center text-center">
          <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2">Tvoji EkoBodovi</span>
          <div className="text-6xl md:text-7xl font-black text-primary tracking-tighter mb-2">
            15 <span className="text-2xl md:text-3xl text-outline-variant font-light">/ 100</span>
          </div>

          <div className="w-full bg-surface-container mt-6 mb-2 h-4 shield-motif overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full bg-primary transition-all duration-500" style={{ width: '15%' }}></div>
          </div>
          <div className="flex justify-between w-full">
            <span className="text-[10px] font-bold text-primary uppercase">Paket ZG vrećica</span>
            <span className="text-[10px] font-medium text-on-surface-variant">Još 85 bodova</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest shield-motif p-8 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] flex flex-col items-center">
          <h3 className="text-xs font-bold tracking-[0.1em] text-primary uppercase mb-6">IDENTIFIKACIJSKI QR</h3>
          <div className="relative p-4 bg-white border-2 border-primary-container/20 shield-motif">
            <div className="w-48 h-48 md:w-56 md:h-56 bg-slate-50 flex items-center justify-center overflow-hidden relative">
              <div className="grid grid-cols-10 grid-rows-10 gap-1 w-full h-full opacity-80">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.5 ? 'bg-primary' : 'bg-surface-container'} ${i === 0 || i === 9 || i === 90 || i === 99 ? 'col-span-2 row-span-2' : ''}`}></div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white p-2">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwwDTeCVpBkaARcp6yPTZUH7wKiblLAEW2Q1FNWS0zaObIN_ggN3DzIrtPw2bJNJU15d-mmG9uzZMdC1nWGyOLXwljjwBFGghqeF2e6UJj_j5LIWzF_bND0JN0WZN1BzgjHYtFEzoU3y-i8O6HZ0oma7rVAq3CnndvWixM7aIfiK_jKZpI_a3yl5wtJnyEaicOK4MQHh5RSLmzYIWxXq3GCzyHrRVlNUASXGIat93XN5O5FhxJLXMmc2ci6ue-FHK-9RG30etwVJzo"
                    alt="Logo center"
                    className="w-8 h-8 opacity-40 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-on-surface-variant mt-4 text-center uppercase tracking-wide">Pokaži na reciklažnom dvorištu za bodove</p>
        </div>
      </div>

      <div className="bg-surface-container-low shield-motif p-6 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          <div className="bg-primary-container p-3 shield-motif">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-primary uppercase text-sm tracking-wider">DOSTUPNE NAGRADE</h3>
            <p className="text-xs md:text-sm text-on-surface-variant mt-1">Sakupi bodove recikliranjem i otključaj kupone za javni prijevoz ili ZG vrećice.</p>
          </div>
        </div>
        <button className="w-full py-4 bg-outline-variant/30 text-outline cursor-not-allowed font-bold text-sm tracking-widest uppercase shield-motif transition-all">
          Preuzmi nagradu
        </button>
      </div>

      {isGuest ? (
        <button
          onClick={() => signInWithGoogle()}
          className="w-full py-4 bg-primary text-on-primary font-bold text-sm tracking-widest uppercase shield-motif hover:bg-primary-container active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <LogIn className="w-5 h-5" />
          Prijavi se s Google-om
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="w-full py-4 bg-surface-container-highest text-on-surface-variant font-bold text-sm tracking-widest uppercase shield-motif hover:bg-surface-container-high active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5" />
          Odjavi se
        </button>
      )}
    </div>
  );
}
