import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { Sidebar } from "../components/layout/Sidebar";
import { MobileHeader } from "../components/layout/MobileHeader";
import { SOSButton } from "../components/layout/SOSButton";
import { useMediaQuery } from "../hooks/useMediaQuery";

export function DashboardLayout() {
  const isDesktop = useMediaQuery("(min-width: 992px)");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isDesktop) setSidebarOpen(false);
  }, [isDesktop]);

  return (
    <div className="sr-page">
      <div className="sr-particles" />
      <div className="sr-content">
        {!isDesktop && <MobileHeader onMenu={() => setSidebarOpen(true)} />}
        <Sidebar open={sidebarOpen} permanent={isDesktop} onClose={() => setSidebarOpen(false)} />
        <main className="sr-main">
          <Outlet />
        </main>
        <SOSButton />
      </div>
    </div>
  );
}

