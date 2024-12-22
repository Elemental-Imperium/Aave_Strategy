import { AaveService } from '../services/aaveService.js';
import { OpenAIService } from '../services/openAIService.js';
import { dbService } from '../services/dbService.js';

export class StrategyController {
  static async generateStrategy(req, res) {
    try {
      const { amount, asset, riskLevel, walletAddress, network } = req.validatedData;

      // Create or get user
      let user = await dbService.findUserByAddress(walletAddress);
      if (!user) {
        user = await dbService.createUser(walletAddress);
      }

      // Get optimal borrowing parameters
      const borrowParams = await AaveService.calculateOptimalBorrowAmount(
        amount,
        asset,
        riskLevel,
        network
      );

      // Generate AI strategy
      const strategy = await OpenAIService.generateStrategy({
        amount,
        asset,
        riskLevel,
        borrowParams,
      });

      // Validate strategy if wallet address is provided
      let validation = null;
      if (walletAddress) {
        validation = await AaveService.validateStrategy(
          strategy,
          walletAddress,
          network
        );
      }

      // Estimate gas costs
      const gasEstimates = await AaveService.estimateStrategyGas(
        strategy,
        walletAddress || '0x0',
        network
      );

      // Save strategy to database
      const savedStrategy = await dbService.createStrategy({
        userId: user.id,
        asset,
        amount,
        riskLevel,
        network,
        aiResponse: {
          strategy,
          borrowParams,
          gasEstimates,
        },
        validation,
      });

      res.json({
        id: savedStrategy.id,
        strategy,
        validation,
        gasEstimates,
        borrowParams,
      });
    } catch (error) {
      console.error('Strategy generation error:', error);
      res.status(500).json({
        error: 'Failed to generate strategy',
        details: error.message,
      });
    }
  }

  static async getAccountOverview(req, res) {
    try {
      const { address } = req.params;
      const { network = 'ethereum' } = req.query;

      // Get user's strategies
      const user = await dbService.findUserByAddress(address);
      const strategies = user ? await dbService.getUserStrategies(user.id) : [];

      const accountData = await AaveService.getAccountOverview(address, network);

      // Combine on-chain data with database records
      const overview = {
        ...accountData,
        strategies: strategies.map(s => ({
          id: s.id,
          asset: s.asset,
          amount: s.amount,
          status: s.status,
          createdAt: s.createdAt,
          transactions: s.transactions,
        }))
      };

      res.json(overview);
    } catch (error) {
      console.error('Account overview error:', error);
      res.status(500).json({
        error: 'Failed to fetch account overview',
        details: error.message,
      });
    }
  }
} 