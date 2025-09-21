import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, Eye, Calendar, DollarSign } from "lucide-react";

const transactions = [
  {
    id: "TXN-0001",
    type: "Investment",
    fund: "Tech Growth Fund",
    amount: "$250,000",
    date: "2024-01-15",
    status: "Confirmed",
    hash: "0x1a2b3c4d...",
  },
  {
    id: "TXN-0002", 
    type: "Distribution",
    fund: "Healthcare Innovation",
    amount: "$45,000",
    date: "2024-01-12",
    status: "Processed",
    hash: "0x5e6f7g8h...",
  },
  {
    id: "TXN-0003",
    type: "Commitment", 
    fund: "Real Estate Portfolio",
    amount: "$500,000",
    date: "2024-01-08",
    status: "Pending",
    hash: "0x9i0j1k2l...",
  },
  {
    id: "TXN-0004",
    type: "Redemption",
    fund: "Emerging Markets", 
    amount: "$125,000",
    date: "2024-01-05",
    status: "Confirmed",
    hash: "0xm3n4o5p6...",
  },
  {
    id: "TXN-0005",
    type: "Investment",
    fund: "Infrastructure Debt",
    amount: "$75,000", 
    date: "2024-01-02",
    status: "Confirmed", 
    hash: "0xq7r8s9t0...",
  },
];

export const PrivateLedger = () => {
  return (
    <Card className="bg-gradient-vault shadow-vault">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>Private Transaction Ledger</span>
            </CardTitle>
            <CardDescription>
              Encrypted on-chain records • FHE Protocol Secured
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-success border-success/50">
              <Eye className="h-3 w-3 mr-1" />
              View Only
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-secondary">
                    {tx.type === "Investment" || tx.type === "Commitment" ? (
                      <DollarSign className="h-4 w-4 text-profit" />
                    ) : (
                      <Calendar className="h-4 w-4 text-accent" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-foreground">{tx.type}</h4>
                      <Badge 
                        variant={tx.status === "Confirmed" ? "default" : tx.status === "Processed" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {tx.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{tx.fund}</p>
                    <p className="text-xs text-muted-foreground font-mono">{tx.hash}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-foreground font-mono">{tx.amount}</div>
                  <div className="text-xs text-muted-foreground">{tx.date}</div>
                  <div className="text-xs text-muted-foreground">{tx.id}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};