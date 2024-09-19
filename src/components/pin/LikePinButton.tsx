"use client";

import { handleLikePin, handleUnlikePin } from "@/actions/pins";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LikePinButton = ({ like, pinId }: { like: boolean; pinId: string }) => {
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [isLiked, setIsLiked] = useState(() => like);
  const [isLoading, setIsLoading] = useState(false);

  const handleLikeToggle = async () => {
    try {
      setIsLoading(true);
      if (isLiked) {
        await handleUnlikePin({
          pin_id: pinId,
          access_token: access_token,
        });
        setIsLiked(false);
      } else {
        await handleLikePin({
          pin_id: pinId,
          access_token: access_token,
        });
        setIsLiked(true);
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Button
      className="rounded-full bg-transparent hover:bg-foreground border-none"
      variant={"outline"}
      size={"icon"}
      onClick={handleLikeToggle}
      disabled={isLoading}
    >
      <Heart
        className={cn("w-4 h-4", {
          "stroke-red-500 fill-red-500": isLiked,
          "stroke-black": !isLiked,
        })}
      />
    </Button>
  );
};

export default LikePinButton;
