"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Plus, RotateCcw } from "lucide-react";
import { Board } from "@/types/board";
import { handleListBoardsByUser, handleSaveBoardPin } from "@/actions/pins";
import { useAppContext } from "@/contexts/app-provider";
import { getCookie } from "cookies-next";
import { BoardType } from "@/constants";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function SaveBoardPin({ pinId }: { pinId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, handleModalOpen } = useAppContext();

  async function fetchBoards() {
    setIsLoading(true);
    try {
      const response = await handleListBoardsByUser({
        user_id: user?.id,
        isPrivate: "true",
        access_token,
      });
      setBoards(
        response.data.filter((board) => board.type !== BoardType.AllPins)
      );
    } catch (error) {
      console.error("Failed to fetch boards", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, access_token]);

  const handleReloadBoards = () => {
    fetchBoards();
  };

  const handleSave = async () => {
    if (selectedBoard) {
      try {
        await handleSaveBoardPin({
          board_id: selectedBoard,
          pin_id: pinId,
          access_token,
        });
        toast({
          title: "Saved",
        });
        router.refresh();
      } catch (error) {
        console.error("Failed to save pin to board", error);
      }

      setIsOpen(false);
      setSelectedBoard(null);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Save</Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold leading-none text-center text-2xl">
              Save
            </h3>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={handleReloadBoards}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-72 rounded-md">
            <div className="space-y-1">
              {boards.map((board) => (
                <div
                  key={board.id}
                  className={`flex items-center space-x-4 rounded-md p-2 transition-colors cursor-pointer hover:bg-muted ${
                    selectedBoard === board.id ? "bg-muted" : ""
                  }`}
                  onClick={() => setSelectedBoard(board.id)}
                >
                  <div className="w-12 h-12 bg-muted-foreground rounded-xl"></div>
                  <span className="flex-1 text-sm font-medium">
                    {board.name}
                  </span>
                  {selectedBoard === board.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="w-[49%]"
              onClick={() => handleModalOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Board
            </Button>
            <Button
              size="sm"
              className="w-[49%]"
              onClick={handleSave}
              disabled={!selectedBoard && isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
