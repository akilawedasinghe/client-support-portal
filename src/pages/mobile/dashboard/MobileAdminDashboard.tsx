
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Users, 
  BarChart4, 
  Settings, 
  Bell, 
  ChevronRight,
  Zap,
  TrendingUp,
  UserCheck,
  Ticket
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const MobileAdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Tickets Management",
      description: "View and manage support tickets",
      icon: <Ticket className="h-5 w-5 text-blue-500" />,
      onClick: () => navigate("/mobile/tickets"),
      color: "from-blue-500/20 to-blue-600/5"
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <Users className="h-5 w-5 text-emerald-500" />,
      onClick: () => navigate("/mobile/users"),
      color: "from-emerald-500/20 to-emerald-600/5"
    },
    {
      title: "Performance Analytics",
      description: "View system performance metrics",
      icon: <BarChart4 className="h-5 w-5 text-amber-500" />,
      onClick: () => navigate("/mobile/analytics"),
      color: "from-amber-500/20 to-amber-600/5"
    },
    {
      title: "Notifications Center",
      description: "View system and user notifications",
      icon: <Bell className="h-5 w-5 text-purple-500" />,
      onClick: () => navigate("/mobile/notifications"),
      color: "from-purple-500/20 to-purple-600/5"
    },
    {
      title: "System Settings",
      description: "Configure application settings",
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
            <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-indigo-300">Welcome, {user?.name || "Admin"}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
            <Zap className="h-5 w-5 text-indigo-400" />
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
            title="Total Users"
            value={42}
            icon={<UserCheck className="h-4 w-4" />}
            color="info"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
            trend="up"
            trendValue={12}
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Open Tickets"
            value={7}
            icon={<Ticket className="h-4 w-4" />}
            color="warning"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
            trend="down"
            trendValue={3}
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Revenue"
            value="$9.2k"
            icon={<TrendingUp className="h-4 w-4" />}
            color="success"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
            trend="up"
            trendValue={8}
          />
        </motion.div>
        <motion.div variants={itemAnimation}>
          <StatCard
            title="Active Plans"
            value={18}
            icon={<Users className="h-4 w-4" />}
            color="default"
            className="backdrop-blur-sm bg-white/5 border-0 shadow-lg"
          />
        </motion.div>
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

export default MobileAdminDashboard;
