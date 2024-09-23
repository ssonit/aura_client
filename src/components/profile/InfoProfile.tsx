"use client";

import { handleGetUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import { User } from "@/types/auth";
import { getCookie } from "cookies-next";
import { Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InfoProfile = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const access_token = getCookie("access_token") as string;
  const { user } = useAppContext();
  const router = useRouter();
  const isProfile = useMemo(() => user?.id === id, [id, user]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRedirectToEditProfile = () => {
    router.push(`/profile/${id}/edit`);
  };

  useEffect(() => {
    async function fetchUser() {
      if (isProfile && user) {
        setCurrentUser(user);
      } else {
        try {
          setIsLoading(true);
          const res = await handleGetUser(id, access_token);
          if (res.data) {
            setCurrentUser(res.data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    }
    fetchUser();
  }, [access_token, id, isProfile, user]);

  console.log({ isLoading, currentUser });

  if (!currentUser || isLoading)
    return (
      <div className="text-center mb-8">
        <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
        <Skeleton className="h-6 w-60 rounded-full mx-auto" />
        <Skeleton className="h-4 w-60 rounded-full mt-2 mx-auto" />
        <Skeleton className="h-4 w-60 rounded-full mt-2 mx-auto"></Skeleton>
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Skeleton className="h-9 w-24 rounded-md"></Skeleton>
          <Skeleton className="h-9 w-24 rounded-md"></Skeleton>
        </div>
      </div>
    );

  return (
    <div className="text-center mb-8">
      <Image
        alt="Profile picture"
        className="mx-auto mb-4 rounded-full"
        height="128"
        src={currentUser.avatar.url}
        style={{
          aspectRatio: "128/128",
          objectFit: "cover",
        }}
        priority
        width="128"
      />
      <h1 className="text-3xl font-bold">{currentUser.username}</h1>
      <p className="text-gray-500">@{currentUser.username}</p>
      <p className="mt-2 text-gray-700">
        {currentUser.bio || "Creative designer and photography enthusiast"}
      </p>
      {currentUser.website && (
        <Link href={currentUser.website} className="my-4 block text-blue-700">
          {currentUser.website}
        </Link>
      )}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Button variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        {isProfile && (
          <Button onClick={handleRedirectToEditProfile}>Edit Profile</Button>
        )}
      </div>
    </div>
  );
};

export default InfoProfile;
