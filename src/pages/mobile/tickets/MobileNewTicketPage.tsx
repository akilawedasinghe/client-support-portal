
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle,
  ArrowLeft 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

const MobileNewTicketPage = () => {
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [ticketForm, setTicketForm] = useState({
    title: "",
    description: "",
    priority: "medium"
  });
  const [loading, setLoading] = useState(false);
  
  const ticketTypes = [
    {
      id: "technical",
      title: "Technical Issue",
      description: "Report problems with software, hardware or connectivity",
      icon: <AlertCircle className="h-8 w-8 text-amber-500" />,
      color: "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20",
      iconClass: "text-amber-500"
    },
    {
      id: "billing",
      title: "Billing Question",
      description: "Questions about invoices, payments or subscriptions",
      icon: <CheckCircle2 className="h-8 w-8 text-emerald-500" />,
      color: "bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20",
      iconClass: "text-emerald-500"
    },
    {
      id: "general",
      title: "General Inquiry",
      description: "Any other questions or information requests",
      icon: <HelpCircle className="h-8 w-8 text-blue-500" />,
      color: "bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20",
      iconClass: "text-blue-500"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectType = (type: string) => {
    setTicketType(type);
  };

  const handleSelectPriority = (value: string) => {
    setTicketForm(prev => ({ ...prev, priority: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitting ticket:", { ...ticketForm, type: ticketType });
      toast.success("Ticket submitted successfully");
      setLoading(false);
      navigate("/mobile/tickets");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 px-0 pb-6">
      <div className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-md p-4 border-b border-white/10 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mr-2 text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-white">Create New Ticket</h1>
      </div>
      
      <div className="p-4">
        {!ticketType ? (
          <>
            <Card className="mb-6 overflow-hidden border-0 bg-white/10 backdrop-blur-sm shadow-xl">
              <CardContent className="p-4">
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <FileText className="h-16 w-16 text-blue-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2 text-white">Need Help?</h2>
                  <p className="text-blue-200 text-center mb-4">
                    Select a ticket type below to get started
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <h2 className="text-lg font-medium text-white mb-3">Choose Ticket Type</h2>
            
            <div className="space-y-3">
              {ticketTypes.map((type) => (
                <Card 
                  key={type.id}
                  className="overflow-hidden border-0 hover:scale-102 transition-all duration-200 cursor-pointer bg-white/10 backdrop-blur-sm shadow-lg"
                  onClick={() => handleSelectType(type.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-white/10">
                        {type.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">{type.title}</h4>
                        <p className="text-sm text-blue-200">{type.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <p className="text-blue-300 text-sm mt-4 italic">
              Not sure what type of ticket to create? Choose "General Inquiry".
            </p>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Ticket Title</label>
              <Input
                name="title"
                value={ticketForm.title}
                onChange={handleInputChange}
                placeholder="Brief description of your issue"
                required
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Priority</label>
              <Select onValueChange={handleSelectPriority} defaultValue="medium">
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Description</label>
              <Textarea
                name="description"
                value={ticketForm.description}
                onChange={handleInputChange}
                placeholder="Detailed explanation of your issue"
                required
                className="min-h-[120px] bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1 border-white/20 text-white"
                onClick={() => setTicketType(null)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Plus className="mr-1 h-4 w-4" /> Submit Ticket
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MobileNewTicketPage;
