"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal } from "lucide-react";
import { Pin } from "@/types/pin";
import { useRouter } from "next/navigation";
import SocialShare from "@/components/global/SocialShare";
import SaveBoardPin from "./SaveBoardPin";
import LikePinButton from "./LikePinButton";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { handleListComments } from "@/actions/comment";

const PinDetail = ({ data }: { data: Pin }) => {
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleRedirectToUser = () => {
    router.push(`/profile/${data.user.id}/_saved`);
  };

  const handleAddComment = (comment: Comment) => {
    setComments((prev) => [comment, ...prev]);
  };

  const handleRemoveComment = (commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  useEffect(() => {
    async function fetchListComments() {
      try {
        setIsLoading(true);
        const res = await handleListComments({
          pinId: data.id,
          page: 1,
          limit: 10,
          access_token,
        });
        if (res.data) {
          setComments(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchListComments();
  }, [access_token, data.id]);

  return (
    <div className="md:w-1/2">
      <div className="flex flex-col h-full">
        <div className="p-3 space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-x-4">
              <LikePinButton
                like={data.isLiked}
                pinId={data.id}
              ></LikePinButton>
              <Button
                className="rounded-full bg-transparent hover:bg-foreground border-none"
                variant="outline"
                size="icon"
              >
                <MoreHorizontal className="h-4 w-4 stroke-black fill-black" />
              </Button>
              <SocialShare></SocialShare>
            </div>
            <SaveBoardPin pinId={data.id}></SaveBoardPin>
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
              <AvatarImage src={data.user.avatar.url} alt="@username" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-muted">{data.user.username}</p>
            </div>
          </div>
        </div>
        {comments.length > 0 ? (
          <CommentList
            comments={comments}
            handleRemoveComment={handleRemoveComment}
          ></CommentList>
        ) : null}
        <CommentInput
          handleAddComment={handleAddComment}
          pinId={data.id}
        ></CommentInput>
      </div>
    </div>
  );
};

export default PinDetail;
