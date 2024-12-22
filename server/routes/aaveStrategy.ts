import express from 'express';
import { StrategyController } from '../controllers/strategyController.js';
import { validateStrategy, validateAddress } from '../middleware/validator.js';

const router = express.Router();

router.post('/generate', 
  validateStrategy,
  StrategyController.generateStrategy
);

router.get('/account/:address',
  validateAddress,
  StrategyController.getAccountOverview
);

export const aaveStrategyRouter = router; 