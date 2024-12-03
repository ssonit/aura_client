"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { handleCreateComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import { Comment } from "@/types/comment";
import { useAppContext } from "@/contexts/app-provider";

const formSchema = z.object({
  comment: z.string().min(2),
});

interface CommentInputProps {
  pinId: string;
  handleAddComment: (comment: Comment) => void;
}

const CommentInput = ({ pinId, handleAddComment }: CommentInputProps) => {
  const router = useRouter();
  const { user } = useAppContext();
  const access_token = getCookie("access_token") as string;
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || user.banned_at) return;
    try {
      setIsLoading(true);
      const {
        data: { id },
      } = await handleCreateComment({
        pinId,
        content: values.comment,
        access_token,
      });
      if (!id) return;
      handleAddComment({
        id,
        content: values.comment,
        pin_id: pinId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user,
        user_id: user.id,
      });
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-auto mb-4 mr-4"
      >
        <div className="flex-1 relative bg-white rounded-full p-1 border">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Write a comment"
                    {...field}
                    className="bg-white focus-visible:ring-white focus-visible:ring-offset-0 rounded-full focus:outline-none p-2 text-muted border-none pr-12"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <Button
              type="submit"
              size="icon"
              className="flex items-center space-x-2 rounded-full"
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CommentInput;
