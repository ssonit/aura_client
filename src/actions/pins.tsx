"use server";

import envConfig from "@/config";
import { ListPinResponse, Photo } from "@/types/pin";
import { isTokenExpiringSoon, refreshAndSetToken } from "@/utils/helpers";
import { cookies } from "next/headers";

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

export const handleListPins = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const cookieStore = cookies();
  let access_token = cookieStore.get("token")?.value as string;

  const res = await fetch(
    `${BASE_URL}/pin?` +
      new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      }),
    {
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

  return data as ListPinResponse;
};
