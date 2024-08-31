import authApiRequest from "@/actions/auth";
import { decodeJWT } from "@/utils/helpers";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const {
    token: { refresh_token },
  } = await request.json();

  console.log(getCookie("refresh_token", { cookies }));

  if (!refresh_token) {
    return Response.json(
      { message: "Không nhận được token" },
      {
        status: 401,
      }
    );
  }

  try {
    const res = await authApiRequest.refreshTokenFromNextServerToServer({
      refresh_token,
    });

    const { access_token: new_access_token, refresh_token: new_refresh_token } =
      res.token;

    const expRefreshToken = decodeJWT(refresh_token).exp;

    setCookie("refresh_token", new_refresh_token, {
      expires: new Date(expRefreshToken * 1000),
      secure: true,
      path: "/",
      httpOnly: true,
      cookies,
    });

    setCookie("access_token", new_access_token, {
      expires: new Date(expRefreshToken * 1000),
      secure: true,
      path: "/",
      cookies,
    });

    return Response.json(
      {
        token: res.token,
      },
      {
        status: 200,
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
