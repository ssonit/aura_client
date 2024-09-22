"use server";

import { BASE_URL } from "@/constants";
import {
  BoardItemResponse,
  BoardPinDetailResponse,
  BoardPinResponse,
  BoardResponse,
} from "@/types/board";
import {
  ListPinResponse,
  Photo,
  PinCreated,
  PinDetail,
  PinUpdate,
} from "@/types/pin";
import { omitByEmpty } from "@/utils/helpers";
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
      cache: "no-store",
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
  filter = filter || {};

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
      cache: "no-store",
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

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleUpdatePin = async ({
  id,
  payload,
  access_token,
}: {
  id: string;
  payload: PinUpdate;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify(payload),
  });

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
      type: "custom",
    }),
  });

  revalidateTag("board-list");

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleListBoardsByUser = async ({
  user_id,
  isPrivate,
  access_token,
}: {
  user_id?: string;
  isPrivate?: string;
  access_token: string;
}) => {
  const searchParams: { userId?: string; isPrivate?: string } = {};

  if (user_id) {
    searchParams["userId"] = user_id;
  }

  if (isPrivate !== null || isPrivate !== undefined) {
    searchParams["isPrivate"] = isPrivate;
  }

  const res = await fetch(
    BASE_URL + "/board?" + new URLSearchParams(omitByEmpty(searchParams)),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      next: {
        tags: ["board-list"],
      },
    }
  );

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
    BASE_URL +
      `/pin/board-pin/${boardId}/pins?` +
      new URLSearchParams(searchParams),
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

export const handleBoardPinDetail = async ({
  pin_id,
  access_token,
}: {
  pin_id: string;
  access_token: string;
}) => {
  return fetch(BASE_URL + `/pin/board-pin/detail/${pin_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  }).then(async (res) => {
    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data as BoardPinDetailResponse;
  });
};

export const handleUpdateBoard = async ({
  id,
  payload,
  access_token,
}: {
  id: string;
  payload: { name: string; isPrivate: boolean };
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/board/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      ...payload,
      type: "custom",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleSoftDeleteBoard = async (
  id: string,
  access_token: string
) => {
  const res = await fetch(BASE_URL + `/board/${id}/soft-delete`, {
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

export const handleRestoreBoard = async (id: string, access_token: string) => {
  const res = await fetch(BASE_URL + `/board/${id}/restore`, {
    method: "POST",
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

export const handleListDeletedBoards = async (access_token: string) => {
  const res = await fetch(BASE_URL + "/board/deleted", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as BoardResponse;
};

export const handleSaveBoardPin = async ({
  pin_id,
  board_id,
  access_token,
}: {
  pin_id: string;
  board_id: string;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/board-pin/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      pin_id,
      board_id,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const handleLikePin = async ({
  pin_id,
  access_token,
}: {
  pin_id: string;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/${pin_id}/like`, {
    method: "POST",
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

export const handleUnlikePin = async ({
  pin_id,
  access_token,
}: {
  pin_id: string;
  access_token: string;
}) => {
  const res = await fetch(BASE_URL + `/pin/${pin_id}/unlike`, {
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

export const handleUnSaveBoardPin = async ({
  board_pin_id,
  pin_id,
  access_token,
}: {
  board_pin_id: string;
  pin_id: string;
  access_token: string;
}) => {
  const res = await fetch(
    BASE_URL + `/pin/board-pin/${board_pin_id}/unsave/${pin_id}`,
    {
      method: "DELETE",
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
