
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
  CheckCircle2,
  Users,
  Search,
  ArrowUpRight,
  Zap,
  AlertTriangle,
  CircleCheckBig,
  PlusCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const MobileSupportDashboard = () => {
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

  // Stats cards
  const statsCards = [
    {
      label: "Assigned to you",
      value: 5,
      icon: <TicketIcon className="h-4 w-4 text-blue-400" />,
      color: "from-blue-500/30 to-blue-700/10",
      onClick: () => navigate("/mobile/tickets?assigned=me")
    },
    {
      label: "High Priority",
      value: 2,
      icon: <AlertTriangle className="h-4 w-4 text-amber-400" />,
      color: "from-amber-500/30 to-amber-700/10",
      onClick: () => navigate("/mobile/tickets?priority=high")
    },
    {
      label: "Resolved Today",
      value: 3,
      icon: <CircleCheckBig className="h-4 w-4 text-emerald-400" />,
      color: "from-emerald-500/30 to-emerald-700/10",
      onClick: () => navigate("/mobile/tickets?status=resolved&period=today")
    }
  ];

  // Quick actions
  const quickActions = [
    {
      icon: <Search className="h-5 w-5 text-blue-400" />,
      label: "Find Ticket",
      color: "bg-blue-500/20",
      onClick: () => navigate("/mobile/tickets")
    },
    {
      icon: <PlusCircle className="h-5 w-5 text-emerald-400" />,
      label: "Create",
      color: "bg-emerald-500/20",
      onClick: () => navigate("/mobile/tickets/new")
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
      label: "Chat",
      color: "bg-purple-500/20",
      onClick: () => navigate("/mobile/chat")
    },
    {
      icon: <Users className="h-5 w-5 text-amber-400" />,
      label: "Clients",
      color: "bg-amber-500/20",
      onClick: () => navigate("/mobile/users")
    }
  ];

  // Recent tickets
  const ticketList = [
    {
      id: "TK-2458",
      client: "Sarah Johnson",
      title: "Unable to reset password",
      priority: "high",
      timeAgo: "10m ago",
      unread: true
    },
    {
      id: "TK-2457",
      client: "Mike Thompson",
      title: "Feature suggestion for dashboard",
      priority: "medium",
      timeAgo: "45m ago",
      unread: true
    },
    {
      id: "TK-2456",
      client: "David Wilson",
      title: "Billing discrepancy on invoice #45982",
      priority: "low",
      timeAgo: "1h ago",
      unread: false
    },
    {
      id: "TK-2455",
      client: "Jennifer Smith",
      title: "Integration with third-party API failing",
      priority: "medium",
      timeAgo: "2h ago",
      unread: false
    }
  ];

  // Priority badge styling
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/20 text-rose-400 border-rose-600/30";
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-600/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-600/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-600/30";
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
            <h1 className="text-xl font-bold text-white">Support Dashboard</h1>
            <p className="text-sm text-indigo-300">Welcome back, {user?.name?.split(' ')[0] || "Agent"}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
            <Zap className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-purple-600 mt-4 rounded-full" />
      </motion.div>
      
      {/* Stats overview */}
      <motion.div 
        className="mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-3 gap-3">
          {statsCards.map((stat, index) => (
            <motion.div 
              key={index}
              variants={itemAnimation}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-lg cursor-pointer"
              onClick={stat.onClick}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-70`} />
              <div className="relative p-3 flex flex-col items-center justify-center text-center">
                <div className="p-2 rounded-full bg-white/10 backdrop-blur-md mb-2">
                  {stat.icon}
                </div>
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-[10px] text-white/70 mt-1">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
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
      
      {/* Tickets list */}
      <motion.div 
        className="space-y-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex justify-between items-center px-1">
          <motion.h2 
            className="text-md font-medium text-white"
            variants={itemAnimation}
          >
            Recent Tickets
          </motion.h2>
          <motion.span 
            className="text-xs text-indigo-400 flex items-center"
            variants={itemAnimation}
            onClick={() => navigate("/mobile/tickets")}
          >
            View All <ArrowUpRight className="h-3 w-3 ml-1" />
          </motion.span>
        </div>
        
        <div className="space-y-3">
          {ticketList.map((ticket, index) => (
            <motion.div 
              key={index} 
              variants={itemAnimation}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-xl border border-white/5 ${ticket.unread ? 'bg-white/10' : 'bg-white/5'} backdrop-blur-sm shadow-xl cursor-pointer`}
              onClick={() => navigate(`/mobile/tickets/${ticket.id}`)}
            >
              <div className="relative p-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <span className="text-xs font-mono text-white/70 mr-2">{ticket.id}</span>
                    {ticket.unread && (
                      <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    )}
                  </div>
                  <Badge className={`text-[10px] border ${getPriorityStyles(ticket.priority)}`}>
                    {ticket.priority}
                  </Badge>
                </div>
                
                <h3 className="font-medium text-white text-sm mb-1 line-clamp-1">{ticket.title}</h3>
                
                <div className="flex justify-between items-center">
                  <span className="text-[11px] text-indigo-300">{ticket.client}</span>
                  <div className="flex items-center">
                    <span className="text-[10px] text-white/60 mr-1">{ticket.timeAgo}</span>
                    <ChevronRight className="h-4 w-4 text-white/40" />
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

export default MobileSupportDashboard;
