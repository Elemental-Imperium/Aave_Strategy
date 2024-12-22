import axios, { AxiosInstance } from 'axios';
import { env } from '../config/env';
import { GenerateStrategyParams, AIResponse } from '../types/ai';

const AI_ENDPOINTS = {
  GENERATE_STRATEGY: '/api/ai/generate-strategy',
  VALIDATE_STRATEGY: '/api/ai/validate-strategy',
  OPTIMIZE_STRATEGY: '/api/ai/optimize-strategy',
} as const;

class AIClient {
  private static instance: AIClient;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public static getInstance(): AIClient {
    if (!AIClient.instance) {
      AIClient.instance = new AIClient();
    }
    return AIClient.instance;
  }

  public async generateStrategy(params: GenerateStrategyParams): Promise<AIResponse> {
    try {
      const { data } = await this.client.post<AIResponse>(AI_ENDPOINTS.GENERATE_STRATEGY, params);
      return data;
    } catch (error) {
      console.error('Error generating strategy:', error);
      throw error;
    }
  }
}

export const aiClient = AIClient.getInstance();
