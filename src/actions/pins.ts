"use server";

import envConfig from "@/config";
import { BoardResponse } from "@/types/board";
import { Photo } from "@/types/pin";
import { revalidateTag } from "next/cache";

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

export const handleCreateBoard = async (payload: {
  name: string;
  isPrivate: boolean;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + "/board/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${payload.access_token}`,
    },
    body: JSON.stringify({
      name: payload.name,
      isPrivate: payload.isPrivate,
    }),
  });

  revalidateTag("board-list");

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleListBoardsByUser = async (access_token: string) => {
  const res = await fetch(BASE_URL + "/board", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    next: {
      tags: ["board-list"],
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as BoardResponse;
};
