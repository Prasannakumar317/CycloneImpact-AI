import { Hospital, Shelter, PowerSubstation, MajorRoad } from '../types/infrastructure';

export const mockHospitals: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Kendrapara District HQ Hospital',
    district: 'Kendrapara',
    lat: 20.498,
    lng: 86.425,
    emergencyCapacity: 350,
    availableBeds: 62,
    backupPower: 'Auxiliary Only',
    riskLevel: 'EXTREME',
    status: 'Hardened',
    icuBeds: 24
  },
  {
    id: 'hosp-2',
    name: 'Paradip Port Trust Critical Hospital',
    district: 'Jagatsinghpur / Paradeep',
    lat: 20.285,
    lng: 86.665,
    emergencyCapacity: 280,
    availableBeds: 45,
    backupPower: 'Operational',
    riskLevel: 'EXTREME',
    status: 'Hardened',
    icuBeds: 18
  },
  {
    id: 'hosp-3',
    name: 'Puri District Hospital & Trauma Center',
    district: 'Puri',
    lat: 19.813,
    lng: 85.831,
    emergencyCapacity: 420,
    availableBeds: 90,
    backupPower: 'Operational',
    riskLevel: 'HIGH',
    status: 'Operational',
    icuBeds: 30
  },
  {
    id: 'hosp-4',
    name: 'MKCG Medical College & Hospital',
    district: 'Ganjam (Berhampur)',
    lat: 19.314,
    lng: 84.792,
    emergencyCapacity: 650,
    availableBeds: 180,
    backupPower: 'Operational',
    riskLevel: 'MODERATE',
    status: 'Operational',
    icuBeds: 45
  },
  {
    id: 'hosp-5',
    name: 'RIMS Super Specialty Hospital',
    district: 'Srikakulam',
    lat: 18.294,
    lng: 83.896,
    emergencyCapacity: 300,
    availableBeds: 75,
    backupPower: 'Auxiliary Only',
    riskLevel: 'HIGH',
    status: 'Operational',
    icuBeds: 20
  },
  {
    id: 'hosp-6',
    name: 'King George Regional Hospital',
    district: 'Visakhapatnam',
    lat: 17.708,
    lng: 83.303,
    emergencyCapacity: 800,
    availableBeds: 240,
    backupPower: 'Operational',
    riskLevel: 'MODERATE',
    status: 'Operational',
    icuBeds: 60
  }
];

export const mockShelters: Shelter[] = [
  {
    id: 'sh-1',
    name: 'Community Shelter 03 (Marshaghai)',
    district: 'Kendrapara',
    lat: 20.435,
    lng: 86.512,
    totalCapacity: 1800,
    currentOccupancy: 420,
    floodSafety: 'High Elevation (Safe)',
    riskLevel: 'EXTREME',
    status: 'OPEN',
    sanitationPoints: 16,
    waterSupplyDays: 6
  },
  {
    id: 'sh-2',
    name: 'Paradeep Marine Coastal Shelter 01',
    district: 'Paradeep',
    lat: 20.298,
    lng: 86.634,
    totalCapacity: 1400,
    currentOccupancy: 980,
    floodSafety: 'Surge Resistant',
    riskLevel: 'EXTREME',
    status: 'OPEN',
    sanitationPoints: 12,
    waterSupplyDays: 4
  },
  {
    id: 'sh-3',
    name: 'Konark Multi-Purpose Cyclone Shelter',
    district: 'Puri',
    lat: 19.894,
    lng: 86.096,
    totalCapacity: 1600,
    currentOccupancy: 350,
    floodSafety: 'High Elevation (Safe)',
    riskLevel: 'HIGH',
    status: 'OPEN',
    sanitationPoints: 14,
    waterSupplyDays: 5
  },
  {
    id: 'sh-4',
    name: 'Gopalpur Port Emergency Haven',
    district: 'Ganjam',
    lat: 19.262,
    lng: 84.908,
    totalCapacity: 800,
    currentOccupancy: 120,
    floodSafety: 'High Elevation (Safe)',
    riskLevel: 'MODERATE',
    status: 'OPEN',
    sanitationPoints: 8,
    waterSupplyDays: 7
  },
  {
    id: 'sh-5',
    name: 'Bhavanapadu Coastal Lifeline Shelter',
    district: 'Srikakulam',
    lat: 18.572,
    lng: 84.341,
    totalCapacity: 800,
    currentOccupancy: 210,
    floodSafety: 'Surge Resistant',
    riskLevel: 'HIGH',
    status: 'OPEN',
    sanitationPoints: 8,
    waterSupplyDays: 5
  }
];

