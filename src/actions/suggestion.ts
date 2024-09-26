"use server";

import { BASE_URL } from "@/constants";
import { Suggestion } from "@/types/pin";

export const handleListSuggestions = async ({
  keyword,
  access_token,
}: {
  keyword: string;
  access_token: string;
}) => {
  const response = await fetch(
    BASE_URL +
      `/pin/suggestions?` +
      new URLSearchParams({
        keyword,
      }),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as { data: Suggestion[] };
};
