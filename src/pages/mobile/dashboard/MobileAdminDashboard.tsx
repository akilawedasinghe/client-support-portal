
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BarChart4, 
  Settings, 
  LogOut, 
  Ticket, 
  Bell, 
  User,
  ChevronRight
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const MobileAdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Tickets",
      icon: <Ticket className="h-5 w-5 text-blue-500" />,
      onClick: () => navigate("/mobile/tickets")
    },
    {
      title: "Users",
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      onClick: () => navigate("/mobile/users")
    },
    {
      title: "Analytics",
      icon: <BarChart4 className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/mobile/analytics")
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5 text-purple-500" />,
      onClick: () => navigate("/mobile/notifications")
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5 text-slate-500" />,
      onClick: () => navigate("/mobile/settings")
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5 text-indigo-500" />,
      onClick: () => navigate("/mobile/profile")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 px-4 py-6 pb-16">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-blue-300">Welcome, {user?.name || "Admin"}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="text-white h-9 w-9 rounded-full bg-white/10"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard
          title="Total Users"
          value={42}
          color="info"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          trend="up"
          trendValue={12}
        />
        <StatCard
          title="Open Tickets"
          value={7}
          color="warning"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          trend="down"
          trendValue={3}
        />
        <StatCard
          title="Revenue"
          value="$9.2k"
          color="success"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          trend="up"
          trendValue={8}
        />
        <StatCard
          title="Active Plans"
          value={18}
          color="default"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
        />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-white mb-2">Quick Access</h2>
        
        {menuItems.map((item, index) => (
          <Card 
            key={index}
            className="bg-white/10 backdrop-blur-sm border-0 shadow-md hover:bg-white/15 transition-colors cursor-pointer"
            onClick={item.onClick}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="font-medium text-white">{item.title}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/80 backdrop-blur-md p-3 border-t border-white/10 flex justify-around">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white h-10 w-10 rounded-full" 
          onClick={() => navigate("/mobile/dashboard/admin")}
        >
          <BarChart4 className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white h-10 w-10 rounded-full" 
          onClick={() => navigate("/mobile/tickets")}
        >
          <Ticket className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white h-10 w-10 rounded-full" 
          onClick={() => navigate("/mobile/users")}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white h-10 w-10 rounded-full" 
          onClick={() => navigate("/mobile/profile")}
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileAdminDashboard;
