import { Strategy, Transaction } from '../../src/types/strategy';
import { AIResponse } from '../../src/types/ai';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface GenerateStrategyRequest {
  amount: number;
  asset: string;
  riskLevel: string;
  network: string;
  walletAddress?: string;
}

export interface ExecuteStrategyRequest {
  strategyId: string;
  walletAddress: string;
}

export type StrategyResponse = APIResponse<Strategy>;
export type TransactionResponse = APIResponse<Transaction>;
export type AIStrategyResponse = APIResponse<AIResponse>; 