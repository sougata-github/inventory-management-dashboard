"use client";

import { Menu, Search, Settings, User } from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ModeToggle } from "./theme/ModeToggle";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import Image from "next/image";

interface Props {
  isCollapsed: boolean;
}

const Navbar = ({ isCollapsed }: Props) => {
  return (
    <nav
      className={cn(
        "flex justify-between items-center w-full border-b py-4 md:py-5 px-8",
        isCollapsed && "md:pl-24"
      )}
    >
      {/* left side */}
      <div className="flex justify-between items-center gap-5">
        <Button
          size="icon"
          variant="outline"
          className="p-3 rounded-full bg-transparent"
          onClick={() => {}}
        >
          <Menu className="size-4" />
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
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <ModeToggle />

          <Separator className="w-[0.5px] h-7" />

          <div className="flex items-center gap-3 cursor-pointer">
            <User className="size-4" />
            <span className="font-semibold">Sougata.</span>
          </div>
        </div>

        <Link href="/settings">
          <Settings className="size-4 cursor-pointer" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
