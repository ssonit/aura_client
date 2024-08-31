"use server";

import envConfig from "@/config";
import { Photo } from "@/types/pin";

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

export const handleListPins = async (
  page: number,
  limit: number = 10,
  access_token: string
) => {
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
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
