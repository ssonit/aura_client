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
  const { token, handleSetToken, setUser, refreshToken } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();

      if (token) {
        const decodedToken = jwt.decode(token) as PayloadToken;
        const bufferTime = 5 * 60 + now.getTime(); // 5 minutes

        if (decodedToken.exp * 1000 <= bufferTime) {
          console.log("token expired");
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [handleSetToken, router, setUser, token]);
  return null;
}
