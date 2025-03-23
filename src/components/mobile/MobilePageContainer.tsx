
import React from "react";

interface MobilePageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function MobilePageContainer({ children, className }: MobilePageContainerProps) {
  return (
    <div className={`w-full min-h-screen pl-[70px] pb-20 ${className || ""}`}>
      <div className="container py-4 px-4 max-w-full">
        {children}
      </div>
    </div>
  );
}

export default MobilePageContainer;
