"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./theme/ModeToggle";
import { cn } from "@/lib/utils";
import { setIsSidebarCollapsed } from "@/app/(state)";
import { useAppDispatch, useAppSelector } from "@/app/(state)/redux";
import { ChevronRight, Search, User } from "lucide-react";

// import Image from "next/image";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <nav
      className={cn(
        "flex justify-between items-center w-full border-b py-5 px-4 md:px-8 max-md:gap-4"
      )}
    >
      {/* left side */}
      <div className="flex justify-between items-center gap-5">
        <Button
          size="icon"
          variant="outline"
          className="flex md:hidden p-3 rounded-lg bg-transparent"
          onClick={toggleSidebar}
        >
          <ChevronRight />
        </Button>

        <div className="relative">
          <Input
            type="text"
            placeholder="Search for products"
            className="w-52 md:w-80 pl-8 md:pl-10 pr-4 placeholder:text-sm text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="size-4" />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex md:justify-between items-center gap-2">
        <ModeToggle />
        <Button
          size="icon"
          variant="outline"
          className="p-3 rounded-lg bg-transparent hidden md:flex"
        >
          <User />
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
