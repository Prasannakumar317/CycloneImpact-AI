import { ResilienceCorpsMetrics, PriorityAction, CitizenAlertState } from '../types/resilience';

export const mockResilienceCorps: ResilienceCorpsMetrics = {
  required: 80,
  available: 47,
  capacityGap: 33,
  readinessPercentage: 59, // 47 / 80 = 58.75%
  recommendation: 'Mobilize trained responders from neighboring low-risk zones and initiate local preparedness training where capacity remains insufficient.',
  specialistUnitsNeeded: {
    swiftWaterRescue: 14,
    traumaParamedics: 10,
    logisticsOfficers: 5,
    hamRadioOperators: 4
  }
};

export const mockPriorityActions: PriorityAction[] = [
  {
    id: 1,
    title: 'Prepare high-risk coastal zones for evacuation.',
    description: 'Enforce pre-landfall zero-casualty evacuation protocols across Kendrapara, Paradeep, and coastal Puri low-lying villages (within 5km of shoreline).',
    sector: 'Evacuation',
    urgency: 'IMMEDIATE',
    assignedAgency: 'OSDMA / District Collectors / Local Police'
  },
  {
    id: 2,
    title: 'Verify emergency shelter capacity.',
    description: 'Audit food stock, potable water tanks (min 5-day supply), back-up DG sets, and emergency medical kits in Community Shelter 03 and neighboring cyclone havens.',
    sector: 'Shelter',
    urgency: 'IMMEDIATE',
    assignedAgency: 'Block Development Officers / Red Cross'
  },
  {
    id: 3,
    title: 'Secure vulnerable power infrastructure.',
    description: 'Proactively isolate coastal feeder lines susceptible to 165 km/h tree falls. Pre-stage diesel generators at all regional hospitals and trauma centers.',
    sector: 'Power & Grid',
    urgency: 'HIGH',
    assignedAgency: 'OPTCL / Eastern Discom Teams'
  },
  {
    id: 4,
    title: 'Maintain emergency access on major evacuation roads.',
    description: 'Station heavy earthmovers and tree-cutting chainsaw teams along NH-16 and SH-12 (Paradeep corridor) to clear storm debris within 2 hours of landfall.',
    sector: 'Transport',
    urgency: 'HIGH',
    assignedAgency: 'NHAI / ODRAF Engineering Battalions'
  },
  {
    id: 5,
    title: 'Mobilize additional trained responders.',
    description: 'Deploy 33 additional trained personnel from inland districts (Khordha, Mayurbhanj) to bridge the operational gap in Red Zone sector Alpha.',
    sector: 'Resilience Corps',
    urgency: 'IMMEDIATE',
    assignedAgency: 'NDRF 3rd Battalion / Civil Defence'
  }
];

export const mockCitizenAlert: CitizenAlertState = {
  severity: 'EXTREME',
  badge: 'HIGH RISK ALERT',
  headline: 'Severe Cyclonic Storm Warning — Coastal Sector',
  description: 'Heavy rainfall and coastal flooding may affect this area. Follow official evacuation instructions immediately.',
  officialInstructions: [
    'Secure all loose outdoor objects and stay indoors away from glass windows.',
    'Keep your mobile phone fully charged, emergency torch ready, and store 3 days of potable water.',
    'Do not venture near the beach, marine drive, or low-lying tidal inlets.',
    'If living in a kutcha or thatch structure, evacuate immediately to the designated cyclone shelter.'
  ],
  designatedShelter: {
    name: 'Community Shelter 03',
    status: 'OPEN',
    capacityText: 'Available (1,380 / 1,800 slots vacant)',
    distanceKm: 1.8,
    locationNote: 'Marshaghai Block High School Ground, Elevated Concrete Structure'
  }
};
