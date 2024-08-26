"use server";

import envConfig from "@/config";

const BASE_URL = envConfig.NEXT_PUBLIC_API_ENDPOINT;

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};
