"use client";

import StoreProvider, { useAppSelector } from "@/app/(state)/redux";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <main className="w-full h-full">
        <Navbar isCollapsed={isSidebarCollapsed} />

        <div className="px-8 py-4">{children}</div>
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
