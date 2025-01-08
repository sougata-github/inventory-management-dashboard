import DashboardWrapper from "@/components/DashboardWrapper";
import { Toaster } from "sonner";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardWrapper>
      {children}
      <Toaster />
    </DashboardWrapper>
  );
}
