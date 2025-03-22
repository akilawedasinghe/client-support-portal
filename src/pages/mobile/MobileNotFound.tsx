
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const MobileNotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error (Mobile): User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-indigo-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-indigo-700/20 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[5%] w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center bg-black/20 backdrop-blur-md border border-white/10 p-8 rounded-xl max-w-xs mx-auto shadow-xl animate-fade-in">
        <h1 className="text-7xl font-bold mb-3 text-gradient-primary bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">404</h1>
        <p className="text-lg text-white/90 mb-5">Page not found</p>
        <Button 
          onClick={() => navigate('/mobile')}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg w-full"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default MobileNotFound;
