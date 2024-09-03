"use client";

import { handleListBoardsByUser } from "@/actions/pins";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Board } from "@/types/board";
import { getCookie } from "cookies-next";
import { Pen } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const CurrentUserProfile = () => {
  const access_token = getCookie("access_token") as string;
  const [data, setData] = useState<Board[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!access_token) return;
        const res = await handleListBoardsByUser(access_token);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [access_token]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {data &&
        data.map((board) => (
          <div
            key={board.id}
            className="relative overflow-hidden group cursor-pointer"
          >
            <div className="relative">
              <AspectRatio ratio={4 / 3}>
                <Image
                  alt={board.id}
                  className="object-cover transition-transform rounded-lg"
                  fill
                  src={"/assets/E9E9E9.jpg"}
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

export default CurrentUserProfile;
