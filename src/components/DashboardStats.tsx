import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Lock, Shield } from "lucide-react";

const stats = [
  {
    title: "Total AUM",
    value: "$7.09M",
    change: "+12.5%",
    description: "Encrypted fund positions",
    icon: Lock,
    isPositive: true,
  },
  {
    title: "Active Investors",
    value: "127",
    change: "+8",
    description: "Verified commitments",
    icon: Users,
    isPositive: true,
  },
  {
    title: "Portfolio Performance",
    value: "+24.7%",
    change: "+2.3%",
    description: "YTD returns (confidential)",
    icon: TrendingUp,
    isPositive: true,
  },
  {
    title: "Security Level",
    value: "AAA",
    change: "Encrypted",
    description: "FHE protocol active",
    icon: Shield,
    isPositive: true,
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title} className="bg-gradient-vault shadow-premium hover:shadow-vault transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                <span
                  className={`text-xs font-semibold ${
                    stat.isPositive ? "text-profit" : "text-loss"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">from last month</span>
              </div>
              <CardDescription className="mt-2 text-xs">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};