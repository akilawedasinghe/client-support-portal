
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  TicketIcon, 
  MessageSquare, 
  Bell, 
  ChevronRight, 
  Clock,
  FileText,
  HelpCircle,
  Settings,
  Search,
  CheckCircle2,
  AlertCircle,
  PlusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

const MobileClientDashboard = () => {
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

  // Sample ticket data
  const recentTickets = [
    {
      id: "TK-1029",
      title: "Can't access my account",
      status: "open",
      timeAgo: "2h ago",
      priority: "high"
    },
    {
      id: "TK-1028",
      title: "Billing question",
      status: "in-progress",
      timeAgo: "1d ago",
      priority: "medium"
    },
    {
      id: "TK-1025",
      title: "Feature request",
      status: "closed",
      timeAgo: "3d ago",
      priority: "low"
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: <PlusCircle className="h-5 w-5 text-blue-400" />,
      label: "New Ticket",
      color: "bg-blue-500/20",
      onClick: () => navigate("/mobile/tickets/new")
    },
    {
      icon: <Search className="h-5 w-5 text-purple-400" />,
      label: "Search",
      color: "bg-purple-500/20",
      onClick: () => navigate("/mobile/tickets")
    },
    {
      icon: <HelpCircle className="h-5 w-5 text-amber-400" />,
      label: "Help",
      color: "bg-amber-500/20",
      onClick: () => navigate("/mobile/knowledge")
    },
    {
      icon: <Settings className="h-5 w-5 text-slate-400" />,
      label: "Settings",
      color: "bg-slate-500/20",
      onClick: () => navigate("/mobile/settings")
    },
  ];

  // Feature tiles
  const featureTiles = [
    {
      title: "My Tickets",
      description: "View and manage your support tickets",
      icon: <TicketIcon className="h-5 w-5 text-blue-400" />,
      onClick: () => navigate("/mobile/tickets"),
      gradient: "from-blue-500/30 to-blue-700/10",
      accentColor: "border-l-blue-500"
    },
    {
      title: "Knowledge Base",
      description: "Browse articles and tutorials",
      icon: <FileText className="h-5 w-5 text-emerald-400" />,
      onClick: () => navigate("/mobile/knowledge"),
      gradient: "from-emerald-500/30 to-emerald-700/10",
      accentColor: "border-l-emerald-500"
    },
    {
      title: "Live Chat",
      description: "Chat with support agents",
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      onClick: () => navigate("/mobile/chat"),
      gradient: "from-purple-500/30 to-purple-700/10",
      accentColor: "border-l-purple-500"
    },
    {
      title: "Notifications",
      description: "View your notifications",
      icon: <Bell className="h-5 w-5 text-amber-400" />,
      onClick: () => navigate("/mobile/notifications"),
      gradient: "from-amber-500/30 to-amber-700/10",
      accentColor: "border-l-amber-500"
    }
  ];

  // Helper for status styling
  const getStatusStyles = (status) => {
    switch (status) {
      case "open":
        return {
          bg: "bg-blue-500/20",
          text: "text-blue-400",
          icon: <AlertCircle className="h-3 w-3 text-blue-400 mr-1" />
        };
      case "in-progress":
        return {
          bg: "bg-amber-500/20",
          text: "text-amber-400",
          icon: <Clock className="h-3 w-3 text-amber-400 mr-1" />
        };
      case "closed":
        return {
          bg: "bg-emerald-500/20",
          text: "text-emerald-400",
          icon: <CheckCircle2 className="h-3 w-3 text-emerald-400 mr-1" />
        };
      default:
        return {
          bg: "bg-slate-500/20",
          text: "text-slate-400",
          icon: <AlertCircle className="h-3 w-3 text-slate-400 mr-1" />
        };
    }
  };

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
            <h1 className="text-xl font-bold text-white">Hello, {user?.name?.split(' ')[0] || "Client"}</h1>
            <p className="text-sm text-indigo-300">How can we help you today?</p>
          </div>
          <Button 
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-lg shadow-blue-900/30"
            onClick={() => navigate("/mobile/tickets/new")}
          >
            <PlusCircle className="h-4 w-4 mr-1" /> New Ticket
          </Button>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-4 rounded-full" />
      </motion.div>
      
      {/* Quick actions */}
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
      
      {/* Recent tickets */}
      <motion.div 
        className="mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex justify-between items-center px-1 mb-3">
          <h2 className="text-md font-medium text-white">Recent Tickets</h2>
          <span 
            className="text-xs text-indigo-400" 
            onClick={() => navigate("/mobile/tickets")}
          >
            View All
          </span>
        </div>
        
        <div className="space-y-3">
          {recentTickets.map((ticket, index) => {
            const statusStyle = getStatusStyles(ticket.status);
            
            return (
              <motion.div 
                key={index} 
                variants={itemAnimation}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl cursor-pointer"
                onClick={() => navigate(`/mobile/tickets/${ticket.id}`)}
              >
                <div className="relative p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-white/70">{ticket.id}</span>
                    <div className={`flex items-center px-2 py-0.5 rounded-full ${statusStyle.bg} ${statusStyle.text} text-[10px]`}>
                      {statusStyle.icon}
                      <span>{ticket.status.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <h3 className="font-medium text-white text-sm mb-2">{ticket.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/60">{ticket.timeAgo}</span>
                    <ChevronRight className="h-4 w-4 text-white/40" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      
      {/* Feature tiles */}
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
          Help & Support
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-3">
          {featureTiles.map((tile, index) => (
            <motion.div 
              key={index} 
              variants={itemAnimation}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-xl border border-white/5 backdrop-blur-sm shadow-xl cursor-pointer border-l-4 ${tile.accentColor}`}
              onClick={tile.onClick}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tile.gradient} opacity-70`} />
              <div className="relative p-4">
                <div className="flex flex-col h-full">
                  <div className="p-2 rounded-lg bg-white/10 backdrop-blur-md w-fit mb-2">
                    {tile.icon}
                  </div>
                  <h3 className="font-medium text-white text-sm">{tile.title}</h3>
                  <p className="text-[11px] text-white/70 mt-1">{tile.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MobileClientDashboard;
