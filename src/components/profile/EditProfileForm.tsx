"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app-provider";
import { handleGetMedia, handleUploadImage } from "@/actions/upload";
import { handleUpdateUser } from "@/actions/user";
import { User } from "@/types/auth";

const formSchema = z.object({
  avatar: z.string(),
  username: z.string().min(2).max(50),
  bio: z.string().max(500),
  website: z.string(),
});

interface Props {
  initData: z.infer<typeof formSchema> & { avatar_id: string; user_id: string };
}

const EditProfileForm = ({ initData }: Props) => {
  const access_token = getCookie("access_token") as string;
  const { toast } = useToast();
  const router = useRouter();
  const { user, setUser } = useAppContext();
  const [fileAvatar, setFileAvatar] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatar: initData.avatar,
      username: initData.username,
      bio: initData.bio,
      website: initData.website,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!access_token) {
      toast({
        title: "You need to login first!",
      });
      return;
    }
    if (!user) return;

    setIsLoading(true);
    try {
      let resUpload;
      if (fileAvatar) {
        const formData = new FormData();
        formData.append("file", fileAvatar);
        resUpload = await handleUploadImage(formData, access_token);
        if (!resUpload) {
          toast({
            title: "Failed to upload image!",
          });
          return;
        }
      }

      const avatar_id = resUpload ? resUpload.data.id : initData.avatar_id;

      await handleUpdateUser({
        id: initData.user_id,
        payload: {
          avatar_id: avatar_id,
          username: values.username,
          bio: values.bio,
          website: values.website,
        },
        access_token,
      });

      const resMedia = await handleGetMedia(avatar_id, access_token);

      setUser({
        ...user,
        avatar: resMedia.data,
        avatar_id,
        username: values.username,
        bio: values.bio,
        website: values.website,
      });
      toast({
        title: "Edit profile successfully!",
      });

      router.push(`/profile/${initData.user_id}/_saved`);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
    // set user in context and local storage
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src={form.getValues("avatar")}
                  alt="Profile picture"
                  className="object-cover"
                />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="avatar-upload"
                      className="cursor-pointer"
                    >
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary">
                        <Upload size={16} />
                        <span>Upload new avatar</span>
                      </div>
                    </FormLabel>
                    <Input
                      id="avatar-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          field.onChange(url);
                          setFileAvatar(file);
                        }
                      }}
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your bio"
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" type="submit" disabled={isLoading}>
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </>
  );
};

export default EditProfileForm;
