import authApiRequest from "@/actions/auth";
import { decodeJWT } from "@/utils/helpers";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const access_token = cookieStore.get("token")?.value;
  const refresh_token = cookieStore.get("refreshToken")?.value;

  if (!access_token || !refresh_token) {
    return Response.json(
      { message: "Không nhận được token" },
      {
        status: 401,
      }
    );
  }

  try {
    const res = await authApiRequest.refreshTokenFromNextServerToNextServer({
      refresh_token,
    });

    console.log({ refresh_token }, "server");

    const { access_token: new_access_token, refresh_token: new_refresh_token } =
      res.token;

    const expToken = decodeJWT(new_access_token).exp * 1000;
    const expRefreshToken = decodeJWT(new_refresh_token).exp * 1000;

    return Response.json(
      {
        token: res.token,
        exp: expToken / 1000,
      },
      {
        status: 200,
        headers: {
          "Set-Cookie": [
            `token=${new_access_token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${new Date(
              expToken
            ).toUTCString()}`,
            `refreshToken=${new_refresh_token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${new Date(
              expRefreshToken
            ).toUTCString()}`,
          ].join(", "),
        },
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Lỗi không xác định",
      },
      {
        status: 500,
      }
    );
  }
}
