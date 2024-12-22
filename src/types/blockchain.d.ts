import { ethers } from 'ethers';
import type { ChainConfig, Providers, Contracts } from '@server/types/blockchain';

export type { ChainConfig, Providers, Contracts };

export interface Web3State {
  provider: ethers.JsonRpcProvider | null;
  signer: ethers.Signer | null;
  chainId: number | null;
  address: string | null;
  connected: boolean;
}

export interface Web3Actions {
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (chainId: number) => Promise<void>;
} 