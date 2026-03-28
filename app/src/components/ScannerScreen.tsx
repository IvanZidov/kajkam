import React, { useState, useRef } from 'react';
import { Camera, Upload, Trash2, Award, ChevronRight, Leaf, History, Map as MapIcon, RotateCcw, AlertCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface WasteItem {
  name: string;
  bin: string;
  binColor: 'waste-plastic' | 'waste-paper' | 'waste-bio' | 'waste-glass' | 'waste-mixed';
  ecoPoints: number;
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

const BIN_LABEL_MAP: Record<string, string> = {
  'plastika': 'Plastika i Metal',
  'papir': 'Papir i Karton',
  'bio': 'Biootpad',
  'staklo': 'Staklo',
  'miješani': 'Miješani Komunalni Otpad',
};

const SYSTEM_PROMPT = `Ti si AI sustav za prepoznavanje otpada u Zagrebu, Hrvatska.
Korisnik će ti poslati fotografiju predmeta. Tvoj zadatak je identificirati svaki vidljivi predmet koji se može baciti i klasificirati ga u ispravnu kategoriju spremnika.

Kategorije spremnika (KORISTI ISKLJUČIVO OVE KLJUČEVE):
- "plastika" — plastika, metal, limenke, tetrapak, folije
- "papir" — papir, karton, novine, časopisi
- "bio" — hrana, organski otpad, biljni ostaci
- "staklo" — staklene boce, staklenke
- "miješani" — sve ostalo što ne ide u reciklažu

Odgovori ISKLJUČIVO u JSON formatu (bez markdown oznaka):
{
  "items": [
    { "name": "Naziv predmeta na hrvatskom", "bin": "ključ_spremnika", "ecoPoints": 1 }
  ],
  "co2Saved": 0.15
}

Pravila:
- "name" mora biti na hrvatskom jeziku
- "bin" mora biti jedan od: plastika, papir, bio, staklo, miješani
- "ecoPoints" je 1 po predmetu
- "co2Saved" je ukupna ušteda CO2 u kg (procjena)
- Ako nema prepoznatljivog otpada, vrati prazan items niz
- NE dodaj nikakav tekst izvan JSON objekta`;

export default function ScannerScreen() {
  const [scanState, setScanState] = useState<'ready' | 'scanning' | 'result' | 'error'>('ready');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const analyzeImage = async (base64Data: string, mimeType: string) => {
    setScanState('scanning');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: SYSTEM_PROMPT },
              { inlineData: { mimeType, data: base64Data } },
              { text: 'Analiziraj ovu sliku i klasificiraj otpad.' },
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
    } catch (err) {
      console.error('Gemini scan error:', err);
      setErrorMsg('Greška pri analizi slike. Pokušaj ponovo.');
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
    <div className="px-6 md:px-8 lg:px-12 py-6 space-y-6 flex flex-col items-center">
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

      {/* Status bar */}
      <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 shield-motif self-center">
        <span className={`w-2 h-2 rounded-full ${
          scanState === 'result' ? 'bg-blue-500' :
          scanState === 'error' ? 'bg-red-500' :
          scanState === 'scanning' ? 'bg-yellow-500 animate-pulse' :
          'bg-green-500 animate-pulse'
        }`}></span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Status: {
            scanState === 'result' ? 'Detektirano' :
            scanState === 'error' ? 'Greška' :
            scanState === 'scanning' ? 'Analiziram...' :
            'Spremno'
          }
        </span>
      </div>

      {/* Ready state — camera/upload buttons */}
      {scanState === 'ready' && (
        <div className="w-full aspect-square max-w-xl bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>

          <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center relative gap-6">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-primary"></div>

            <button
              onClick={() => cameraInputRef.current?.click()}
              className="group active:scale-95 transition-all duration-300 flex flex-col items-center gap-3"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:bg-primary-container transition-colors">
                <Camera className="text-on-primary w-12 h-12 md:w-14 md:h-14" />
              </div>
              <span className="font-black text-primary tracking-tighter text-lg uppercase">
                Slikaj Otpad
              </span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full active:scale-95 transition-all"
            >
              <Upload className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Odaberi iz galerije</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full">
            <span className="text-[11px] text-primary/80 italic">
              Slikaj ili učitaj sliku otpada za AI analizu
            </span>
          </div>
        </div>
      )}

      {/* Scanning state */}
      {scanState === 'scanning' && (
        <div className="w-full aspect-square max-w-xl bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden">
          {imagePreview && (
            <img src={imagePreview} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover opacity-30" />
          )}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <Camera className="text-on-primary w-12 h-12" />
            </div>
            <span className="font-black text-primary tracking-tighter text-lg uppercase">
              Skeniram...
            </span>
            <div className="flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full">
              <span className="text-[11px] text-primary/80 italic">Gemini analizira sliku...</span>
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
            Pokušaj Ponovo
          </button>
        </div>
      )}

      {/* Result state */}
      {scanState === 'result' && result && (
        <>
          <div className="w-full lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
            {/* Image preview */}
            <div className="w-full aspect-[4/3] bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Scanned waste" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              )}
              <div className="absolute bottom-4 flex items-center gap-3 px-6 py-2 bg-white/90 rounded-full shadow">
                <p className="text-[11px] text-primary/80 italic font-medium">
                  Gemini je prepoznao {result.items.length} {result.items.length === 1 ? 'predmet' : result.items.length < 5 ? 'predmeta' : 'predmeta'}
                </p>
              </div>
            </div>

            {/* Results list */}
            <div className="w-full space-y-4 mt-6 lg:mt-0">
              <p className="text-[10px] text-center uppercase tracking-[0.2em] font-bold text-on-surface-variant">
                {result.items.length > 0 ? 'Analiza Uspješna' : 'Nema Prepoznatog Otpada'}
              </p>

              {result.items.map((item, idx) => (
                <div key={idx} className={`bg-surface-container-low p-4 shield-motif border-l-8 ${BORDER_CLASSES[item.binColor]} flex items-center justify-between shadow-sm`}>
                  <div>
                    <h2 className="text-lg font-black text-primary tracking-tighter uppercase leading-tight">{item.name}</h2>
                    <p className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-wider mt-1">
                      Odloži u: <span className="text-on-surface">{BIN_LABEL_MAP[item.bin] ?? item.bin}</span>
                    </p>
                  </div>
                  <div className={`w-12 h-12 ${BG_CLASSES[item.binColor]} shield-motif flex items-center justify-center`}>
                    <Trash2 className="text-black w-6 h-6" />
                  </div>
                </div>
              ))}

              <button
                onClick={resetScanner}
                className="w-full bg-primary py-4 px-6 shield-motif flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all hover:bg-primary-container mt-4"
              >
                <RotateCcw className="text-white w-5 h-5" />
                <span className="text-white font-black tracking-tighter uppercase text-sm">Skeniraj Ponovo</span>
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
                <p className="text-primary text-xs font-bold tracking-wide">+{totalPoints} EkoBod{totalPoints === 1 ? '' : totalPoints < 5 ? 'a' : 'ova'} za nove predmete!</p>
                <p className="text-primary/70 text-[10px] uppercase font-medium">Nastavi skenirati za više bodova</p>
              </div>
              <ChevronRight className="text-primary/40 w-5 h-5" />
            </div>
          )}
        </>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-surface-container-low p-4 md:p-6 shield-motif space-y-1">
          <Leaf className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Ukupna Ušteda CO2</p>
          <p className="text-lg md:text-xl font-black text-primary">{result?.co2Saved?.toFixed(2) ?? '0.00'} kg</p>
        </div>
        <div className="bg-surface-container-low p-4 md:p-6 shield-motif space-y-1">
          <History className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Skenirano danas</p>
          <p className="text-lg md:text-xl font-black text-primary">{result ? '1' : '0'} puta</p>
        </div>
      </div>
    </div>
  );
}
