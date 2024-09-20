"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/helpers";
import CommentMoreButton from "./CommentMoreButton";
import { useAppContext } from "@/contexts/app-provider";

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
      <h2 className="text-2xl font-bold mb-6 text-muted">Comments</h2>
      <ScrollArea className="h-full max-h-[600px] rounded-md">
        <div className="space-y-4 pr-4 max-w-full">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment.user.avatar.url} alt={comment.id} />
                  <AvatarFallback>
                    {comment.user.username.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-muted flex-1">
                      {comment.user.username}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.created_at)}
                    </p>
                    {user?.id === comment.user_id ? (
                      <CommentMoreButton
                        handleRemoveComment={handleRemoveComment}
                        commentId={comment.id}
                      />
                    ) : null}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {comment.content}
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
