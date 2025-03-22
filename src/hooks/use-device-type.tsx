
import { useState, useEffect } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

// Device breakpoints
const MOBILE_BREAKPOINT = 640;  // Under 640px is mobile
const TABLET_BREAKPOINT = 1024; // Between 640px and 1024px is tablet

export function useDeviceType(): {
  deviceType: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      
      if (width < MOBILE_BREAKPOINT) {
        setDeviceType("mobile");
      } else if (width < TABLET_BREAKPOINT) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    // Check on mount
    checkDeviceType();
    
    // Add resize listener with throttling for better performance
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(checkDeviceType, 100);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return {
    deviceType,
    isMobile: deviceType === "mobile",
    isTablet: deviceType === "tablet",
    isDesktop: deviceType === "desktop"
  };
}

// Helper function to detect if the user is on a touch device
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);
  
  useEffect(() => {
    const detectTouch = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as any).msMaxTouchPoints > 0
      );
    };
    
    setIsTouch(detectTouch());
  }, []);
  
  return isTouch;
}

// Combine device type and touch detection for complete device context
export function useDeviceContext() {
  const { deviceType, isMobile, isTablet, isDesktop } = useDeviceType();
  const isTouch = useIsTouchDevice();
  
  return {
    deviceType,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    // Convenience properties
    shouldShowMobileSite: isMobile || (isTablet && isTouch),
    shouldUseDesktopLayout: isDesktop || (isTablet && !isTouch)
  };
}
