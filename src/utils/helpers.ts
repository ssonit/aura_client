import { PayloadToken } from "@/types/auth";
import jwt from "jsonwebtoken";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_DOMAIN;

export async function dynamicBlurDataUrl(url: string) {
  const base64str = await fetch(
    `${baseURL}/_next/image?url=${url}&w=1&q=60`
  ).then(async (res) =>
    Buffer.from(await res.arrayBuffer()).toString("base64")
  );

  const blurSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 8 5'>
                  <filter id='b' color-interpolation-filters='sRGB'>
                      <feGaussianBlur stdDeviation='1'/>
                  </filter>
                  <image preserveAspectRatio='none' width='100%' height='100%' filter='url(#b)' href='data:image/avif;base64,${base64str}' />
              </svg>
          `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export function dynamicBlurDataColor() {
  const colors = [
    "#EF476F",
    "#F78C6B",
    "#FFD166",
    "#06D6A0",
    "#118AB2",
    "#073B4C",
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const blurSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 8 5'>
      <rect width='100%' height='100%' fill='${randomColor}' />
      <filter id='b' color-interpolation-filters='sRGB'>
          <feGaussianBlur stdDeviation='1'/>
      </filter>
      <rect width='100%' height='100%' fill='${randomColor}' filter='url(#b)' />
  </svg>
`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export function staticBlurDataUrl() {
  const blurSvg = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 8 5'>
              <filter id='b' color-interpolation-filters='sRGB'>
                  <feGaussianBlur stdDeviation='1'/>
              </filter>
              <rect preserveAspectRatio='none' width='100%' height='100%' filter='url(#b)' stroke-width='3' stroke='#7b9fa6' fill='#426874' />
          </svg>
      `;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return `data:image/svg+xml;base64,${toBase64(blurSvg)}`;
}

export const isImageURL = (url: string) => {
  const imageExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".svg",
  ];

  return imageExtensions.some((ext) => url.toLowerCase().endsWith(ext));
};

export const decodeJWT = (token: string) => {
  return jwt.decode(token) as PayloadToken;
};

export const isTokenExpiringSoon = (token: string) => {
  const now = new Date();
  const decodedToken = decodeJWT(token);
  const bufferTime = now.getTime(); // 5 minutes

  return decodedToken.exp * 1000 <= bufferTime;
};
