import { useState, useEffect } from 'react';
import { Package, Bus, Leaf, CreditCard, PawPrint, type LucideIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';
import { REWARDS, MAX_POINTS_DISPLAY } from '../data/rewards';

const iconMap: Record<string, LucideIcon> = { Package, Bus, Leaf, CreditCard, PawPrint };

export default function NagradeScreen() {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [ekoBodovi, setEkoBodovi] = useState(0);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('profiles')
      .select('eko_bodovi')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (data) setEkoBodovi(data.eko_bodovi ?? 0);
      });
  }, [user]);

  const nextReward = REWARDS.find(r => r.pointsCost > ekoBodovi);
  const pointsToNext = nextReward ? nextReward.pointsCost - ekoBodovi : 0;

  return (
    <div className="px-6 py-6 space-y-5">
      {/* Points Header */}
      <div className="bg-surface-container-lowest shield-motif p-8 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] flex flex-col items-center text-center">
        <span className="text-[10px] font-bold tracking-[0.15em] text-primary uppercase mb-2">{t.rewards.yourEcoPoints}</span>
        <div className="text-6xl font-black text-primary tracking-tighter mb-2">
          {ekoBodovi}
        </div>

        <div className="w-full bg-surface-container mt-4 mb-2 h-4 shield-motif overflow-hidden relative">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min((ekoBodovi / MAX_POINTS_DISPLAY) * 100, 100)}%` }}
          />
        </div>
        {nextReward && (
          <div className="flex justify-between w-full">
            <span className="text-[10px] font-bold text-primary uppercase">
              {t.rewards.items[nextReward.translationKey as keyof typeof t.rewards.items].name}
            </span>
            <span className="text-[10px] font-medium text-on-surface-variant">
              {t.rewards.pointsRemaining(pointsToNext)}
            </span>
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="bg-surface-container-lowest shield-motif p-6 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] flex flex-col items-center">
        <h3 className="text-[10px] font-bold tracking-[0.1em] text-primary uppercase mb-4">{t.profile.qrTitle}</h3>
        <div className="p-3 bg-white border border-primary-container/20 shield-motif">
          <img src="/kajkamqr.svg" alt="QR" className="w-40 h-40" />
        </div>
        <p className="text-[9px] text-on-surface-variant mt-3 text-center uppercase tracking-wide">{t.profile.qrSubtitle}</p>
      </div>

      {/* Section Label */}
      <h2 className="text-xs font-bold tracking-[0.1em] text-primary uppercase">{t.rewards.sectionLabel}</h2>

      {/* Rewards List */}
      <div className="space-y-3">
        {REWARDS.map((reward) => {
          const Icon = iconMap[reward.icon] || Package;
          const item = t.rewards.items[reward.translationKey as keyof typeof t.rewards.items];
          const canClaim = ekoBodovi >= reward.pointsCost;
          const pointsShort = reward.pointsCost - ekoBodovi;

          return (
            <div
              key={reward.id}
              className="bg-surface-container-lowest shield-motif p-5 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)]"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 shield-motif shrink-0 ${canClaim ? 'bg-primary-container' : 'bg-surface-container'}`}>
                  <Icon className={`w-5 h-5 ${canClaim ? 'text-white' : 'text-outline'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold text-sm text-primary uppercase tracking-wider truncate">{item.name}</h3>
                    <span className={`text-xs font-bold px-2.5 py-1 shield-motif shrink-0 ${canClaim ? 'bg-primary text-on-primary' : 'bg-surface-container text-outline'}`}>
                      {reward.pointsCost}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{item.description}</p>
                  <button
                    disabled={!canClaim}
                    className={`mt-3 w-full py-2.5 font-bold text-xs tracking-widest uppercase shield-motif transition-all ${
                      canClaim
                        ? 'bg-primary text-on-primary hover:bg-primary-container active:scale-95'
                        : 'bg-outline-variant/30 text-outline cursor-not-allowed'
                    }`}
                  >
                    {canClaim ? t.rewards.claimReward : t.rewards.pointsNeeded(pointsShort)}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
