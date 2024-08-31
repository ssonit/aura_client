import authApiRequest from "@/actions/auth";
import { deleteCookie, getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const refresh_token = getCookie("refresh_token", { cookies });
  const access_token = getCookie("access_token", { cookies });

  if (!refresh_token || !access_token) {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }

  const result = await authApiRequest.logoutNextServerToServer({
    refresh_token,
    access_token,
  });

  if (!result) {
    return Response.json(
      {
        message: "Logout failed",
      },
      {
        status: 500,
      }
    );
  }

  deleteCookie("refresh_token", { cookies });
  deleteCookie("access_token", { cookies });

  return Response.json(result, {
    status: 200,
  });
}
