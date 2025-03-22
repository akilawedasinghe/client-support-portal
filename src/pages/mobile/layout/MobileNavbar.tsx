
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export const MobileNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 w-full h-14 flex items-center justify-between px-3 bg-gradient-to-r from-blue-900/90 to-sky-900/90 backdrop-blur-md border-b border-blue-800/30 shadow-sm">
      <div className="flex items-center">
        <img
          src="/lovable-uploads/ad5f4ca3-93c0-436d-bbf3-b60ca083ed67.png"
          alt="Symetrix Logo"
          className="h-8 w-8 mr-2"
        />
        <span className="text-sm font-semibold text-white">symetrix360</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-blue-100 hover:text-white hover:bg-blue-800/50"
          onClick={() => navigate('/mobile/notifications')}
        >
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-blue-100 hover:text-white hover:bg-blue-800/50 rounded-full"
          onClick={() => navigate('/mobile/profile')}
        >
          <Avatar className="h-7 w-7">
            <AvatarFallback className="bg-blue-600/20 text-blue-100 text-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
};
