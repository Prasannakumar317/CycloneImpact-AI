import { RiskLevel } from './cyclone';

export interface DistrictVulnerability {
  id: string;
  district: string;
  state: 'Odisha' | 'Andhra Pradesh';
  score: number; // 0 to 100
  category: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  population: number;
  evacueesEstimated: number;
  primaryRiskFactor: string;
}

export interface ResilienceCorpsMetrics {
  required: number;
  available: number;
  capacityGap: number;
  readinessPercentage: number;
  recommendation: string;
  specialistUnitsNeeded: {
    swiftWaterRescue: number;
    traumaParamedics: number;
    logisticsOfficers: number;
    hamRadioOperators: number;
  };
}

export interface PriorityAction {
  id: number;
  title: string;
  description: string;
  sector: 'Evacuation' | 'Shelter' | 'Power & Grid' | 'Transport' | 'Resilience Corps';
  urgency: 'IMMEDIATE' | 'HIGH' | 'MONITORING';
  assignedAgency: string;
}

export interface CitizenAlertState {
  severity: RiskLevel;
  badge: string;
  headline: string;
  description: string;
  officialInstructions: string[];
  designatedShelter: {
    name: string;
    status: 'OPEN' | 'FULL' | 'STANDBY';
    capacityText: string;
    distanceKm: number;
    locationNote: string;
  };
}
