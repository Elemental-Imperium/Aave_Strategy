import { AIResponse } from './ai';

export type RiskLevel = 'low' | 'medium' | 'high';
export type Network = 'ethereum' | 'polygon' | 'optimism' | 'arbitrum' | 'base';
export type StepType = 'deposit' | 'borrow' | 'supply' | 'withdraw';

export interface StrategyStep {
  type: StepType;
  asset: string;
  amount: number;
  network: Network;
}

export interface Strategy {
  id: string;
  userId: string;
  steps: StrategyStep[];
  riskLevel: RiskLevel;
  aiResponse: AIResponse;
  status: 'pending' | 'active' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
} 