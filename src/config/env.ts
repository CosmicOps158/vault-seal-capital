// Environment Configuration
export const ENV = {
  CHAIN_ID: 11155111,
  RPC_URL: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/your_api_key',
  WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your_project_id',
  INFURA_API_KEY: process.env.NEXT_PUBLIC_INFURA_API_KEY || 'your_infura_key',
  ALTERNATIVE_RPC_URL: 'https://1rpc.io/sepolia'
} as const;
