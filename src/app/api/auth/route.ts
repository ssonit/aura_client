import { decodeJWT } from "@/utils/helpers";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const { access_token, refresh_token } = res.token;

  if (!access_token || !refresh_token) {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  const expRefreshToken = decodeJWT(refresh_token).exp * 1000;

  setCookie("access_token", access_token, {
    expires: new Date(expRefreshToken),
    secure: true,
    path: "/",
    sameSite: "lax",
    cookies,
  });

  setCookie("refresh_token", refresh_token, {
    expires: new Date(expRefreshToken),
    secure: true,
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    cookies,
  });

  return Response.json(res, {
    status: 200,
  });
}
