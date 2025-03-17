import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Ticket, User } from "@/lib/auth-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TicketDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, getAllUsers } = useAuth();
  const { toast } = useToast();

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [priority, setPriority] = useState("medium");
  const [assignedAgent, setAssignedAgent] = useState("");
  const [supportAgents, setSupportAgents] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock function to simulate fetching ticket data
  const fetchTicket = async (ticketId: string) => {
    // Replace this with your actual API call
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    const mockTicket: Ticket = {
      id: ticketId,
      title: "Sample Ticket",
      description: "This is a sample ticket description.",
      status: "open",
      priority: "medium",
      reporter: "client@example.com",
      assignedAgent: "support@example.com",
      createdAt: new Date().toISOString(),
    };
    return mockTicket;
  };

  useEffect(() => {
    const loadTicket = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const fetchedTicket = await fetchTicket(id);
          setTicket(fetchedTicket);
          setTitle(fetchedTicket.title);
          setDescription(fetchedTicket.description);
          setStatus(fetchedTicket.status);
          setPriority(fetchedTicket.priority);
          setAssignedAgent(fetchedTicket.assignedAgent || "");
        } catch (error) {
          toast({
            title: "Error fetching ticket",
            description: (error as Error).message,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadTicket();
  }, [id, toast]);

  // Get users for assignments
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUsers();
        // Now that we have the array, we can filter it
        const supportUsers = allUsers.filter(user => user.role === 'support');
        setSupportAgents(supportUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (ticket) {
      fetchUsers();
    }
  }, [ticket, getAllUsers]);

  const handleUpdateTicket = async () => {
    setIsLoading(true);
    try {
      // Simulate API call to update ticket
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update local state
      setTicket({
        ...ticket!,
        title,
        description,
        status,
        priority,
        assignedAgent,
      });

      toast({
        title: "Ticket updated",
        description: "Ticket details have been updated successfully.",
      });
      navigate("/dashboard/support");
    } catch (error) {
      toast({
        title: "Error updating ticket",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !ticket) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 h-full w-full animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <div className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)] animate-spin rounded-full border-4 border-blue-400 border-b-transparent" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
          </div>
          <p className="text-sm font-medium text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Ticket Details</CardTitle>
          <CardDescription>
            View and update details for ticket #{ticket.id}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                Title
              </label>
              <Input
                type="text"
                placeholder="Ticket Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                Description
              </label>
              <Textarea
                placeholder="Detailed description of the issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                  Priority
                </label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed">
                Assign Agent
              </label>
              <Select value={assignedAgent} onValueChange={setAssignedAgent}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {supportAgents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.email}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleUpdateTicket} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Ticket"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TicketDetailPage;
