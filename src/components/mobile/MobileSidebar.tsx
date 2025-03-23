
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { 
  TicketIcon, 
  MessageSquare, 
  User, 
  Home, 
  Settings,
  FileText,
  BarChart4,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/mobile/dashboard/admin";
    if (user?.role === "support") return "/mobile/dashboard/support";
    return "/mobile/dashboard/client";
  };

  const sidebarItems = [
    { 
      icon: Home, 
      path: getDashboardPath(), 
      label: "Home"
    },
    { 
      icon: TicketIcon, 
      path: "/mobile/tickets", 
      label: "Tickets"
    },
    { 
      icon: MessageSquare, 
      path: "/mobile/chat", 
      label: "Chat"
    },
    { 
      icon: BarChart4, 
      path: "/mobile/analytics", 
      label: "Stats"
    },
    { 
      icon: Bell, 
      path: "/mobile/notifications", 
      label: "Alerts"
    },
    { 
      icon: User, 
      path: "/mobile/profile", 
      label: "Profile"
    },
  ];

  const currentPath = location.pathname;

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[70px] bg-black/80 backdrop-blur-lg border-r border-white/10 z-40">
      <div className="flex flex-col items-center py-6 h-full">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center mb-6">
          <span className="text-white font-bold text-lg">
            {user?.name?.charAt(0) || "U"}
          </span>
        </div>
        
        <nav className="flex-1 w-full">
          <ul className="flex flex-col items-center space-y-4">
            {sidebarItems.map((item, index) => (
              <li key={index} className="w-full">
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center justify-center py-3 w-full transition-all",
                    currentPath === item.path 
                      ? "text-white bg-white/10" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="h-5 w-5 mb-1" />
                  <span className="text-[9px]">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <button 
          onClick={() => navigate("/mobile/settings")}
          className="mt-auto text-white/60 hover:text-white transition-colors p-3"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </aside>
  );
}

export default MobileSidebar;
