import { ListPinResponse } from "@/types/pin";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const pinApiRequest = {
  handleListPins: async ({
    page = 1,
    limit = 10,
    access_token,
    refresh_token,
  }: {
    page?: number;
    limit?: number;
    access_token: string;
    refresh_token: string;
  }) => {
    let token = access_token;

    const res = await fetch(
      `${BASE_URL}/pin?` +
        new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data as ListPinResponse;
  },
};
