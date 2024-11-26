"use server";

import { BASE_URL } from "@/constants";
import { ListTagsResponse } from "@/types/pin";

export const handleListTags = async ({
  access_token,
  page,
  limit,
}: {
  access_token: string;
  page: number;
  limit: number;
}) => {
  const searchParams = {
    page: page.toString(),
    limit: limit.toString(),
  };

  const res = await fetch(
    BASE_URL + "/pin/tags?" + new URLSearchParams(searchParams),
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

  return data as ListTagsResponse;
};
