import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, EyeOff, Lock, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

const mockAllocations = [
  {
    id: "FUND-001",
    name: "Technology Growth Fund",
    allocation: "$2,450,000",
    percentage: "34.5%",
    performance: "+12.34%",
    status: "Active",
    isPositive: true,
  },
  {
    id: "FUND-002", 
    name: "Healthcare Innovation",
    allocation: "$1,890,000",
    percentage: "26.7%",
    performance: "+8.92%",
    status: "Active",
    isPositive: true,
  },
  {
    id: "FUND-003",
    name: "Real Estate Portfolio",
    allocation: "$1,320,000", 
    percentage: "18.6%",
    performance: "-2.15%",
    status: "Rebalancing",
    isPositive: false,
  },
  {
    id: "FUND-004",
    name: "Emerging Markets",
    allocation: "$950,000",
    percentage: "13.4%", 
    performance: "+15.67%",
    status: "Active",
    isPositive: true,
  },
  {
    id: "FUND-005",
    name: "Infrastructure Debt",
    allocation: "$480,000",
    percentage: "6.8%",
    performance: "+4.21%", 
    status: "Locked",
    isPositive: true,
  },
];

export const FundAllocation = () => {
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);

  const togglePrivacy = () => setIsPrivacyMode(!isPrivacyMode);

  return (
    <Card className="bg-gradient-vault shadow-vault">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-primary" />
              <span>Private Fund Allocations</span>
            </CardTitle>
            <CardDescription>
              Encrypted on-chain positions • Total AUM: $7.09M
            </CardDescription>
          </div>
          <button
            onClick={togglePrivacy}
            className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isPrivacyMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockAllocations.map((fund) => (
          <div
            key={fund.id}
            className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:bg-muted/50 transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <div>
                  <h4 className="font-semibold text-foreground">
                    {isPrivacyMode ? "████████████" : fund.name}
                  </h4>
                  <p className="text-sm text-muted-foreground font-mono">
                    {fund.id} • {fund.percentage}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-bold text-foreground font-mono">
                  {isPrivacyMode ? "████████" : fund.allocation}
                </p>
                <div className="flex items-center space-x-1">
                  {fund.isPositive ? (
                    <TrendingUp className="h-3 w-3 text-profit" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-loss" />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      fund.isPositive ? "text-profit" : "text-loss"
                    }`}
                  >
                    {isPrivacyMode ? "████" : fund.performance}
                  </span>
                </div>
              </div>

              <Badge
                variant={
                  fund.status === "Active"
                    ? "default"
                    : fund.status === "Locked"
                    ? "secondary"
                    : "outline"
                }
              >
                {fund.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};