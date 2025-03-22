
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  Home, FileText, Settings, BookOpen, 
  BarChart2, Users, LogOut, HelpCircle 
} from 'lucide-react';

export const MobileSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const getDashboardLink = () => {
    switch (user?.role) {
      case "admin":
        return "/mobile/dashboard/admin";
      case "support":
        return "/mobile/dashboard/support";
      case "client":
      default:
        return "/mobile/dashboard/client";
    }
  };
  
  const navItems = [
    {
      icon: Home,
      path: getDashboardLink(),
      label: "Home"
    },
    {
      icon: FileText,
      path: "/mobile/tickets",
      label: "Tickets"
    },
    {
      icon: BookOpen,
      path: "/mobile/knowledge",
      label: "Knowledge"
    },
    ...(user?.role === 'admin' ? [
      {
        icon: Users,
        path: "/mobile/users",
        label: "Users"
      },
      {
        icon: BarChart2,
        path: "/mobile/analytics",
        label: "Analytics"
      }
    ] : []),
    {
      icon: Settings,
      path: "/mobile/settings",
      label: "Settings"
    },
    {
      icon: HelpCircle,
      path: "/mobile/help",
      label: "Help"
    }
  ];
  
  return (
    <aside data-sidebar="sidebar" className="flex flex-col items-center py-4 h-full space-y-6">
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className={cn(
            "w-12 h-12 flex flex-col items-center justify-center rounded-md transition-colors",
            isActive(item.path) 
              ? "bg-blue-800 text-white" 
              : "text-blue-300 hover:bg-blue-800/50 hover:text-white"
          )}
          title={item.label}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-[9px] mt-1">{item.label}</span>
        </button>
      ))}
      
      <button
        onClick={logout}
        className="w-12 h-12 flex flex-col items-center justify-center rounded-md text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors mt-auto"
        title="Logout"
      >
        <LogOut className="h-5 w-5" />
        <span className="text-[9px] mt-1">Logout</span>
      </button>
    </aside>
  );
};
