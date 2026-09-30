import { DistrictVulnerability } from '../types/resilience';

export const mockDistrictVulnerabilities: DistrictVulnerability[] = [
  {
    id: 'dist-kendrapara',
    district: 'Kendrapara',
    state: 'Odisha',
    score: 88,
    category: 'CRITICAL',
    population: 1440000,
    evacueesEstimated: 4200,
    primaryRiskFactor: 'Direct eye landfall vector, 4.8m storm surge, low-elevation delta'
  },
  {
    id: 'dist-puri',
    district: 'Puri',
    state: 'Odisha',
    score: 79,
    category: 'HIGH',
    population: 1698000,
    evacueesEstimated: 2600,
    primaryRiskFactor: 'High coastal exposure, temple heritage zone, marine drive flooding'
  },
  {
    id: 'dist-srikakulam',
    district: 'Srikakulam',
    state: 'Andhra Pradesh',
    score: 62,
    category: 'HIGH',
    population: 2703000,
    evacueesEstimated: 800,
    primaryRiskFactor: 'Coastal fishing settlements, intense rain bands, flash river runoff'
  },
  {
    id: 'dist-visakhapatnam',
    district: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    score: 58,
    category: 'MEDIUM',
    population: 4290000,
    evacueesEstimated: 350,
    primaryRiskFactor: 'Major port facility, coastal gale winds, industrial sector containment'
  },
  {
    id: 'dist-ganjam',
    district: 'Ganjam',
    state: 'Odisha',
    score: 54,
    category: 'MEDIUM',
    population: 3529000,
    evacueesEstimated: 250,
    primaryRiskFactor: 'Gopalpur coastal surge risk, vulnerable thatch dwellings'
  }
];

export const summaryKpiData = {
  populationExposed: 8200,
  criticalInfrastructureCount: 12,
  shelterCapacityTotal: 6400,
  responderGap: 33
};
