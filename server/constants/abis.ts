export const AAVE_POOL_ABI = [
  "function getUserAccountData(address user) view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH, uint256 currentLiquidationThreshold, uint256 ltv, uint256 healthFactor)",
  "function getReserveData(address asset) view returns (tuple(uint256 liquidityRate, uint256 variableBorrowRate, uint256 stableBorrowRate, uint256 availableLiquidity, uint256 totalStableDebt, uint256 totalVariableDebt))",
  "function getUserReserveData(address asset, address user) view returns (tuple(uint256 currentATokenBalance, uint256 currentStableDebt, uint256 currentVariableDebt, uint256 stableBorrowRate, uint256 liquidityRate))",
  "function deposit(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
  "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint16 referralCode, address onBehalfOf)",
  "function repay(address asset, uint256 amount, uint256 rateMode, address onBehalfOf)",
  "function withdraw(address asset, uint256 amount, address to)"
];

export const AAVE_ORACLE_ABI = [
  "function getAssetPrice(address asset) view returns (uint256)",
  "function getAssetsPrices(address[] assets) view returns (uint256[])",
  "function getSourceOfAsset(address asset) view returns (address)",
  "function getFallbackOracle() view returns (address)"
];

export const ERC20_ABI = [
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)"
]; 