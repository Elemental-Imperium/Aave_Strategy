declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_ALCHEMY_API_KEY: string;
    ETHEREUM_AAVE_POOL_ADDRESS: string;
    ETHEREUM_AAVE_ORACLE_ADDRESS: string;
    ETHEREUM_AAVE_DATA_PROVIDER: string;
    POLYGON_AAVE_POOL_ADDRESS: string;
    POLYGON_AAVE_ORACLE_ADDRESS: string;
    POLYGON_AAVE_DATA_PROVIDER: string;
    OPTIMISM_AAVE_POOL_ADDRESS: string;
    OPTIMISM_AAVE_ORACLE_ADDRESS: string;
    OPTIMISM_AAVE_DATA_PROVIDER: string;
    ARBITRUM_AAVE_POOL_ADDRESS: string;
    ARBITRUM_AAVE_ORACLE_ADDRESS: string;
    ARBITRUM_AAVE_DATA_PROVIDER: string;
    BASE_AAVE_POOL_ADDRESS: string;
    BASE_AAVE_ORACLE_ADDRESS: string;
    BASE_AAVE_DATA_PROVIDER: string;
  }
} 