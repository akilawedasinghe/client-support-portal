
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: ('admin' | 'client' | 'support')[];
  redirectPath?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectPath = '/login',
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have the required role, redirect
  if (allowedRoles && allowedRoles.length > 0 && user) {
    if (!allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      let rolePath = '/dashboard/client';
      if (user.role === 'admin') {
        rolePath = '/dashboard/admin';
      } else if (user.role === 'support') {
        rolePath = '/dashboard/support';
      }
      
      return <Navigate to={rolePath} replace />;
    }
  }

  // If authenticated and has the required role, render the children
  return <Outlet />;
}; 
