
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goHome = () => {
    // Check if the current path is a mobile path
    if (location.pathname.includes('/mobile')) {
      navigate('/mobile');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="w-full h-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[5%] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 text-center bg-white/10 backdrop-blur-md border border-white/10 p-10 rounded-xl max-w-md mx-auto shadow-xl animate-fade-in">
        <h1 className="text-8xl font-bold mb-4 text-gradient-primary bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-white mb-6">Oops! The page you're looking for doesn't exist</p>
        <Button 
          onClick={goHome}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
