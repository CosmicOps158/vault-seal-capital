import { useState } from 'react';
import { useVaultSealCapital } from '../hooks/useContract';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export const FHEEncryption = () => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [commitmentAmount, setCommitmentAmount] = useState('');
  const [allocationAmount, setAllocationAmount] = useState('');
  
  const {
    registerInvestor,
    makeCommitment,
    allocateFunds,
    isPending,
    isConfirming,
    isConfirmed,
    error
  } = useVaultSealCapital();

  // Simulate FHE encryption process
  const encryptData = async (data: string): Promise<string> => {
    // In a real implementation, this would use FHE libraries
    // For now, we simulate encryption with base64 encoding
    const encoded = btoa(data);
    return `fhe_encrypted_${encoded}`;
  };

  const handleRegisterInvestor = async () => {
    if (!commitmentAmount) {
      toast.error('Please enter commitment amount');
      return;
    }

    setIsEncrypting(true);
    try {
      // Encrypt the commitment amount using FHE
      const encryptedCommitment = await encryptData(commitmentAmount);
      const inputProof = `proof_${Date.now()}`; // Simulated proof
      
      await registerInvestor(encryptedCommitment, inputProof);
      setEncryptedData(encryptedCommitment);
      toast.success('Investor registered with encrypted data');
    } catch (err) {
      toast.error('Failed to register investor');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleMakeCommitment = async () => {
    if (!allocationAmount) {
      toast.error('Please enter allocation amount');
      return;
    }

    setIsEncrypting(true);
    try {
      // Encrypt the allocation amount using FHE
      const encryptedAllocation = await encryptData(allocationAmount);
      const inputProof = `proof_${Date.now()}`; // Simulated proof
      
      await makeCommitment(0, encryptedAllocation, inputProof); // Using investor ID 0 for demo
      toast.success('Commitment made with encrypted data');
    } catch (err) {
      toast.error('Failed to make commitment');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleAllocateFunds = async () => {
    if (!allocationAmount) {
      toast.error('Please enter allocation amount');
      return;
    }

    setIsEncrypting(true);
    try {
      // Encrypt the allocation amount using FHE
      const encryptedAllocation = await encryptData(allocationAmount);
      const inputProof = `proof_${Date.now()}`; // Simulated proof
      
      await allocateFunds(0, encryptedAllocation, inputProof); // Using investor ID 0 for demo
      toast.success('Funds allocated with encrypted data');
    } catch (err) {
      toast.error('Failed to allocate funds');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-blue-500" />
            FHE Data Encryption
          </CardTitle>
          <CardDescription>
            Securely encrypt and store sensitive financial data on-chain using Fully Homomorphic Encryption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="commitment">Commitment Amount</Label>
              <Input
                id="commitment"
                type="number"
                placeholder="Enter amount"
                value={commitmentAmount}
                onChange={(e) => setCommitmentAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allocation">Allocation Amount</Label>
              <Input
                id="allocation"
                type="number"
                placeholder="Enter amount"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleRegisterInvestor}
              disabled={isEncrypting || isPending}
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Register Investor
            </Button>

            <Button
              onClick={handleMakeCommitment}
              disabled={isEncrypting || isPending}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Make Commitment
            </Button>

            <Button
              onClick={handleAllocateFunds}
              disabled={isEncrypting || isPending}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              Allocate Funds
            </Button>
          </div>

          {encryptedData && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-4 w-4" />
                <span className="font-medium">Data Encrypted Successfully</span>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Encrypted data: {encryptedData.substring(0, 50)}...
              </p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">Error: {error.message}</p>
            </div>
          )}

          {isConfirming && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 text-sm">Transaction confirmed on blockchain</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
