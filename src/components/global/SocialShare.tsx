"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Link, MessageCircle, Share } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Icons from "./icons";

const SocialShare = () => {
  const { toast } = useToast();
  const handleCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Button
          className="rounded-full bg-transparent hover:bg-foreground border-none"
          variant="outline"
          size="icon"
        >
          <Share className="h-4 w-4 stroke-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit p-2"
        align="end"
        sideOffset={5}
        style={{ zIndex: 1000 }}
      >
        <div className="flex space-x-2">
          <DropdownMenuItem
            className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer"
            onClick={handleCopyURL}
          >
            <Link className="h-5 w-5" />
            <span className="sr-only">Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer">
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Share on Messenger</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer">
            <Icons.Facebook className="h-5 w-5 text-white" />
            <span className="sr-only">Share on Facebook</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
