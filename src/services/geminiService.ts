import { CycloneStatus } from '../types/cyclone';
import { PriorityAction } from '../types/resilience';
import { Hospital, Shelter, PowerSubstation, MajorRoad } from '../types/infrastructure';
import { DistrictVulnerability } from '../types/resilience';
import { mockPriorityActions } from '../data/responderData';

export interface DisasterContext {
  cyclone: CycloneStatus;
  exposedPopulation: number;
  criticalInfrastructureCount: number;
  shelterCapacityTotal: number;
  responderRequired: number;
  responderAvailable: number;
  responderGap: number;
  districts: DistrictVulnerability[];
  hospitals: Hospital[];
  shelters: Shelter[];
  powerSubstations: PowerSubstation[];
  roads: MajorRoad[];
}

export interface GeminiActionPlanResponse {
  isLiveApi: boolean;
  modelUsed: string;
  timestamp: string;
  actions: PriorityAction[];
  publicAdvisory: string;
  sourceNote: string;
}

// Fallback response when API key is missing or request fails
export const getFallbackPlan = (reason?: string): GeminiActionPlanResponse => {
  return {
    isLiveApi: false,
    modelUsed: 'mock-simulation-agent',
    timestamp: new Date().toLocaleTimeString(),
    actions: mockPriorityActions,
    publicAdvisory: 'Heavy rainfall, gale winds, and tidal storm surge anticipated. High-risk coastal settlements must evacuate to designated concrete shelters immediately. Follow official instructions from district emergency authorities.',
    sourceNote: reason ? `Fallback Mode (${reason})` : 'Simulated Decision Support'
  };
};

/**
 * Calls Google Gemini REST API with fallback to ensure demo stability.
 * Uses current official Gemini models: gemini-3.7-flash -> gemini-2.5-flash -> gemini-2.0-flash -> gemini-1.5-flash.
 */
export async function generateActionPlan(context: DisasterContext): Promise<GeminiActionPlanResponse> {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();

  // If no API key provided, return safe fallback immediately
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.warn('[CycloneShield AI] No VITE_GEMINI_API_KEY found. Operating in fallback mock mode.');
    return getFallbackPlan('No API key configured in .env');
  }

  // Construct structured scenario prompt
  const highRiskDistricts = context.districts.filter(d => d.score >= 70).map(d => `${d.district} (${d.score}/100 - ${d.category})`).join(', ');
  const extremeInfra = [
    ...context.hospitals.filter(h => h.riskLevel === 'EXTREME').map(h => `Hospital: ${h.name} (${h.district})`),
    ...context.powerSubstations.filter(p => p.riskLevel === 'EXTREME').map(p => `Substation: ${p.name} (${p.voltageKv}kV)`),
    ...context.roads.filter(r => r.riskLevel === 'EXTREME').map(r => `Road: ${r.name} (${r.clearanceStatus})`)
  ].join('; ');

  const systemInstruction = `You are the lead AI Disaster Resilience Advisor for TRICODEX CYCLONESHIELD AI, an emergency management platform for the Bay of Bengal coastline (Odisha and Andhra Pradesh).
Generate a concise, tactical action plan for disaster authorities and a short public advisory.
You MUST respond with valid JSON only matching the schema below without markdown backticks.`;

  const userPrompt = `TACTICAL CYCLONE CONTEXT:
- Storm Name: ${context.cyclone.name}
- Category: ${context.cyclone.category}
- Sustained Winds: ${context.cyclone.windSpeedKmh} km/h (Gusts: 185 km/h)
- Central Pressure: ${context.cyclone.centralPressureHpa} hPa
- Landfall ETA: ${context.cyclone.landfallEta} (Heading: ${context.cyclone.heading})
- Exposed Population in Red/Amber Zones: ${context.exposedPopulation.toLocaleString()}
- Critical Facilities Tracked: ${context.criticalInfrastructureCount}
- Total Designated Shelter Capacity: ${context.shelterCapacityTotal.toLocaleString()}
- Local Resilience Corps Responders: Required: ${context.responderRequired}, Available: ${context.responderAvailable}, Gap/Deficit: ${context.responderGap}
- Critical Risk Districts: ${highRiskDistricts}
- Extreme Risk Infrastructure: ${extremeInfra}
- Google Earth Engine (GEE) Satellite Inundation Layer: Copernicus Sentinel-1 SAR radar indicates ~185 sq km coastal wetland inundation in Kendrapara / Mahanadi delta and ~113 sq km in Paradeep embayment

TASK:
Produce an operational response containing:
1. Exactly 5 top priority actions covering:
   - Evacuation/preparedness actions for coastal zones
   - Critical infrastructure protection actions (power grid, hospitals)
   - Shelter capacity and logistics actions
   - Evacuation road clearance & mobility actions
   - Responder mobilization actions to bridge the ${context.responderGap}-person deficit
2. A concise 2-sentence public advisory for coastal citizens.

JSON SCHEMA:
{
  "publicAdvisory": "string (short 2-sentence public warning advisory)",
  "actions": [
    {
      "id": 1,
      "title": "string (concise headline)",
      "description": "string (1-2 tactical sentences)",
      "sector": "Evacuation" | "Shelter" | "Power & Grid" | "Transport" | "Resilience Corps",
      "urgency": "IMMEDIATE" | "HIGH",
      "assignedAgency": "string (e.g. OSDMA / NDRF / Police / OPTCL)"
    }
  ]
}`;

  // Candidate models in order of modern preference: gemini-3.7-flash is primary
  const models = ['gemini-3.7-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const requestBody = {
        contents: [
          {
            role: 'user',
            parts: [{ text: userPrompt }]
          }
        ],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.2,
          topP: 0.8,
          responseMimeType: 'application/json'
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`[CycloneShield AI] Gemini API ${model} returned status ${response.status}: ${errorText}`);
        continue; // Try next fallback model
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error('Empty response from Gemini');
      }

      // Clean any potential markdown fencing if present
      const cleanedJson = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
      const parsed = JSON.parse(cleanedJson);

      if (Array.isArray(parsed.actions) && parsed.actions.length > 0) {
        return {
          isLiveApi: true,
          modelUsed: model,
          timestamp: new Date().toLocaleTimeString(),
          actions: parsed.actions.map((act: any, idx: number) => ({
            id: act.id || idx + 1,
            title: act.title || 'Operational Directive',
            description: act.description || '',
            sector: act.sector || 'Evacuation',
            urgency: act.urgency || 'IMMEDIATE',
            assignedAgency: act.assignedAgency || 'Disaster Management Team'
          })),
          publicAdvisory: parsed.publicAdvisory || 'Heavy rainfall and severe gales expected. Evacuate low-lying areas.',
          sourceNote: `Gemini API Live (${model})`
        };
      }
    } catch (err: any) {
      console.warn(`[CycloneShield AI] Error with model ${model}:`, err?.message || err);
      // Try next candidate
    }
  }

  // If all models failed or threw errors, fallback safely
  console.warn('[CycloneShield AI] All live Gemini model requests failed. Engaging emergency fallback.');
  return getFallbackPlan('Gemini API call failed / quota limit');
}