export const mockPowerSubstations: PowerSubstation[] = [
  {
    id: 'pwr-1',
    name: 'Paradeep Heavy Coastal Grid 220kV',
    district: 'Paradeep / Kendrapara',
    lat: 20.312,
    lng: 86.589,
    substationStatus: 'At-Risk (Surge Line)',
    populationServed: 185000,
    voltageKv: 220,
    riskLevel: 'EXTREME',
    backupDieselGenerator: true
  },
  {
    id: 'pwr-2',
    name: 'Kendrapara Central 132kV Substation',
    district: 'Kendrapara',
    lat: 20.518,
    lng: 86.402,
    substationStatus: 'Online - Grid Connected',
    populationServed: 142000,
    voltageKv: 132,
    riskLevel: 'EXTREME',
    backupDieselGenerator: true
  },
  {
    id: 'pwr-3',
    name: 'Puri Marine Drive 132kV Node',
    district: 'Puri',
    lat: 19.824,
    lng: 85.854,
    substationStatus: 'Online - Grid Connected',
    populationServed: 110000,
    voltageKv: 132,
    riskLevel: 'HIGH',
    backupDieselGenerator: false
  },
  {
    id: 'pwr-4',
    name: 'Chhatrapur Coastal Feeder 220kV',
    district: 'Ganjam',
    lat: 19.356,
    lng: 84.992,
    substationStatus: 'Online - Grid Connected',
    populationServed: 95000,
    voltageKv: 220,
    riskLevel: 'MODERATE',
    backupDieselGenerator: true
  },
  {
    id: 'pwr-5',
    name: 'Srikakulam Transco Grid 220kV',
    district: 'Srikakulam',
    lat: 18.318,
    lng: 83.921,
    substationStatus: 'Online - Grid Connected',
    populationServed: 130000,
    voltageKv: 220,
    riskLevel: 'HIGH',
    backupDieselGenerator: true
  }
];

export const mockRoads: MajorRoad[] = [
  {
    id: 'rd-1',
    name: 'NH-16 Coastal Evacuation Trunk (Cuttack-Bhubaneswar-Berhampur)',
    district: 'Odisha / AP Corridor',
    coordinates: [
      [20.50, 85.88],
      [20.29, 85.82],
      [19.80, 85.50],
      [19.32, 84.80],
      [18.30, 83.90],
      [17.72, 83.30]
    ],
    clearanceStatus: 'Clear for Evacuation',
    riskLevel: 'MODERATE',
    laneCount: 6
  },
  {
    id: 'rd-2',
    name: 'SH-12 Paradeep-Cuttack Heavy Corridor',
    district: 'Paradeep / Jagatsinghpur',
    coordinates: [
      [20.46, 85.90],
      [20.35, 86.25],
      [20.29, 86.64]
    ],
    clearanceStatus: 'Flood Watch',
    riskLevel: 'EXTREME',
    laneCount: 4
  },
  {
    id: 'rd-3',
    name: 'Puri-Konark Coastal Marine Drive',
    district: 'Puri',
    coordinates: [
      [19.80, 85.82],
      [19.85, 85.96],
      [19.89, 86.09]
    ],
    clearanceStatus: 'Coastal Chokepoint',
    riskLevel: 'HIGH',
    laneCount: 2
  }
];
