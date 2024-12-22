import React, { useState } from 'react';
import { aiClient } from '../utils/aiClient';
import { motion } from 'framer-motion';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

export function AIComponent() {
    const [formData, setFormData] = useState({
        amount: '',
        asset: 'USDC',
        riskLevel: 'medium',
        network: 'ethereum'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [strategy, setStrategy] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const result = await aiClient.generateStrategy(formData);
            setStrategy(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
            >
                <div className="p-6 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Generate AI Strategy
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Amount
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Enter amount"
                                            required
                                        />
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Asset
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ChartBarIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="asset"
                                            value={formData.asset}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="USDC">USDC</option>
                                            <option value="ETH">ETH</option>
                                            <option value="USDT">USDT</option>
                                            <option value="DAI">DAI</option>
                                        </select>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Risk Level
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            name="riskLevel"
                                            value={formData.riskLevel}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="low">Low Risk</option>
                                            <option value="medium">Medium Risk</option>
                                            <option value="high">High Risk</option>
                                        </select>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Network
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <select
                                            name="network"
                                            value={formData.network}
                                            onChange={handleInputChange}
                                            className="block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        >
                                            <option value="ethereum">Ethereum</option>
                                            <option value="polygon">Polygon</option>
                                            <option value="optimism">Optimism</option>
                                            <option value="arbitrum">Arbitrum</option>
                                        </select>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <ArrowPathIcon className="animate-spin h-5 w-5" />
                            ) : (
                                'Generate Strategy'
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-50 dark:bg-red-900/50 border-l-4 border-red-400 p-4 rounded-lg"
                >
                    <div className="flex">
                        <div className="ml-3">
                            <p className="text-sm text-red-700 dark:text-red-200">
                                {error}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {strategy && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
                >
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Generated Strategy
                        </h3>
                        <div className="prose dark:prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap text-sm bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                {strategy}
                            </pre>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
