"use client";

import { useState } from "react";
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

const FormSchema = z.object({
  name: z.string(),
  isPrivate: z.boolean().default(false),
});

const AddBoardModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      isPrivate: false,
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Board</DialogTitle>
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
                <Button type="submit">Add Board</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBoardModal;
