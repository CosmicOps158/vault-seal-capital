// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract VaultSealCapital is SepoliaConfig {
    using FHE for *;
    
    struct Investor {
        euint32 investorId;
        euint32 commitmentAmount;
        euint32 allocatedAmount;
        euint32 reputationScore;
        bool isVerified;
        bool isActive;
        address investorAddress;
        uint256 joinDate;
    }
    
    struct FundPosition {
        euint32 positionId;
        euint32 assetValue;
        euint32 allocationPercentage;
        euint32 riskScore;
        bool isActive;
        string assetSymbol;
        address assetContract;
        uint256 lastUpdated;
    }
    
    struct Transaction {
        euint32 transactionId;
        euint32 amount;
        euint32 fees;
        address from;
        address to;
        uint256 timestamp;
        bool isEncrypted;
    }
    
    struct PerformanceMetrics {
        euint32 totalReturn;
        euint32 riskAdjustedReturn;
        euint32 sharpeRatio;
        euint32 maxDrawdown;
        uint256 lastCalculated;
    }
    
    mapping(uint256 => Investor) public investors;
    mapping(uint256 => FundPosition) public positions;
    mapping(uint256 => Transaction) public transactions;
    mapping(address => euint32) public investorCommitments;
    mapping(address => euint32) public investorAllocations;
    
    uint256 public investorCounter;
    uint256 public positionCounter;
    uint256 public transactionCounter;
    
    address public fundManager;
    address public verifier;
    address public treasury;
    
    PerformanceMetrics public performanceMetrics;
    
    event InvestorRegistered(uint256 indexed investorId, address indexed investor);
    event CommitmentMade(uint256 indexed investorId, address indexed investor);
    event PositionOpened(uint256 indexed positionId, string assetSymbol);
    event TransactionExecuted(uint256 indexed transactionId, address indexed from, address indexed to);
    event PerformanceUpdated(uint256 timestamp);
    event InvestorVerified(uint256 indexed investorId, bool isVerified);
    
    constructor(address _verifier, address _treasury) {
        fundManager = msg.sender;
        verifier = _verifier;
        treasury = _treasury;
        
        // Initialize performance metrics
        performanceMetrics = PerformanceMetrics({
            totalReturn: FHE.asEuint32(0),
            riskAdjustedReturn: FHE.asEuint32(0),
            sharpeRatio: FHE.asEuint32(0),
            maxDrawdown: FHE.asEuint32(0),
            lastCalculated: block.timestamp
        });
    }
    
    function registerInvestor(
        address investorAddress,
        externalEuint32 commitmentAmount,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(investorAddress != address(0), "Invalid investor address");
        require(investors[investorCounter].investorAddress == address(0), "Investor already exists");
        
        uint256 investorId = investorCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCommitment = FHE.fromExternal(commitmentAmount, inputProof);
        
        investors[investorId] = Investor({
            investorId: FHE.asEuint32(0), // Will be set properly later
            commitmentAmount: internalCommitment,
            allocatedAmount: FHE.asEuint32(0),
            reputationScore: FHE.asEuint32(100), // Default reputation
            isVerified: false,
            isActive: true,
            investorAddress: investorAddress,
            joinDate: block.timestamp
        });
        
        investorCommitments[investorAddress] = internalCommitment;
        
        emit InvestorRegistered(investorId, investorAddress);
        return investorId;
    }
    
    function makeCommitment(
        uint256 investorId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public returns (bool) {
        require(investors[investorId].investorAddress == msg.sender, "Only investor can make commitment");
        require(investors[investorId].isActive, "Investor must be active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Update investor commitment
        investors[investorId].commitmentAmount = FHE.add(investors[investorId].commitmentAmount, internalAmount);
        investorCommitments[msg.sender] = FHE.add(investorCommitments[msg.sender], internalAmount);
        
        emit CommitmentMade(investorId, msg.sender);
        return true;
    }
    
    function openPosition(
        string memory assetSymbol,
        address assetContract,
        externalEuint32 assetValue,
        externalEuint32 allocationPercentage,
        externalEuint32 riskScore,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == fundManager, "Only fund manager can open positions");
        require(bytes(assetSymbol).length > 0, "Asset symbol cannot be empty");
        require(assetContract != address(0), "Invalid asset contract");
        
        uint256 positionId = positionCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalAssetValue = FHE.fromExternal(assetValue, inputProof);
        euint32 internalAllocationPercentage = FHE.fromExternal(allocationPercentage, inputProof);
        euint32 internalRiskScore = FHE.fromExternal(riskScore, inputProof);
        
        positions[positionId] = FundPosition({
            positionId: FHE.asEuint32(0), // Will be set properly later
            assetValue: internalAssetValue,
            allocationPercentage: internalAllocationPercentage,
            riskScore: internalRiskScore,
            isActive: true,
            assetSymbol: assetSymbol,
            assetContract: assetContract,
            lastUpdated: block.timestamp
        });
        
        emit PositionOpened(positionId, assetSymbol);
        return positionId;
    }
    
    function executeTransaction(
        address to,
        externalEuint32 amount,
        externalEuint32 fees,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(msg.sender == fundManager, "Only fund manager can execute transactions");
        require(to != address(0), "Invalid recipient address");
        
        uint256 transactionId = transactionCounter++;
        
        // Convert external values to internal FHE values
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        euint32 internalFees = FHE.fromExternal(fees, inputProof);
        
        transactions[transactionId] = Transaction({
            transactionId: FHE.asEuint32(0), // Will be set properly later
            amount: internalAmount,
            fees: internalFees,
            from: msg.sender,
            to: to,
            timestamp: block.timestamp,
            isEncrypted: true
        });
        
        emit TransactionExecuted(transactionId, msg.sender, to);
        return transactionId;
    }
    
    function allocateFunds(
        uint256 investorId,
        externalEuint32 allocationAmount,
        bytes calldata inputProof
    ) public returns (bool) {
        require(msg.sender == fundManager, "Only fund manager can allocate funds");
        require(investors[investorId].isActive, "Investor must be active");
        require(investors[investorId].isVerified, "Investor must be verified");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAllocation = FHE.fromExternal(allocationAmount, inputProof);
        
        // Update investor allocation
        investors[investorId].allocatedAmount = FHE.add(investors[investorId].allocatedAmount, internalAllocation);
        investorAllocations[investors[investorId].investorAddress] = FHE.add(
            investorAllocations[investors[investorId].investorAddress], 
            internalAllocation
        );
        
        return true;
    }
    
    function updatePerformanceMetrics(
        externalEuint32 totalReturn,
        externalEuint32 riskAdjustedReturn,
        externalEuint32 sharpeRatio,
        externalEuint32 maxDrawdown,
        bytes calldata inputProof
    ) public {
        require(msg.sender == fundManager, "Only fund manager can update performance");
        
        // Convert external values to internal FHE values
        euint32 internalTotalReturn = FHE.fromExternal(totalReturn, inputProof);
        euint32 internalRiskAdjustedReturn = FHE.fromExternal(riskAdjustedReturn, inputProof);
        euint32 internalSharpeRatio = FHE.fromExternal(sharpeRatio, inputProof);
        euint32 internalMaxDrawdown = FHE.fromExternal(maxDrawdown, inputProof);
        
        performanceMetrics.totalReturn = internalTotalReturn;
        performanceMetrics.riskAdjustedReturn = internalRiskAdjustedReturn;
        performanceMetrics.sharpeRatio = internalSharpeRatio;
        performanceMetrics.maxDrawdown = internalMaxDrawdown;
        performanceMetrics.lastCalculated = block.timestamp;
        
        emit PerformanceUpdated(block.timestamp);
    }
    
    function verifyInvestor(uint256 investorId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify investors");
        require(investors[investorId].investorAddress != address(0), "Investor does not exist");
        
        investors[investorId].isVerified = isVerified;
        emit InvestorVerified(investorId, isVerified);
    }
    
    function updateInvestorReputation(
        uint256 investorId,
        externalEuint32 reputationScore,
        bytes calldata inputProof
    ) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(investors[investorId].investorAddress != address(0), "Investor does not exist");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalReputation = FHE.fromExternal(reputationScore, inputProof);
        
        investors[investorId].reputationScore = internalReputation;
    }
    
    function getInvestorInfo(uint256 investorId) public view returns (
        address investorAddress,
        uint8 commitmentAmount,
        uint8 allocatedAmount,
        uint8 reputationScore,
        bool isVerified,
        bool isActive,
        uint256 joinDate
    ) {
        Investor storage investor = investors[investorId];
        return (
            investor.investorAddress,
            0, // FHE.decrypt(investor.commitmentAmount) - will be decrypted off-chain
            0, // FHE.decrypt(investor.allocatedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(investor.reputationScore) - will be decrypted off-chain
            investor.isVerified,
            investor.isActive,
            investor.joinDate
        );
    }
    
    function getPositionInfo(uint256 positionId) public view returns (
        string memory assetSymbol,
        address assetContract,
        uint8 assetValue,
        uint8 allocationPercentage,
        uint8 riskScore,
        bool isActive,
        uint256 lastUpdated
    ) {
        FundPosition storage position = positions[positionId];
        return (
            position.assetSymbol,
            position.assetContract,
            0, // FHE.decrypt(position.assetValue) - will be decrypted off-chain
            0, // FHE.decrypt(position.allocationPercentage) - will be decrypted off-chain
            0, // FHE.decrypt(position.riskScore) - will be decrypted off-chain
            position.isActive,
            position.lastUpdated
        );
    }
    
    function getTransactionInfo(uint256 transactionId) public view returns (
        address from,
        address to,
        uint8 amount,
        uint8 fees,
        uint256 timestamp,
        bool isEncrypted
    ) {
        Transaction storage transaction = transactions[transactionId];
        return (
            transaction.from,
            transaction.to,
            0, // FHE.decrypt(transaction.amount) - will be decrypted off-chain
            0, // FHE.decrypt(transaction.fees) - will be decrypted off-chain
            transaction.timestamp,
            transaction.isEncrypted
        );
    }
    
    function getPerformanceMetrics() public view returns (
        uint8 totalReturn,
        uint8 riskAdjustedReturn,
        uint8 sharpeRatio,
        uint8 maxDrawdown,
        uint256 lastCalculated
    ) {
        return (
            0, // FHE.decrypt(performanceMetrics.totalReturn) - will be decrypted off-chain
            0, // FHE.decrypt(performanceMetrics.riskAdjustedReturn) - will be decrypted off-chain
            0, // FHE.decrypt(performanceMetrics.sharpeRatio) - will be decrypted off-chain
            0, // FHE.decrypt(performanceMetrics.maxDrawdown) - will be decrypted off-chain
            performanceMetrics.lastCalculated
        );
    }
    
    function getInvestorCommitment(address investor) public view returns (uint8) {
        return 0; // FHE.decrypt(investorCommitments[investor]) - will be decrypted off-chain
    }
    
    function getInvestorAllocation(address investor) public view returns (uint8) {
        return 0; // FHE.decrypt(investorAllocations[investor]) - will be decrypted off-chain
    }
    
    function withdrawFunds(uint256 amount) public {
        require(msg.sender == fundManager, "Only fund manager can withdraw funds");
        require(address(this).balance >= amount, "Insufficient contract balance");
        
        // Transfer funds to treasury
        payable(treasury).transfer(amount);
    }
    
    function emergencyPause() public {
        require(msg.sender == fundManager, "Only fund manager can pause");
        // Implementation for emergency pause functionality
    }
    
    function emergencyResume() public {
        require(msg.sender == fundManager, "Only fund manager can resume");
        // Implementation for emergency resume functionality
    }
}
