/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ETHEREUM_RPC_URL: string;
  readonly VITE_POLYGON_RPC_URL: string;
  readonly VITE_OPTIMISM_RPC_URL: string;
  readonly VITE_ARBITRUM_RPC_URL: string;
  readonly VITE_BASE_RPC_URL: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_ALCHEMY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 