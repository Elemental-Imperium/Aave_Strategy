export interface GenerateStrategyParams {
  amount: number;
  asset: string;
  riskLevel: string;
  network: string;
  walletAddress?: string;
}

export interface AIResponse {
  strategy: string;
  validation: {
    isValid: boolean;
    healthFactor: string;
    warnings: string[];
    suggestions: string[];
  };
} 