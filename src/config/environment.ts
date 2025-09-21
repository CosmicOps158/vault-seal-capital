// Environment Configuration for Vault Seal Capital
export const environment = {
  // Chain Configuration
  CHAIN_ID: 11155111, // Sepolia Testnet
  RPC_URL: 'https://1rpc.io/sepolia', // Public RPC endpoint
  
  // Wallet Connect Configuration
  WALLET_CONNECT_PROJECT_ID: '2ec9743d0d0cd7fb94dee1a7e6d33475',
  
  // Application Configuration
  APP_NAME: 'Vault Seal Capital',
  APP_DESCRIPTION: 'Advanced Private Equity Fund with FHE Technology',
  
  // Feature Flags
  ENABLE_FHE_ENCRYPTION: true,
  ENABLE_REAL_TIME_ANALYTICS: true,
  ENABLE_MULTI_CHAIN: false,
} as const;
