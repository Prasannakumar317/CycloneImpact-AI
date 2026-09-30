export type RiskLevel = 'EXTREME' | 'HIGH' | 'MODERATE' | 'LOW';

export interface CycloneStatus {
  name: string;
  status: 'SIMULATION' | 'REAL-TIME';
  category: string;
  windSpeedKmh: number;
  centralPressureHpa: number;
  landfallEta: string;
  currentLat: number;
  currentLng: number;
  movementSpeedKmh: number;
  heading: string;
}

export interface TrackPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  timestamp: string;
  windSpeedKmh: number;
  pressureHpa: number;
  category: string;
  isPast: boolean;
  isCurrent?: boolean;
}

export interface RiskZone {
  id: string;
  name: string;
  level: RiskLevel;
  center: [number, number];
  radiusKm: number;
  fillColor: string;
  strokeColor: string;
  exposedPopulation: number;
  surgeHeightMeters: number;
  description: string;
}
