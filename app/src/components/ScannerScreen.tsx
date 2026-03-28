import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Camera, Upload, Trash2, Award, ChevronRight, Leaf, History, RotateCcw, AlertCircle, Clock, Lightbulb } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useTranslation } from '../i18n/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface WasteItem {
  name: string;
  bin: string;
  binColor: 'waste-plastic' | 'waste-paper' | 'waste-bio' | 'waste-glass' | 'waste-mixed';
  ecoPoints: number;
  tip?: string;
}

interface ScanResult {
  items: WasteItem[];
  co2Saved: number;
}

const BIN_COLOR_MAP: Record<string, WasteItem['binColor']> = {
  'plastika': 'waste-plastic',
  'papir': 'waste-paper',
  'bio': 'waste-bio',
  'staklo': 'waste-glass',
  'miješani': 'waste-mixed',
};

// Static class maps so Tailwind can detect them at build time
const BORDER_CLASSES: Record<WasteItem['binColor'], string> = {
  'waste-plastic': 'border-waste-plastic',
  'waste-paper': 'border-waste-paper',
  'waste-bio': 'border-waste-bio',
  'waste-glass': 'border-waste-glass',
  'waste-mixed': 'border-waste-mixed',
};

const BG_CLASSES: Record<WasteItem['binColor'], string> = {
  'waste-plastic': 'bg-waste-plastic',
  'waste-paper': 'bg-waste-paper',
  'waste-bio': 'bg-waste-bio',
  'waste-glass': 'bg-waste-glass',
  'waste-mixed': 'bg-waste-mixed',
};

