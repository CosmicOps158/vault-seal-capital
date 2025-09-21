import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Lock, TrendingUp } from "lucide-react";
import vaultLogo from "@/assets/vault-logo.png";

export const Header = () => {
  return (
    <header className="border-b border-border bg-gradient-dark">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={vaultLogo} alt="Vault Seal Capital" className="h-10 w-10" />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Vault Seal Capital
            </h1>
            <p className="text-xs text-muted-foreground">Advanced Private Equity Fund</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-blue-500" />
            <span>FHE Secured</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Live</span>
          </div>
          
          <ConnectButton 
            chainStatus="icon"
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'full',
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: true,
            }}
          />
        </div>
      </div>
    </header>
  );
};