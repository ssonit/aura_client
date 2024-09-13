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
