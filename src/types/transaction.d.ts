import { Network, StepType } from './strategy';

export interface Transaction {
  id: string;
  strategyId: string;
  hash: string;
  network: Network;
  type: StepType;
  status: 'pending' | 'confirmed' | 'failed';
  gasUsed?: number;
  gasPrice?: string;
  error?: string;
  createdAt: Date;
  confirmedAt?: Date;
}

export interface TransactionEstimate {
  gasLimit: number;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
} 