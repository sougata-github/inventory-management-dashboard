"use client";

import { Box, ChevronRight, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/(state)/redux";
import { setIsSidebarCollapsed } from "@/app/(state)";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <aside
      className={cn(
        "bg-background fixed md:sticky flex flex-col border-l border transition-all duration-300 overflow-hidden h-full md:min-h-screen shadow z-40 py-5",
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64",
        isSidebarCollapsed ? "px-0 md:px-4" : "px-4"
      )}
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-semibold text-lg",
            isSidebarCollapsed && "hidden"
          )}
        >
          stock.inc
        </Link>

        <button
          className={cn(
            "items-center justify-center rounded-sm p-1 border",
            isSidebarCollapsed && "hidden md:flex"
          )}
          onClick={toggleSidebar}
        >
          <ChevronRight
            className={cn(
              "size-4 font-normal",
              !isSidebarCollapsed && "rotate-180"
            )}
          />
        </button>
      </div>

      <div className="flex items-center px-0.5 py-4">
        <Link
          href="/"
          className={cn(isSidebarCollapsed ? "hidden md:block" : "hidden")}
        >
          <Box className="size-5" />
        </Link>
      </div>

      {/* links */}
      <div className="flex-grow mt-8"></div>

      {/* footer */}
      <Link href="/settings" className="flex items-center gap-4">
        <button className="flex items-center rounded-sm p-1 border">
          <Settings className="size-4" />
        </button>
        <p className={cn("text-sm", isSidebarCollapsed && "hidden")}>
          Settings
        </p>
      </Link>
    </aside>
  );
};

export default Sidebar;
