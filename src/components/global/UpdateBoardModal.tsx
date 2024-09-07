"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAppContext } from "@/contexts/app-provider";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { Board } from "@/types/board";

const FormSchema = z.object({
  name: z.string(),
  isPrivate: z.boolean().default(false),
});

const UpdateBoardModal = ({ board }: { board: Board }) => {
  const [isLoading, setIsLoading] = useState(false);
  const access_token = getCookie("access_token") as string;

  const { isModalUpdateBoard, handleModalUpdateBoard } = useAppContext();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: board.name,
      isPrivate: board.isPrivate,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    form.reset();
    handleModalUpdateBoard(false);
  }

  return (
    <Dialog open={isModalUpdateBoard} onOpenChange={handleModalUpdateBoard}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Board name"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel id="isPrivate">
                        Keep this board private (only you can see it)
                      </FormLabel>
                      <FormDescription>
                        Only you and your collaborators can see this table.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  Update Board
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBoardModal;
