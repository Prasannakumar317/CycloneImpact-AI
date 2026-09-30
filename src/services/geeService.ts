/**
 * TRICODEX — CYCLONESHIELD AI
 * Google Earth Engine (GEE) Satellite Geospatial Processing Service Adapter
 * 
 * Target Satellite Product:
 * - Copernicus Sentinel-1 C-band Synthetic Aperture Radar (SAR) Ground Range Detected (GRD)
 *   Earth Engine Collection: 'COPERNICUS/S1_GRD'
 * - Baseline Water Mask: JRC Global Surface Water ('JRC/GSW1_4/GlobalSurfaceWater')
 * - Elevation Model: Copernicus GLO-30 DEM ('COPERNICUS/DEM/GLO30')
 * 
 * ARCHITECTURE NOTICE:
 * Google Earth Engine uses server-side Python/Node APIs with Service Account Private Keys.
 * To prevent exposing private credentials in client-side code, real Earth Engine computations 
 * are executed on a secure backend which generates an ephemeral XYZ Tile URL or MapID.
 * 
 * When VITE_GEE_TILE_URL / VITE_GEE_MAP_ID are configured in .env, this adapter streams 
 * the live Earth Engine tiles. Otherwise, it serves high-fidelity Sentinel-1 SAR inundation 
 * proxy vectors for coastal Odisha & Andhra Pradesh.
 */

export interface GeeLayerConfig {
  projectId: string;
  mapId: string;
  tileUrlTemplate: string | null;
  datasetName: string;
  isLive: boolean;
  statusLabel: string;
  satelliteSensor: string;
}

export interface GeeInundationFeature {
  id: string;
  name: string;
  district: string;
  coordinates: [number, number][]; // [lat, lng] polygon vertices
  satelliteProduct: string;
  floodSusceptibility: 'EXTREME' | 'HIGH' | 'MODERATE';
  estimatedInundatedAreaSqKm: number;
  environmentalRiskScore: number; // 0 to 100
  notes: string;
}

export interface CompositeRiskScoreInput {
  hazardExposure: number; // 0-100 (from cyclone wind/surge proximity)
  environmentalFloodFactor: number; // 0-100 (from GEE satellite inundation proxy)
  infrastructureFragility: number; // 0-100 (from hospital/substation risk)
  populationDensity: number; // 0-100 (from census exposure)
}

/**
 * Calculates prototype composite risk score incorporating GEE environmental indicators.
 * NOTE: Weights are designed for demonstration and are not scientifically certified.
 */
export function calculateCompositeRisk(input: CompositeRiskScoreInput): {
  score: number;
  weightsLabel: string;
  breakdown: Record<string, number>;
} {
  // Prototype Multi-Criteria Decision Weights:
  // 35% Cyclone Hazard + 25% GEE Satellite Flood + 20% Infrastructure + 20% Population
  const score = Math.round(
    0.35 * input.hazardExposure +
    0.25 * input.environmentalFloodFactor +
    0.20 * input.infrastructureFragility +
    0.20 * input.populationDensity
  );

  return {
    score: Math.min(100, Math.max(0, score)),
    weightsLabel: '35% Hazard + 25% GEE Flood + 20% Infra + 20% Pop (Demo Weights)',
    breakdown: {
      hazard: Math.round(input.hazardExposure * 0.35),
      geeEnvironmental: Math.round(input.environmentalFloodFactor * 0.25),
      infrastructure: Math.round(input.infrastructureFragility * 0.20),
      population: Math.round(input.populationDensity * 0.20)
    }
  };
}

/**
 * High-resolution Sentinel-1 SAR Coastal Inundation & Surface Water Proxy polygons
 * Georeferenced around Odisha & Andhra Pradesh coastal deltas (Kendrapara, Paradeep, Puri, Srikakulam).
 */
