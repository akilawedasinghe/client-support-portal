
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Plus, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-[70px] right-0 bg-black/40 backdrop-blur-lg border-t border-white/10 p-1.5 z-50">
      <div className="flex justify-around items-center">
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center p-1 h-auto min-w-[60px] gap-0.5 rounded-xl text-white/70 hover:text-white transition-all"
          onClick={() => navigate("/mobile/notifications")}
        >
          <Bell className="h-5 w-5" />
          <span className="text-[10px] font-medium">Alerts</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center p-1 h-auto min-w-[60px] gap-0.5 rounded-xl text-white -mt-6"
          onClick={() => navigate("/mobile/tickets/new")}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg shadow-indigo-600/20 mb-1">
            <Plus className="h-5 w-5" />
          </div>
          <span className="text-[10px] font-medium">New</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center justify-center p-1 h-auto min-w-[60px] gap-0.5 rounded-xl text-white/70 hover:text-white transition-all"
          onClick={() => navigate("/mobile/profile")}
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
            {user?.name?.charAt(0) || "U"}
          </div>
          <span className="text-[10px] font-medium">Profile</span>
        </Button>
      </div>
    </div>
  );
}

export default MobileNavbar;
