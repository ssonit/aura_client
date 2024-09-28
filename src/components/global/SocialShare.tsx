"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Link, MessageCircle, Pin, Share } from "lucide-react";
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
          <DropdownMenuItem
            asChild
            className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer"
          >
            <a
              href={`https://www.pinterest.com/pin/create/button/?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Pin className="h-5 w-5" />
              <span className="sr-only">Share on Pinterest</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer"
          >
            <a
              href={`fb-messenger://share/?link=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Share on Messenger</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="p-2 focus:bg-accent focus:text-accent-foreground cursor-pointer"
          >
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.Facebook className="h-5 w-5 text-white" />
              <span className="sr-only">Share on Facebook</span>
            </a>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
