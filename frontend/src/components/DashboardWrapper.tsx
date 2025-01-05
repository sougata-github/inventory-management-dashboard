"use client";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StoreProvider from "@/app/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <main className="w-full h-full">
        <Navbar />
        <div className="px-8 py-4 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
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
