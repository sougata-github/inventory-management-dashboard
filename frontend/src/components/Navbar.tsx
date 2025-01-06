"use client";

import { Button } from "./ui/button";
import { ModeToggle } from "./theme/ModeToggle";
import { setIsSidebarCollapsed } from "@/state";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { ChevronRight, ChevronsUpDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <span className="font-medium">Admin</span>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ml-2" align="end">
        <DropdownMenuItem asChild>
          <Link href="/users" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Users</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return (
    <nav className="flex justify-between items-center w-full border-b py-5 px-4 md:px-8 max-md:gap-4">
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

        <UserMenu />
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
