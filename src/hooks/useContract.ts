import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { VaultSealCapitalABI } from '../lib/contract';

// Contract address - this should be deployed and updated
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000'; // Replace with actual deployed address

export const useVaultSealCapital = () => {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const registerInvestor = async (commitmentAmount: string, inputProof: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: VaultSealCapitalABI,
      functionName: 'registerInvestor',
      args: [address, commitmentAmount, inputProof],
    });
  };

  const makeCommitment = async (investorId: number, amount: string, inputProof: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: VaultSealCapitalABI,
      functionName: 'makeCommitment',
      args: [investorId, amount, inputProof],
    });
  };

  const openPosition = async (
    assetSymbol: string,
    assetContract: string,
    assetValue: string,
    allocationPercentage: string,
    riskScore: string,
    inputProof: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: VaultSealCapitalABI,
      functionName: 'openPosition',
      args: [assetSymbol, assetContract, assetValue, allocationPercentage, riskScore, inputProof],
    });
  };

  const executeTransaction = async (
    to: string,
    amount: string,
    fees: string,
    inputProof: string
  ) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: VaultSealCapitalABI,
      functionName: 'executeTransaction',
      args: [to, amount, fees, inputProof],
    });
  };

  const allocateFunds = async (investorId: number, allocationAmount: string, inputProof: string) => {
    if (!address) throw new Error('Wallet not connected');
    
    return writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: VaultSealCapitalABI,
      functionName: 'allocateFunds',
      args: [investorId, allocationAmount, inputProof],
    });
  };

  return {
    address,
    isConnected,
    registerInvestor,
    makeCommitment,
    openPosition,
    executeTransaction,
    allocateFunds,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
};
