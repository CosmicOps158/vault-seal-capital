// VaultSealCapital Contract ABI
export const VaultSealCapitalABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_verifier", "type": "address"},
      {"internalType": "address", "name": "_treasury", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "investorId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "investor", "type": "address"}
    ],
    "name": "InvestorRegistered",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "investorId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "investor", "type": "address"}
    ],
    "name": "CommitmentMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "positionId", "type": "uint256"},
      {"indexed": false, "internalType": "string", "name": "assetSymbol", "type": "string"}
    ],
    "name": "PositionOpened",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "transactionId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"}
    ],
    "name": "TransactionExecuted",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "investorAddress", "type": "address"},
      {"internalType": "bytes", "name": "commitmentAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "registerInvestor",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "investorId", "type": "uint256"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "makeCommitment",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "assetSymbol", "type": "string"},
      {"internalType": "address", "name": "assetContract", "type": "address"},
      {"internalType": "bytes", "name": "assetValue", "type": "bytes"},
      {"internalType": "bytes", "name": "allocationPercentage", "type": "bytes"},
      {"internalType": "bytes", "name": "riskScore", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "openPosition",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address", "name": "to", "type": "address"},
      {"internalType": "bytes", "name": "amount", "type": "bytes"},
      {"internalType": "bytes", "name": "fees", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "executeTransaction",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "investorId", "type": "uint256"},
      {"internalType": "bytes", "name": "allocationAmount", "type": "bytes"},
      {"internalType": "bytes", "name": "inputProof", "type": "bytes"}
    ],
    "name": "allocateFunds",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "investorId", "type": "uint256"}],
    "name": "getInvestorInfo",
    "outputs": [
      {"internalType": "address", "name": "investorAddress", "type": "address"},
      {"internalType": "uint8", "name": "commitmentAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "allocatedAmount", "type": "uint8"},
      {"internalType": "uint8", "name": "reputationScore", "type": "uint8"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "joinDate", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "positionId", "type": "uint256"}],
    "name": "getPositionInfo",
    "outputs": [
      {"internalType": "string", "name": "assetSymbol", "type": "string"},
      {"internalType": "address", "name": "assetContract", "type": "address"},
      {"internalType": "uint8", "name": "assetValue", "type": "uint8"},
      {"internalType": "uint8", "name": "allocationPercentage", "type": "uint8"},
      {"internalType": "uint8", "name": "riskScore", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "lastUpdated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPerformanceMetrics",
    "outputs": [
      {"internalType": "uint8", "name": "totalReturn", "type": "uint8"},
      {"internalType": "uint8", "name": "riskAdjustedReturn", "type": "uint8"},
      {"internalType": "uint8", "name": "sharpeRatio", "type": "uint8"},
      {"internalType": "uint8", "name": "maxDrawdown", "type": "uint8"},
      {"internalType": "uint256", "name": "lastCalculated", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
