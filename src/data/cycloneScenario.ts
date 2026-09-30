import { CycloneStatus, TrackPoint, RiskZone } from '../types/cyclone';

export const mockCycloneStatus: CycloneStatus = {
  name: 'Cyclone Samudra',
  status: 'SIMULATION',
  category: 'Very Severe Cyclonic Storm',
  windSpeedKmh: 165,
  centralPressureHpa: 960,
  landfallEta: 'T-18 hrs',
  currentLat: 18.9,
  currentLng: 86.4,
  movementSpeedKmh: 18,
  heading: 'North-Northwest (325°)'
};

export const mockTrackPoints: TrackPoint[] = [
  {
    id: 'tp-1',
    lat: 16.5,
    lng: 88.5,
    label: 'T-36h (Deep Depression)',
    timestamp: 'Yesterday 06:00 IST',
    windSpeedKmh: 65,
    pressureHpa: 998,
    category: 'Deep Depression',
    isPast: true
  },
  {
    id: 'tp-2',
    lat: 17.4,
    lng: 87.6,
    label: 'T-24h (Cyclonic Storm)',
    timestamp: 'Yesterday 18:00 IST',
    windSpeedKmh: 95,
    pressureHpa: 988,
    category: 'Cyclonic Storm',
    isPast: true
  },
  {
    id: 'tp-3',
    lat: 18.2,
    lng: 86.9,
    label: 'T-12h (Severe Cyclonic Storm)',
    timestamp: 'Today 06:00 IST',
    windSpeedKmh: 135,
    pressureHpa: 974,
    category: 'Severe Cyclonic Storm',
    isPast: true
  },
  {
    id: 'tp-4',
    lat: 18.9,
    lng: 86.4,
    label: 'Current Position (Eye)',
    timestamp: 'Live Position',
    windSpeedKmh: 165,
    pressureHpa: 960,
    category: 'Very Severe Cyclonic Storm',
    isPast: false,
    isCurrent: true
  },
  {
    id: 'tp-5',
    lat: 19.8,
    lng: 86.2,
    label: 'T+6h (Projected Approach)',
    timestamp: 'Today 22:00 IST',
    windSpeedKmh: 175,
    pressureHpa: 952,
    category: 'Extremely Severe Storm (Peak)',
    isPast: false
  },
  {
    id: 'tp-6',
    lat: 20.3,
    lng: 86.1,
    label: 'T+18h (Projected Landfall - Paradeep/Kendrapara)',
    timestamp: 'Tomorrow 10:00 IST',
    windSpeedKmh: 160,
    pressureHpa: 962,
    category: 'Landfall Core Impact',
    isPast: false
  },
  {
    id: 'tp-7',
    lat: 21.0,
    lng: 85.8,
    label: 'T+30h (Inland Weakening)',
    timestamp: 'Tomorrow 22:00 IST',
    windSpeedKmh: 90,
    pressureHpa: 985,
    category: 'Cyclonic Storm Inland',
    isPast: false
  }
];

export const mockRiskZones: RiskZone[] = [
  {
    id: 'rz-extreme',
    name: 'Sector Alpha - Red Zone',
    level: 'EXTREME',
    center: [20.25, 86.4], // Near Kendrapara / Paradeep coast
    radiusKm: 42,
    fillColor: '#ef4444',
    strokeColor: '#b91c1c',
    exposedPopulation: 4200,
    surgeHeightMeters: 4.8,
    description: 'Catastrophic wind damage & 4-5m marine tidal surge anticipated near landfall apex.'
  },
  {
    id: 'rz-high',
    name: 'Sector Bravo - Amber Zone',
    level: 'HIGH',
    center: [19.8, 85.8], // Puri & Jagatsinghpur corridor
    radiusKm: 78,
    fillColor: '#f97316',
    strokeColor: '#c2410c',
    exposedPopulation: 2600,
    surgeHeightMeters: 2.7,
    description: 'Severe structural tearing, intense gales, power transmission disruption.'
  },
  {
    id: 'rz-moderate',
    name: 'Sector Charlie - Yellow Zone',
    level: 'MODERATE',
    center: [19.0, 84.9], // Ganjam / Srikakulam border outer bands
    radiusKm: 125,
    fillColor: '#eab308',
    strokeColor: '#a16207',
    exposedPopulation: 1400,
    surgeHeightMeters: 1.2,
    description: 'Sustained squally winds, flash street flooding, and localized power trippings.'
  }
];
