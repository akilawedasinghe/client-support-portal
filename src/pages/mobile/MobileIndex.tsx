
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const MobileIndex = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          // Redirect to appropriate mobile dashboard based on user role
          if (user.role === 'admin') {
            navigate('/mobile/dashboard/admin');
          } else if (user.role === 'support') {
            navigate('/mobile/dashboard/support');
          } else {
            navigate('/mobile/dashboard/client');
          }
        } else {
          navigate('/mobile/login');
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 to-indigo-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-700/20 blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] right-[5%] w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="relative z-10 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mx-auto mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <img
            src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
            alt="Symetrix Logo"
            className="h-20 w-20 mx-auto"
          />
          <motion.h1 
            className="mt-4 text-3xl font-bold tracking-tight text-white mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            symetrix360
          </motion.h1>
          <motion.p 
            className="text-base text-indigo-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Support Management Platform
          </motion.p>
        </motion.div>
        
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
        
        <motion.div 
          className="mt-6 text-xs text-indigo-400 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Loading your dashboard...</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MobileIndex;
