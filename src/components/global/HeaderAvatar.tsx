"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app-provider";

const HeaderAvatar = () => {
  const router = useRouter();
  const { user } = useAppContext();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.avatar} alt={user.id} />
          <AvatarFallback>
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 "
        align="end"
        sideOffset={5}
        style={{ zIndex: 1000 }}
      >
        <div className="flex items-center p-2">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarImage src={user.avatar} alt={user.id} />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p className="text-xs leading-none text-muted-foreground">
              @{user.username}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <p className="text-xs font-normal text-muted-foreground">
            {user.email}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/${user.id}`)}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600 p-0">
          <LogoutButton></LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderAvatar;
