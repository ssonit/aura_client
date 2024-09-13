"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/app-provider";
import authApiRequest from "@/actions/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAppContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    console.log({ values });
    try {
      const result = await authApiRequest.login(values);

      const resultFromNextServer = await authApiRequest.authTokenNextServer(
        result.token
      );

      console.log(resultFromNextServer);

      setUser(result.data);

      toast({
        title: "Login successful",
      });

      router.push("/home");
      router.refresh();
    } catch (error) {
      toast({
        title: (error as any)?.message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="py-5">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
