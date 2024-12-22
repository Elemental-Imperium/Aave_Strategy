import OpenAI from 'openai';
import { config } from '../config/config.js';

export class OpenAIService {
  static client = new OpenAI({
    apiKey: config.ai.openaiApiKey,
  });

  static async generateStrategy({ amount, asset, riskLevel, borrowParams }) {
    const systemPrompt = `You are an AI assistant specialized in Aave lending strategies. 
      Provide detailed, step-by-step strategies that include:
      1. Initial deposit recommendations
      2. Borrowing strategies
      3. Risk management approaches
      4. Expected yields
      5. Potential risks and mitigation strategies`;

    const userPrompt = `Generate a detailed lending strategy for ${amount} ${asset} with ${riskLevel} risk level.
      Current market parameters:
      - Suggested borrow amount: ${borrowParams.suggestedBorrowAmount} ETH
      - Maximum safe borrow: ${borrowParams.maxBorrowAmount} ETH
      - Current utilization: ${(borrowParams.currentUtilization * 100).toFixed(2)}%
      - Borrow APY: ${(parseFloat(borrowParams.borrowAPY) * 100).toFixed(2)}%
      - Deposit APY: ${(parseFloat(borrowParams.depositAPY) * 100).toFixed(2)}%`;

    try {
      const response = await this.client.chat.completions.create({
        model: config.ai.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate strategy with AI');
    }
  }

  static async validateStrategy(strategy) {
    try {
      const response = await this.client.chat.completions.create({
        model: config.ai.model,
        messages: [
          {
            role: "system",
            content: "You are a risk assessment expert for Aave lending strategies."
          },
          {
            role: "user",
            content: `Please validate the following strategy and identify any potential risks or issues:\n\n${strategy}`
          }
        ],
        temperature: 0.5,
      });

      return {
        isValid: true,
        feedback: response.choices[0].message.content
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to validate strategy');
    }
  }
} 