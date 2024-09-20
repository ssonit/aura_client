"use server";

import { BASE_URL } from "@/constants";
import { ListCommentsResponse } from "@/types/comment";

export const handleListComments = async ({
  pinId,
  page,
  limit,
  access_token,
  filter,
}: {
  pinId: string;
  page: number;
  limit: number;
  access_token: string;
  filter?: any;
}) => {
  filter = filter || {};

  const searchParams = {
    page: page.toString(),
    limit: limit.toString(),
    ...filter,
  };

  const res = await fetch(
    BASE_URL +
      `/pin/${pinId}/list/comments?` +
      +new URLSearchParams(searchParams),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as ListCommentsResponse;
};

export const handleCreateComment = async ({
  pinId,
  content,
  access_token,
}: {
  pinId: string;
  content: string;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/${pinId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({ content }),
  });
  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as { id: string };
};

export const handleDeleteComment = async ({
  commentId,
  access_token,
}: {
  commentId: string;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/comment/${commentId}`, {
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
