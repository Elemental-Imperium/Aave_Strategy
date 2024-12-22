import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ChainSelector } from './ChainSelector';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon,
  WalletIcon,
  DocumentTextIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Strategies', icon: ArrowTrendingUpIcon, href: '/strategies' },
  { name: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
  { name: 'Wallet', icon: WalletIcon, href: '/wallet' },
  { name: 'Documentation', icon: DocumentTextIcon, href: '/docs' },
  { name: 'Settings', icon: CogIcon, href: '/settings' }
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Aave Strategy
          </span>
        </motion.div>
        <div className="mt-4">
          <ChainSelector />
        </div>
      </div>

      <div className="mt-8 px-4">
        {navItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.href}
            className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.href
                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
} 