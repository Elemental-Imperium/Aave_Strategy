import { ethers } from 'ethers';

export interface ChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  poolAddress: string;
  oracleAddress: string;
  explorer: string;
  aaveDataProvider: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface Providers {
  [key: string]: ethers.JsonRpcProvider;
}

export interface Contracts {
  [key: string]: {
    pool: ethers.Contract;
    oracle: ethers.Contract;
    dataProvider: ethers.Contract;
  };
}

export interface WindowWithEthereum extends Window {
  ethereum?: any;
}

declare global {
  interface Window {
    ethereum?: any;
  }
} 