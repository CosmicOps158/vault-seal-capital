// Environment Configuration
export const ENV = {
  CHAIN_ID: 11155111,
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://1rpc.io/sepolia',
  WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY || '',
  ALTERNATIVE_RPC_URL: 'https://1rpc.io/sepolia'
} as const;
