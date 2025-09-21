import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Shield } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Shield className="h-8 w-8" />
            <span className="text-sm font-semibold">SECURE ACCESS</span>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Access Restricted</h2>
          <p className="text-muted-foreground">
            The requested resource is not available or access is denied. 
            Please verify your credentials and try again.
          </p>
        </div>
        
        <Button asChild className="bg-gradient-primary hover:shadow-premium transition-all duration-300">
          <a href="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
