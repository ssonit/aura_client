"use client";

import { handleListBoardsByUser } from "@/actions/pins";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Board } from "@/types/board";
import { getCookie } from "cookies-next";
import { LockKeyhole, Pen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const SavedPinProfile = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(true);
  const access_token = getCookie("access_token") as string;
  const router = useRouter();
  const { user } = useAppContext();
  const [data, setData] = useState<Board[]>([]);
  const isProfile = useMemo(() => id === user?.id, [id, user]);

  const handleRedirectToRestoreBoard = () => {
    router.push(`/profile/${id}/board/restore`);
  };

  useEffect(() => {
    const fetchData = async () => {
      let isPrivate: boolean = false;
      if (!user) return;
      try {
        if (isProfile) {
          isPrivate = true;
        }

        setIsLoading(true);
        const res = await handleListBoardsByUser({
          user_id: id,
          isPrivate: isPrivate ? "true" : "false",
          access_token,
        });
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [access_token, id, isProfile, user]);

  if (isLoading)
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="relative overflow-hidden">
            <Skeleton className="w-full h-[168px] mb-1 rounded-lg"></Skeleton>
            <Skeleton className="w-full h-10 rounded-lg"></Skeleton>
          </div>
        ))}
      </div>
    );

  return (
    <>
      {data.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((board) => (
            <div
              key={board.id}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => {
                router.push(`/profile/${id}/board/${board.id}`);
              }}
            >
              <div className="relative">
                <AspectRatio ratio={4 / 3}>
                  <Image
                    alt={board.id}
                    className="object-cover transition-transform rounded-lg"
                    fill
                    src={"/assets/E9E9E9.jpg"}
                    sizes="(max-width: 50px) 2vw, (max-width: 425px) 50vw, 75vw"
                  />
                </AspectRatio>
                {board.isPrivate && (
                  <Button
                    className="absolute top-2 right-2 z-30 transition-opacity hover:bg-transparent rounded-full"
                    size="icon"
                    variant="ghost"
                  >
                    <LockKeyhole className="w-4 h-4 stroke-muted"></LockKeyhole>
                  </Button>
                )}
                <Button
                  className="absolute bottom-2 right-2 opacity-0 z-30 group-hover:opacity-100 transition-opacity rounded-full"
                  size="icon"
                  variant="secondary"
                >
                  <Pen className="w-4 h-4"></Pen>
                </Button>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />

              <div className="text-foreground">
                <h2 className="text-2xl font-semibold py-1">{board.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {data.length === 0 && !isLoading ? (
        <div className="flex items-center justify-center mt-4">
          <p className="text-muted-foreground">
            {isProfile ? "You" : "This user"} have not saved any boards yet.
          </p>
        </div>
      ) : null}
      <Separator className="my-10" />
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl text-muted-foreground">
            Recently deleted boards
          </h2>
          <p className="text-sm">
            Boards, including their Pins, will be permanently deleted after 7
            days.
          </p>
        </div>
        <Button onClick={handleRedirectToRestoreBoard}>Restore Boards</Button>
      </div>
    </>
  );
};

export default memo(SavedPinProfile);
