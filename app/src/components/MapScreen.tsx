import { Search, Trash2, FileText, Recycle, Leaf, Factory, Navigation, AlertTriangle, Loader2, LocateFixed, X, MapPin, Check } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Papa from 'papaparse';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { useTranslation } from '../i18n/LanguageContext';

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

const ZAGREB_CENTER: [number, number] = [45.815, 15.982];
const DEFAULT_ZOOM = 13;
const NEARBY_RADIUS_M = 2000;
const NEARBY_COUNT = 5;

const BIN_COLORS: Record<string, string> = {
  staklo: '#16a34a',
  papir: '#004482',
  plastika: '#FFD600',
  bio: '#705d00',
  'reciklažna': '#BB0400',
};

function getBinColorHex(type: string): string {
  const t = type.toLowerCase();
  for (const [key, color] of Object.entries(BIN_COLORS)) {
    if (t.includes(key)) return color;
  }
  return '#004482';
}

function getBinColorClass(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('staklo')) return 'bg-waste-glass';
  if (t.includes('papir')) return 'bg-waste-paper';
  if (t.includes('plastika')) return 'bg-waste-plastic';
  if (t.includes('bio')) return 'bg-waste-bio';
  if (t.includes('reciklažna')) return 'bg-secondary';
  return 'bg-primary';
}

function getBinIcon(type: string, className: string = "w-4 h-4") {
  const t = type.toLowerCase();
  if (t.includes('staklo')) return <Trash2 className={className} />;
  if (t.includes('papir')) return <FileText className={className} />;
  if (t.includes('plastika')) return <Recycle className={className} />;
  if (t.includes('bio')) return <Leaf className={className} />;
  if (t.includes('reciklažna')) return <Factory className={className} />;
  return <Trash2 className={className} />;
}

