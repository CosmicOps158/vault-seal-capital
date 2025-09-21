# Vault Seal Capital

## Overview

Vault Seal Capital is an advanced private equity fund platform built with fully homomorphic encryption (FHE) technology. The platform enables secure investor commitments and fund allocations while maintaining complete privacy and verifiable ownership through blockchain technology.

## Key Features

- **FHE Encryption**: All sensitive data is encrypted using fully homomorphic encryption
- **Wallet Integration**: Seamless connection with popular Web3 wallets via RainbowKit
- **Smart Contracts**: Deployed on Sepolia testnet with FHE-enabled contract interactions
- **Private Fund Management**: Secure investor registration and fund allocation
- **Real-time Analytics**: Encrypted performance metrics and fund statistics
- **Multi-chain Support**: Built for Ethereum and compatible networks

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Web3 Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Encryption**: FHE (Fully Homomorphic Encryption)
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/CosmicOps158/vault-seal-capital.git
cd vault-seal-capital

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contract

The platform includes a comprehensive smart contract (`VaultSealCapital.sol`) with the following features:

- **Investor Management**: Secure registration and verification
- **Fund Allocation**: Encrypted allocation tracking
- **Position Management**: Private fund position tracking
- **Transaction Execution**: Secure transaction processing
- **Performance Metrics**: Encrypted performance analytics

### Contract Functions

- `registerInvestor()`: Register new investors with encrypted commitments
- `makeCommitment()`: Process investor commitments
- `openPosition()`: Create new fund positions
- `executeTransaction()`: Execute fund transactions
- `allocateFunds()`: Allocate funds to investors
- `updatePerformanceMetrics()`: Update encrypted performance data

## Deployment

### Vercel Deployment

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**:
   ```
   NEXT_PUBLIC_CHAIN_ID=11155111
   NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
   NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
   NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
   ```

3. **Build Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**:
   - Click "Deploy" to start the deployment process
   - Wait for build completion
   - Access your deployed application

### Manual Deployment Steps

1. **Build the Project**:
   ```bash
   npm run build
   ```

2. **Test Production Build**:
   ```bash
   npm run preview
   ```

3. **Deploy to Vercel**:
   ```bash
   npx vercel --prod
   ```

## Security Features

- **FHE Encryption**: All sensitive data encrypted on-chain
- **Private Transactions**: Fund positions remain confidential
- **Verifiable Ownership**: Transparent ownership without exposing amounts
- **Access Control**: Role-based permissions for fund management
- **Audit Trail**: Complete transaction history with encryption

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact:
- Email: support@vaultsealcapital.com
- Twitter: [@vaultsealcapital](https://twitter.com/vaultsealcapital)
- GitHub Issues: [Create an issue](https://github.com/CosmicOps158/vault-seal-capital/issues)

## Roadmap

- [ ] Mainnet deployment
- [ ] Additional wallet integrations
- [ ] [ ] Enhanced FHE features
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-chain support
