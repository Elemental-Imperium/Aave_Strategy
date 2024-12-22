import express from 'express';
import cors from 'cors';
import { config } from './config/config';
import { aaveStrategyRouter } from './routes/aaveStrategy';
import { setupProviders } from './utils/blockchain';
import { requestLogger, errorLogger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api/strategy', aaveStrategyRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling
app.use(errorLogger);
app.use(errorHandler);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
  setupProviders();
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1);
}); 