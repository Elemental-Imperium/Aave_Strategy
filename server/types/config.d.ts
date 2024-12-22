export interface NetworkConfig {
  rpcUrl: string;
  poolAddress: string;
  oracleAddress: string;
  dataProvider: string;
  explorer: string;
}

export interface ServerConfig {
  port: number;
  env: 'development' | 'production' | 'test';
}

export interface AIConfig {
  openaiApiKey: string;
  model: string;
  maxTokens: number;
} 