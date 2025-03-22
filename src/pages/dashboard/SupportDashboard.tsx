
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { TicketIcon, MessageSquareIcon, BookOpenIcon, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TicketChart } from "@/components/dashboard/TicketChart";
import { useIsMobile } from "@/hooks/use-mobile";

const SupportDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const actionCards = [
    {
      title: "My Assigned Tickets",
      description: "View tickets assigned to you",
      icon: <TicketIcon className="h-8 w-8" />,
      action: () => navigate("/tickets"),
      iconClass: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Open Tickets",
      description: "View unassigned tickets",
      icon: <TicketIcon className="h-8 w-8" />,
      action: () => navigate("/tickets/open"),
      iconClass: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Client Communications",
      description: "Message with clients",
      icon: <MessageSquareIcon className="h-8 w-8" />,
      action: () => navigate("/chat"),
      iconClass: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Knowledge Base",
      description: "Access support resources",
      icon: <BookOpenIcon className="h-8 w-8" />,
      action: () => navigate("/knowledge"),
      iconClass: "text-amber-600 dark:text-amber-400",
    },
  ];
  
  // Mock data for charts
  const ticketTrendsData = [
    { name: "Mon", open: 4, resolved: 2 },
    { name: "Tue", open: 3, resolved: 4 },
    { name: "Wed", open: 5, resolved: 3 },
    { name: "Thu", open: 7, resolved: 5 },
    { name: "Fri", open: 2, resolved: 6 },
    { name: "Sat", open: 1, resolved: 2 },
    { name: "Sun", open: 3, resolved: 1 },
  ];
  
  const ticketCategoriesData = [
    { name: "Technical", value: 35 },
    { name: "Billing", value: 25 },
    { name: "Account", value: 15 },
    { name: "Feature", value: 20 },
    { name: "Other", value: 5 },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/30 w-full min-h-screen relative pb-8">
      {/* 3D Effect Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-200/40 dark:bg-indigo-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col justify-between items-start pt-6 px-4 sm:px-6">
          <div className="animate-fade-in w-full">
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
              Welcome, {user?.name || "Support Agent"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">Monitor and manage support tickets</p>
          </div>
          <div className="mt-4 animate-fade-in w-full" style={{ animationDelay: "100ms" }}>
            <Button 
              onClick={() => navigate("/tickets")}
              className="w-full sm:w-auto rounded-full shadow-lg bg-indigo-600 hover:bg-indigo-700"
            >
              <TicketIcon className="mr-2 h-4 w-4" />
              View Tickets
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid gap-3 grid-cols-2 my-5 px-4 sm:px-6">
          <StatCard
            title="Assigned"
            value={7}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="Completed"
            value={3}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        
        <div className="grid gap-3 grid-cols-2 mb-5 px-4 sm:px-6">
          <StatCard
            title="Avg. Response"
            value="2.5 hrs"
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Satisfaction"
            value="4.8/5"
            trend="up"
            trendValue={2}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        {/* Charts */}
        <div className="px-4 sm:px-6 mb-6">
          <Card className="animate-fade-in shadow-lg rounded-xl backdrop-blur-sm bg-white/70 dark:bg-slate-800/60 border-0" style={{ animationDelay: "600ms" }}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Ticket Trends (Last 7 Days)</h3>
              <div className="h-[200px]">
                <TicketChart 
                  data={ticketTrendsData} 
                  type="bar" 
                  title={null}
                  description={null}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="px-4 sm:px-6 mb-6">
          <Card className="animate-fade-in shadow-lg rounded-xl backdrop-blur-sm bg-white/70 dark:bg-slate-800/60 border-0" style={{ animationDelay: "700ms" }}>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Ticket Categories</h3>
              <div className="h-[200px]">
                <TicketChart 
                  data={ticketCategoriesData} 
                  type="pie" 
                  title={null}
                  description={null}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-xl font-semibold mt-2 mb-4 text-gray-800 dark:text-white animate-fade-in px-4 sm:px-6" style={{ animationDelay: "800ms" }}>
          Quick Actions
        </h2>
        
        <div className="grid gap-3 grid-cols-1 px-4 sm:px-6 pb-8">
          {actionCards.map((item, index) => (
            <Card 
              key={index} 
              className="overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-white/10 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in shadow-lg border-0 rounded-xl"
              onClick={item.action}
              style={{ animationDelay: `${900 + index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full bg-white/80 dark:bg-white/10 shadow-inner`}>
                    <div className={item.iconClass}>{item.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
