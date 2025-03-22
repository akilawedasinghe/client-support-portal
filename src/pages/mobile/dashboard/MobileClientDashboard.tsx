
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  FileQuestion, 
  Settings, 
  Bell, 
  ChevronRight,
  Plus,
  Ticket,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const MobileClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Support Tickets",
      description: "Manage your support requests",
      icon: <Ticket className="h-5 w-5 text-blue-500" />,
      onClick: () => navigate("/mobile/tickets"),
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      title: "Live Support Chat",
      description: "Get real-time assistance",
      icon: <MessageSquare className="h-5 w-5 text-emerald-500" />,
      onClick: () => navigate("/mobile/chat"),
      color: "from-emerald-500/20 to-emerald-600/5"
    },
    {
      title: "Help Resources",
      description: "Browse our knowledge base",
      icon: <FileQuestion className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/mobile/help"),
      color: "from-amber-500/20 to-amber-600/5"
    },
    {
      title: "Notifications",
      description: "View updates and alerts",
      icon: <Bell className="h-5 w-5 text-purple-500" />,
      onClick: () => navigate("/mobile/notifications"),
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      title: "Account Settings",
      description: "Manage your preferences",
      icon: <Settings className="h-5 w-5 text-slate-500" />,
      onClick: () => navigate("/mobile/settings"),
      color: "from-slate-500/20 to-slate-600/5"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-indigo-950 px-4 py-6 pb-20">
      {/* Header with gradient underline */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
            <p className="text-sm text-indigo-300">Welcome, {user?.name || "Client"}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-indigo-400" />
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-600 mt-4 rounded-full" />
      </motion.div>
      
      {/* Stats section */}
      <motion.div 
        className="grid grid-cols-2 gap-3 mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Active Tickets"
            value={2}
            icon={<Ticket className="h-4 w-4" />}
            color="warning"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Closed Tickets"
            value={8}
            icon={<CheckCircle className="h-4 w-4" />}
            color="success"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Avg. Response"
            value="1.5h"
            icon={<Clock className="h-4 w-4" />}
            color="info"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Subscription"
            value="Pro"
            icon={<Sparkles className="h-4 w-4" />}
            color="default"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          />
        </motion.div>
      </motion.div>
      
      {/* Create ticket button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          className="w-full mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-700/30 flex items-center justify-center py-6 border-0"
          onClick={() => navigate("/mobile/tickets/new")}
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Support Ticket
        </Button>
      </motion.div>
      
      {/* Quick access cards */}
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h2 
          className="text-lg font-medium text-white mb-2"
          variants={itemAnimation}
        >
          Quick Access
        </motion.h2>
        
        {menuItems.map((menuItem, index) => (
          <motion.div 
            key={index} 
            variants={itemAnimation}
            whileTap={{ scale: 0.98 }}
          >
            <Card 
              className="bg-gradient-to-br border-0 shadow-xl hover:shadow-2xl transition-all cursor-pointer overflow-hidden group"
              onClick={menuItem.onClick}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${menuItem.color} opacity-30`} />
              <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/20" />
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md">
                      {menuItem.icon}
                    </div>
                    <div>
                      <span className="font-medium text-white">{menuItem.title}</span>
                      <p className="text-xs text-white/70">{menuItem.description}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-white/20 transition-all">
                    <ChevronRight className="h-4 w-4 text-white/70" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MobileClientDashboard;
