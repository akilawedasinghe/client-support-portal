
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart4, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { MobilePageContainer } from "@/components/mobile/MobilePageContainer";

const MobileAnalyticsPage = () => {
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

  // Sample analytics metrics
  const metrics = [
    {
      name: "Tickets Created",
      value: 124,
      change: 12,
      trend: "up",
      period: "vs last month",
      color: "from-blue-500/30 to-blue-700/10"
    },
    {
      name: "Avg. Response Time",
      value: "2.4h",
      change: 0.3,
      trend: "down",
      period: "vs last month",
      color: "from-emerald-500/30 to-emerald-700/10"
    },
    {
      name: "Client Satisfaction",
      value: "94%",
      change: 2,
      trend: "up",
      period: "vs last month",
      color: "from-amber-500/30 to-amber-700/10"
    },
    {
      name: "Resolution Rate",
      value: "86%",
      change: 1,
      trend: "down",
      period: "vs last month",
      color: "from-purple-500/30 to-purple-700/10"
    }
  ];

  return (
    <MobilePageContainer>
      <motion.div 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">Analytics</h1>
              <p className="text-sm text-indigo-300">Performance metrics overview</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-600 to-amber-600 flex items-center justify-center shadow-lg shadow-indigo-900/30">
              <BarChart4 className="h-5 w-5 text-white" />
            </div>
          </div>
          <div className="h-1 w-full bg-gradient-to-r from-indigo-600 to-amber-600 mt-4 rounded-full" />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          className="grid grid-cols-2 gap-3 mb-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              variants={itemAnimation}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-lg"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-70`} />
              <div className="relative p-4">
                <p className="text-sm text-white/80 mb-1">{metric.name}</p>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                  <div className={`flex items-center text-xs ${metric.trend === "up" ? "text-emerald-400" : "text-rose-400"}`}>
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {metric.change}%
                  </div>
                </div>
                <p className="text-[10px] text-white/50 mt-1">{metric.period}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Placeholder for charts section - would be expanded in a real implementation */}
        <motion.div 
          className="mb-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm p-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-md font-medium text-white">Ticket Volume</h2>
            <span className="text-xs text-indigo-400 flex items-center">
              Monthly <ArrowUpRight className="h-3 w-3 ml-1" />
            </span>
          </div>
          
          <div className="h-40 flex items-center justify-center">
            <p className="text-white/50 text-sm">Interactive chart would appear here</p>
          </div>
        </motion.div>
        
        {/* Additional metrics section */}
        <motion.div 
          className="rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm p-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-md font-medium text-white mb-4">Performance by Category</h2>
          
          {/* Sample category performance */}
          <div className="space-y-3">
            {["Technical Support", "Billing Issues", "Feature Requests", "User Access"].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-white/80">{category}</span>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full" 
                      style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/60">{Math.floor(Math.random() * 50) + 50}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </MobilePageContainer>
  );
};

export default MobileAnalyticsPage;
