"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie } from "cookies-next";
import { handleDeleteComment } from "@/actions/comment";

interface CommentMoreButtonProps {
  commentId: string;
  handleRemoveComment: (commentId: string) => void;
}

const CommentMoreButton = ({
  commentId,
  handleRemoveComment,
}: CommentMoreButtonProps) => {
  const access_token = getCookie("access_token") as string;
  const handleDelete = async () => {
    try {
      if (!access_token || !commentId) return;
      await handleDeleteComment({
        commentId,
        access_token,
      });

      handleRemoveComment(commentId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none cursor-pointer">
        <Button
          className="rounded-full bg-transparent hover:bg-foreground border-none w-8 h-8"
          variant="outline"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4 stroke-black fill-black" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit"
        align="end"
        sideOffset={0}
        style={{ zIndex: 1000 }}
      >
        <DropdownMenuItem className="cursor-pointer" onClick={handleDelete}>
          <div className="flex items-center justify-between w-full">
            <div>Delete</div>
            <Trash className="h-4 w-4" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CommentMoreButton;
