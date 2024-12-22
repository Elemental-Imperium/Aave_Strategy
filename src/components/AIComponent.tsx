import { aiClient } from '../utils/aiClient';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GenerateStrategyParams } from '../types/strategy';

export function AIComponent() {
  const [formData, setFormData] = useState<GenerateStrategyParams>({
    amount: 0,
    asset: 'USDC',
    riskLevel: 'medium',
    network: 'ethereum'
  });
  // ... rest of the component
}