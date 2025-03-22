
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Loader2, Home, TicketIcon, MessageSquare, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin rounded-full border-4 border-indigo-400 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          <p className="text-sm font-medium text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated - handled at the route level with ProtectedRoute
  // This is just a fallback
  if (!isAuthenticated) {
    navigate("/mobile/login", { replace: true });
    return null;
  }

  // Get current route for bottom navigation active states
  const currentPath = location.pathname;
  
  // Determine dashboard path based on user role
  const getDashboardPath = () => {
    if (user?.role === "admin") return "/mobile/dashboard/admin";
    if (user?.role === "support") return "/mobile/dashboard/support";
    return "/mobile/dashboard/client";
  };

  // Navigation items for the bottom bar
  const navigationItems = [
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
      icon: Plus, 
      path: "/mobile/tickets/new", 
      label: "New",
      special: true
    },
    { 
      icon: MessageSquare, 
      path: "/mobile/chat", 
      label: "Chat"
    },
    { 
      icon: User, 
      path: "/mobile/profile", 
      label: "Profile"
    },
  ];

  return (
    <NotificationProvider>
      <div className="w-full max-w-[100vw] min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 text-white overflow-x-hidden mobile-container">
        <main className="w-full pb-24 overflow-x-hidden mobile-content-area">
          <div className="mobile-page-container">
            <Outlet />
          </div>
        </main>
        
        {/* Fixed bottom navigation bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-lg border-t border-white/10 p-1.5 z-50">
          <div className="flex justify-around items-center">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex flex-col items-center justify-center p-1 h-auto min-w-[60px] gap-0.5 rounded-xl text-white/70 hover:text-white transition-all",
                  currentPath === item.path && "text-white bg-white/10",
                  item.special && "text-white -mt-6"
                )}
                onClick={() => navigate(item.path)}
              >
                {item.special ? (
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 shadow-lg shadow-indigo-600/20 mb-1">
                    <item.icon className="h-5 w-5" />
                  </div>
                ) : (
                  <item.icon className="h-5 w-5" />
                )}
                <span className="text-[10px] font-medium">{item.label}</span>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </NotificationProvider>
  );
}

export default MobileLayout;
