"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { set, z } from "zod";
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
import { ImageIcon, LinkIcon, X } from "lucide-react";
import ImagePreview from "./ImagePreview";
import { isImageURL } from "@/utils/helpers";
import { Board } from "@/types/board";
import { useToast } from "@/components/ui/use-toast";
import { handleUploadImage } from "@/actions/upload";
import { getCookie } from "cookies-next";
import { handlePinCreated, handleUpdatePin } from "@/actions/pins";
import { useAppContext } from "@/contexts/app-provider";
import { useRouter } from "next/navigation";
import * as nsfwjs from "nsfwjs";
import { useDebounce } from "@uidotdev/usehooks";
import { handleListSuggestions } from "@/actions/suggestion";
import { Suggestion } from "@/types/pin";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().max(500),
  imageUrl: z.string(),
  linkUrl: z.string().url().optional(),
  selectedBoard: z.string(),
  tag: z.string().optional(),
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
  const { user, handleModalSoftDeletePin } = useAppContext();
  const [tags, setTags] = useState<string[]>([]);
  const [isUrlInput, setIsUrlInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<nsfwjs.NSFWJS | null>(null);
  const [isValid, setIsValid] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchTag, setSearchTag] = useState("");
  const [listSearchTag, setListSearchTag] = useState<Suggestion[]>([]);

  const debounceSearchTag = useDebounce(searchTag, 500);

  useEffect(() => {
    async function handleListSearchTag() {
      if (debounceSearchTag) {
        const res = await handleListSuggestions({
          keyword: debounceSearchTag,
          access_token,
        });
        if (res.data) {
          setListSearchTag(res.data);
        }
      }
    }
    handleListSearchTag();
  }, [access_token, debounceSearchTag]);

  const defaultValues = initData
    ? {
        title: initData.title,
        description: initData.description,
        imageUrl: initData.imageUrl,
        linkUrl: initData.linkUrl,
        selectedBoard: initData.selectedBoard,
        tag: "",
      }
    : {
        title: "",
        description: "",
        imageUrl: "",
        linkUrl: "",
        selectedBoard: "",
        tag: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await nsfwjs.load();
      setModel(loadedModel);
    };
    if (!initData) {
      loadModel();
    }
  }, [initData]);

  const handleRemoveImage = () => {
    if (isLoading) return;
    setFile(null);
    form.setValue("imageUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      form.setValue("tag", "");
      setListSearchTag([]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    if (isLoading) return;
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const checkContent = useCallback(
    async (imageUrl: string) => {
      if (!model) return;
      setIsLoading(true);
      const img = new Image();
      img.src = imageUrl;
      img.onload = async () => {
        try {
          const predictions = await model.classify(img);
          const explicitScore =
            predictions.find(
              (prediction) =>
                prediction.className === "Porn" ||
                prediction.className === "Hentai" ||
                prediction.className === "Sexy"
            )?.probability || 0;

          if (explicitScore < 0.5) {
            form.setValue("imageUrl", imageUrl);
            setIsValid(true);
          } else {
            form.setValue("imageUrl", "/assets/warning.jpg");
            setIsValid(false);
          }
        } catch (error) {
          console.error("Error checking content:", error);
          setIsValid(false);
        } finally {
          setIsLoading(false);
        }
      };
    },
    [form, model]
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values, tags });
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
      // Update
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
        // Create
        if (tags.length <= 0) {
          toast({
            title: "You need to add at least one tag!",
          });
          return;
        }
        if (!isValid) {
          toast({
            title: "This image contains NSFW content and cannot be uploaded.",
            className: "text-red-500",
          });
          return;
        }
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
              tags,
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
      router.refresh();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          // if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
          //   // Kiểm tra nếu input hiện tại là trường tag
          //   if (e.target.name === "tag") {
          //     e.preventDefault(); // Ngăn việc submit form khi nhấn Enter trong input tag
          //     const tagValue = form.getValues("tag");
          //     if (tagValue) {
          //       const trimTagValue = tagValue.trim();
          //       handleAddTag(trimTagValue); // Thêm tag nếu có giá trị hợp lệ
          //     }
          //   }
          // }
        }}
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
                        disabled={isLoading}
                        id="image-input-mode"
                        checked={isUrlInput}
                        onCheckedChange={(checked) => {
                          setIsUrlInput(false);
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            checkContent(url);
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the destination link" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {!initData ? (
            <div className="relative">
              <div className="relative">
                <FormField
                  control={form.control}
                  name="tag"
                  disabled={isLoading}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a tag"
                          {...field}
                          onChange={(e) => {
                            setSearchTag(e.target.value);
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {listSearchTag.length > 0 && debounceSearchTag && (
                  <div className="border-2 absolute bottom-12 w-full bg-white rounded-md">
                    {listSearchTag.map((tag) => (
                      <div
                        key={tag.id}
                        className="cursor-pointer text-muted p-2 hover:bg-blue-400 rounded-md"
                        onClick={() => handleAddTag(tag.name)}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm"
                    >
                      <p>{tag}</p>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 focus:outline-none"
                        type="button"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : null}
          <FormField
            control={form.control}
            name="selectedBoard"
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board</FormLabel>
                <Select
                  disabled={isLoading}
                  value={field.value}
                  onValueChange={field.onChange}
                >
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
          <div className="text-center flex items-center justify-center gap-4">
            {initData ? (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  handleModalSoftDeletePin(true);
                }}
              >
                Delete
              </Button>
            ) : null}

            <Button type="submit" disabled={isLoading}>
              {initData ? "Save" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PinForm;
