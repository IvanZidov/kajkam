import { Search, Trash2, FileText, Recycle, Leaf, Factory, Navigation, AlertTriangle, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

interface BinLocation {
  OBJECTID: string;
  Name: string;
  Location: string;
  District: string;
  Neighbourhood: string;
  Container_Type: string;
  Bin_Type: string;
  Longitude: number;
  Latitude: number;
}

export default function MapScreen() {
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null);
  const [bins, setBins] = useState<BinLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await fetch('/zagreb_bins_locations.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            const validBins = (results.data as any[])
              .filter(row => row.Latitude && row.Longitude)
              .map(row => ({
                ...row,
                Bin_Type: row.Bin_Type || 'Nepoznato',
                Name: row.Name || row.Location || 'Spremnik'
              })) as BinLocation[];
            setBins(validBins);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error loading bins:', error);
        setLoading(false);
      }
    };

    fetchBins();
  }, []);

  const bounds = useMemo(() => {
    if (bins.length === 0) return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };
    let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
    bins.forEach(bin => {
      minLat = Math.min(minLat, bin.Latitude);
      maxLat = Math.max(maxLat, bin.Latitude);
      minLng = Math.min(minLng, bin.Longitude);
      maxLng = Math.max(maxLng, bin.Longitude);
    });
    // Add 5% padding
    const latPad = (maxLat - minLat) * 0.05;
    const lngPad = (maxLng - minLng) * 0.05;
    return {
      minLat: minLat - latPad,
      maxLat: maxLat + latPad,
      minLng: minLng - lngPad,
      maxLng: maxLng + lngPad
    };
  }, [bins]);

  const getTop = (lat: number) => {
    if (bounds.maxLat === bounds.minLat) return 50;
    return 100 - ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * 100;
  };

  const getLeft = (lng: number) => {
    if (bounds.maxLng === bounds.minLng) return 50;
    return ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  };

  const getBinColor = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('staklo')) return 'bg-waste-glass';
    if (t.includes('papir')) return 'bg-waste-paper';
    if (t.includes('plastika')) return 'bg-waste-plastic';
    if (t.includes('bio')) return 'bg-waste-bio';
    if (t.includes('reciklažna')) return 'bg-secondary';
    return 'bg-primary';
  };

  const getBinIcon = (type: string, className: string = "w-4 h-4") => {
    const t = type.toLowerCase();
    if (t.includes('staklo')) return <Trash2 className={className} />;
    if (t.includes('papir')) return <FileText className={className} />;
    if (t.includes('plastika')) return <Recycle className={className} />;
    if (t.includes('bio')) return <Leaf className={className} />;
    if (t.includes('reciklažna')) return <Factory className={className} />;
    return <Trash2 className={className} />;
  };

  const filteredBins = useMemo(() => {
    if (!filter) return bins;
    const lowerFilter = filter.toLowerCase();
    return bins.filter(bin => 
      (bin.Name || '').toLowerCase().includes(lowerFilter) || 
      (bin.Location || '').toLowerCase().includes(lowerFilter) ||
      (bin.Bin_Type || '').toLowerCase().includes(lowerFilter)
    );
  }, [bins, filter]);

  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-surface-container-low">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaW4W0os-Bo_NgYdpoqOQVO9REPLmSAM8cRyG4Rd__EjC06npfdZ37Q7i0lh1lwYIHuhUho1yydras-_ki3-NvXxeuP15DML1k-2jaCdPKs5mjBamwuaWp3dT7IQQzFhth8AJ4DoNI_3mB7hC9b4O_PQEFumrDxTSyLjQWW6yMt2ff1a0qoZyI7lppsNOF7U-xfmcp6kT62-r4eOKwJkphfk7MgCnZqOiX9eqLxu7jSjSgZhMSIS2w0wdZi43HWvTEk5wL9iPCbEzs" 
          alt="Map" 
          className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
        />
      </div>

      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[90%] z-10">
        <div className="bg-surface-container-lowest shadow-lg flex items-center px-4 py-3 shield-motif">
          <Search className="text-outline w-5 h-5" />
          <input 
            type="text" 
            placeholder="Pretraži ulicu ili vrstu..." 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full ml-3 font-medium text-on-surface"
          />
        </div>
      </div>

      {/* Map Markers */}
      {loading ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-surface-container-lowest/50 backdrop-blur-sm">
          <div className="flex flex-col items-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="font-bold tracking-widest uppercase text-xs">Učitavanje karte...</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          {filteredBins.map((bin, i) => {
            const isSelected = selectedBin?.OBJECTID === bin.OBJECTID;
            // Only render a subset if there are too many to avoid massive lag, or render all as tiny dots
            // We'll render them as small dots, and larger if selected
            return (
              <div 
                key={bin.OBJECTID || i}
                className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer transition-all duration-300 ${isSelected ? 'z-30 scale-150' : 'z-10 hover:scale-125 hover:z-20'}`}
                style={{ 
                  top: `${getTop(bin.Latitude)}%`, 
                  left: `${getLeft(bin.Longitude)}%` 
                }}
                onClick={() => setSelectedBin(bin)}
              >
                {isSelected ? (
                  <div className="relative flex flex-col items-center">
                    <div className={`${getBinColor(bin.Bin_Type)} text-white p-2 rounded-full shadow-lg border-2 border-white`}>
                      {getBinIcon(bin.Bin_Type, "w-4 h-4")}
                    </div>
                    <div className="mt-1 bg-primary text-white text-[9px] font-bold px-2 py-0.5 shield-motif whitespace-nowrap uppercase tracking-tighter shadow-md">
                      {bin.Bin_Type}
                    </div>
                  </div>
                ) : (
                  <div className={`w-3 h-3 rounded-full shadow-sm border border-white/50 ${getBinColor(bin.Bin_Type)} opacity-80`}></div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="absolute bottom-32 right-6 z-10">
        <button className="bg-surface-container-lowest text-primary p-3 rounded-full shadow-xl active:scale-95 transition-transform">
          <Navigation className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Sheet */}
      {selectedBin && (
        <div className="absolute bottom-0 left-0 w-full z-30 px-4 pb-4 animate-in slide-in-from-bottom duration-300">
          <div className="bg-surface-container-lowest shadow-[0_-8px_40px_-12px_rgba(0,0,0,0.15)] shield-motif p-6 relative">
            <button 
              onClick={() => setSelectedBin(null)}
              className="absolute top-4 right-4 text-outline hover:text-on-surface"
            >
              ✕
            </button>
            <div className="w-12 h-1 bg-surface-variant rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="pr-4">
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1 block">
                  {selectedBin.District || 'Lokacija Spremnika'}
                </span>
                <h2 className="text-lg font-black text-on-surface tracking-tight uppercase leading-tight line-clamp-2">
                  {selectedBin.Location || selectedBin.Name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm font-medium text-outline">{selectedBin.Neighbourhood || 'Zagreb'}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-sm font-bold text-primary">~ m</span>
                </div>
              </div>
              <div className="bg-surface-container-low p-3 shield-motif shrink-0">
                {getBinIcon(selectedBin.Bin_Type, `w-8 h-8 ${getBinColor(selectedBin.Bin_Type).replace('bg-', 'text-')}`)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`bg-surface-container-low p-4 shield-motif border-l-4 ${getBinColor(selectedBin.Bin_Type).replace('bg-', 'border-')}`}>
                <p className="text-[10px] font-bold text-outline uppercase mb-1">Vrsta otpada</p>
                <p className="text-sm font-bold text-on-surface line-clamp-1">{selectedBin.Bin_Type}</p>
              </div>
              <div className="bg-surface-container-low p-4 shield-motif">
                <p className="text-[10px] font-bold text-outline uppercase mb-1">Spremnik</p>
                <p className="text-sm font-bold text-on-surface line-clamp-1">{selectedBin.Container_Type || 'Standard'}</p>
              </div>
            </div>

            <button className="w-full bg-primary text-white font-black py-4 tracking-widest shield-motif active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase text-sm">
              <AlertTriangle className="w-5 h-5" />
              Prijavi problem
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
