
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
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
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-blue-900 to-slate-900 p-4">
      <div className="mx-auto w-full max-w-sm pt-12">
        <div className="mb-8 flex flex-col items-center text-center">
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
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 text-white border-white/20 focus-visible:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 text-white border-white/20 focus-visible:ring-blue-500"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
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
        </form>
        
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-gradient-to-b from-blue-900 to-slate-900 px-2 text-white/50">
                Demo Accounts
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleQuickLogin("admin")}
              disabled={loading}
            >
              Admin Demo
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleQuickLogin("support")}
              disabled={loading}
            >
              Support Demo
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => handleQuickLogin("client")}
              disabled={loading}
            >
              Client Demo
            </Button>
          </div>
        </div>
        
        <p className="mt-6 text-center text-xs text-white/50">
          This is a demo application.
          <br />Any password will work with the demo emails.
        </p>
      </div>
    </div>
  );
};

export default MobileLogin;
