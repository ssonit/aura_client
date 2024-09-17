"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import { useAppContext } from "@/contexts/app-provider";
import { getCookie } from "cookies-next";
import { handleSoftDeleteBoard } from "@/actions/pins";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface DeleteBoardModalProps {
  boardId: string;
  boardName: string;
}

const ConfirmDeleteBoardModal = ({
  boardName,
  boardId,
}: DeleteBoardModalProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const access_token = getCookie("access_token") as string;
  const {
    isModalConfirmDeleteBoard,
    handleModalConfirmDeleteBoard,
    handleModalUpdateBoard,
    user,
  } = useAppContext();

  const handleDelete = async () => {
    if (!user || !access_token) return;
    try {
      await handleSoftDeleteBoard(boardId, access_token);
      toast({
        title: "Board deleted",
        description: "You can restore this board within 7 days.",
      });
      router.push(`/profile/${user.id}/_saved`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    handleModalConfirmDeleteBoard(false);
    handleModalUpdateBoard(false);
  };

  return (
    <Dialog
      open={isModalConfirmDeleteBoard}
      onOpenChange={handleModalConfirmDeleteBoard}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the board{" "}
            <span className="font-bold text-lg text-muted-foreground">
              {boardName}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => handleModalConfirmDeleteBoard(false)}
          >
            Cancel
          </Button>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Delete Board
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteBoardModal;