export default function ScannerScreen({ onShowHistory }: { onShowHistory?: () => void }) {
  const { t } = useTranslation();
  const { user } = useAuth();

  const binLabelMap = useMemo(() => ({
    'plastika': t.binLabels.plastika,
    'papir': t.binLabels.papir,
    'bio': t.binLabels.bio,
    'staklo': t.binLabels.staklo,
    'miješani': t.binLabels['miješani'],
  }), [t]);

  const [scanState, setScanState] = useState<'ready' | 'scanning' | 'result' | 'error'>('ready');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [totalCo2, setTotalCo2] = useState(0);
  const [totalScans, setTotalScans] = useState(0);

  // Load scan stats
  useEffect(() => {
    if (!user) return;
    const today = new Date().toISOString().split('T')[0];
    supabase
      .from('scan_history')
      .select('co2_saved, created_at')
      .eq('user_id', user.id)
      .then(({ data, error }) => {
        if (error) { console.error('scan_history fetch error:', error); return; }
        if (data) {
          setTotalScans(data.length);
          setTodayCount(data.filter(s => s.created_at.startsWith(today)).length);
          setTotalCo2(data.reduce((sum, s) => sum + Number(s.co2_saved), 0));
        }
      });
  }, [user, scanState]);

  const analyzeImage = async (base64Data: string, mimeType: string) => {
    setScanState('scanning');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: [
          {
            role: 'user',
            parts: [
              { text: t.ai.scannerSystemPrompt },
              { inlineData: { mimeType, data: base64Data } },
              { text: t.ai.scannerUserPrompt },
            ],
          },
        ],
      });

      const text = response.text?.trim() ?? '';
      // Strip markdown code fences if present
      const cleanJson = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(cleanJson) as ScanResult;

      // Map bin keys to colors
      const items: WasteItem[] = parsed.items.map((item) => ({
        ...item,
        binColor: BIN_COLOR_MAP[item.bin] ?? 'waste-mixed',
      }));

      setResult({ items, co2Saved: parsed.co2Saved ?? 0 });
      setScanState('result');

      // Persist scan to database for authenticated users
      if (user) {
        const totalPts = items.reduce((sum, i) => sum + i.ecoPoints, 0);

        // Upload image to Supabase Storage
        let imageUrl: string | null = null;
        if (base64Data) {
          const fileName = `${user.id}/${Date.now()}.${mimeType.split('/')[1] || 'jpg'}`;
          const byteString = atob(base64Data);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
          const blob = new Blob([ab], { type: mimeType });

          const { error: uploadError } = await supabase.storage
            .from('scan-images')
            .upload(fileName, blob, { contentType: mimeType });
          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('scan-images').getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
          } else {
            console.error('Image upload error:', uploadError);
          }
        }

        supabase.from('scan_history').insert({
          user_id: user.id,
          items: items.map(i => ({ name: i.name, bin: i.bin, binColor: i.binColor, ecoPoints: i.ecoPoints, tip: i.tip })),
          co2_saved: parsed.co2Saved ?? 0,
          points_earned: totalPts,
          image_url: imageUrl,
        }).then(({ error }) => { if (error) console.error('scan_history insert error:', error); });
        if (totalPts > 0) {
          supabase.rpc('increment_eko_bodovi', { points: totalPts })
            .then(({ error }) => { if (error) console.error('increment_eko_bodovi error:', error); });
        }
      }
    } catch (err) {
      console.error('Gemini scan error:', err);
      setErrorMsg(t.scanner.errorMessage);
      setScanState('error');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImagePreview(dataUrl);
      const base64 = dataUrl.split(',')[1];
      analyzeImage(base64, file.type);
    };
    reader.readAsDataURL(file);
    // Reset input so the same file can be re-selected
    e.target.value = '';
  };

  const resetScanner = () => {
    setScanState('ready');
    setResult(null);
    setImagePreview(null);
    setErrorMsg('');
  };

  const totalPoints = result?.items.reduce((sum, i) => sum + i.ecoPoints, 0) ?? 0;

  return (
    <div className="px-6 py-4 space-y-4 flex flex-col items-center">
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Ready state — camera/upload buttons */}
      {scanState === 'ready' && (
        <div className="w-full max-w-xl bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden group py-6 sm:py-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>

          <div className="w-56 h-56 sm:w-72 sm:h-72 border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center relative gap-4">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-primary"></div>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="group active:scale-95 transition-all duration-300 flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary-container transition-colors">
                <Camera className="text-on-primary w-10 h-10 sm:w-12 sm:h-12" />
              </div>
              <span className="font-black text-primary tracking-tighter text-lg uppercase">
                {t.scanner.takePhoto}
              </span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">{t.scanner.chooseFromGallery}</span>
            </button>
          </div>
        </div>
      )}

      {/* Scanning state */}
      {scanState === 'scanning' && (
        <div className="w-full max-w-xl min-h-[200px] py-10 sm:py-12 bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden">
          {imagePreview && (
            <img src={imagePreview} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Camera className="text-on-primary w-12 h-12" />
            </div>
            <span className="font-black text-primary tracking-tighter text-lg uppercase">
              {t.scanner.scanning}
            </span>
            <div className="flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full">
              <span className="text-[11px] text-primary/80 italic">{t.scanner.geminiAnalyzing}</span>
            </div>
          </div>
        </div>
      )}

      {/* Error state */}
      {scanState === 'error' && (
        <div className="w-full max-w-xl bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 p-8 flex flex-col items-center gap-4">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <p className="text-sm text-on-surface text-center">{errorMsg}</p>
          <button
            onClick={resetScanner}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white shield-motif font-bold uppercase tracking-wider text-sm active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            {t.scanner.tryAgain}
          </button>
        </div>
      )}

      {/* Result state */}
      {scanState === 'result' && result && (
        <>
          <div className="w-full">
            {/* Image preview */}
            <div className="w-full aspect-[4/3] bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Scanned waste" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              )}
              <div className="absolute bottom-4 flex items-center gap-3 px-6 py-2 bg-white/90 rounded-full shadow">
                <p className="text-[11px] text-primary/80 italic font-medium">
                  {t.scanner.geminiRecognized(result.items.length)}
                </p>
              </div>
            </div>

            {/* Results list */}
            <div className="w-full space-y-4 mt-6">
              <p className="text-[10px] text-center uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                {result.items.length > 0 ? t.scanner.analysisSuccess : t.scanner.noWasteDetected}
              </p>

              {result.items.length === 0 && (
                <div className="bg-surface-container-low shield-motif shadow-sm p-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 bg-on-surface-variant/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-on-surface-variant/60" />
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{t.scanner.noWasteDescription}</p>
                </div>
              )}

              {result.items.map((item, idx) => (
                <div key={idx} className={`bg-surface-container-low shield-motif border-l-8 ${BORDER_CLASSES[item.binColor]} shadow-sm overflow-hidden`}>
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-black text-primary tracking-tighter uppercase leading-tight">{item.name}</h2>
                      <p className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-wider mt-1">
                        {t.scanner.disposeIn} <span className="text-on-surface">{binLabelMap[item.bin as keyof typeof binLabelMap] ?? item.bin}</span>
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${BG_CLASSES[item.binColor]} shield-motif flex items-center justify-center shrink-0`}>
                      <Trash2 className="text-black w-6 h-6" />
                    </div>
                  </div>
                  {item.tip && (
                    <div className="px-4 pb-3 flex items-start gap-2">
                      <Lightbulb className="w-3.5 h-3.5 text-primary/60 shrink-0 mt-0.5" />
                      <p className="text-xs text-on-surface-variant leading-relaxed">{item.tip}</p>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={resetScanner}
                className="w-full bg-primary py-4 px-6 shield-motif flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all hover:bg-primary-container mt-4"
              >
                <RotateCcw className="text-white w-5 h-5" />
                <span className="text-white font-black tracking-tighter uppercase text-sm">{t.scanner.scanAgain}</span>
              </button>
            </div>
          </div>

          {/* Points earned */}
          {totalPoints > 0 && (
            <div className="w-full bg-primary-container/10 p-4 shield-motif flex items-center gap-4 border border-primary/10">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
                <Award className="text-white w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="text-primary text-xs font-bold tracking-wide">{t.scanner.ecoPointsEarned(totalPoints)}</p>
                <p className="text-primary/70 text-[10px] uppercase font-medium">{t.scanner.keepScanning}</p>
              </div>
              <ChevronRight className="text-primary/40 w-5 h-5" />
            </div>
          )}
        </>
      )}

      {/* Stats + History button */}
      <div className="grid grid-cols-3 gap-3 w-full mt-4">
        <div className="bg-surface-container-low p-4 shield-motif space-y-1">
          <Leaf className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">{t.scanner.totalCO2Saved}</p>
          <p className="text-lg font-black text-primary">{totalCo2.toFixed(2)} kg</p>
        </div>
        <div className="bg-surface-container-low p-4 shield-motif space-y-1">
          <Clock className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">{t.scanner.scannedToday}</p>
          <p className="text-lg font-black text-primary">{todayCount} {t.scanner.times}</p>
        </div>
        <button
          onClick={onShowHistory}
          className="bg-surface-container-low p-4 shield-motif space-y-1 text-left hover:bg-surface-container transition-colors"
        >
          <History className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Povijest</p>
          <p className="text-lg font-black text-primary">{totalScans}</p>
        </button>
      </div>
    </div>
  );
}
