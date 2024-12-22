import axios from 'axios';
import { env } from '../config/env';

export const api = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const address = localStorage.getItem('wallet_address');
  if (address) {
    config.headers['X-Wallet-Address'] = address;
  }
  return config;
}); 