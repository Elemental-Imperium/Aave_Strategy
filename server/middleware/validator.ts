import { z } from 'zod';

const networkSchema = z.enum(['ethereum', 'polygon']);

const strategySchema = z.object({
  amount: z.number().positive(),
  asset: z.string().min(1),
  riskLevel: z.enum(['low', 'medium', 'high']),
  walletAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/).optional(),
  network: networkSchema.default('ethereum')
});

export const validateStrategy = (req, res, next) => {
  try {
    const validated = strategySchema.parse(req.body);
    req.validatedData = validated;
    next();
  } catch (error) {
    next({
      type: 'validation',
      details: error.errors
    });
  }
};

const addressSchema = z.object({
  address: z.string().regex(/^0x[a-fA-F0-9]{40}$/),
  network: networkSchema.default('ethereum')
});

export const validateAddress = (req, res, next) => {
  try {
    const validated = addressSchema.parse({
      address: req.params.address,
      network: req.query.network
    });
    req.validatedData = validated;
    next();
  } catch (error) {
    next({
      type: 'validation',
      details: error.errors
    });
  }
}; 