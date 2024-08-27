"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import authApiRequest from "@/actions/auth";
import { useAppContext } from "@/contexts/app-provider";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const { handleSetSessionToken, setUser } = useAppContext();
  const handleLogout = async () => {
    try {
      await authApiRequest.logout();
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem("user");
    handleSetSessionToken("");
    setUser(null);
    router.push("/login");
    router.refresh();
  };
  return (
    <Button
      className="w-full p-0"
      variant={"destructive"}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
