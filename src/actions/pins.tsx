"use server";

import envConfig from "@/config";
import { Photo } from "@/types/pin";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import authApiRequest from "./auth";
import { decodeJWT } from "@/utils/helpers";

const BASE_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

export const fetchPins = async (page: number, limit: number = 10) => {
  const res = await fetch(
    "https://picsum.photos/v2/list?" +
      new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      }),
    {
      method: "GET",
    }
  );
  const data = await res.json();

  return data as Photo[];
};

export const handleListPins = async (page: number, limit: number = 10) => {
  const access_token = getCookie("access_token", { cookies }) as string;
  const refresh_token = getCookie("refresh_token", { cookies }) as string;

  if (access_token) {
    const exp = decodeJWT(access_token).exp;
    const now = new Date().getTime();
    let new_access_token = access_token;
    if (exp * 1000 <= now) {
      try {
        const result =
          await authApiRequest.refreshTokenFromNextClientToNextServer({
            refresh_token,
            access_token,
          });

        console.log(result, "refresh token in server");
        new_access_token = result.token.access_token;
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
    const res = await fetch(
      BASE_URL +
        "/pin?" +
        new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        }),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${new_access_token}`,
        },
      }
    );
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  }
};
