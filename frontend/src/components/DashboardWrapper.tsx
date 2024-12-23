import { cn } from "@/lib/utils";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={cn("flex w-full min-h-screen")}>
      <Sidebar />
      <main className="flex flex-col w-full h-full py-7 px-9 md:pl-24">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
