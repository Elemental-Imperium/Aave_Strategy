import { motion } from 'framer-motion';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  ScaleIcon
} from '@heroicons/react/24/outline';

const metrics = [
  {
    name: 'Total Value Locked',
    value: '$1,234,567',
    change: '+12.5%',
    isPositive: true,
    icon: BanknotesIcon
  },
  {
    name: 'Health Factor',
    value: '2.45',
    change: '+0.3',
    isPositive: true,
    icon: ShieldCheckIcon
  },
  {
    name: 'Current LTV',
    value: '65%',
    change: '-2%',
    isPositive: true,
    icon: ScaleIcon
  }
];

export function MetricsDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <metric.icon className="w-5 h-5 text-gray-400" />
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {metric.name}
                </h3>
              </div>
              <div className={`flex items-center space-x-1 ${
                metric.isPositive ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.isPositive ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
              {metric.value}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 