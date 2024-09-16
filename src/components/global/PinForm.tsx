"use client";

import { useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ImageIcon, LinkIcon } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { isImageURL } from "@/utils/helpers";
import { Board } from "@/types/board";
import { useToast } from "@/components/ui/use-toast";
import { handleUploadImage } from "@/actions/upload";
import { getCookie } from "cookies-next";
import { handlePinCreated, handleUpdatePin } from "@/actions/pins";
import { useAppContext } from "@/contexts/app-provider";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(500),
  imageUrl: z.string(),
  linkUrl: z.string().url().optional(),
  selectedBoard: z.string(),
});

interface Props {
  initData?: z.infer<typeof formSchema> & {
    pin_id: string;
    board_pin_id: string;
  };
  boards: Board[];
}

const PinForm = ({ initData, boards }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const access_token = getCookie("access_token") as string;
  const { user } = useAppContext();
  const [isUrlInput, setIsUrlInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues = initData
    ? {
        title: initData.title,
        description: initData.description,
        imageUrl: initData.imageUrl,
        linkUrl: initData.linkUrl,
        selectedBoard: initData.selectedBoard,
      }
    : {
        title: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        selectedBoard: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleRemoveImage = () => {
    setFile(null);
    form.setValue("imageUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!access_token) {
      toast({
        title: "You need to login first!",
      });
      return;
    }

    if (boards.length <= 0) {
      toast({
        title: "You need to create a board first!",
      });
      return;
    }

    if (values.title === "All Pins") {
      toast({
        title: "You can't create a pin in the 'All Pins' board!",
      });
      return;
    }
    setIsLoading(true);
    try {
      if (initData && initData.pin_id) {
        await handleUpdatePin({
          id: initData.pin_id,
          payload: {
            title: values.title,
            description: values.description,
            link_url: values.linkUrl || "",
            board_id: values.selectedBoard,
            board_pin_id: initData.board_pin_id,
          },
          access_token,
        });

        toast({
          title: "Pin updated successfully!",
        });
      } else {
        let resUpload;
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          resUpload = await handleUploadImage(formData, access_token);
          if (!resUpload) {
            toast({
              title: "Failed to upload image!",
            });
            return;
          }
          await handlePinCreated(
            {
              title: values.title,
              description: values.description,
              board_id: values.selectedBoard,
              link_url: values.linkUrl,
              media_id: resUpload.data.id,
            },
            access_token
          );
        }

        form.reset();
        handleRemoveImage();
        toast({
          title: "Pin created successfully!",
        });
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }

    if (user) {
      router.push(`/profile/${user.id}/_created`);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-8 flex justify-start "
      >
        {!initData && (
          <div className="space-y-2 flex-[2]">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="imageInput">Image</Label>
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4" />
                      <Switch
                        id="image-input-mode"
                        checked={isUrlInput}
                        onCheckedChange={(checked) => {
                          setIsUrlInput(checked);
                          handleRemoveImage();
                        }}
                      />
                      <LinkIcon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-2">
                    <ImagePreview
                      url={form.getValues("imageUrl")}
                      onSelectFile={isUrlInput ? () => {} : handleSelectFile}
                      onRemove={handleRemoveImage}
                    />
                  </div>
                  <FormControl>
                    {isUrlInput ? (
                      <Input
                        placeholder="Enter the image URL"
                        onChange={(e) => {
                          const url = e.target.value;
                          if (
                            url.startsWith("http") ||
                            url.startsWith("https") ||
                            isImageURL(url)
                          ) {
                            setFile(null);
                            field.onChange(url);
                          }
                        }}
                      />
                    ) : (
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            field.onChange(url);
                            setFile(file);
                          }
                        }}
                      />
                    )}
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
          </div>
        )}
        <div className="space-y-4 flex-[3]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a title for your pin" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your pin"
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the destination link" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="selectedBoard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a board" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {boards.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <div className="text-center">
            <Button type="submit" disabled={isLoading}>
              {initData ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PinForm;
