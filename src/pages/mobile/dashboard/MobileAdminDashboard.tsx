
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
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
  Ticket,
  Shield,
  MessageSquare,
  HelpCircle,
  PlusCircle
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

const MobileAdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Quick actions for the top section
  const quickActions = [
    {
      icon: <PlusCircle className="h-5 w-5 text-blue-400" />,
      label: "New Ticket",
      color: "bg-blue-500/20",
      onClick: () => navigate("/mobile/tickets/new")
    },
    {
      icon: <Ticket className="h-5 w-5 text-emerald-400" />,
      label: "Tickets",
      color: "bg-emerald-500/20",
      onClick: () => navigate("/mobile/tickets")
    },
    {
      icon: <Users className="h-5 w-5 text-amber-400" />,
      label: "Users",
      color: "bg-amber-500/20", 
      onClick: () => navigate("/mobile/users")
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      label: "Chat",
      color: "bg-purple-500/20",
      onClick: () => navigate("/mobile/chat")
    }
  ];

  // Main menu tiles
  const menuTiles = [
    {
      title: "Tickets Management",
      description: "View and manage support tickets",
      icon: <Ticket className="h-5 w-5 text-blue-400" />,
      onClick: () => navigate("/mobile/tickets"),
      gradient: "from-blue-500/30 to-blue-700/10",
      accentColor: "border-l-blue-500"
    },
    {
      title: "User Management",
      description: "Manage users and permissions",
      icon: <Users className="h-5 w-5 text-emerald-400" />,
      onClick: () => navigate("/mobile/users"),
      gradient: "from-emerald-500/30 to-emerald-700/10",
      accentColor: "border-l-emerald-500"
    },
    {
      title: "Performance Analytics",
      description: "View system performance metrics",
      icon: <BarChart4 className="h-5 w-5 text-amber-400" />,
      onClick: () => navigate("/mobile/analytics"),
      gradient: "from-amber-500/30 to-amber-700/10",
      accentColor: "border-l-amber-500"
    },
    {
      title: "Notifications Center",
      description: "View system and user notifications",
      icon: <Bell className="h-5 w-5 text-purple-400" />,
      onClick: () => navigate("/mobile/notifications"),
      gradient: "from-purple-500/30 to-purple-700/10",
      accentColor: "border-l-purple-500"
    },
    {
      title: "System Security",
      description: "Manage security settings",
      icon: <Shield className="h-5 w-5 text-rose-400" />,
      onClick: () => navigate("/mobile/settings"),
      gradient: "from-rose-500/30 to-rose-700/10",
      accentColor: "border-l-rose-500"
    },
    {
      title: "Help & Support",
      description: "Access help documentation",
      icon: <HelpCircle className="h-5 w-5 text-sky-400" />,
      onClick: () => navigate("/mobile/knowledge"),
      gradient: "from-sky-500/30 to-sky-700/10",
      accentColor: "border-l-sky-500"
    }
  ];

  return (
    <div className="w-full max-w-[100vw] min-h-screen px-4 py-6 pb-20 overflow-x-hidden">
      {/* Header with greeting */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Hey, {user?.name?.split(' ')[0] || "Admin"}</h1>
            <p className="text-sm text-indigo-300">Welcome to your dashboard</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-blue-600 mt-4 rounded-full" />
      </motion.div>
      
      {/* Quick actions row */}
      <motion.div 
        className="mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex justify-between items-center px-1 mb-3">
          <h2 className="text-md font-medium text-white">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              variants={itemAnimation}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center"
              onClick={action.onClick}
            >
              <div className={`w-14 h-14 rounded-2xl ${action.color} backdrop-blur-md flex items-center justify-center mb-1 shadow-lg shadow-black/20`}>
                {action.icon}
              </div>
              <span className="text-[10px] text-white/90">{action.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Stats section */}
      <motion.div 
        className="mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex justify-between items-center px-1 mb-3">
          <h2 className="text-md font-medium text-white">Analytics</h2>
          <span className="text-xs text-indigo-400" onClick={() => navigate("/mobile/analytics")}>View All</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <motion.div variants={itemAnimation}>
            <StatCard
              title="Total Users"
              value={42}
              icon={<UserCheck className="h-4 w-4" />}
              color="info"
              className="bg-white/5 backdrop-blur-sm border-0 shadow-lg"
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
              className="bg-white/5 backdrop-blur-sm border-0 shadow-lg"
              trend="down"
              trendValue={3}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Main menu tiles */}
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h2 
          className="text-md font-medium text-white px-1"
          variants={itemAnimation}
        >
          Management
        </motion.h2>
        
        <div className="space-y-3">
          {menuTiles.map((tile, index) => (
            <motion.div 
              key={index} 
              variants={itemAnimation}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-xl border border-white/5 backdrop-blur-sm shadow-xl cursor-pointer border-l-4 ${tile.accentColor}`}
              onClick={tile.onClick}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-70`} />
              <div className="relative p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md">
                      {tile.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-white text-sm">{tile.title}</h3>
                      <p className="text-[11px] text-white/70">{tile.description}</p>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <ChevronRight className="h-4 w-4 text-white/70" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileAdminDashboard;
