"use client";

import { handleListBoardsByUser } from "@/actions/pins";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Board } from "@/types/board";
import { getCookie } from "cookies-next";
import { Pen } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo, useEffect, useState } from "react";

const SavedPinProfile = ({ id }: { id: string }) => {
  const access_token = getCookie("access_token") as string;
  const router = useRouter();
  const { user } = useAppContext();
  const [data, setData] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let isPrivate: boolean | null = false;
      if (!user) return;
      try {
        if (id === user.id) {
          isPrivate = null;
        }
        const res = await handleListBoardsByUser({
          user_id: id,
          isPrivate: isPrivate !== null ? isPrivate.toString() : undefined,
          access_token,
        });
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [access_token, id, user]);

  console.log("saved");

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data &&
        data.map((board) => (
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
  );
};

export default memo(SavedPinProfile);
