import { useEffect, useState } from 'react';
import { ArrowLeft, History, Lightbulb, Leaf, Award, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface ScanHistoryScreenProps {
  onBack: () => void;
}

interface WasteItem {
  name: string;
  bin: string;
  binColor: 'waste-plastic' | 'waste-paper' | 'waste-bio' | 'waste-glass' | 'waste-mixed';
  ecoPoints: number;
  tip?: string;
}

interface ScanRecord {
  id: string;
  items: WasteItem[];
  co2_saved: number;
  points_earned: number;
  image_url: string | null;
  created_at: string;
}

const BG_CLASSES: Record<string, string> = {
  'waste-plastic': 'bg-waste-plastic',
  'waste-paper': 'bg-waste-paper',
  'waste-bio': 'bg-waste-bio',
  'waste-glass': 'bg-waste-glass',
  'waste-mixed': 'bg-waste-mixed',
};

export default function ScanHistoryScreen({ onBack }: ScanHistoryScreenProps) {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase
      .from('scan_history')
      .select('id, items, co2_saved, points_earned, image_url, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error('scan_history fetch error:', error);
        if (data) setScans(data);
        setLoading(false);
      });
  }, [user]);

  const totalPoints = scans.reduce((sum, s) => sum + s.points_earned, 0);
  const totalCo2 = scans.reduce((sum, s) => sum + Number(s.co2_saved), 0);

  // Group scans by date
  const grouped = scans.reduce<Record<string, ScanRecord[]>>((acc, scan) => {
    const date = new Date(scan.created_at).toLocaleDateString('hr-HR', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(scan);
    return acc;
  }, {});

  return (
    <div className="px-6 py-6 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-primary mb-4 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
          <span className="text-xs font-bold uppercase tracking-wider">Natrag</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="bg-primary-container p-3 shield-motif">
            <History className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-outline uppercase block">Skener</span>
            <h1 className="text-3xl font-black tracking-tight text-primary leading-none uppercase">Povijest</h1>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest shield-motif p-4 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] text-center">
          <History className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-2xl font-black text-primary">{scans.length}</p>
          <p className="text-[9px] font-bold uppercase tracking-tight text-on-surface-variant">Skeniranja</p>
        </div>
        <div className="bg-surface-container-lowest shield-motif p-4 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] text-center">
          <Award className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-2xl font-black text-primary">{totalPoints}</p>
          <p className="text-[9px] font-bold uppercase tracking-tight text-on-surface-variant">EkoBodovi</p>
        </div>
        <div className="bg-surface-container-lowest shield-motif p-4 shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] text-center">
          <Leaf className="w-4 h-4 text-primary mx-auto mb-1" />
          <p className="text-2xl font-black text-primary">{totalCo2.toFixed(1)}</p>
          <p className="text-[9px] font-bold uppercase tracking-tight text-on-surface-variant">kg CO₂</p>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-on-surface-variant">Učitavanje...</p>
        </div>
      ) : scans.length === 0 ? (
        <div className="text-center py-12">
          <History className="w-12 h-12 text-outline mx-auto mb-3" />
          <p className="text-sm text-on-surface-variant font-medium">Još nema skeniranja</p>
          <p className="text-xs text-outline mt-1">Skeniraj otpad da vidiš povijest ovdje</p>
        </div>
      ) : (
        (Object.entries(grouped) as [string, ScanRecord[]][]).map(([date, dateScans]) => (
          <div key={date}>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-outline mb-3">{date}</p>
            <div className="space-y-3">
              {dateScans.map((scan) => (
                <div key={scan.id} className="bg-surface-container-lowest shield-motif shadow-[0_4px_24px_-4px_rgba(0,68,130,0.06)] overflow-hidden min-w-0">
                  {scan.image_url && (
                    <div className="w-full min-w-0 bg-surface-container-low">
                      <img
                        src={scan.image_url}
                        alt="Scan"
                        className="block w-full max-w-full h-auto max-h-[min(45vh,280px)] object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-2">
                      {new Date(scan.created_at).toLocaleTimeString('hr-HR', {
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>

                    {/* Items */}
                    <div className="space-y-2">
                      {(scan.items as WasteItem[]).map((item, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className={`w-6 h-6 ${BG_CLASSES[item.binColor] || 'bg-surface-container'} shield-motif flex items-center justify-center shrink-0`}>
                            <Trash2 className="w-3 h-3 text-black" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-on-surface">{item.name}</p>
                            {item.tip && (
                              <div className="flex items-start gap-1.5 mt-0.5">
                                <Lightbulb className="w-3 h-3 text-primary/50 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-on-surface-variant leading-snug">{item.tip}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Points & CO2 */}
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-outline-variant/10">
                      <span className="text-[10px] font-bold text-primary">+{scan.points_earned} EkoBodova</span>
                      <span className="w-1 h-1 rounded-full bg-outline-variant" />
                      <span className="text-[10px] text-on-surface-variant">{Number(scan.co2_saved).toFixed(2)} kg CO₂</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
