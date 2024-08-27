import envConfig from "@/config";

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

    return payload;
  },
  authTokenNextServer: async (data: { token: string }) => {
    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
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
};

export default authApiRequest;
