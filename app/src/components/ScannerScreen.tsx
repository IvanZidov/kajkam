import { useState } from 'react';
import { Camera, Trash2, Award, ChevronRight, Leaf, History, Map as MapIcon, Box, Wine } from 'lucide-react';

export default function ScannerScreen() {
  const [scanState, setScanState] = useState<'ready' | 'scanning' | 'result'>('ready');

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      setScanState('result');
    }, 2000);
  };

  return (
    <div className="px-6 md:px-8 lg:px-12 py-6 space-y-6 flex flex-col items-center">
      <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 shield-motif self-center">
        <span className={`w-2 h-2 rounded-full ${scanState === 'result' ? 'bg-blue-500' : 'bg-green-500 animate-pulse'}`}></span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
          Status: {scanState === 'result' ? 'Detektirano' : 'Spremno'}
        </span>
      </div>

      {scanState !== 'result' ? (
        <div className="w-full aspect-square max-w-xl bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>

          <div className="w-64 h-64 md:w-80 md:h-80 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center relative">
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-primary"></div>

            <button
              onClick={handleScan}
              disabled={scanState === 'scanning'}
              className="group active:scale-95 transition-all duration-300 flex flex-col items-center gap-4"
            >
              <div className={`w-24 h-24 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center shadow-lg transition-colors ${scanState === 'scanning' ? 'animate-pulse' : 'group-hover:bg-primary-container'}`}>
                <Camera className="text-on-primary w-12 h-12 md:w-14 md:h-14" />
              </div>
              <span className="font-black text-primary tracking-tighter text-lg uppercase">
                {scanState === 'scanning' ? 'Skeniram...' : 'Pokreni Skener'}
              </span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full">
            <span className="text-[11px] text-primary/80 italic">
              {scanState === 'scanning' ? 'Gemini analizira sliku...' : 'Gemini prekopava po tvom smeću...'}
            </span>
          </div>
        </div>
      ) : (
        <div className="w-full lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="w-full aspect-[4/3] bg-surface-container-lowest shield-motif shadow-sm border border-outline-variant/15 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
            <div className="w-48 h-32 md:w-56 md:h-40 border-2 border-dashed border-primary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="flex gap-4 items-center">
                <Box className="text-primary/40 w-10 h-10" />
                <Wine className="text-primary/40 w-10 h-10" />
              </div>
              <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
            </div>
            <div className="mt-4 flex items-center gap-3 px-6 py-2 bg-primary/5 rounded-full">
              <p className="text-[11px] text-primary/80 italic">Gemini je prepoznao 2 predmeta</p>
            </div>
          </div>

          <div className="w-full space-y-4 mt-6 lg:mt-0">
            <p className="text-[10px] text-center uppercase tracking-[0.2em] font-bold text-on-surface-variant">Analiza Uspješna</p>

            <div className="bg-surface-container-low p-4 shield-motif border-l-8 border-waste-plastic flex items-center justify-between shadow-sm">
              <div>
                <h2 className="text-lg font-black text-primary tracking-tighter uppercase leading-tight">Aluminijska Limenka</h2>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-wider mt-1">
                  Odloži u: <span className="text-on-surface">Plastika i Metal</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-waste-plastic shield-motif flex items-center justify-center">
                <Trash2 className="text-black w-6 h-6" />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 shield-motif border-l-8 border-waste-plastic flex items-center justify-between shadow-sm">
              <div>
                <h2 className="text-lg font-black text-primary tracking-tighter uppercase leading-tight">Plastična Boca</h2>
                <p className="text-[10px] font-bold uppercase text-on-surface-variant/60 tracking-wider mt-1">
                  Odloži u: <span className="text-on-surface">Plastika i Metal</span>
                </p>
              </div>
              <div className="w-12 h-12 bg-waste-plastic shield-motif flex items-center justify-center">
                <Trash2 className="text-black w-6 h-6" />
              </div>
            </div>

            <button
              onClick={() => setScanState('ready')}
              className="w-full bg-primary py-4 px-6 shield-motif flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-all hover:bg-primary-container mt-4"
            >
              <MapIcon className="text-white w-5 h-5" />
              <span className="text-white font-black tracking-tighter uppercase text-sm">Pronađi najbliži žuti spremnik</span>
            </button>
          </div>
        </div>
      )}

      {scanState === 'result' && (
        <div className="w-full bg-primary-container/10 p-4 shield-motif flex items-center gap-4 border border-primary/10">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shrink-0">
            <Award className="text-white w-6 h-6" />
          </div>
          <div className="flex-1">
            <p className="text-primary text-xs font-bold tracking-wide">+2 EkoBoda za nove predmete!</p>
            <p className="text-primary/70 text-[10px] uppercase font-medium">Ukupno: 126 Bodova</p>
          </div>
          <ChevronRight className="text-primary/40 w-5 h-5" />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 w-full mt-4">
        <div className="bg-surface-container-low p-4 md:p-6 shield-motif space-y-1">
          <Leaf className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Ukupna Ušteda CO2</p>
          <p className="text-lg md:text-xl font-black text-primary">0.45 kg</p>
        </div>
        <div className="bg-surface-container-low p-4 md:p-6 shield-motif space-y-1">
          <History className="text-primary w-5 h-5 mb-2" />
          <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-tight text-on-surface-variant">Skenirano danas</p>
          <p className="text-lg md:text-xl font-black text-primary">3 puta</p>
        </div>
      </div>
    </div>
  );
}
