import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Maximize2, 
  Phone, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { MaidProfile, EmployerProfile, UserRole } from '../types';

interface GPSRadarMapProps {
  currentRole: UserRole;
  maids: MaidProfile[];
  employers: EmployerProfile[];
  darkMode: boolean;
  onSelectMaid: (maid: MaidProfile) => void;
  onSelectEmployer: (emp: EmployerProfile) => void;
  onOpenChat: (userId: string, userName: string, role: UserRole) => void;
}

export const GPSRadarMap: React.FC<GPSRadarMapProps> = ({
  currentRole,
  maids,
  employers,
  darkMode,
  onSelectMaid,
  onSelectEmployer,
  onOpenChat,
}) => {
  const [maxRadiusKm, setMaxRadiusKm] = useState<number>(15);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [userLocationName, setUserLocationName] = useState('Kampala Central (Nakasero)');
  const [radarScanning, setRadarScanning] = useState(true);

  // User coordinate center (Nakasero, Kampala: 0.3200, 32.5800)
  const userLat = 0.3200;
  const userLng = 32.5800;

  // Calculate distance in kilometers using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(1));
  };

  // Compute distances
  const maidsWithDistance = maids.map(m => ({
    ...m,
    distanceKm: calculateDistance(userLat, userLng, m.location.lat, m.location.lng)
  }));

  const employersWithDistance = employers.map(e => ({
    ...e,
    distanceKm: calculateDistance(userLat, userLng, e.location.lat, e.location.lng)
  }));

  // Target candidates based on current active user role
  const displayItems = currentRole === 'employer'
    ? maidsWithDistance.filter(m => (m.distanceKm || 0) <= maxRadiusKm)
    : employersWithDistance.filter(e => (e.distanceKm || 0) <= maxRadiusKm);

  const selectedCandidate = currentRole === 'employer'
    ? maidsWithDistance.find(m => m.id === selectedCandidateId)
    : employersWithDistance.find(e => e.id === selectedCandidateId);

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 shadow-xs transition-colors ${
      darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
    }`}>
      {/* Map Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </span>
            <h3 className="text-lg font-bold">
              {currentRole === 'employer' ? 'Nearby Vetted House Maids (GPS)' : 'Nearby Trusted Employers (GPS)'}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Live Real-Time
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Center: <strong>{userLocationName}</strong></span>
            <span className="hidden md:inline">• Kampala & Wakiso Metropolitan Area</span>
          </p>
        </div>

        {/* Radius Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Radius:
          </span>
          {[3, 5, 10, 15, 30].map(radius => (
            <button
              key={radius}
              id={`gps-radius-${radius}km`}
              onClick={() => setMaxRadiusKm(radius)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                maxRadiusKm === radius
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {radius} km
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Radar & Visual Map View */}
        <div className="lg:col-span-2 relative min-h-[340px] sm:min-h-[380px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 flex items-center justify-center p-4 select-none">
          {/* Grid lines and Uganda Map overlay simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

          {/* Concentric Radar Rings */}
          <div className="absolute w-[120px] h-[120px] rounded-full border border-emerald-500/20"></div>
          <div className="absolute w-[220px] h-[220px] rounded-full border border-emerald-500/20"></div>
          <div className="absolute w-[320px] h-[320px] rounded-full border border-emerald-500/20"></div>

          {/* Compass crosshairs */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/15"></div>
          <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/15"></div>

          {/* Live Radar Sweep Animation */}
          {radarScanning && (
            <div className="absolute w-full h-full rounded-full animate-spin [animation-duration:6s] pointer-events-none">
              <div className="w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/20 to-transparent origin-bottom-right transform rotate-45 rounded-tl-full"></div>
            </div>
          )}

          {/* Center User Location Beacon */}
          <div className="absolute z-20 flex flex-col items-center">
            <div className="relative">
              <span className="w-5 h-5 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/50">
                <Navigation className="w-2.5 h-2.5 text-slate-950 transform rotate-45" />
              </span>
              <span className="absolute -inset-1.5 rounded-full bg-amber-400/40 animate-ping"></span>
            </div>
            <span className="mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-900/90 text-amber-300 border border-amber-400/40 shadow-xs">
              You (Kampala)
            </span>
          </div>

          {/* Placed Candidates on Radar relative to Kampala center */}
          {displayItems.map((item, idx) => {
            // Project lat/lng offsets into coordinate percentages
            const latDiff = (item.location.lat - userLat) * 800;
            const lngDiff = (item.location.lng - userLng) * 800;
            // Clamp to radar box
            const topPct = Math.max(12, Math.min(88, 50 - latDiff));
            const leftPct = Math.max(12, Math.min(88, 50 + lngDiff));
            const isSelected = selectedCandidateId === item.id;

            return (
              <div
                key={item.id}
                id={`radar-pin-${item.id}`}
                onClick={() => setSelectedCandidateId(item.id)}
                style={{ top: `${topPct}%`, left: `${leftPct}%` }}
                className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 group`}
              >
                <div className={`relative p-0.5 rounded-full transition-all ${
                  isSelected 
                    ? 'ring-4 ring-amber-400 shadow-lg shadow-amber-400/40 scale-125 z-40' 
                    : 'ring-2 ring-emerald-400 shadow-md group-hover:ring-amber-300'
                }`}>
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-slate-900"
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border border-slate-950"></span>
                </div>

                {/* Pin Tooltip */}
                <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-bold shadow-md pointer-events-none transition-opacity ${
                  isSelected 
                    ? 'bg-amber-400 text-slate-950 opacity-100 z-50' 
                    : 'bg-slate-900/95 text-emerald-200 border border-emerald-500/30 opacity-80 group-hover:opacity-100'
                }`}>
                  <span>{item.name.split(' ')[0]}</span> • <span>{item.distanceKm} km</span>
                </div>
              </div>
            );
          })}

          {/* Radar HUD Controls in Map Corner */}
          <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 text-[11px] bg-slate-900/85 backdrop-blur-xs p-2 rounded-lg border border-emerald-500/30 text-emerald-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active GPS Signal: Uganda (E.A)</span>
            </div>
            <div className="text-slate-400 text-[10px]">
              {displayItems.length} candidate(s) within {maxRadiusKm} km
            </div>
          </div>

          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
            <button
              onClick={() => setRadarScanning(!radarScanning)}
              className="px-2 py-1 rounded bg-slate-900/80 hover:bg-slate-800 text-[11px] font-semibold text-emerald-300 border border-emerald-500/30 cursor-pointer"
            >
              {radarScanning ? 'Pause Radar' : 'Resume Scan'}
            </button>
          </div>
        </div>

        {/* Selected Candidate Quick Dossier / Candidate List */}
        <div className="flex flex-col h-full space-y-3">
          {selectedCandidate ? (
            <div className={`p-4 rounded-xl border flex flex-col justify-between h-full ${
              darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-emerald-50/60 border-emerald-200'
            }`}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedCandidate.avatar}
                      alt={selectedCandidate.name}
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-emerald-500 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm sm:text-base">{selectedCandidate.name}</h4>
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        <span>{selectedCandidate.location.neighborhood}</span>
                      </p>
                      <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{selectedCandidate.rating}</span>
                        <span className="text-slate-400 font-normal">({selectedCandidate.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg text-xs font-extrabold bg-emerald-600 text-white shadow-xs">
                    {selectedCandidate.distanceKm} km away
                  </span>
                </div>

                {/* Verification badges */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300/60 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> NIN Validated
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-semibold border border-teal-300/60">
                    Biometric Verified
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                  {selectedCandidate.bio}
                </p>

                {/* Salary Info */}
                <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {currentRole === 'employer' ? 'Expected Salary:' : 'Offered Salary:'}
                  </span>
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    {selectedCandidate.monthlySalaryUgx.toLocaleString()} UGX / mo
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-200 dark:border-slate-700">
                <button
                  id="gps-chat-btn"
                  onClick={() => onOpenChat(selectedCandidate.id, selectedCandidate.name, selectedCandidate.role)}
                  className="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Start Chat</span>
                </button>
                <button
                  id="gps-view-dossier-btn"
                  onClick={() => {
                    if (currentRole === 'employer') {
                      onSelectMaid(selectedCandidate as MaidProfile);
                    } else {
                      onSelectEmployer(selectedCandidate as EmployerProfile);
                    }
                  }}
                  className="py-2 px-3 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Full Profile</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center border rounded-xl border-dashed border-slate-300 dark:border-slate-700">
              <Compass className="w-8 h-8 text-emerald-500 mb-2 opacity-80 animate-pulse" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Click any candidate pin on the radar
              </p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-[200px]">
                View live distances, verified credentials, and chat directly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
