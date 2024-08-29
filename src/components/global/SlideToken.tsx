"use client";

import { useAppContext } from "@/contexts/app-provider";
import { decodeJWT, refreshAndSetToken } from "@/utils/helpers";
import { useEffect } from "react";

const SlideToken = () => {
  const { token, handleSetToken, refreshToken, handleSetRefreshToken } =
    useAppContext();
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      if (token) {
        const decodedToken = decodeJWT(token);
        const bufferTime = now.getTime() + 5 * 60 * 1000; // 5 minutes
        console.log(decodedToken.exp * 1000, bufferTime);

        if (decodedToken.exp * 1000 <= bufferTime) {
          try {
            const result = await refreshAndSetToken({
              access_token: token,
              refresh_token: refreshToken,
            });
            handleSetToken(result.token.access_token);
            handleSetRefreshToken(result.token.refresh_token);
          } catch (error) {
            console.error("Error refreshing token:", error);
          }
        }
      }
    }, 10000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refreshToken]);
  return null;
};

export default SlideToken;
