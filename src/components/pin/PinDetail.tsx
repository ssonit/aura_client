"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MoreHorizontal, Download } from "lucide-react";
import { Pin } from "@/types/pin";
import { useRouter } from "next/navigation";
import SocialShare from "@/components/global/SocialShare";

const PinDetail = ({ data }: { data: Pin }) => {
  const router = useRouter();
  const handleRedirectToUser = () => {
    router.push(`/profile/${data.user.id}/_saved`);
  };
  return (
    <div className="md:w-1/2">
      <div className="p-3 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-x-4">
            <Button
              className="rounded-full bg-transparent hover:bg-foreground border-none"
              variant={"outline"}
              size={"icon"}
            >
              <Heart className="h-4 w-4 stroke-red-500 fill-red-500" />
            </Button>
            <Button
              className="rounded-full bg-transparent hover:bg-foreground border-none"
              variant="outline"
              size="icon"
            >
              <MoreHorizontal className="h-4 w-4 stroke-black fill-black" />
            </Button>
          </div>
          <SocialShare></SocialShare>
        </div>

        <h1 className="text-3xl font-bold text-muted pointer-events-none">
          {data.title ? data.title : "Beautiful Landscape Photography"}
        </h1>

        <p className="text-muted-foreground">
          {data.description
            ? data.description
            : "Capture the essence of nature with these stunning landscape photography techniques. Learn how to use light, composition, and perspective to create breathtaking images."}
        </p>

        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={handleRedirectToUser}
        >
          <Avatar>
            <AvatarImage src={data.user.avatar} alt="@username" />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-muted">{data.user.username}</p>
            {/* <p className="text-sm text-muted-foreground">1.5k followers</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
