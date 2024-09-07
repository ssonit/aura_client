"use client";

import { handleGetUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { User } from "@/types/auth";
import { getCookie } from "cookies-next";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const InfoProfile = ({ id }: { id: string }) => {
  const access_token = getCookie("access_token") as string;
  const { user } = useAppContext();
  const isProfile = useMemo(() => user?.id === id, [id, user]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      if (isProfile) {
        setCurrentUser(user);
      } else {
        try {
          if (!access_token) return;
          const res = await handleGetUser(id, access_token);
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchUser();
  }, [access_token, id, isProfile, user]);

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
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant={"white"}>Edit profile</Button>
      </div>
    </div>
  );
};

export default InfoProfile;
