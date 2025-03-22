
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { TicketIcon, BookOpenIcon, User2, ArrowRight, PlusCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { TicketChart } from "@/components/dashboard/TicketChart";

const ClientDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const actionCards = [
    {
      title: "Submit Ticket",
      description: "Create a new support ticket",
      icon: <PlusCircle className="h-8 w-8 text-blue-500" />,
      action: () => navigate("/tickets/new"),
      iconClass: "text-blue-400",
    },
    {
      title: "My Tickets",
      description: "View your existing tickets",
      icon: <TicketIcon className="h-8 w-8 text-purple-500" />,
      action: () => navigate("/tickets"),
      iconClass: "text-purple-400",
    },
    {
      title: "Account Settings",
      description: "Manage your account",
      icon: <User2 className="h-8 w-8 text-emerald-500" />,
      action: () => navigate("/profile"),
      iconClass: "text-emerald-400",
    },
  ];
  
  // Mock data for charts
  const ticketStatusData = [
    { name: "Open", value: 3 },
    { name: "In Progress", value: 2 },
    { name: "Resolved", value: 15 },
    { name: "Closed", value: 5 },
  ];
  
  const ticketHistoryData = [
    { name: "Jan", tickets: 2 },
    { name: "Feb", tickets: 1 },
    { name: "Mar", tickets: 3 },
    { name: "Apr", tickets: 0 },
    { name: "May", tickets: 5 },
    { name: "Jun", tickets: 4 },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/30 w-full min-h-screen relative">
      {/* 3D Effect Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-sky-200/40 dark:bg-sky-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full mx-auto relative z-10">
        <div className="flex flex-col justify-between items-start pt-6 px-4 sm:px-6">
          <div className="animate-fade-in w-full">
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-800 dark:text-white">
              Welcome, {user?.name || "Client"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-slate-400">Here's your support overview</p>
          </div>
          <div className="mt-4 animate-fade-in flex gap-3 w-full" style={{ animationDelay: "100ms" }}>
            <Button 
              onClick={() => navigate("/tickets/new")}
              className="text-sm flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-full shadow-lg"
            >
              <PlusCircle className="h-4 w-4" />
              New Ticket
            </Button>
            <Button 
              onClick={() => navigate("/tickets")}
              variant="outline"
              className="text-sm flex-1 bg-white/80 dark:bg-slate-800/50 text-gray-700 dark:text-slate-200 rounded-full shadow-md"
            >
              View Tickets
            </Button>
          </div>
        </div>
        
        {/* Stats summary */}
        <div className="grid gap-3 grid-cols-2 my-5 px-4 sm:px-6">
          <StatCard
            title="Open"
            value={3}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "200ms" }}
          />
          <StatCard
            title="In Progress"
            value={2}
            color="info"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        
        <div className="grid gap-3 grid-cols-2 mb-5 px-4 sm:px-6">
          <StatCard
            title="Resolved"
            value={15}
            color="success"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "400ms" }}
          />
          <StatCard
            title="Unassigned"
            value={2}
            icon={<AlertCircle className="h-4 w-4" />}
            color="warning"
            className="animate-fade-in backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg rounded-xl border-0"
            style={{ animationDelay: "500ms" }}
          />
        </div>
        
        {/* Charts */}
        <div className="px-4 sm:px-6 mb-6">
          <Card className="overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg border-0 rounded-xl animate-fade-in" style={{ animationDelay: "600ms" }}>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-2 text-gray-800 dark:text-white">Ticket Status</h3>
              <div className="h-[180px]">
                <TicketChart 
                  data={ticketStatusData} 
                  type="pie" 
                  title={null}
                  description={null}
                  darkLabels={true}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="px-4 sm:px-6 mb-6">
          <Card className="overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-white/5 shadow-lg border-0 rounded-xl animate-fade-in" style={{ animationDelay: "700ms" }}>
            <CardContent className="p-4">
              <h3 className="text-base font-medium mb-2 text-gray-800 dark:text-white">Ticket History</h3>
              <div className="h-[180px]">
                <TicketChart 
                  data={ticketHistoryData} 
                  type="bar" 
                  title={null}
                  description={null}
                  darkLabels={true}
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
                  <div className="p-3 rounded-full bg-white/80 dark:bg-white/10 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400">{item.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
