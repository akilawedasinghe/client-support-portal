
import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { MobileNavbar } from "./MobileNavbar";
import { MobileSidebar } from "./MobileSidebar";

const MobileLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-slate-950 to-indigo-950">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin rounded-full border-4 border-blue-400 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          <p className="text-sm font-medium text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/mobile/login" replace />;
  }

  return (
    <div className="mobile-container h-screen bg-gradient-to-br from-gray-900 to-slate-900">
      {/* Fixed sidebar */}
      <MobileSidebar />
      
      {/* Content area that starts after the sidebar */}
      <div className="mobile-content-area h-screen flex flex-col">
        {/* Top navbar */}
        <MobileNavbar />
        
        {/* Main scrollable content */}
        <main className="mobile-main-content flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MobileLayout;
