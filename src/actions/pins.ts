"use server";

import { BASE_URL } from "@/constants";
import {
  BoardItemResponse,
  BoardPinResponse,
  BoardResponse,
} from "@/types/board";
import { ListPinResponse, Photo, PinCreated, PinDetail } from "@/types/pin";
import { revalidateTag } from "next/cache";

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
  access_token: string,
  filter?: any
) => {
  filter = {};

  const searchParams = {
    page: page.toString(),
    limit: limit.toString(),
    ...filter,
  };

  const res = await fetch(
    BASE_URL + "/pin?" + new URLSearchParams(searchParams),
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

  return data as ListPinResponse;
};

export const handlePinDetail = async (id: string, access_token: string) => {
  const res = await fetch(BASE_URL + `/pin/${id}`, {
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

  return data as PinDetail;
};

export const handlePinCreated = async (
  payload: PinCreated,
  access_token: string
) => {
  const res = await fetch(BASE_URL + "/pin/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });

  revalidateTag("board-pin-list");

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

export const handleListBoardPin = async (
  page: number,
  limit: number = 10,
  boardId: string,
  access_token: string
) => {
  const searchParams = {
    page: page.toString(),
    limit: limit.toString(),
  };

  const res = await fetch(
    BASE_URL + `/pin/${boardId}/board?` + new URLSearchParams(searchParams),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        tags: ["board-pin-list"],
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as BoardPinResponse;
};

export const handleBoardItem = async (id: string, access_token: string) => {
  const res = await fetch(BASE_URL + `/board/${id}`, {
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

  return data as BoardItemResponse;
};
