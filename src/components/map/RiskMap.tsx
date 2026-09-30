import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Eye, 
  EyeOff, 
  MapPin, 
  AlertTriangle, 
  Building2, 
  Home, 
  Zap, 
  Milestone,
  RefreshCw,
  Compass,
  Globe
} from 'lucide-react';
import { TrackPoint, RiskZone, CycloneStatus } from '../../types/cyclone';
import { Hospital, Shelter, PowerSubstation, MajorRoad, SelectedInfrastructure } from '../../types/infrastructure';
import { getGeeLayerConfig, mockGeeInundationZones } from '../../services/geeService';

interface RiskMapProps {
  cycloneStatus: CycloneStatus;
  trackPoints: TrackPoint[];
  riskZones: RiskZone[];
  hospitals: Hospital[];
  shelters: Shelter[];
  powerSubstations: PowerSubstation[];
  roads: MajorRoad[];
  onSelectInfrastructure: (item: SelectedInfrastructure | null) => void;
}

export const RiskMap: React.FC<RiskMapProps> = ({
  cycloneStatus,
  trackPoints,
  riskZones,
  hospitals,
  shelters,
  powerSubstations,
  roads,
  onSelectInfrastructure
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geeConfig = getGeeLayerConfig();

  // Layer groups refs
  const trackLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const riskZonesLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const geeLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const hospitalsLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const sheltersLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const powerLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());
  const roadsLayerGroupRef = useRef<L.LayerGroup>(L.layerGroup());

  // Layer Visibility State
  const [layers, setLayers] = useState({
    track: true,
    riskZones: true,
    geeSatellite: true,
    hospitals: true,
    shelters: true,
    power: true,
    roads: true
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Bay of Bengal / Odisha-AP coastline: [19.5, 85.8]
    const map = L.map(mapContainerRef.current, {
      center: [19.5, 85.8],
      zoom: 7,
      minZoom: 6,
      maxZoom: 14,
      zoomControl: false
    });

    // Demo-safe basemap using canonical OpenStreetMap with tactical dark styling (Zero Watermarks, No API Key Required)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'map-tiles-dark'
    }).addTo(map);

    // Zoom control at bottom-right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Add layer groups to map
    trackLayerGroupRef.current.addTo(map);
    riskZonesLayerGroupRef.current.addTo(map);
    geeLayerGroupRef.current.addTo(map);
    hospitalsLayerGroupRef.current.addTo(map);
    sheltersLayerGroupRef.current.addTo(map);
    powerLayerGroupRef.current.addTo(map);
    roadsLayerGroupRef.current.addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Cyclone Track & Eye
  useEffect(() => {
    const group = trackLayerGroupRef.current;
    group.clearLayers();
    if (!layers.track || !mapInstanceRef.current) return;

    // 1. Past track (solid line)
    const pastCoords: [number, number][] = trackPoints
      .filter(p => p.isPast || p.isCurrent)
      .map(p => [p.lat, p.lng]);

    if (pastCoords.length > 1) {
      L.polyline(pastCoords, {
        color: '#38bdf8',
        weight: 3.5,
        opacity: 0.9,
        dashArray: undefined
      }).addTo(group);
    }

    // 2. Future projected track (dashed line)
    const futureCoords: [number, number][] = trackPoints
      .filter(p => !p.isPast || p.isCurrent)
      .map(p => [p.lat, p.lng]);

    if (futureCoords.length > 1) {
      L.polyline(futureCoords, {
        color: '#f43f5e',
        weight: 4,
        opacity: 0.85,
        dashArray: '8, 8'
      }).addTo(group);
    }

    // 3. Track waypoints
    trackPoints.forEach((point) => {
      const isEye = point.isCurrent;
      const color = isEye ? '#ef4444' : point.isPast ? '#38bdf8' : '#fb7185';

      if (isEye) {
        // Pulsing Cyclone Eye DivIcon
        const eyeIcon = L.divIcon({
          className: 'custom-cyclone-eye',
          html: `
            <div class="relative flex items-center justify-center w-10 h-10 -ml-5 -mt-5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
              <span class="animate-pulse absolute inline-flex h-8 w-8 rounded-full bg-rose-600/40 border-2 border-rose-400"></span>
              <div class="relative w-4 h-4 rounded-full bg-white border-2 border-rose-600 flex items-center justify-center shadow-lg">
                <div class="w-1.5 h-1.5 rounded-full bg-rose-600"></div>
              </div>
            </div>
          `,
          iconSize: [40, 40]
        });

        const marker = L.marker([point.lat, point.lng], { icon: eyeIcon }).addTo(group);
        marker.bindPopup(`
          <div class="p-2 font-sans">
            <div class="flex items-center justify-between gap-2 border-b border-slate-700 pb-1 mb-2">
              <span class="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">CYCLONE EYE (LIVE)</span>
              <span class="text-[10px] font-mono bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">CAT-3 VSCS</span>
            </div>
            <div class="text-sm font-black text-white">${cycloneStatus.name}</div>
            <div class="text-xs text-slate-300 mt-1">Wind: <span class="font-mono text-rose-400 font-bold">${point.windSpeedKmh} km/h</span></div>
            <div class="text-xs text-slate-300">Central Pressure: <span class="font-mono text-sky-400 font-bold">${point.pressureHpa} hPa</span></div>
            <div class="text-xs text-slate-300">Heading: <span class="font-mono text-cyan-300">${cycloneStatus.heading}</span></div>
            <div class="text-[10px] text-amber-400 mt-2 pt-1 border-t border-slate-800">Landfall ETA: ${cycloneStatus.landfallEta} (DEMO SIMULATION)</div>
          </div>
        `);
      } else {
        // Standard Waypoints
        const waypointIcon = L.divIcon({
          className: 'custom-track-waypoint',
          html: `
            <div class="w-4 h-4 -ml-2 -mt-2 rounded-full border-2 ${
              point.isPast ? 'bg-sky-500 border-white' : 'bg-rose-500 border-white'
            } shadow flex items-center justify-center">
              <div class="w-1 h-1 rounded-full bg-white"></div>
            </div>
          `,
          iconSize: [16, 16]
        });

        const marker = L.marker([point.lat, point.lng], { icon: waypointIcon }).addTo(group);
        marker.bindPopup(`
          <div class="p-2 font-sans">
            <div class="text-[10px] font-mono text-slate-400 uppercase">${point.label}</div>
            <div class="text-xs font-bold text-white mt-0.5">${point.category}</div>
            <div class="text-xs text-slate-300 mt-1">Sustained Wind: <span class="font-mono font-bold text-rose-400">${point.windSpeedKmh} km/h</span></div>
            <div class="text-xs text-slate-300">Timestamp: <span class="font-mono text-slate-400">${point.timestamp}</span></div>
            <div class="text-[10px] text-slate-500 font-mono mt-1">Simulated Track Waypoint</div>
          </div>
        `);
      }
    });
  }, [layers.track, trackPoints, cycloneStatus]);

  // Update Risk Zones (Extreme, High, Moderate)
  useEffect(() => {
    const group = riskZonesLayerGroupRef.current;
    group.clearLayers();
    if (!layers.riskZones || !mapInstanceRef.current) return;

    riskZones.forEach(zone => {
      const circle = L.circle(zone.center, {
        radius: zone.radiusKm * 1000,
        color: zone.strokeColor,
        weight: 2,
        fillColor: zone.fillColor,
        fillOpacity: zone.level === 'EXTREME' ? 0.35 : zone.level === 'HIGH' ? 0.25 : 0.15,
        dashArray: zone.level === 'MODERATE' ? '6, 6' : undefined
      }).addTo(group);

      circle.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center gap-2 mb-1">
            <span class="px-2 py-0.5 text-[10px] font-mono font-bold rounded ${
              zone.level === 'EXTREME'
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : zone.level === 'HIGH'
                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                : 'bg-yellow-950 text-yellow-300 border border-yellow-800'
            }">
              ${zone.level} RISK ZONE
            </span>
          </div>
          <div class="text-sm font-bold text-white">${zone.name}</div>
          <p class="text-xs text-slate-300 mt-1">${zone.description}</p>
          <div class="mt-2 text-xs font-mono text-slate-400 pt-1.5 border-t border-slate-700/60">
            <div>Exposed Pop: <span class="text-white font-bold">${zone.exposedPopulation.toLocaleString()}</span></div>
            <div>Surge Potential: <span class="text-rose-400 font-bold">${zone.surgeHeightMeters}m</span></div>
          </div>
          <div class="text-[10px] text-amber-400 font-mono mt-1">DEMO / SIMULATED HAZARD BOUNDARY</div>
        </div>
      `);
    });
  }, [layers.riskZones, riskZones]);

  // Update GEE Satellite Layer (Sentinel-1 SAR / Cloud Tile Stream)
  useEffect(() => {
    const group = geeLayerGroupRef.current;
    group.clearLayers();
    if (!layers.geeSatellite || !mapInstanceRef.current) return;

    // 1. If live XYZ Tile URL is configured from GEE, add tile layer
    if (geeConfig.tileUrlTemplate) {
      L.tileLayer(geeConfig.tileUrlTemplate, {
        opacity: 0.65,
        maxZoom: 18,
        attribution: '&copy; Google Earth Engine'
      }).addTo(group);
    }

    // 2. Render Sentinel-1 SAR Coastal Inundation & Flood Extent Proxy polygons
    mockGeeInundationZones.forEach(zone => {
      const polygon = L.polygon(zone.coordinates, {
        color: '#06b6d4',
        weight: 2,
        fillColor: '#0891b2',
        fillOpacity: 0.35,
        dashArray: '5, 5'
      }).addTo(group);

      polygon.bindPopup(`
        <div class="p-2 font-sans max-w-xs">
          <div class="flex items-center justify-between text-[10px] font-mono mb-1 pb-1 border-b border-slate-700/80">
            <span class="text-cyan-400 font-bold">GEE SATELLITE LAYER</span>
            <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${
              zone.floodSusceptibility === 'EXTREME'
                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                : 'bg-amber-950 text-amber-300 border border-amber-800'
            }">${zone.floodSusceptibility} INUNDATION</span>
          </div>
          <div class="text-xs font-bold text-white">${zone.name}</div>
          <div class="text-[11px] text-slate-400 mb-2">${zone.district}</div>
          <div class="space-y-1 text-xs text-slate-300 font-mono bg-command-950 p-2 rounded border border-command-border/80">
            <div>Sensor: <span class="text-cyan-300 text-[10px]">${zone.satelliteProduct}</span></div>
            <div>Est. Inundation: <span class="text-white font-bold">${zone.estimatedInundatedAreaSqKm} sq km</span></div>
            <div>Env. Risk Factor: <span class="text-amber-400 font-bold">${zone.environmentalRiskScore}/100</span></div>
          </div>
          <p class="text-[11px] text-slate-300 mt-2 leading-relaxed">${zone.notes}</p>
          <div class="text-[9px] text-cyan-400 font-mono mt-2 pt-1 border-t border-slate-800">
            ${geeConfig.statusLabel} • NOT OFFICIAL FLOOD FORECAST
          </div>
        </div>
      `);
    });
  }, [layers.geeSatellite]);

  // Update Hospitals
  useEffect(() => {
    const group = hospitalsLayerGroupRef.current;
    group.clearLayers();
    if (!layers.hospitals || !mapInstanceRef.current) return;

    hospitals.forEach(h => {
      const icon = L.divIcon({
        className: 'custom-hosp-marker',
        html: `
          <div class="w-7 h-7 -ml-3.5 -mt-3.5 rounded-lg bg-blue-950/90 border-2 ${
            h.riskLevel === 'EXTREME' ? 'border-rose-500 shadow-rose-900/50' : 'border-blue-400'
          } shadow-md flex items-center justify-center text-blue-400 hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/></svg>
          </div>
        `,
        iconSize: [28, 28]
      });

      const marker = L.marker([h.lat, h.lng], { icon }).addTo(group);
      marker.on('click', () => {
        onSelectInfrastructure({ type: 'hospital', data: h });
      });

      marker.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center justify-between text-[10px] font-mono text-blue-400 mb-1">
            <span>HOSPITAL FACILITY</span>
            <span class="font-bold ${h.riskLevel === 'EXTREME' ? 'text-rose-400' : 'text-amber-400'}">${h.riskLevel} RISK</span>
          </div>
          <div class="text-sm font-bold text-white">${h.name}</div>
          <div class="text-xs text-slate-400 mb-2">${h.district}</div>
          <div class="space-y-1 text-xs text-slate-300 font-mono border-t border-slate-700/60 pt-2">
            <div>Emergency Cap: <span class="text-white font-bold">${h.emergencyCapacity} beds</span></div>
            <div>Available Beds: <span class="text-emerald-400 font-bold">${h.availableBeds}</span> (ICU: ${h.icuBeds})</div>
            <div>Backup Power: <span class="font-bold ${h.backupPower === 'Operational' ? 'text-emerald-400' : 'text-amber-400'}">${h.backupPower}</span></div>
            <div>Facility Status: <span class="text-sky-300">${h.status}</span></div>
          </div>
          <div class="text-[10px] text-slate-500 font-mono mt-2">Click to inspect in operational panel</div>
        </div>
      `);
    });
  }, [layers.hospitals, hospitals, onSelectInfrastructure]);

  // Update Shelters
  useEffect(() => {
    const group = sheltersLayerGroupRef.current;
    group.clearLayers();
    if (!layers.shelters || !mapInstanceRef.current) return;

    shelters.forEach(s => {
      const icon = L.divIcon({
        className: 'custom-shelter-marker',
        html: `
          <div class="w-7 h-7 -ml-3.5 -mt-3.5 rounded-lg bg-emerald-950/90 border-2 ${
            s.riskLevel === 'EXTREME' ? 'border-amber-400' : 'border-emerald-400'
          } shadow-md flex items-center justify-center text-emerald-400 hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          </div>
        `,
        iconSize: [28, 28]
      });

      const marker = L.marker([s.lat, s.lng], { icon }).addTo(group);
      marker.on('click', () => {
        onSelectInfrastructure({ type: 'shelter', data: s });
      });

      marker.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
            <span>EMERGENCY HAVEN</span>
            <span class="font-bold text-emerald-300 font-mono">${s.status}</span>
          </div>
          <div class="text-sm font-bold text-white">${s.name}</div>
          <div class="text-xs text-slate-400 mb-2">${s.district}</div>
          <div class="space-y-1 text-xs text-slate-300 font-mono border-t border-slate-700/60 pt-2">
            <div>Total Capacity: <span class="text-white font-bold">${s.totalCapacity.toLocaleString()}</span></div>
            <div>Current Occupancy: <span class="text-amber-400 font-bold">${s.currentOccupancy}</span> (${Math.round((s.currentOccupancy / s.totalCapacity) * 100)}%)</div>
            <div>Flood Safety: <span class="text-emerald-400 font-bold">${s.floodSafety}</span></div>
            <div>Risk Category: <span class="text-amber-400">${s.riskLevel}</span></div>
          </div>
          <div class="text-[10px] text-slate-500 font-mono mt-2">Click to inspect in operational panel</div>
        </div>
      `);
    });
  }, [layers.shelters, shelters, onSelectInfrastructure]);

  // Update Power Infrastructure
  useEffect(() => {
    const group = powerLayerGroupRef.current;
    group.clearLayers();
    if (!layers.power || !mapInstanceRef.current) return;

    powerSubstations.forEach(p => {
      const icon = L.divIcon({
        className: 'custom-power-marker',
        html: `
          <div class="w-7 h-7 -ml-3.5 -mt-3.5 rounded-lg bg-amber-950/90 border-2 ${
            p.riskLevel === 'EXTREME' ? 'border-rose-500 shadow-rose-900/50' : 'border-amber-400'
          } shadow-md flex items-center justify-center text-amber-400 hover:scale-110 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
        `,
        iconSize: [28, 28]
      });

      const marker = L.marker([p.lat, p.lng], { icon }).addTo(group);
      marker.on('click', () => {
        onSelectInfrastructure({ type: 'power', data: p });
      });

      marker.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center justify-between text-[10px] font-mono text-amber-400 mb-1">
            <span>GRID SUBSTATION</span>
            <span class="font-bold ${p.riskLevel === 'EXTREME' ? 'text-rose-400' : 'text-amber-400'}">${p.riskLevel} RISK</span>
          </div>
          <div class="text-sm font-bold text-white">${p.name}</div>
          <div class="text-xs text-slate-400 mb-2">${p.district} • ${p.voltageKv}kV</div>
          <div class="space-y-1 text-xs text-slate-300 font-mono border-t border-slate-700/60 pt-2">
            <div>Substation Status: <span class="text-white font-bold">${p.substationStatus}</span></div>
            <div>Population Served: <span class="text-sky-300 font-bold">${p.populationServed.toLocaleString()}</span></div>
            <div>Backup Diesel: <span class="${p.backupDieselGenerator ? 'text-emerald-400' : 'text-rose-400'} font-bold">${p.backupDieselGenerator ? 'Operational' : 'Unavailable'}</span></div>
          </div>
          <div class="text-[10px] text-slate-500 font-mono mt-2">Click to inspect in operational panel</div>
        </div>
      `);
    });
  }, [layers.power, powerSubstations, onSelectInfrastructure]);

  // Update Roads
  useEffect(() => {
    const group = roadsLayerGroupRef.current;
    group.clearLayers();
    if (!layers.roads || !mapInstanceRef.current) return;

    roads.forEach(r => {
      const color = r.riskLevel === 'EXTREME' ? '#ef4444' : r.riskLevel === 'HIGH' ? '#f97316' : '#38bdf8';
      const polyline = L.polyline(r.coordinates, {
        color: color,
        weight: 4,
        opacity: 0.85
      }).addTo(group);

      polyline.on('click', () => {
        onSelectInfrastructure({ type: 'road', data: r });
      });

      polyline.bindPopup(`
        <div class="p-2 font-sans">
          <div class="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
            <span>MAJOR ROAD ARTERY</span>
            <span class="font-bold text-white">${r.laneCount} Lanes</span>
          </div>
          <div class="text-sm font-bold text-white">${r.name}</div>
          <div class="text-xs text-slate-400 mb-2">${r.district}</div>
          <div class="space-y-1 text-xs text-slate-300 font-mono border-t border-slate-700/60 pt-2">
            <div>Clearance Status: <span class="text-white font-bold">${r.clearanceStatus}</span></div>
            <div>Vulnerability: <span class="font-bold text-amber-400">${r.riskLevel} RISK</span></div>
          </div>
          <div class="text-[10px] text-slate-500 font-mono mt-2">Click to inspect in operational panel</div>
        </div>
      `);
    });
  }, [layers.roads, roads, onSelectInfrastructure]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([19.5, 85.8], 7);
    }
  };

  return (
    <div className="relative w-full h-[540px] lg:h-[620px] rounded-xl overflow-hidden border border-command-border bg-command-950 shadow-2xl">
      {/* The Leaflet Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating Tactical Layer Control Bar */}
      <div className="absolute top-3 left-3 z-[400] bg-command-900/90 backdrop-blur-md border border-command-border rounded-xl p-2.5 shadow-xl max-w-xs text-xs font-mono">
        <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-command-border/80">
          <div className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider text-[11px]">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>GIS Map Layers</span>
          </div>
          <button
            onClick={resetView}
            title="Reset Map View"
            className="p-1 hover:bg-command-800 rounded text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {/* Cyclone Track */}
          <button
            onClick={() => toggleLayer('track')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.track
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Cyclone Track</span>
            </span>
            {layers.track ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* Risk Zones */}
          <button
            onClick={() => toggleLayer('riskZones')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.riskZones
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <AlertTriangle className="w-3 h-3 text-amber-400" />
              <span>Risk Zones</span>
            </span>
            {layers.riskZones ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* Hospitals */}
          <button
            onClick={() => toggleLayer('hospitals')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.hospitals
                ? 'bg-blue-950/80 text-blue-300 border border-blue-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Building2 className="w-3 h-3 text-blue-400" />
              <span>Hospitals</span>
            </span>
            {layers.hospitals ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* Shelters */}
          <button
            onClick={() => toggleLayer('shelters')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.shelters
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Home className="w-3 h-3 text-emerald-400" />
              <span>Shelters</span>
            </span>
            {layers.shelters ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* Power */}
          <button
            onClick={() => toggleLayer('power')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.power
                ? 'bg-yellow-950/80 text-yellow-300 border border-yellow-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Zap className="w-3 h-3 text-yellow-400" />
              <span>Power Grid</span>
            </span>
            {layers.power ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* Roads */}
          <button
            onClick={() => toggleLayer('roads')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all ${
              layers.roads
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/80 font-bold'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Milestone className="w-3 h-3 text-cyan-400" />
              <span>Evac Roads</span>
            </span>
            {layers.roads ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>

          {/* SATELLITE / GEE LAYER */}
          <button
            onClick={() => toggleLayer('geeSatellite')}
            className={`flex items-center justify-between px-2 py-1.5 rounded transition-all col-span-2 ${
              layers.geeSatellite
                ? 'bg-cyan-950/90 text-cyan-300 border border-cyan-500/80 font-bold shadow-sm'
                : 'bg-command-950/60 text-slate-500 border border-transparent'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>SATELLITE / GEE LAYER</span>
            </span>
            {layers.geeSatellite ? <Eye className="w-3 h-3 shrink-0" /> : <EyeOff className="w-3 h-3 shrink-0" />}
          </button>
        </div>
      </div>

      {/* Floating Map Legend Overlay */}
      <div className="absolute bottom-3 left-3 z-[400] bg-command-900/90 backdrop-blur-md border border-command-border rounded-xl p-2.5 shadow-xl text-[11px] font-mono space-y-1.5 pointer-events-none hidden sm:block">
        <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px] pb-1 border-b border-command-border/80">
          Risk Zone Classification
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-600/80 border border-rose-400" />
          <span className="text-rose-300 font-bold">EXTREME RISK</span>
          <span className="text-slate-400">(Landfall Apex &lt; 50km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-600/80 border border-amber-400" />
          <span className="text-amber-300 font-bold">HIGH RISK</span>
          <span className="text-slate-400">(Gale Buffer 50-100km)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-600/80 border border-yellow-400" />
          <span className="text-yellow-300 font-bold">MODERATE RISK</span>
          <span className="text-slate-400">(Outer Squall 100-150km)</span>
        </div>
        <div className="flex items-center gap-2 pt-1 border-t border-command-border/60">
          <span className="w-3 h-3 rounded bg-cyan-500/40 border border-cyan-400" />
          <span className="text-cyan-300 font-bold">GEE SATELLITE</span>
          <span className="text-slate-400">(Sentinel-1 SAR Inundation)</span>
        </div>
      </div>

      {/* GEE Satellite Layer Status Indicator */}
      {layers.geeSatellite && (
        <div className="absolute bottom-3 right-3 z-[400] bg-command-900/90 backdrop-blur-md border border-cyan-500/40 rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-cyan-300 flex items-center gap-2 shadow pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>GEE SATELLITE LAYER:</span>
          <span className="font-bold text-white">{geeConfig.statusLabel}</span>
        </div>
      )}

      {/* Geographic Bounds Indicator */}
      <div className="absolute top-3 right-3 z-[400] bg-command-900/90 backdrop-blur-md border border-command-border rounded-lg px-2.5 py-1.5 text-[10px] font-mono text-slate-400 flex items-center gap-2 shadow">
        <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
        <span>SECTOR: ODISHA &amp; NORTH ANDHRA COAST</span>
      </div>
    </div>
  );
};
