import { ReactNode } from 'react';
import { Web3State } from './blockchain';
import { AIResponse } from './ai';

export interface DashboardProps {
  web3State: Web3State;
  strategies: Strategy[];
  onRefresh: () => Promise<void>;
}

export interface StrategyCardProps {
  strategy: Strategy;
  onExecute: () => Promise<void>;
  loading?: boolean;
} 