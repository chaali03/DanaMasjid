import { ReactNode } from "react";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { useAccessibility } from "@/app/(main)/dashboard-admin/contexts/accessibility-context";
import { AccessibilityPanel } from "@/app/(main)/dashboard-admin/components/accessibility-panel";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";

interface LayoutContentProps {
  children?: ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { settings } = useAccessibility();

  // Calculate margin based on navigation position
  const getContentMargin = () => {
    // If top/bottom navbar, no margin needed
    if (settings.navigationPosition === "top-navbar" || settings.navigationPosition === "bottom-navbar") {
      return "ml-0";
    }
    
    // If sidebar right, use margin-right instead
    if (settings.navigationPosition === "sidebar-right") {
      const margin = isExpanded || isHovered ? "lg:mr-[290px]" : "lg:mr-[90px]";
      return `${margin} ${isMobileOpen ? "mr-0" : ""}`;
    }
    
    // Default sidebar left
    const margin = isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]";
    return `${margin} ${isMobileOpen ? "ml-0" : ""}`;
  };

  // Add bottom padding for bottom navbar
  const getContentPadding = () => {
    if (settings.navigationPosition === "bottom-navbar") {
      return "pb-20";
    }
    return "";
  };

  return (
    <div className="min-h-screen xl:flex bg-gray-50 dark:bg-gray-950">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all ease-in-out ${getContentMargin()} ${getContentPadding()}
          duration-150 lg:duration-300 will-change-[margin]`}
        style={{ transform: 'translateZ(0)' }}
      >
        <AppHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <LayoutContent>{children}</LayoutContent>
      <AccessibilityPanel />
    </SidebarProvider>
  );
};

export default AppLayout;
