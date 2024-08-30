import authApiRequest from "@/actions/auth";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const refresh_token = cookieStore.get("refreshToken")?.value as string;
  const access_token = cookieStore.get("token")?.value as string;

  if (!refresh_token || !access_token) {
    cookieStore.delete("token");
    cookieStore.delete("refreshToken");
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }

  const result = await authApiRequest.logoutNextServerToServer({
    refresh_token,
    access_token,
  });

  return Response.json(result, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `token=; Path=/; HttpOnly; Max-Age=0`,
        `refreshToken=; Path=/; HttpOnly; Max-Age=0`,
      ].join(", "),
    },
  });
}
