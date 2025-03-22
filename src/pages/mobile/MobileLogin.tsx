
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Loader2, LogIn, Key, AtSign } from "lucide-react";
import { toast } from "sonner";

const MobileLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast.success("Login successful");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (role: string) => {
    setLoading(true);
    const demoEmail = `${role}@example.com`;
    const demoPassword = "password";
    
    try {
      await login(demoEmail, demoPassword);
      toast.success(`Logged in as ${role}`);
    } catch (error) {
      console.error("Quick login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-slate-950 to-indigo-950 p-4 overflow-hidden">
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
      
      <div className="relative z-10 mx-auto w-full max-w-sm pt-12">
        <motion.div 
          className="mb-8 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
            alt="Symetrix Logo"
            className="h-16 w-16 mb-4"
          />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome to symetrix360
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign in to access your account
          </p>
        </motion.div>
        
        <motion.form 
          onSubmit={handleLogin} 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="space-y-2">
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 text-white border-white/20 focus-visible:ring-indigo-500 pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 text-white border-white/20 focus-visible:ring-indigo-500 pl-10"
                required
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-700/30"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" /> Sign In
              </>
            )}
          </Button>
        </motion.form>
        
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-b from-slate-950 to-indigo-950 px-2 text-white/50">
                Demo Accounts
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => handleQuickLogin("admin")}
              disabled={loading}
            >
              Admin Demo
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => handleQuickLogin("support")}
              disabled={loading}
            >
              Support Demo
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              onClick={() => handleQuickLogin("client")}
              disabled={loading}
            >
              Client Demo
            </Button>
          </div>
        </motion.div>
        
        <p className="mt-6 text-center text-xs text-white/50">
          This is a demo application.
          <br />Any password will work with the demo emails.
        </p>
      </div>
    </div>
  );
};

export default MobileLogin;
