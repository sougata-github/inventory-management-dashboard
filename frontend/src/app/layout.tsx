import "./globals.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import DashboardWrapper from "@/components/DashboardWrapper";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventory",
  description: "Inventory management app built using Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(geistSans.className, "antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DashboardWrapper>
            {children}
            <Toaster />
          </DashboardWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
