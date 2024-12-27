"use client";

import { Box, Menu } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: Props) => {
  return (
    <aside className="border-l border px-4">
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-4 md:pt-5">
        <div>
          <Box className="size-5" />
        </div>
        <h1 className="font-bold text-lg">stock.inc</h1>
        <Button
          variant="outline"
          size="icon"
          className="p-2 bg-transparent rounded-full"
          onClick={() => {}}
        >
          <Menu className="size-4" />
        </Button>
      </div>

      {/* links */}
      <div className="flex-grow mt-8"></div>

      {/* footer */}
      <div>
        <p className="text-center text-xs text-muted-foreground">
          &copy; | 2024 Stock.inc
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