export const mockGeeInundationZones: GeeInundationFeature[] = [
  {
    id: 'gee-zone-1',
    name: 'Mahanadi-Brahmani Delta Tidal Estuary Inundation',
    district: 'Kendrapara / Rajnagar Sector',
    coordinates: [
      [20.55, 86.60],
      [20.72, 86.85],
      [20.65, 87.05],
      [20.45, 86.95],
      [20.40, 86.70],
      [20.55, 86.60]
    ],
    satelliteProduct: 'Sentinel-1 C-SAR GRD (VV/VH Polarization)',
    floodSusceptibility: 'EXTREME',
    estimatedInundatedAreaSqKm: 185.4,
    environmentalRiskScore: 92,
    notes: 'Low-elevation mangrove wetlands (< 2m MSL). Severe tidal backwater surge inundation detected by SAR backscatter attenuation.'
  },
  {
    id: 'gee-zone-2',
    name: 'Paradeep Marine Embayment & Wetland Floodplain',
    district: 'Paradeep / Jagatsinghpur',
    coordinates: [
      [20.25, 86.52],
      [20.35, 86.65],
      [20.30, 86.78],
      [20.18, 86.72],
      [20.15, 86.58],
      [20.25, 86.52]
    ],
    satelliteProduct: 'Sentinel-1 C-SAR + JRC Surface Water Occurrence',
    floodSusceptibility: 'EXTREME',
    estimatedInundatedAreaSqKm: 112.8,
    environmentalRiskScore: 86,
    notes: 'Industrial port perimeter and coastal creeks. High soil moisture saturation proxy and storm runoff ponding.'
  },
  {
    id: 'gee-zone-3',
    name: 'Chilika Coastal Spit & Daya River Outflow',
    district: 'Puri / Krushnaprasad',
    coordinates: [
      [19.70, 85.40],
      [19.82, 85.65],
      [19.78, 85.85],
      [19.60, 85.75],
      [19.55, 85.48],
      [19.70, 85.40]
    ],
    satelliteProduct: 'Sentinel-1 SAR Multi-Temporal Backscatter',
    floodSusceptibility: 'HIGH',
    estimatedInundatedAreaSqKm: 94.2,
    environmentalRiskScore: 78,
    notes: 'Brackish lagoon coastal spit breach hazard. Backwater flood threat along Puri-Konark marine corridor.'
  },
  {
    id: 'gee-zone-4',
    name: 'Vamsadhara River Estuary Coastal Floodplain',
    district: 'Srikakulam / Kalingapatnam',
    coordinates: [
      [18.30, 84.05],
      [18.42, 84.18],
      [18.38, 84.28],
      [18.25, 84.22],
      [18.20, 84.10],
      [18.30, 84.05]
    ],
    satelliteProduct: 'Sentinel-1 C-SAR + GLO-30 DEM',
    floodSusceptibility: 'MODERATE',
    estimatedInundatedAreaSqKm: 56.5,
    environmentalRiskScore: 64,
    notes: 'Riverine flash discharge meeting high tidal swell. Localized street flooding in low-lying fishing hamlets.'
  }
];

/**
 * Returns GEE Satellite Layer configuration.
 * Automatically checks for live tile URL; falls back to demo Sentinel-1 SAR dataset.
 */
export function getGeeLayerConfig(): GeeLayerConfig {
  const customTileUrl = (import.meta.env.VITE_GEE_TILE_URL || '').trim();
  const mapId = (import.meta.env.VITE_GEE_MAP_ID || '').trim();
  const projectId = (import.meta.env.VITE_GEE_PROJECT_ID || '').trim();

  const isLive = Boolean(customTileUrl || (projectId && mapId));

  return {
    projectId: projectId || 'cycloneshield-gee-demo',
    mapId: mapId || 'sentinel1-sar-flood-proxy-v1',
    tileUrlTemplate: customTileUrl || (projectId && mapId ? `https://earthengine.googleapis.com/v1/projects/${projectId}/maps/${mapId}/tiles/{z}/{x}/{y}` : null),
    datasetName: 'Copernicus Sentinel-1 C-SAR Flood Inundation Proxy (COPERNICUS/S1_GRD)',
    isLive,
    statusLabel: isLive ? 'LIVE GEE TILE FEED' : 'DEMO / SIMULATION (Sentinel-1 SAR)',
    satelliteSensor: 'Sentinel-1 C-band SAR (Radar Backscatter Analysis)'
  };
}
