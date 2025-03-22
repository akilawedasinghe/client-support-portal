
import React, { useState } from "react";
import { useNotifications } from "@/context/NotificationContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import { Check, TicketIcon, MessageSquare, AlertCircle, UserCog, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, clearNotification, clearAllNotifications } = useNotifications();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Get icon based on notification category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ticket":
        return <TicketIcon className="h-4 w-4" />;
      case "chat":
        return <MessageSquare className="h-4 w-4" />;
      case "user":
        return <UserCog className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  // Get color based on notification type
  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-emerald-500 text-white";
      case "warning":
        return "bg-amber-500 text-white";
      case "error":
        return "bg-rose-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const filteredNotifications = notifications
    .filter(notification => {
      // Search filter
      const includesSearchTerm = 
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filter === "all" || notification.category === filter;
      
      return includesSearchTerm && matchesCategory;
    });

  const unreadNotifications = filteredNotifications.filter(n => !n.isRead);
  const readNotifications = filteredNotifications.filter(n => n.isRead);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-100 dark:from-slate-900 dark:to-blue-900/30 w-full min-h-screen">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[70%] rounded-full bg-blue-200/40 dark:bg-blue-400/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -left-[20%] w-[70%] h-[70%] rounded-full bg-indigo-200/40 dark:bg-indigo-400/10 blur-3xl"></div>
      </div>
      
      <div className="w-full py-6 px-4 relative z-10 animate-fade-in">
        <div className="flex flex-col mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-4">
            Notifications
          </h1>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={!unreadNotifications.length}
              className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-md"
            >
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearAllNotifications}
              disabled={!notifications.length}
              className="rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-md"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear all
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden border-0 bg-white/80 dark:bg-slate-800/70 backdrop-blur-sm shadow-lg rounded-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 mb-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-white/90 dark:bg-slate-900/90 rounded-full border-0 shadow-inner"
                />
              </div>
              <Select 
                value={filter} 
                onValueChange={setFilter}
              >
                <SelectTrigger className="w-full rounded-full bg-white/90 dark:bg-slate-900/90 border-0 shadow-inner">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="rounded-lg bg-white dark:bg-slate-900 border-0 shadow-xl">
                  <SelectItem value="all">All categories</SelectItem>
                  <SelectItem value="ticket">Tickets</SelectItem>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100/80 dark:bg-slate-900/80 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full">
                  All
                  <Badge className="ml-2" variant="secondary">{filteredNotifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="rounded-full">
                  Unread
                  <Badge className="ml-2" variant="secondary">{unreadNotifications.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="read" className="rounded-full">
                  Read
                  <Badge className="ml-2" variant="secondary">{readNotifications.length}</Badge>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                {renderNotificationList(filteredNotifications)}
              </TabsContent>
              
              <TabsContent value="unread" className="mt-4">
                {renderNotificationList(unreadNotifications)}
              </TabsContent>
              
              <TabsContent value="read" className="mt-4">
                {renderNotificationList(readNotifications)}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
  
  function renderNotificationList(notifications) {
    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <AlertCircle className="h-10 w-10 text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-center">No notifications found</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-3 rounded-xl border-0 ${!notification.isRead ? 'bg-blue-50/80 dark:bg-blue-900/30' : 'bg-white/50 dark:bg-slate-800/50'} shadow-sm backdrop-blur-sm animate-fade-in`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getTypeColor(notification.type)}`}>
                {getCategoryIcon(notification.category)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-medium text-sm">{notification.title}</h3>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                  {!notification.isRead && (
                    <Badge variant="outline" className="bg-primary/10 text-primary text-[10px] rounded-full px-2">
                      New
                    </Badge>
                  )}
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">
                  {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {notification.linkTo && (
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => {
                        markAsRead(notification.id);
                        navigate(notification.linkTo || "/");
                      }}
                      className="text-xs h-7 rounded-full px-3 bg-blue-100 dark:bg-blue-900/40 hover:bg-blue-200 dark:hover:bg-blue-800/60 text-blue-700 dark:text-blue-300"
                    >
                      View details
                    </Button>
                  )}
                  {!notification.isRead && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => markAsRead(notification.id)}
                      className="text-xs h-7 rounded-full px-3 bg-white/80 dark:bg-slate-800/80"
                    >
                      Mark read
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => clearNotification(notification.id)}
                    className="text-xs h-7 rounded-full"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
};

export default NotificationsPage;
