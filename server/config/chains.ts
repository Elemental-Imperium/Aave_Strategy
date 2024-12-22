const CHAIN_DEFAULTS = {
  nativeCurrency: {
    decimals: 18
  }
};

const NATIVE_TOKENS = {
  ETH: {
    name: 'Ether',
    symbol: 'ETH'
  },
  MATIC: {
    name: 'MATIC',
    symbol: 'MATIC'
  },
  OP: {
    name: 'Optimism Ether',
    symbol: 'ETH'
  },
  ARB: {
    name: 'Arbitrum Ether',
    symbol: 'ETH'
  }
};

export const CHAIN_CONFIG = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
    poolAddress: process.env.ETHEREUM_AAVE_POOL_ADDRESS,
    oracleAddress: process.env.ETHEREUM_AAVE_ORACLE_ADDRESS,
    explorer: 'https://etherscan.io',
    aaveDataProvider: process.env.ETHEREUM_AAVE_DATA_PROVIDER,
    nativeCurrency: {
      ...CHAIN_DEFAULTS.nativeCurrency,
      ...NATIVE_TOKENS.ETH
    }
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
    poolAddress: process.env.POLYGON_AAVE_POOL_ADDRESS,
    oracleAddress: process.env.POLYGON_AAVE_ORACLE_ADDRESS,
    explorer: 'https://polygonscan.com',
    aaveDataProvider: process.env.POLYGON_AAVE_DATA_PROVIDER,
    nativeCurrency: {
      ...CHAIN_DEFAULTS.nativeCurrency,
      ...NATIVE_TOKENS.MATIC
    }
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    rpcUrl: `https://opt-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
    poolAddress: process.env.OPTIMISM_AAVE_POOL_ADDRESS,
    oracleAddress: process.env.OPTIMISM_AAVE_ORACLE_ADDRESS,
    explorer: 'https://optimistic.etherscan.io',
    aaveDataProvider: process.env.OPTIMISM_AAVE_DATA_PROVIDER,
    nativeCurrency: {
      ...CHAIN_DEFAULTS.nativeCurrency,
      ...NATIVE_TOKENS.OP
    }
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum',
    rpcUrl: `https://arb-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
    poolAddress: process.env.ARBITRUM_AAVE_POOL_ADDRESS,
    oracleAddress: process.env.ARBITRUM_AAVE_ORACLE_ADDRESS,
    explorer: 'https://arbiscan.io',
    aaveDataProvider: process.env.ARBITRUM_AAVE_DATA_PROVIDER,
    nativeCurrency: {
      ...CHAIN_DEFAULTS.nativeCurrency,
      ...NATIVE_TOKENS.ARB
    }
  },
  base: {
    id: 8453,
    name: 'Base',
    rpcUrl: `https://base-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`,
    poolAddress: process.env.BASE_AAVE_POOL_ADDRESS,
    oracleAddress: process.env.BASE_AAVE_ORACLE_ADDRESS,
    explorer: 'https://basescan.org',
    aaveDataProvider: process.env.BASE_AAVE_DATA_PROVIDER,
    nativeCurrency: {
      ...CHAIN_DEFAULTS.nativeCurrency,
      ...NATIVE_TOKENS.ETH
    }
  }
};

export const SUPPORTED_CHAINS = Object.keys(CHAIN_CONFIG);

export const getChainConfig = (chainId) => {
  const chain = Object.values(CHAIN_CONFIG).find(c => c.id === chainId);
  if (!chain) throw new Error(`Unsupported chain ID: ${chainId}`);
  return chain;
};

export const getChainConfigByName = (name) => {
  const chain = CHAIN_CONFIG[name.toLowerCase()];
  if (!chain) throw new Error(`Unsupported chain name: ${name}`);
  return chain;
};

export const isChainSupported = (chainId) => {
  return Object.values(CHAIN_CONFIG).some(chain => chain.id === chainId);
};

export const getExplorerUrl = (network, hash) => {
  const config = getChainConfigByName(network);
  return `${config.explorer}/tx/${hash}`;
}; 