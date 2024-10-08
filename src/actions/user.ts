"use server";

import { BASE_URL } from "@/constants";
import { UserResponse } from "@/types/auth";

export const handleGetUser = async (id: string, access_token: string) => {
  const res = await fetch(BASE_URL + "/user/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as UserResponse;
};

export const handleUpdateUser = async ({
  id,
  payload,
  access_token,
}: {
  id: string;
  payload: {
    avatar_id: string;
    username: string;
    bio: string;
    website: string;
  };
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + "/user/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as { message: string };
};
