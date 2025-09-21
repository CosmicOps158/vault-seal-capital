import { useEffect, useState } from "react";

const tickerData = [
  { symbol: "FUND-A", price: "$1,247.83", change: "+2.34%" },
  { symbol: "FUND-B", price: "$892.15", change: "-0.78%" },
  { symbol: "PRIVATE-C", price: "$1,892.45", change: "+5.67%" },
  { symbol: "FUND-D", price: "$743.22", change: "+1.23%" },
  { symbol: "VAULT-E", price: "$2,134.56", change: "-1.45%" },
  { symbol: "SECURE-F", price: "$1,567.89", change: "+3.21%" },
];

export const StockTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tickerData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-vault border-t border-border py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Live Market Data • Confidential Trading
          </div>
          
          <div className="flex space-x-8 items-center">
            {tickerData.map((item, index) => (
              <div
                key={item.symbol}
                className={`flex items-center space-x-2 transition-all duration-1000 ${
                  index === currentIndex ? "opacity-100 scale-110" : "opacity-60 scale-100"
                }`}
              >
                <span className="text-sm font-mono text-foreground">{item.symbol}</span>
                <span className="text-sm font-bold text-foreground">{item.price}</span>
                <span
                  className={`text-xs font-semibold ${
                    item.change.startsWith("+") ? "text-profit" : "text-loss"
                  }`}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};