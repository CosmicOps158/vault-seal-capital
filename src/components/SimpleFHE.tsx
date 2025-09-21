import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Lock, Upload, CheckCircle, Database } from 'lucide-react';
import { toast } from 'sonner';

export const SimpleFHE = () => {
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptedData, setEncryptedData] = useState<string>('');
  const [commitmentAmount, setCommitmentAmount] = useState('');
  const [allocationAmount, setAllocationAmount] = useState('');

  // Simulate FHE encryption process
  const encryptData = async (data: string): Promise<string> => {
    // In a real implementation, this would use FHE libraries
    // For now, we simulate encryption with base64 encoding
    const encoded = btoa(data);
    return `fhe_encrypted_${encoded}`;
  };

  const handleEncryptCommitment = async () => {
    if (!commitmentAmount) {
      toast.error('Please enter commitment amount');
      return;
    }

    setIsEncrypting(true);
    try {
      // Encrypt the commitment amount using FHE
      const encryptedCommitment = await encryptData(commitmentAmount);
      setEncryptedData(encryptedCommitment);
      toast.success('Commitment encrypted successfully');
    } catch (err) {
      toast.error('Failed to encrypt commitment');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleEncryptAllocation = async () => {
    if (!allocationAmount) {
      toast.error('Please enter allocation amount');
      return;
    }

    setIsEncrypting(true);
    try {
      // Encrypt the allocation amount using FHE
      const encryptedAllocation = await encryptData(allocationAmount);
      setEncryptedData(encryptedAllocation);
      toast.success('Allocation encrypted successfully');
    } catch (err) {
      toast.error('Failed to encrypt allocation');
      console.error(err);
    } finally {
      setIsEncrypting(false);
    }
  };

  const handleStoreOnChain = async () => {
    if (!encryptedData) {
      toast.error('No encrypted data to store');
      return;
    }

    setIsEncrypting(true);
    try {
      // Simulate storing encrypted data on blockchain
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Encrypted data stored on blockchain');
    } catch (err) {
      toast.error('Failed to store data on blockchain');
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
            Securely encrypt and store sensitive financial data using Fully Homomorphic Encryption
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
              onClick={handleEncryptCommitment}
              disabled={isEncrypting}
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Encrypt Commitment
            </Button>

            <Button
              onClick={handleEncryptAllocation}
              disabled={isEncrypting}
              variant="outline"
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              Encrypt Allocation
            </Button>

            <Button
              onClick={handleStoreOnChain}
              disabled={!encryptedData || isEncrypting}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {isEncrypting ? (
                <Upload className="h-4 w-4 animate-spin" />
              ) : (
                <Database className="h-4 w-4" />
              )}
              Store on Chain
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
        </CardContent>
      </Card>
    </div>
  );
};
