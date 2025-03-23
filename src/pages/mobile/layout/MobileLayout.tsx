
import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Loader2 } from "lucide-react";
import { MobileSidebar } from "@/components/mobile/MobileSidebar";
import { MobileNavbar } from "@/components/mobile/MobileNavbar";

export function MobileLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();

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

  return (
    <NotificationProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 text-white overflow-hidden">
        {/* Sidebar navigation */}
        <MobileSidebar />
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
        
        {/* Bottom navigation bar */}
        <MobileNavbar />
      </div>
    </NotificationProvider>
  );
}

export default MobileLayout;
