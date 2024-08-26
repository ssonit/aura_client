import envConfig from "@/config";

const authApiRequest = {
  login: async (data: { email: string; password: string }) => {
    const result = await fetch(
      `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/user/login`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const payload = await res.json();

      if (!res.ok) {
        throw payload;
      }

      return payload;
    });

    return result;
  },
  auth: async (data: { token: string }) => {
    const result = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const payload = await res.json();

      if (!res.ok) {
        throw payload;
      }

      return payload;
    });

    return result;
  },
};

export default authApiRequest;
