"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft, RotateCcwIcon } from "lucide-react";
import { handleListDeletedBoards, handleRestoreBoard } from "@/actions/pins";
import { getCookie } from "cookies-next";
import { Board } from "@/types/board";
import { useRouter } from "next/navigation";

export default function RestoreBoardPage() {
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleListDeletedBoards(access_token)
      .then((data) => {
        setBoards(data.data ? data.data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to fetch deleted boards. Please try again later.");
        setIsLoading(false);
      });
  }, [access_token]);

  const handleRestore = async (id: string) => {
    try {
      await handleRestoreBoard(id, access_token);
      setBoards(boards.filter((board) => board.id !== id));
      toast({
        title: "Board Restored",
        description: "The board has been successfully restored.",
      });
    } catch (err) {
      toast({
        title: "Restore Failed",
        description: "Failed to restore the board. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-5 mb-4">
          <Button
            variant="white"
            size={"icon"}
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl font-bold mb-4">Restore Boards</h1>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </CardHeader>
              <CardFooter>
                <Skeleton className="h-10 w-[100px]" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-5 mb-4">
          <Button
            variant="white"
            size={"icon"}
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-4xl font-bold mb-4">Restore Boards</h1>
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-5 mb-4">
        <Button
          variant="white"
          size={"icon"}
          onClick={() => router.back()}
          className="flex items-center justify-center rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-4xl font-bold">Restore Boards</h1>
      </div>
      {boards.length === 0 ? (
        <p>No deleted boards to restore.</p>
      ) : (
        <div className="space-y-4">
          {boards.map((board) => (
            <Card key={board.id}>
              <CardHeader>
                <CardTitle>{board.name}</CardTitle>
                <CardDescription>
                  Deleted on: {new Date(board.deleted_at).toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleRestore(board.id)}>
                  <RotateCcwIcon className="mr-2 h-4 w-4" />
                  Restore
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
