"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";

const InfoProfile = () => {
  const { user } = useAppContext();
  return (
    <div className="text-center mb-8">
      <Image
        alt="Profile picture"
        className="mx-auto mb-4 rounded-full"
        height="128"
        src={
          user?.avatar
            ? user.avatar
            : "https://i.pinimg.com/originals/fd/b7/ba/fdb7ba09d03f20492b24234c6b5a732a.jpg"
        }
        style={{
          aspectRatio: "128/128",
          objectFit: "cover",
        }}
        priority
        width="128"
      />
      <h1 className="text-3xl font-bold">{user?.username}</h1>
      <p className="text-gray-500">@{user?.username}</p>
      <p className="mt-2 text-gray-700">
        {user?.bio || "Creative designer and photography enthusiast"}
      </p>
      <div className="flex justify-center space-x-4 mt-4">
        <div>
          <span className="font-semibold">1.5k</span> followers
        </div>
        <div>
          <span className="font-semibold">843</span> following
        </div>
      </div>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button>Follow</Button>
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button size="icon" variant="outline">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </div>
    </div>
  );
};

export default InfoProfile;
