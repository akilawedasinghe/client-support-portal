
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setRedirecting(true);
      
      // Delay the navigation slightly to ensure auth context is fully loaded
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          // Redirect to appropriate dashboard based on user role
          if (user.role === 'admin') {
            navigate('/dashboard/admin');
          } else if (user.role === 'support') {
            navigate('/dashboard/support');
          } else {
            navigate('/dashboard/client');
          }
        } else {
          // If not authenticated, redirect to login
          navigate('/login');
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 to-slate-900">
      <div className="text-center">
        <div className="mx-auto mb-8">
          <img
            src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
            alt="Symetrix Logo"
            className="h-16 w-16 mx-auto"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white mb-2">
            symetrix360 Portal
          </h1>
          <p className="text-lg text-blue-300">
            {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default Index;
