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

export const handleAddTag = async ({
  access_token,
  tag,
}: {
  access_token: string;
  tag: string;
}) => {
  const res = await fetch(BASE_URL + "/pin/tags/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ tags: [tag] }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleDeleteTag = async ({
  access_token,
  id,
}: {
  access_token: string;
  id: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/tags/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};
