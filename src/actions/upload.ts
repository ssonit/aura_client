import { BASE_URL } from "@/constants";
import { ImagePinResponse, MediaResponse } from "@/types/upload";

export const handleUploadImage = async (
  formData: FormData,
  access_token: string
) => {
  const res = await fetch(BASE_URL + "/media/upload-image", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as ImagePinResponse;
};

export const handleGetMedia = async (id: string, access_token: string) => {
  const res = await fetch(BASE_URL + "/media/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data as MediaResponse;
};
