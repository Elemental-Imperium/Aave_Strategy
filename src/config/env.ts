import { z } from 'zod';

const envSchema = z.object({
  VITE_ETHEREUM_RPC_URL: z.string().url(),
  VITE_POLYGON_RPC_URL: z.string().url(),
  VITE_AAVE_POOL_ADDRESS: z.string(),
  VITE_AAVE_ORACLE_ADDRESS: z.string(),
  VITE_OPENAI_API_KEY: z.string(),
  VITE_API_BASE_URL: z.string().url(),
});

export const env = envSchema.parse({
  VITE_ETHEREUM_RPC_URL: import.meta.env.VITE_ETHEREUM_RPC_URL,
  VITE_POLYGON_RPC_URL: import.meta.env.VITE_POLYGON_RPC_URL,
  VITE_AAVE_POOL_ADDRESS: import.meta.env.VITE_AAVE_POOL_ADDRESS,
  VITE_AAVE_ORACLE_ADDRESS: import.meta.env.VITE_AAVE_ORACLE_ADDRESS,
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
}); 