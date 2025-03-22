
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TicketForm } from "@/components/tickets/TicketForm";
import { FileText, Plus, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const NewTicketPage = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSubmit = (values: any) => {
    console.log("Ticket submitted:", values);
    setOpen(false);
  };

  const ticketTypes = [
    {
      id: "technical",
      title: "Technical Issue",
      description: "Report problems with software, hardware or connectivity",
      icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
      iconClass: "text-amber-500"
    },
    {
      id: "billing",
      title: "Billing Question",
      description: "Questions about invoices, payments or subscriptions",
      icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
      iconClass: "text-emerald-500"
    },
    {
      id: "general",
      title: "General Inquiry",
      description: "Any other questions or information requests",
      icon: <HelpCircle className="h-8 w-8 text-blue-500" />,
      iconClass: "text-blue-500"
    }
  ];

  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900/30 m-0 p-0">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-200/40 dark:bg-indigo-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full px-4 py-6 relative z-10">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-900 dark:text-white">
            Create New Ticket
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Submit a new support ticket to get the help you need
          </p>
          
          <div className="grid gap-6 grid-cols-1">
            <Card className="overflow-hidden border-0 bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm shadow-lg rounded-xl animate-fade-in">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <FileText className="h-16 w-16 text-blue-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Need Assistance?</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6 max-w-md">
                    Create a support ticket and our team will help you resolve your issue quickly
                  </p>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full w-full sm:w-auto">
                        <Plus className="h-4 w-4" /> Create Ticket
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 border-0 shadow-2xl rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">Create New Support Ticket</DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                          Fill out the form below to submit a new support ticket.
                        </DialogDescription>
                      </DialogHeader>
                      <TicketForm onSubmit={handleSubmit} />
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Choose Ticket Type</h3>
              
              {ticketTypes.map((type, index) => (
                <Card 
                  key={type.id}
                  className="overflow-hidden border-0 hover:scale-[1.02] transition-all duration-200 cursor-pointer shadow-md bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl animate-fade-in"
                  onClick={() => setOpen(true)}
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-gray-100/80 dark:bg-gray-700/80 shadow-inner">
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">{type.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <p className="text-gray-500 text-sm mt-4 italic">
                Not sure what type of ticket to create? Choose "General Inquiry" and we'll direct your request to the right team.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTicketPage;
