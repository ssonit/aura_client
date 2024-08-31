import envConfig from "@/config";
import authApiRequest from "@/actions/auth";
import { getCookie } from "cookies-next";
import { decodeJWT } from "./helpers";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
  requiresAuth?: boolean;
  cookies?: any;
};
class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http error");
    this.status = status;
    this.payload = payload;
  }
}

export const isClient = () => typeof window !== "undefined";

const checkAndRefreshToken = async ({ cookies }: { cookies?: any }) => {
  let access_token = "";
  if (!isClient() && cookies) {
    access_token = getCookie("access_token", { cookies }) as string;
  } else {
    access_token = getCookie("access_token") as string;
  }

  if (access_token) {
    const exp = decodeJWT(access_token).exp;
    const now = new Date().getTime();
    if (exp * 1000 <= now) {
      try {
        const result =
          await authApiRequest.refreshTokenFromNextClientToNextServer();
        return result.token.access_token;
      } catch (error) {
        console.error("Error refreshing token:", error);
        throw new HttpError({
          status: 401,
          payload: { message: "Token refresh failed" },
        });
      }
    }
    return access_token;
  }
  return "";
};

const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined
) => {
  let access_token = "";
  if (options?.requiresAuth) {
    access_token = await checkAndRefreshToken({
      cookies: options?.cookies,
    });
  }

  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const baseHeaders: { [key: string]: string } = {
    "Content-Type": "application/json",
  };

  if (access_token && options?.requiresAuth) {
    baseHeaders["Authorization"] = `Bearer ${access_token}`;
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: { ...baseHeaders, ...options?.headers },
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    // throw new HttpError(data);
    console.log({ res });
  }

  return data;
};
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
