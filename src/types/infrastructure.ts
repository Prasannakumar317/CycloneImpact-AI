import { RiskLevel } from './cyclone';

export type InfrastructureType = 'hospital' | 'shelter' | 'power' | 'road';

export interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  district: string;
  emergencyCapacity: number;
  availableBeds: number;
  backupPower: 'Operational' | 'Auxiliary Only' | 'Vulnerable';
  riskLevel: RiskLevel;
  status: 'Operational' | 'Standby' | 'Hardened';
  icuBeds: number;
}

export interface Shelter {
  id: string;
  name: string;
  lat: number;
  lng: number;
  district: string;
  totalCapacity: number;
  currentOccupancy: number;
  floodSafety: 'High Elevation (Safe)' | 'Surge Resistant' | 'Ground-Floor Risk';
  riskLevel: RiskLevel;
  status: 'OPEN' | 'FULL' | 'STANDBY';
  sanitationPoints: number;
  waterSupplyDays: number;
}

export interface PowerSubstation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  district: string;
  substationStatus: 'Online - Grid Connected' | 'At-Risk (Surge Line)' | 'Secured / Isolated';
  populationServed: number;
  voltageKv: number;
  riskLevel: RiskLevel;
  backupDieselGenerator: boolean;
}

export interface MajorRoad {
  id: string;
  name: string;
  district: string;
  coordinates: [number, number][];
  clearanceStatus: 'Clear for Evacuation' | 'Flood Watch' | 'Coastal Chokepoint';
  riskLevel: RiskLevel;
  laneCount: number;
}

export type SelectedInfrastructure = 
  | { type: 'hospital'; data: Hospital }
  | { type: 'shelter'; data: Shelter }
  | { type: 'power'; data: PowerSubstation }
  | { type: 'road'; data: MajorRoad };
