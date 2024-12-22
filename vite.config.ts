/// <reference types="vite/client" />
import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: UserConfig = {
    plugins: [react()],
    server: {
        port: 3000,
        open: true,
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            '@server': resolve(__dirname, './server'),
            '@types': resolve(__dirname, './src/types'),
            '@config': resolve(__dirname, './src/config'),
            '@utils': resolve(__dirname, './src/utils')
        }
    },
    optimizeDeps: {
        include: ['framer-motion', '@heroicons/react/24/outline']
    },
    define: {
        'process.env': {}
    }
};

export default defineConfig(config);
