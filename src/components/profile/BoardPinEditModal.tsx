"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { useEffect, useState } from "react";
import { Board } from "@/types/board";
import {
  handleListBoardsByUser,
  handleSaveBoardPin,
  handleUnSaveBoardPin,
} from "@/actions/pins";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { BoardType } from "@/constants";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

interface BoardPinEditModalProps {
  boardId: string;
}

const BoardPinEditModal = ({ boardId }: BoardPinEditModalProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const { isModalBoardPinEdit, handleModalBoardPinEdit, user } =
    useAppContext();

  const [selectedBoard, setSelectedBoard] = useState<string>(() => boardId);

  const [boards, setBoards] = useState<Board[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    handleModalBoardPinEdit({
      boardPinId: "",
      url: "",
      pinId: "",
      user_id_pin: "",
    });
  };

  const handleSave = async () => {
    if (selectedBoard) {
      try {
        await handleSaveBoardPin({
          board_id: selectedBoard,
          pin_id: isModalBoardPinEdit.pinId,
          access_token,
        });
        toast({
          title: "Saved",
        });
        router.refresh();
      } catch (error) {
        console.error("Failed to save pin to board", error);
      }

      handleCancel();
      setSelectedBoard(boardId);
    }
  };

  const handleUnSave = async () => {
    try {
      await handleUnSaveBoardPin({
        board_pin_id: isModalBoardPinEdit.boardPinId,
        pin_id: isModalBoardPinEdit.pinId,
        access_token,
      });
      toast({
        title: "Unsaved",
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    handleCancel();
    setSelectedBoard(boardId);
  };

  useEffect(() => {
    async function fetchBoards() {
      setIsLoading(true);
      try {
        const response = await handleListBoardsByUser({
          user_id: user?.id,
          isPrivate: "true",
          access_token,
        });
        if (response.data) {
          setBoards(
            response.data.filter((board) => board.type !== BoardType.AllPins)
          );
        }
      } catch (error) {
        console.error("Failed to fetch boards", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isModalBoardPinEdit) {
      fetchBoards();
    }
  }, [access_token, isModalBoardPinEdit, user?.id]);

  return (
    <Dialog
      open={Boolean(isModalBoardPinEdit.boardPinId)}
      onOpenChange={(open) => {
        if (!open) handleCancel();
      }}
    >
      <DialogContent color="white" className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Edit Pin</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 space-y-4">
          <div className="w-2/3 flex items-center">
            <Label htmlFor="type" className="text-right mr-8">
              Board
            </Label>
            <Select
              value={selectedBoard}
              onValueChange={(value) => {
                setSelectedBoard(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem key={board.id} value={board.id}>
                    {board.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-1/3 rounded-xl">
            <Image
              src={isModalBoardPinEdit.url}
              alt={isModalBoardPinEdit.boardPinId}
              width={600}
              height={800}
              className="rounded-xl w-full h-[300px] object-cover"
              sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
              quality={75}
              loading="lazy"
            ></Image>
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          {isModalBoardPinEdit.user_id_pin &&
          user?.id !== isModalBoardPinEdit.user_id_pin ? (
            <Button variant="destructive" onClick={handleUnSave}>
              Delete
            </Button>
          ) : null}
          <div className="ml-auto">
            <Button variant="outline" className="mr-2" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BoardPinEditModal;
