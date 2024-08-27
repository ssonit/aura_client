"use client";

import { useAppContext } from "@/contexts/app-provider";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import authApiRequest from "@/actions/auth";
import { useRouter } from "next/navigation";

interface PayloadToken {
  userID: string;
  exp: number;
}

export default function SlideToken() {
  const { token, handleSetToken, setUser } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();

      if (token) {
        const decodedToken = jwt.decode(token) as PayloadToken;
        const bufferTime = 5 * 60 + now.getTime(); // 5 minutes

        console.log(decodedToken.exp * 1000, bufferTime);

        if (decodedToken.exp * 1000 <= bufferTime) {
          try {
            await authApiRequest.logout();
          } catch (error) {
            console.log(error);
          }
          localStorage.removeItem("user");
          handleSetToken("");
          setUser(null);
          router.push("/login");
          router.refresh();
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [handleSetToken, router, setUser, token]);
  return null;
}
