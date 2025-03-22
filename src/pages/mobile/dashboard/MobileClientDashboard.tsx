
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  FileQuestion, 
  Settings, 
  LogOut, 
  Ticket, 
  Bell, 
  User,
  ChevronRight,
  Plus
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const MobileClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Tickets",
      icon: <Ticket className="h-5 w-5 text-blue-500" />,
      onClick: () => navigate("/mobile/tickets")
    },
    {
      title: "Support Chat",
      icon: <MessageSquare className="h-5 w-5 text-emerald-500" />,
      onClick: () => navigate("/mobile/chat")
    },
    {
      title: "Help Center",
      icon: <FileQuestion className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/mobile/help")
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
            <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
            <p className="text-sm text-blue-300">Welcome, {user?.name || "Client"}</p>
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
          title="Active Tickets"
          value={2}
          color="warning"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
        />
        <StatCard
          title="Closed Tickets"
          value={8}
          color="success"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
        />
        <StatCard
          title="Avg. Response"
          value="1.5h"
          color="info"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
        />
        <StatCard
          title="Subscription"
          value="Pro"
          color="default"
          className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
        />
      </div>
      
      <Button 
        className="w-full mb-6 bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center py-6"
        onClick={() => navigate("/mobile/tickets/new")}
      >
        <Plus className="mr-2 h-5 w-5" />
        Create New Support Ticket
      </Button>
      
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
          onClick={() => navigate("/mobile/dashboard/client")}
        >
          <User className="h-5 w-5" />
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
          onClick={() => navigate("/mobile/chat")}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white h-10 w-10 rounded-full" 
          onClick={() => navigate("/mobile/tickets/new")}
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default MobileClientDashboard;
