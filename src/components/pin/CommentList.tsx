"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/helpers";
import CommentMoreButton from "./CommentMoreButton";
import { useAppContext } from "@/contexts/app-provider";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CommentListProps {
  comments: Comment[];
  handleRemoveComment: (commentId: string) => void;
}

export default function CommentList({
  comments,
  handleRemoveComment,
}: CommentListProps) {
  const { user } = useAppContext();

  return (
    <div className="max-w-2xl p-4 flex-1">
      <h2 className="text-2xl font-bold mb-4 text-muted">Comments</h2>
      <ScrollArea className="h-full max-h-[600px] rounded-md">
        <div className="space-y-4 pr-4 mt-2 max-w-full">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-start space-x-4">
                <Link href={`/profile/${comment.user_id}/_saved`}>
                  <Avatar className="w-9 h-9 cursor-pointer">
                    <AvatarImage
                      src={comment.user.avatar.url}
                      alt={comment.id}
                    />
                    <AvatarFallback>
                      {comment.user.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1 relative">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/profile/${comment.user_id}/_saved`}>
                      <h3 className="text-sm font-bold text-muted flex-1 cursor-pointer">
                        {comment.user.username}
                      </h3>
                    </Link>
                    <p
                      className={cn("text-xs text-muted-foreground", {
                        "mr-9": user?.id === comment.user_id,
                      })}
                    >
                      {formatDate(comment.created_at)}
                    </p>
                  </div>

                  {user?.id === comment.user_id ? (
                    <div className="absolute -top-2 right-0 z-50">
                      <CommentMoreButton
                        handleRemoveComment={handleRemoveComment}
                        commentId={comment.id}
                      />
                    </div>
                  ) : null}

                  <p className="text-sm text-muted-foreground">
                    {comment.content}
                    {/* Lorem Ipsum is simply dummy text of the
                    printing and typesetting industry. Lorem Ipsum has been the
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum */}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
