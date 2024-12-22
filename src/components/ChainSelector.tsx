import { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { CHAIN_CONFIG, SUPPORTED_CHAINS } from '../config/chains';
import { switchNetwork } from '../utils/blockchain';

export function ChainSelector() {
  const { chainId, setChainId } = useAppStore();
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handleChainChanged = (newChainId: string) => {
      setChainId(parseInt(newChainId, 16));
    };

    if (window.ethereum) {
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [setChainId]);

  const handleNetworkChange = async (networkName: string) => {
    try {
      setIsChanging(true);
      await switchNetwork(networkName);
      const config = CHAIN_CONFIG[networkName];
      setChainId(config.id);
    } catch (error) {
      console.error('Failed to switch network:', error);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="relative">
      <label htmlFor="network-selector" className="sr-only">
        Select Network
      </label>
      <select
        id="network-selector"
        name="network"
        title="Network Selector"
        aria-label="Select blockchain network"
        value={SUPPORTED_CHAINS.find(name => CHAIN_CONFIG[name].id === chainId) || 'ethereum'}
        onChange={(e) => handleNetworkChange(e.target.value)}
        disabled={isChanging}
        className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500"
      >
        {SUPPORTED_CHAINS.map((name) => (
          <option key={name} value={name}>
            {CHAIN_CONFIG[name].name}
          </option>
        ))}
      </select>
      {isChanging && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-gray-800/50"
          aria-hidden="true"
        >
          <div 
            className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
} 