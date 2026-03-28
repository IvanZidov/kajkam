import { Search, Trash2, FileText, Recycle, Leaf, Factory, Navigation, AlertTriangle, Loader2, LocateFixed, X, MapPin, Check, Camera } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
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

interface BinReport {
  id: string;
  report_type: 'bin_issue' | 'illegal_dump';
  issue_type: string | null;
  image_url: string | null;
  latitude: number;
  longitude: number;
  status: string;
  created_at: string;
  description: string | null;
}

function createReportIcon(reportType: 'bin_issue' | 'illegal_dump'): L.DivIcon {
  const color = reportType === 'illegal_dump' ? '#BB0400' : '#FF8C00';
  const label = reportType === 'illegal_dump' ? '⚠' : '!';
  return L.divIcon({
    className: 'report-marker',
    html: `<div style="
      width: 22px; height: 22px;
      background: ${color}; color: white;
      border: 2px solid white; border-radius: 50%;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 12px; font-weight: 800;
    ">${label}</div>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const reportIconCache = new Map<string, L.DivIcon>();
function getCachedReportIcon(type: 'bin_issue' | 'illegal_dump'): L.DivIcon {
  if (!reportIconCache.has(type)) {
    reportIconCache.set(type, createReportIcon(type));
  }
  return reportIconCache.get(type)!;
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function MapScreen() {
  const { t } = useTranslation();
  const { user, isGuest } = useAuth();
  const [reportSuccess, setReportSuccess] = useState(false);

  // Report flow state
  const [reportMode, setReportMode] = useState<'none' | 'bin_issue' | 'illegal_dump_placing'>('none');
  const [reportImage, setReportImage] = useState<string | null>(null);
  const [reportIssueType, setReportIssueType] = useState<'full' | 'damaged' | 'missing' | 'other'>('full');
  const [reportDescription, setReportDescription] = useState('');
  const [reportSubmitting, setReportSubmitting] = useState(false);
  const [illegalDumpPin, setIllegalDumpPin] = useState<[number, number] | null>(null);
  const reportImageRef = useRef<HTMLInputElement>(null);
  const [selectedReport, setSelectedReport] = useState<BinReport | null>(null);
  const [reports, setReports] = useState<BinReport[]>([]);

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

  // Fetch reports for map display
  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await supabase
        .from('bin_reports')
        .select('id, report_type, issue_type, image_url, latitude, longitude, status, created_at, description')
        .eq('status', 'reported')
        .order('created_at', { ascending: false })
        .limit(200);
      if (data) setReports(data as BinReport[]);
    };
    fetchReports();
  }, [reportSuccess]);

  // Image capture handler
  const handleReportImage = (e: import('react').ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert(t.map.imageTooLarge); return; }
    const reader = new FileReader();
    reader.onload = () => setReportImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Upload report image to Supabase Storage
  const uploadReportImage = async (base64DataUrl: string): Promise<string | null> => {
    const [header, base64Data] = base64DataUrl.split(',');
    const mimeType = header.match(/data:(.*?);/)?.[1] || 'image/jpeg';
    const ext = mimeType.split('/')[1] || 'jpg';
    const folder = user ? `reports/${user.id}` : 'reports/guest';
    const fileName = `${folder}/${Date.now()}.${ext}`;

    const byteString = atob(base64Data);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
    const blob = new Blob([ab], { type: mimeType });

    const { error } = await supabase.storage.from('scan-images').upload(fileName, blob, { contentType: mimeType });
    if (error) { console.error('Upload error:', error); return null; }
    return supabase.storage.from('scan-images').getPublicUrl(fileName).data.publicUrl;
  };

  const resetReportState = () => {
    setReportMode('none');
    setReportImage(null);
    setReportDescription('');
    setReportIssueType('full');
    setReportSubmitting(false);
    setIllegalDumpPin(null);
  };

  // Submit bin issue report
  const handleSubmitBinReport = async () => {
    if (!selectedBin) return;
    setReportSubmitting(true);
    const imageUrl = reportImage ? await uploadReportImage(reportImage) : null;
    await supabase.from('bin_reports').insert({
      user_id: user?.id ?? null,
      report_type: 'bin_issue',
      issue_type: reportIssueType,
      bin_object_id: selectedBin.OBJECTID,
      bin_name: selectedBin.Name,
      bin_location: selectedBin.Location,
      bin_type: selectedBin.Bin_Type,
      latitude: selectedBin.Latitude,
      longitude: selectedBin.Longitude,
      image_url: imageUrl,
      description: reportDescription || null,
    });
    if (user) await supabase.rpc('increment_eko_bodovi', { points: 5 });
    resetReportState();
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

  // Submit illegal dump report
  const handleSubmitIllegalDump = async () => {
    if (!illegalDumpPin) return;
    setReportSubmitting(true);
    const imageUrl = reportImage ? await uploadReportImage(reportImage) : null;
    await supabase.from('bin_reports').insert({
      user_id: user?.id ?? null,
      report_type: 'illegal_dump',
      latitude: illegalDumpPin[0],
      longitude: illegalDumpPin[1],
      image_url: imageUrl,
      description: reportDescription || null,
    });
    if (user) await supabase.rpc('increment_eko_bodovi', { points: 10 });
    resetReportState();
    setReportSuccess(true);
    setTimeout(() => setReportSuccess(false), 3000);
  };

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
    setSelectedReport(null);
    resetReportState();
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

            {/* Report markers (outside cluster group - always visible) */}
            {reports.map((report) => (
              <Marker
                key={report.id}
                position={[report.latitude, report.longitude]}
                icon={getCachedReportIcon(report.report_type)}
                eventHandlers={{
                  click: () => {
                    setSelectedReport(report);
                    setSelectedBin(null);
                    resetReportState();
                    setFlyTarget([report.latitude, report.longitude]);
                    setFlyZoom(17);
                  },
                }}
              />
            ))}

            {/* Illegal dump placement mode */}
            {reportMode === 'illegal_dump_placing' && (
              <MapClickHandler onMapClick={(lat, lng) => setIllegalDumpPin([lat, lng])} />
            )}

            {/* Draggable illegal dump pin */}
            {reportMode === 'illegal_dump_placing' && illegalDumpPin && (
              <Marker
                position={illegalDumpPin}
                icon={getCachedReportIcon('illegal_dump')}
                draggable
                eventHandlers={{
                  dragend: (e) => {
                    const latlng = e.target.getLatLng();
                    setIllegalDumpPin([latlng.lat, latlng.lng]);
                  },
                }}
              />
            )}
          </MapContainer>

          {/* Map action buttons */}
          <div className="absolute bottom-28 right-4 z-[1000] flex flex-col gap-3">
            {/* Report illegal dump FAB */}
            <button
              onClick={() => {
                if (reportMode === 'illegal_dump_placing') {
                  resetReportState();
                } else {
                  setReportMode('illegal_dump_placing');
                  setSelectedBin(null);
                  setSelectedReport(null);
                  setIllegalDumpPin(userLocation ?? ZAGREB_CENTER);
                }
              }}
              className={`p-3 rounded-full shadow-xl active:scale-95 transition-all ${
                reportMode === 'illegal_dump_placing'
                  ? 'bg-secondary text-white'
                  : 'bg-surface-container-lowest text-secondary'
              }`}
            >
              <AlertTriangle className="w-6 h-6" />
            </button>
            {/* Locate user button */}
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

          {/* Illegal dump placement banner */}
          {reportMode === 'illegal_dump_placing' && (
            <div className="absolute top-28 left-1/2 -translate-x-1/2 z-[1000] bg-secondary text-white px-4 py-2 shield-motif shadow-lg text-[10px] font-black uppercase tracking-widest text-center">
              {t.map.tapToPlacePin}
            </div>
          )}
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
      {selectedBin && !selectedReport && (
        <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
          <div className="bg-surface-container-lowest shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.15)] shield-motif p-5 relative">
            <button
              onClick={() => { setSelectedBin(null); resetReportState(); }}
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

            {/* Report problem section */}
            {reportMode === 'bin_issue' ? (
              <div className="mt-3 space-y-3">
                {/* Hidden file input */}
                <input ref={reportImageRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleReportImage} />

                {/* Issue type chips */}
                <div className="flex gap-2 flex-wrap">
                  {(['full', 'damaged', 'missing', 'other'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setReportIssueType(type)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide transition-colors ${
                        reportIssueType === type ? 'bg-secondary text-white' : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      {t.map[`issue_${type}`]}
                    </button>
                  ))}
                </div>

                {/* Photo capture */}
                <button
                  onClick={() => reportImageRef.current?.click()}
                  className="w-full bg-surface-container-low py-3 shield-motif flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant active:bg-surface-container transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  {reportImage ? t.map.photoAdded : t.map.addPhoto}
                </button>
                {reportImage && <img src={reportImage} className="w-full h-32 object-cover shield-motif" alt="" />}

                {/* Description */}
                <textarea
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder={t.map.descriptionPlaceholder}
                  className="w-full bg-surface-container-low p-3 shield-motif text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary/30"
                  rows={2}
                />

                {/* Submit + Cancel */}
                <button
                  onClick={handleSubmitBinReport}
                  disabled={reportSubmitting}
                  className="w-full bg-secondary text-white font-black py-3 tracking-widest shield-motif active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase text-xs disabled:opacity-50"
                >
                  {reportSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
                  {t.map.submitReport}
                </button>
                {isGuest && <p className="text-[10px] text-outline text-center">{t.map.guestReportNote}</p>}
                <button
                  onClick={resetReportState}
                  className="w-full text-outline text-[10px] font-bold uppercase tracking-widest py-1"
                >
                  {t.map.cancelReport}
                </button>
              </div>
            ) : reportSuccess ? (
              <div className="w-full mt-2 font-bold py-2 flex items-center justify-center gap-1.5 uppercase text-[10px] tracking-widest text-green-600">
                <Check className="w-3.5 h-3.5" />
                {t.map.reportSubmitted}
              </div>
            ) : (
              <button
                onClick={() => setReportMode('bin_issue')}
                className="w-full mt-2 font-bold py-2 flex items-center justify-center gap-1.5 uppercase text-[10px] tracking-widest text-outline hover:text-on-surface transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {t.map.reportProblem}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Illegal dump report form */}
      {reportMode === 'illegal_dump_placing' && illegalDumpPin && (
        <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
          <div className="bg-surface-container-lowest shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.15)] shield-motif p-5 relative">
            <button
              onClick={resetReportState}
              className="absolute top-3 right-3 text-outline hover:text-on-surface p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto mb-4"></div>

            <h3 className="text-xs font-black uppercase tracking-widest text-secondary mb-1">
              {t.map.reportIllegalDump}
            </h3>
            <p className="text-[10px] text-outline mb-3">{t.map.dragPinInstruction}</p>

            {/* Hidden file input */}
            <input ref={reportImageRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleReportImage} />

            {/* Photo capture */}
            <button
              onClick={() => reportImageRef.current?.click()}
              className="w-full bg-surface-container-low py-3 shield-motif flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant active:bg-surface-container transition-colors"
            >
              <Camera className="w-4 h-4" />
              {reportImage ? t.map.photoAdded : t.map.addPhoto}
            </button>
            {reportImage && <img src={reportImage} className="w-full h-32 object-cover shield-motif mt-2" alt="" />}

            {/* Description */}
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder={t.map.descriptionPlaceholder}
              className="w-full bg-surface-container-low p-3 shield-motif text-sm mt-2 resize-none focus:outline-none focus:ring-1 focus:ring-primary/30"
              rows={2}
            />

            {/* Submit */}
            <button
              onClick={handleSubmitIllegalDump}
              disabled={reportSubmitting}
              className="w-full bg-secondary text-white font-black py-3 tracking-widest shield-motif active:scale-[0.98] transition-all flex items-center justify-center gap-2 uppercase text-xs mt-3 disabled:opacity-50"
            >
              {reportSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
              {t.map.submitReport}
            </button>
            {isGuest && <p className="text-[10px] text-outline text-center mt-2">{t.map.guestReportNote}</p>}
          </div>
        </div>
      )}

      {/* Report detail view */}
      {selectedReport && (
        <div className="absolute bottom-20 left-0 right-0 z-[1000] px-4">
          <div className="bg-surface-container-lowest shadow-[0_-4px_30px_-8px_rgba(0,0,0,0.15)] shield-motif p-5 relative">
            <button
              onClick={() => setSelectedReport(null)}
              className="absolute top-3 right-3 text-outline hover:text-on-surface p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-10 h-1 bg-surface-variant rounded-full mx-auto mb-4"></div>

            {/* Report type badge */}
            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white mb-3 ${
              selectedReport.report_type === 'illegal_dump' ? 'bg-secondary' : 'bg-[#FF8C00]'
            }`}>
              {selectedReport.report_type === 'illegal_dump' ? t.map.illegalDumpLabel : t.map.binIssueLabel}
            </span>
            {selectedReport.issue_type && (
              <span className="inline-block ml-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-surface-container-low text-on-surface-variant">
                {t.map[`issue_${selectedReport.issue_type}` as keyof typeof t.map] as string}
              </span>
            )}

            {/* Image */}
            {selectedReport.image_url && (
              <img src={selectedReport.image_url} className="w-full h-40 object-cover shield-motif mb-3" alt="" />
            )}

            {/* Description */}
            {selectedReport.description && (
              <p className="text-sm text-on-surface mb-2">{selectedReport.description}</p>
            )}

            {/* Timestamp */}
            <p className="text-[10px] text-outline">
              {t.map.reportedOn} {new Date(selectedReport.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
