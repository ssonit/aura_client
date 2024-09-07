"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

const DropdownProfileBoard = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <>
      {isClient && (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
            <Button size={"icon"} className="rounded-full">
              <Ellipsis></Ellipsis>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-52 border-muted-foreground shadow-xl"
            align="end"
            sideOffset={5}
            style={{ zIndex: 1000 }}
          >
            <DropdownMenuLabel>
              <p className="text-xs font-normal text-muted-foreground">
                {"Board Options"}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Update board
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default DropdownProfileBoard;
