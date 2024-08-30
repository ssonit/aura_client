import { decodeJWT } from "@/utils/helpers";

export async function POST(request: Request) {
  const res = await request.json();
  const { access_token, refresh_token } = res.token;

  if (!access_token || !refresh_token) {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 400,
      }
    );
  }

  const expToken = decodeJWT(access_token).exp * 1000;
  const expRefreshToken = decodeJWT(refresh_token).exp * 1000;

  return Response.json(res, {
    status: 200,
    headers: {
      "Set-Cookie": [
        `token=${access_token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${new Date(
          expToken
        ).toUTCString()}`,
        `refreshToken=${refresh_token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${new Date(
          expRefreshToken
        ).toUTCString()}`,
      ].join(", "),
    },
  });
}
