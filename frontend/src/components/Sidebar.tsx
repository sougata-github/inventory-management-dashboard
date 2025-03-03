"use client";

import { ChevronRight, LucideIcon, Settings } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center p-2 rounded-md",
        isActive &&
          !isCollapsed &&
          "bg-muted-foreground/10 transition-colors duration-300",
        isCollapsed && "justify-center"
      )}
    >
      <button
        className={cn(
          "flex items-center rounded-sm p-1 gap-4",
          isActive && isCollapsed && "bg-muted-foreground/10"
        )}
      >
        <Icon className="size-4" />
        <span className={cn("text-sm", isCollapsed && "hidden")}>{label}</span>
      </button>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  // add this to globals.css:
  // @layer utilities{
  //   .hide-scrollbar{
  //     display:none;
  //   }
  // }

  return (
    <aside
      className={cn(
        "bg-background fixed h-screen md:sticky md:top-0 md:bottom-0 md:left-0 flex flex-col border-l border transition-all duration-300 shadow max-md:z-40 py-5 overflow-y-auto hide-scrollbar",
        isSidebarCollapsed ? "w-0 md:w-16 px-0 md:px-4" : "w-72 md:w-64 px-4"
      )}
    >
      {/* sidebar header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            "font-semibold text-lg",
            isSidebarCollapsed && "hidden"
          )}
        >
          Inventory
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

      {/*sidebar links */}
      <div className="mt-16">
        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link) => (
            <SidebarLinks
              key={link.label}
              {...link}
              isCollapsed={isSidebarCollapsed}
            />
          ))}
        </ul>
      </div>

      {/*sidebar footer */}
      <footer className="mt-auto">
        <Link
          href="/settings"
          className={cn(
            "flex items-center p-2 rounded-md",
            isSidebarCollapsed && "justify-center"
          )}
        >
          <button className="flex items-center rounded-sm p-1 gap-4">
            <Settings className="size-4" />
            <span className={cn("text-sm", isSidebarCollapsed && "hidden")}>
              Settings
            </span>
          </button>
        </Link>
      </footer>
    </aside>
  );
};

export default Sidebar;
