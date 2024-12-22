import { z } from 'zod';
import dotenv from 'dotenv';
import { NetworkConfig, ServerConfig, AIConfig } from '../types/config';
import { CHAIN_CONFIG } from './chains';

dotenv.config();

// Expand env schema to include all required variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  DATABASE_URL: z.string(),
  OPENAI_API_KEY: z.string(),
  VITE_API_BASE_URL: z.string().url(),
  ETHEREUM_RPC_URL: z.string().url(),
  POLYGON_RPC_URL: z.string().url(),
  OPTIMISM_RPC_URL: z.string().url(),
  ARBITRUM_RPC_URL: z.string().url(),
  BASE_RPC_URL: z.string().url(),
  // Add contract addresses from env.d.ts
  ETHEREUM_AAVE_POOL_ADDRESS: z.string(),
  ETHEREUM_AAVE_ORACLE_ADDRESS: z.string(),
  ETHEREUM_AAVE_DATA_PROVIDER: z.string(),
  POLYGON_AAVE_POOL_ADDRESS: z.string(),
  POLYGON_AAVE_ORACLE_ADDRESS: z.string(),
  POLYGON_AAVE_DATA_PROVIDER: z.string(),
  OPTIMISM_AAVE_POOL_ADDRESS: z.string(),
  OPTIMISM_AAVE_ORACLE_ADDRESS: z.string(),
  OPTIMISM_AAVE_DATA_PROVIDER: z.string(),
  ARBITRUM_AAVE_POOL_ADDRESS: z.string(),
  ARBITRUM_AAVE_ORACLE_ADDRESS: z.string(),
  ARBITRUM_AAVE_DATA_PROVIDER: z.string(),
  BASE_AAVE_POOL_ADDRESS: z.string(),
  BASE_AAVE_ORACLE_ADDRESS: z.string(),
  BASE_AAVE_DATA_PROVIDER: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

// Create network configs using chain config and env variables
const createNetworkConfig = (network: keyof typeof CHAIN_CONFIG): NetworkConfig => {
  const chainConfig = CHAIN_CONFIG[network];
  return {
    rpcUrl: parsed.data[`${network.toUpperCase()}_RPC_URL`],
    poolAddress: parsed.data[`${network.toUpperCase()}_AAVE_POOL_ADDRESS`],
    oracleAddress: parsed.data[`${network.toUpperCase()}_AAVE_ORACLE_ADDRESS`],
    dataProvider: parsed.data[`${network.toUpperCase()}_AAVE_DATA_PROVIDER`],
    explorer: chainConfig.explorer,
  };
};

export const config = {
  server: {
    port: parsed.data.PORT,
    env: parsed.data.NODE_ENV,
  } satisfies ServerConfig,
  
  ai: {
    openaiApiKey: parsed.data.OPENAI_API_KEY,
    model: 'gpt-4-turbo-preview',
    maxTokens: 4096,
  } satisfies AIConfig,
  
  networks: {
    ethereum: createNetworkConfig('ethereum'),
    polygon: createNetworkConfig('polygon'),
    optimism: createNetworkConfig('optimism'),
    arbitrum: createNetworkConfig('arbitrum'),
    base: createNetworkConfig('base'),
  } satisfies Record<string, NetworkConfig>,
} as const;

// Export type for type inference
export type Config = typeof config; 