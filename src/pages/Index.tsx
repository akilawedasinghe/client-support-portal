
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log("Index page loaded", { isAuthenticated, isLoading, user });
    
    // Only handle redirection if authentication check is complete
    if (!isLoading) {
      setRedirecting(true);
      
      // Delay the navigation slightly to ensure auth context is fully loaded
      const timer = setTimeout(() => {
        try {
          if (isAuthenticated && user) {
            console.log("Redirecting authenticated user to dashboard", user.role);
            // Redirect to appropriate dashboard based on user role
            if (user.role === 'admin') {
              navigate('/dashboard/admin');
            } else if (user.role === 'support') {
              navigate('/dashboard/support');
            } else {
              navigate('/dashboard/client');
            }
          } else {
            console.log("User not authenticated, redirecting to login");
            // If not authenticated, redirect to login
            navigate('/login');
          }
        } catch (e) {
          console.error("Navigation error:", e);
          setError("Error during navigation. Please try again.");
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-900 to-blue-900">
      <div className="text-center px-6 max-w-md animate-fade-in">
        <div className="mx-auto mb-8 flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full transform scale-150"></div>
            <img
              src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
              alt="Symetrix Logo"
              className="h-20 w-20 mx-auto relative animate-pulse-slow"
            />
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            symetrix360 Portal
          </h1>
          <div className="glass mt-4 px-6 py-3 rounded-full">
            <p className="text-lg text-blue-200">
              {error ? error : redirecting ? "Redirecting to your dashboard..." : "Loading..."}
            </p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
        </div>
        
        {/* Show the demo mode message */}
        <div className="mt-8 text-sm text-blue-300 max-w-md mx-auto backdrop-blur-md bg-white/5 rounded-lg px-4 py-3 border border-white/10">
          <p>Running in demo mode - no backend connection required</p>
        </div>
        
        {/* Debug info for development */}
        {import.meta.env.DEV && (
          <div className="mt-6 text-xs text-gray-400 max-w-md mx-auto text-left backdrop-blur-sm bg-black/20 p-3 rounded-lg border border-white/5">
            <p>isLoading: {isLoading ? "true" : "false"}</p>
            <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
            <p>redirecting: {redirecting ? "true" : "false"}</p>
            <p>User: {user ? JSON.stringify(user.role) : "null"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
