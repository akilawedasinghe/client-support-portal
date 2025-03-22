
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const MobileIndex = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    console.log("Mobile Index page loaded", { isAuthenticated, isLoading, user });
    
    // Only handle redirection if authentication check is complete
    if (!isLoading) {
      setRedirecting(true);
      
      // Delay the navigation slightly to ensure auth context is fully loaded
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          console.log("Redirecting authenticated user to mobile dashboard", user.role);
          // Redirect to appropriate mobile dashboard based on user role
          if (user.role === 'admin') {
            navigate('/mobile/dashboard/admin');
          } else if (user.role === 'support') {
            navigate('/mobile/dashboard/support');
          } else {
            navigate('/mobile/dashboard/client');
          }
        } else {
          console.log("User not authenticated, redirecting to mobile login");
          navigate('/mobile/login');
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">
      <div className="text-center px-6">
        <div className="mx-auto mb-8 animate-pulse">
          <img
            src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
            alt="Symetrix Logo"
            className="h-16 w-16 mx-auto"
          />
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white mb-2">
            symetrix360 Mobile
          </h1>
          <p className="text-base text-blue-300">
            {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
        
        <div className="mt-6 text-xs text-blue-400 max-w-md mx-auto">
          <p>Running in demo mode - no backend connection required</p>
        </div>
      </div>
    </div>
  );
};

export default MobileIndex;
