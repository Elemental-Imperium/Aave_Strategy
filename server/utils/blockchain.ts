import { ethers } from 'ethers';
import { 
  AAVE_POOL_ABI, 
  ERC20_ABI, 
  AAVE_ORACLE_ABI,
  AAVE_DATA_PROVIDER_ABI 
} from '../constants/abis.js';
import { CHAIN_CONFIG, getChainConfigByName } from '../config/chains.js';

const providers = {};
const contracts = {};

export const setupProviders = () => {
  try {
    // Initialize providers for all supported chains
    Object.entries(CHAIN_CONFIG).forEach(([name, config]) => {
      providers[name] = new ethers.JsonRpcProvider(config.rpcUrl);
      initializeContracts(name);
    });
  } catch (error) {
    console.error('Error setting up providers:', error);
    throw error;
  }
};

const initializeContracts = (network) => {
  try {
    const provider = providers[network];
    const config = getChainConfigByName(network);
    
    contracts[network] = {
      pool: new ethers.Contract(
        config.poolAddress,
        AAVE_POOL_ABI,
        provider
      ),
      oracle: new ethers.Contract(
        config.oracleAddress,
        AAVE_ORACLE_ABI,
        provider
      ),
      dataProvider: new ethers.Contract(
        config.aaveDataProvider,
        AAVE_DATA_PROVIDER_ABI,
        provider
      )
    };
  } catch (error) {
    console.error(`Error initializing contracts for ${network}:`, error);
    throw error;
  }
};

export const switchNetwork = async (network) => {
  if (!CHAIN_CONFIG[network]) {
    throw new Error(`Unsupported network: ${network}`);
  }

  const config = CHAIN_CONFIG[network];
  
  try {
    // Request network switch
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${config.id.toString(16)}` }],
    });
  } catch (error) {
    if (error.code === 4902) {
      // Network needs to be added
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${config.id.toString(16)}`,
          chainName: config.name,
          nativeCurrency: config.nativeCurrency,
          rpcUrls: [config.rpcUrl],
          blockExplorerUrls: [config.explorer]
        }]
      });
    } else {
      throw error;
    }
  }
};

export const getProvider = (network = 'ethereum') => {
  if (!providers[network]) {
    try {
      setupProviders();
      if (!providers[network]) {
        throw new Error(`Network ${network} not supported`);
      }
    } catch (error) {
      console.error(`Failed to setup provider for ${network}:`, error);
      throw error;
    }
  }
  return providers[network];
};

export const getContracts = (network = 'ethereum') => {
  if (!contracts[network]) {
    throw new Error(`No contracts available for network: ${network}`);
  }
  return contracts[network];
};

export const getAssetPrice = async (assetAddress, network = 'ethereum') => {
  try {
    const { oracle } = contracts[network];
    const price = await oracle.getAssetPrice(assetAddress);
    return ethers.formatUnits(price, 8);
  } catch (error) {
    console.error(`Error getting asset price for ${assetAddress} on ${network}:`, error);
    throw error;
  }
};

export const getReserveData = async (assetAddress, network = 'ethereum') => {
  try {
    const { pool } = contracts[network];
    const { liquidityRate, variableBorrowRate, stableBorrowRate, 
            availableLiquidity, totalStableDebt, totalVariableDebt } = await pool.getReserveData(assetAddress);
    
    return {
      liquidityRate: ethers.formatUnits(liquidityRate, 27),
      variableBorrowRate: ethers.formatUnits(variableBorrowRate, 27),
      stableBorrowRate: ethers.formatUnits(stableBorrowRate, 27),
      availableLiquidity: ethers.formatUnits(availableLiquidity, 18),
      totalStableDebt: ethers.formatUnits(totalStableDebt, 18),
      totalVariableDebt: ethers.formatUnits(totalVariableDebt, 18)
    };
  } catch (error) {
    console.error(`Error getting reserve data for ${assetAddress} on ${network}:`, error);
    throw error;
  }
};

export const getUserAccountData = async (address, network = 'ethereum') => {
  try {
    const { pool } = contracts[network];
    const { totalCollateralETH, totalDebtETH, availableBorrowsETH,
            currentLiquidationThreshold, ltv, healthFactor } = await pool.getUserAccountData(address);
    
    return {
      totalCollateralETH: ethers.formatEther(totalCollateralETH),
      totalDebtETH: ethers.formatEther(totalDebtETH),
      availableBorrowsETH: ethers.formatEther(availableBorrowsETH),
      currentLiquidationThreshold: currentLiquidationThreshold.toString(),
      ltv: ltv.toString(),
      healthFactor: ethers.formatEther(healthFactor)
    };
  } catch (error) {
    console.error(`Error getting user account data for ${address} on ${network}:`, error);
    throw error;
  }
};

export const getUserReserveData = async (userAddress, assetAddress, network = 'ethereum') => {
  try {
    const { pool } = contracts[network];
    const { currentATokenBalance, currentStableDebt, currentVariableDebt,
            stableBorrowRate, liquidityRate } = await pool.getUserReserveData(assetAddress, userAddress);
    
    return {
      currentATokenBalance: ethers.formatUnits(currentATokenBalance, 18),
      currentStableDebt: ethers.formatUnits(currentStableDebt, 18),
      currentVariableDebt: ethers.formatUnits(currentVariableDebt, 18),
      stableBorrowRate: ethers.formatUnits(stableBorrowRate, 27),
      liquidityRate: ethers.formatUnits(liquidityRate, 27)
    };
  } catch (error) {
    console.error(`Error getting user reserve data for ${userAddress} on ${network}:`, error);
    throw error;
  }
};

export const estimateGasForDeposit = async (asset, amount, userAddress, network = 'ethereum') => {
  try {
    const { pool } = contracts[network];
    const gasEstimate = await pool.estimateGas.deposit(asset, amount, userAddress, 0);
    
    const { gasPrice } = await providers[network].getFeeData() || { gasPrice: '0' };
    
    return {
      gasLimit: gasEstimate.toString(),
      gasPrice: gasPrice.toString()
    };
  } catch (error) {
    console.error(`Error estimating gas for deposit on ${network}:`, error);
    throw error;
  }
};

export const isChainSupported = (chainId) => {
  return Object.values(CHAIN_CONFIG).some(config => config.id === chainId);
};

export const getExplorerUrl = (network, hash) => {
  const config = getChainConfigByName(network);
  return `${config.explorer}/tx/${hash}`;
}; 