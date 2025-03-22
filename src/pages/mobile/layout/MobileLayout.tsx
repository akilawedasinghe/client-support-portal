
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Loader2 } from "lucide-react";

export function MobileLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin rounded-full border-4 border-blue-400 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 text-white">
        <main className="flex-1 w-full overflow-auto">
          <Outlet />
        </main>
      </div>
    </NotificationProvider>
  );
}

export default MobileLayout;
