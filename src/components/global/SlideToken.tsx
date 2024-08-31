"use client";

import authApiRequest from "@/actions/auth";
import { useAppContext } from "@/contexts/app-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const SlideToken = () => {
  const { setUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const handleTabClose = async () => {
      try {
        await authApiRequest.logout();
      } catch (error) {
        console.log(error);
      }
      localStorage.removeItem("user");
      localStorage.removeItem("exp");
      localStorage.removeItem("access_token");
      setUser(null);
    };
    window.addEventListener("beforeunload", handleTabClose);
    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const exp = JSON.parse(localStorage.getItem("exp") || "0");
      if (exp) {
        const bufferTime = now.getTime() + 60 * 60 * 1000; // 1 hour
        if (exp * 1000 <= bufferTime) {
          try {
            const result =
              await authApiRequest.refreshTokenFromNextClientToNextServer();

            localStorage.setItem("access_token", result.token.access_token);
            localStorage.setItem("exp", JSON.stringify(result.exp));
          } catch (error) {
            await authApiRequest.logout();
            localStorage.removeItem("user");
            localStorage.removeItem("exp");
            localStorage.removeItem("access_token");
            setUser(null);
            router.push("/login");
            router.refresh();
            console.error("Error refreshing token:", error);
          }
        }
      }
    }, 30 * 60 * 1000); // 30 minutes
    return () => clearInterval(interval);
  }, [router, setUser]);
  return null;
};

export default SlideToken;
