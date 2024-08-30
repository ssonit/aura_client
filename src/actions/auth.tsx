import envConfig from "@/config";
import { AuthResponse, Token } from "@/types/auth";

const authApiRequest = {
  login: async (data: { email: string; password: string }) => {
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload as AuthResponse;
  },
  authTokenNextServer: async (data: Token) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify({
        token: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload;
  },
  logoutNextServerToServer: async (data: {
    refresh_token: string;
    access_token: string;
  }) => {
    // remove token from server
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/logout`,
      {
        method: "POST",
        body: JSON.stringify({
          token: data.refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload;
  },
  logout: async () => {
    // remove token from server
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({
        message: "logout",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload;

    // remove token from local storage
    // remove user from context
    // redirect to login
  },
  refreshTokenFromNextServerToNextServer: async (data: {
    refresh_token: string;
  }) => {
    const res = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/refresh-token`,
      {
        method: "POST",
        body: JSON.stringify({
          token: data.refresh_token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload as { token: Token };
  },

  refreshTokenFromNextClientToNextServer: async () => {
    const res = await fetch("/api/auth/refresh-token", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const payload = await res.json();

    if (!res.ok) {
      throw payload;
    }

    return payload as { token: Token; exp: string };
  },
};

export default authApiRequest;
