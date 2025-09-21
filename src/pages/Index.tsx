import { Header } from "@/components/Header";
import { DashboardStats } from "@/components/DashboardStats"; 
import { FundAllocation } from "@/components/FundAllocation";
import { PrivateLedger } from "@/components/PrivateLedger";
import { StockTicker } from "@/components/StockTicker";
import { FHEEncryption } from "@/components/FHEEncryption";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Vault Seal Capital
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced private equity fund with fully homomorphic encryption (FHE) technology. 
            Secure investor commitments and fund allocations while maintaining complete privacy 
            and verifiable ownership through blockchain technology.
          </p>
        </div>

        {/* FHE Encryption Section */}
        <FHEEncryption />

        {/* Dashboard Stats */}
        <DashboardStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FundAllocation />
          <PrivateLedger />
        </div>
      </main>

      <StockTicker />
    </div>
  );
};

export default Index;
