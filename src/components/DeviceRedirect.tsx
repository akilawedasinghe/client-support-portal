
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDeviceContext } from '@/hooks/use-device-type';

type DeviceRedirectProps = {
  // Optional props if needed
};

export const DeviceRedirect: React.FC<DeviceRedirectProps> = () => {
  const { shouldShowMobileSite } = useDeviceContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Don't redirect if already on the correct path type
    const isOnMobilePath = currentPath.startsWith('/mobile');
    const isOnDesktopPath = !isOnMobilePath;
    
    if (shouldShowMobileSite && isOnDesktopPath) {
      // Convert desktop path to mobile path
      let mobilePath = '/mobile';
      
      if (currentPath === '/') {
        // Special case for root
        mobilePath = '/mobile';
      } else if (currentPath.startsWith('/dashboard/')) {
        // Handle dashboard routes
        const dashboardType = currentPath.split('/')[2]; // Extract admin/client/support
        mobilePath = `/mobile/dashboard/${dashboardType}`;
      } else {
        // Handle other routes
        mobilePath = `/mobile${currentPath}`;
      }
      
      console.log(`Redirecting to mobile version: ${mobilePath}`);
      navigate(mobilePath, { replace: true });
    } else if (!shouldShowMobileSite && isOnMobilePath) {
      // Convert mobile path to desktop path
      let desktopPath = '/';
      
      if (currentPath === '/mobile' || currentPath === '/mobile/') {
        // Special case for mobile root
        desktopPath = '/';
      } else if (currentPath.startsWith('/mobile/dashboard/')) {
        // Handle dashboard routes
        const dashboardType = currentPath.split('/')[3]; // Extract admin/client/support
        desktopPath = `/dashboard/${dashboardType}`;
      } else {
        // Handle other routes by removing '/mobile' prefix
        desktopPath = currentPath.replace('/mobile', '');
      }
      
      console.log(`Redirecting to desktop version: ${desktopPath}`);
      navigate(desktopPath, { replace: true });
    }
  }, [shouldShowMobileSite, location.pathname, navigate]);
  
  // This component doesn't render anything visible
  return null;
};

export default DeviceRedirect;
