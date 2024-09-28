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
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/contexts/app-provider";
import authApiRequest from "@/actions/auth";
import PasswordInput from "./PasswordInput";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

const RegisterForm = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setUser } = useAppContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: email,
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (values.password !== values.confirmPassword) {
        toast({
          title: "Password and confirm password must be the same",
        });
        return;
      }
      const result = await authApiRequest.register(values);

      const resultFromNextServer = await authApiRequest.authTokenNextServer(
        result.token
      );

      console.log(resultFromNextServer);

      setUser(result.data);

      toast({
        title: "Register successful",
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
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
                <PasswordInput {...field}></PasswordInput>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput {...field}></PasswordInput>
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit" className="py-5">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
