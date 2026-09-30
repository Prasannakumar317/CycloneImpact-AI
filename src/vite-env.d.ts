/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MODE?: string;
  readonly VITE_GEMINI_API_KEY?: string;
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  readonly VITE_EARTH_ENGINE_CLIENT_ID?: string;
  readonly VITE_GEE_PROJECT_ID?: string;
  readonly VITE_GEE_MAP_ID?: string;
  readonly VITE_GEE_TILE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