function createBinIcon(type: string): L.DivIcon {
  const color = getBinColorHex(type);
  return L.divIcon({
    className: 'custom-bin-marker',
    html: `<div style="
      width: 14px;
      height: 14px;
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const iconCache = new Map<string, L.DivIcon>();
function getCachedIcon(type: string): L.DivIcon {
  const key = getBinColorHex(type);
  if (!iconCache.has(key)) {
    iconCache.set(key, createBinIcon(type));
  }
  return iconCache.get(key)!;
}

function createUserIcon(): L.DivIcon {
  return L.divIcon({
    className: 'user-location-marker',
    html: `<div style="
      width: 18px;
      height: 18px;
      background: #3b82f6;
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 0 0 6px rgba(59,130,246,0.25), 0 2px 6px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function openGoogleMapsDirections(lat: number, lng: number) {
  window.open(
    `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    '_blank'
  );
}

// Component to fly the map to a location
function FlyTo({ position, zoom }: { position: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, zoom ?? map.getZoom(), { duration: 1 });
  }, [position, zoom, map]);
  return null;
}

// Component to handle map resize on container changes
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      map.invalidateSize();
    });
    observer.observe(map.getContainer());
    const handleResize = () => map.invalidateSize();
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);
  return null;
}

export default function MapScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [reportingBin, setReportingBin] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const filterChips = useMemo(() => [
    { id: 'nearby', label: t.map.nearMe, icon: LocateFixed },
    { id: 'reciklažna', label: t.map.recyclingYards, icon: Factory },
    { id: 'plastika', label: t.map.plastics, icon: Recycle },
    { id: 'papir', label: t.map.paper, icon: FileText },
    { id: 'staklo', label: t.map.glass, icon: Trash2 },
    { id: 'bio', label: t.map.bio, icon: Leaf },
  ], [t]);

  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null);
  const [bins, setBins] = useState<BinLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locatingUser, setLocatingUser] = useState(false);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [flyZoom, setFlyZoom] = useState<number | undefined>(undefined);

  // Load bin data
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
                Bin_Type: row.Bin_Type || t.map.unknown,
                Name: row.Name || row.Location || t.map.binDefault,
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
  }, [t]);

  // Get user location on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  const locateUser = useCallback((): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      if (!('geolocation' in navigator)) { reject(); return; }
      setLocatingUser(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setUserLocation(loc);
          setLocatingUser(false);
          resolve(loc);
        },
        () => {
          setLocatingUser(false);
          reject();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }, []);

  const handleLocateButton = useCallback(() => {
    locateUser().then((loc) => {
      setFlyTarget(loc);
      setFlyZoom(16);
    }).catch(() => {});
  }, [locateUser]);

  // Compute bins with distance from user
  const binsWithDistance = useMemo(() => {
    if (!userLocation) return null;
    return bins.map(bin => ({
      bin,
      distance: getDistance(userLocation[0], userLocation[1], bin.Latitude, bin.Longitude),
    })).sort((a, b) => a.distance - b.distance);
  }, [bins, userLocation]);

  // Nearby bins (within radius, sorted by distance)
  const nearbyBins = useMemo(() => {
    if (!binsWithDistance) return [];
    return binsWithDistance
      .filter(b => b.distance <= NEARBY_RADIUS_M)
      .slice(0, NEARBY_COUNT);
  }, [binsWithDistance]);

  // Filtered bins based on search text + active chip
  const filteredBins = useMemo(() => {
    let result = bins;

    // Apply chip filter
    if (activeChip === 'nearby') {
      if (!binsWithDistance) return bins;
      return binsWithDistance
        .filter(b => b.distance <= NEARBY_RADIUS_M)
        .map(b => b.bin);
    } else if (activeChip) {
      result = result.filter(bin =>
        (bin.Bin_Type || '').toLowerCase().includes(activeChip)
      );
    }

    // Apply text search
    if (filter) {
      const lowerFilter = filter.toLowerCase();
      result = result.filter(bin =>
        (bin.Name || '').toLowerCase().includes(lowerFilter) ||
        (bin.Location || '').toLowerCase().includes(lowerFilter) ||
        (bin.Bin_Type || '').toLowerCase().includes(lowerFilter)
      );
    }

    return result;
  }, [bins, filter, activeChip, binsWithDistance]);

  const distanceToBin = useMemo(() => {
    if (!selectedBin || !userLocation) return null;
    return getDistance(userLocation[0], userLocation[1], selectedBin.Latitude, selectedBin.Longitude);
  }, [selectedBin, userLocation]);

  const handleBinClick = useCallback((bin: BinLocation) => {
    setSelectedBin(bin);
    setFlyTarget([bin.Latitude, bin.Longitude]);
    setFlyZoom(17);
  }, []);

  const handleChipClick = useCallback((chipId: string) => {
    if (activeChip === chipId) {
      // Toggle off
      setActiveChip(null);
      return;
    }

    setActiveChip(chipId);
    setSelectedBin(null);

    if (chipId === 'nearby') {
      if (userLocation) {
        setFlyTarget(userLocation);
        setFlyZoom(15);
      } else {
        locateUser().then((loc) => {
          setFlyTarget(loc);
          setFlyZoom(15);
        }).catch(() => {});
      }
    }
  }, [activeChip, userLocation, locateUser]);

  const showNearbyList = activeChip === 'nearby' && nearbyBins.length > 0 && !selectedBin;

  return (
    <div className="relative flex-1 w-full overflow-hidden">
      {/* Search bar + chips */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[1000]">
        <div className="bg-surface-container-lowest shadow-lg flex items-center px-4 py-3 shield-motif">
          <Search className="text-outline w-5 h-5 shrink-0" />
          <input
            type="text"
            placeholder={t.map.searchPlaceholder}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full ml-3 font-medium text-on-surface"
          />
          {filter && (
            <button onClick={() => setFilter('')} className="text-outline hover:text-on-surface shrink-0">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter chips */}
        <div className="mt-2 flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {filterChips.map(({ id, label, icon: Icon }) => {
            const isActive = activeChip === id;
            return (
              <button
                key={id}
                onClick={() => handleChipClick(id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap transition-all shrink-0 shadow-sm ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {filter && (
          <div className="mt-1 text-xs text-center text-outline font-medium">
            {t.map.results(filteredBins.length)}
          </div>
        )}
      </div>

      {/* Loading overlay */}
      {loading ? (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-surface-container-lowest/80 backdrop-blur-sm">
          <div className="flex flex-col items-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <span className="font-bold tracking-widest uppercase text-xs">{t.map.loadingMap}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Leaflet Map */}
          <MapContainer
            center={userLocation ?? ZAGREB_CENTER}
            zoom={DEFAULT_ZOOM}
            className="absolute inset-0 z-0"
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
          >
            <MapResizer />
            {flyTarget && <FlyTo position={flyTarget} zoom={flyZoom} />}

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* User location marker */}
            {userLocation && (
              <Marker position={userLocation} icon={createUserIcon()}>
                <Popup>
                  <span className="font-bold text-sm">{t.map.yourLocation}</span>
                </Popup>
              </Marker>
            )}

            {/* Bin markers with clustering */}
            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={60}
              spiderfyOnMaxZoom
              showCoverageOnHover={false}
              iconCreateFunction={(cluster: any) => {
                const count = cluster.getChildCount();
                let size = 'small';
                let dim = 36;
                if (count > 100) { size = 'large'; dim = 48; }
                else if (count > 30) { size = 'medium'; dim = 42; }
                return L.divIcon({
                  html: `<div style="
                    width: ${dim}px;
                    height: ${dim}px;
                    background: #004482;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 800;
                    font-size: ${size === 'large' ? '14px' : '12px'};
                    font-family: Inter, sans-serif;
                    border: 3px solid white;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.25);
                  ">${count}</div>`,
                  className: 'custom-cluster-icon',
                  iconSize: L.point(dim, dim),
                });
              }}
            >
              {filteredBins.map((bin, i) => (
                <Marker
                  key={bin.OBJECTID || i}
                  position={[bin.Latitude, bin.Longitude]}
                  icon={getCachedIcon(bin.Bin_Type)}
                  eventHandlers={{
                    click: () => handleBinClick(bin),
                  }}
                />
              ))}
            </MarkerClusterGroup>
          </MapContainer>

          {/* Locate user button */}
          <div className="absolute bottom-28 right-4 z-[1000] flex flex-col gap-3">
            <button
              onClick={handleLocateButton}
              disabled={locatingUser}
              className="bg-surface-container-lowest text-primary p-3 rounded-full shadow-xl active:scale-95 transition-transform disabled:opacity-50"
            >
              {locatingUser ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <LocateFixed className="w-6 h-6" />
              )}
            </button>
          </div>
        </>
      )}

      {/* Nearby bins list */}
      {showNearbyList && (
        <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
          <div className="bg-surface-container-lowest shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.15)] shield-motif p-4 space-y-1">
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-2">
              {t.map.nearestBins}
            </p>
            {nearbyBins.map(({ bin, distance }) => (
              <button
                key={bin.OBJECTID}
                onClick={() => handleBinClick(bin)}
                className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-low active:bg-surface-container transition-colors text-left"
              >
                <div className={`${getBinColorClass(bin.Bin_Type)} text-white p-2 rounded-full shrink-0`}>
                  {getBinIcon(bin.Bin_Type, "w-4 h-4")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-on-surface truncate">
                    {bin.Location || bin.Name}
                  </p>
                  <p className="text-xs text-outline truncate">{bin.Bin_Type}</p>
                </div>
                <div className="text-xs font-bold text-primary shrink-0">
                  {formatDistance(distance)}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Sheet - selected bin details */}
      {selectedBin && (
        <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
          <div className="bg-surface-container-lowest shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.15)] shield-motif p-5 relative">
            <button
              onClick={() => setSelectedBin(null)}
              className="absolute top-3 right-3 text-outline hover:text-on-surface p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto mb-4"></div>

            <div className="flex justify-between items-start mb-3 pr-6">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-0.5 block">
                  {selectedBin.District || t.map.binLocation}
                </span>
                <h2 className="text-base font-black text-on-surface tracking-tight uppercase leading-tight line-clamp-2">
                  {selectedBin.Location || selectedBin.Name}
                </h2>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-medium text-outline">{selectedBin.Neighbourhood || 'Zagreb'}</span>
                  {distanceToBin != null && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                      <span className="text-xs font-bold text-primary">{formatDistance(distanceToBin)}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bg-surface-container-low p-2.5 shield-motif shrink-0 ml-3">
                {getBinIcon(selectedBin.Bin_Type, `w-7 h-7 ${getBinColorClass(selectedBin.Bin_Type).replace('bg-', 'text-')}`)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`bg-surface-container-low p-3 shield-motif border-l-4 ${getBinColorClass(selectedBin.Bin_Type).replace('bg-', 'border-')}`}>
                <p className="text-[10px] font-bold text-outline uppercase mb-0.5">{t.map.wasteType}</p>
                <p className="text-sm font-bold text-on-surface line-clamp-1">{selectedBin.Bin_Type}</p>
              </div>
              <div className="bg-surface-container-low p-3 shield-motif">
                <p className="text-[10px] font-bold text-outline uppercase mb-0.5">{t.map.container}</p>
                <p className="text-sm font-bold text-on-surface line-clamp-1">{selectedBin.Container_Type || 'Standard'}</p>
              </div>
            </div>

            {/* Navigate button - opens Google Maps */}
            <button
              onClick={() => openGoogleMapsDirections(selectedBin.Latitude, selectedBin.Longitude)}
              className="w-full bg-primary text-white font-black py-3.5 tracking-widest shield-motif active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase text-xs"
            >
              <Navigation className="w-4 h-4" />
              {t.map.navigate}
            </button>

            {/* Report problem - secondary action */}
            <button
              disabled={reportingBin || reportSuccess || !user}
              onClick={async () => {
                if (!user || !selectedBin) return;
                setReportingBin(true);
                await supabase.from('bin_reports').insert({
                  user_id: user.id,
                  bin_object_id: selectedBin.OBJECTID,
                  bin_name: selectedBin.Name,
                  bin_location: selectedBin.Location,
                  bin_type: selectedBin.Bin_Type,
                  latitude: selectedBin.Latitude,
                  longitude: selectedBin.Longitude,
                });
                await supabase.rpc('increment_eko_bodovi', { points: 5 });
                setReportingBin(false);
                setReportSuccess(true);
                setTimeout(() => setReportSuccess(false), 3000);
              }}
              className={`w-full mt-2 font-bold py-2 flex items-center justify-center gap-1.5 uppercase text-[10px] tracking-widest transition-colors ${
                reportSuccess ? 'text-green-600' : 'text-outline hover:text-on-surface'
              } disabled:opacity-50`}
            >
              {reportingBin ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : reportSuccess ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <AlertTriangle className="w-3.5 h-3.5" />
              )}
              {reportSuccess ? 'Prijavljeno! +5 EkoBodova' : t.map.reportProblem}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
