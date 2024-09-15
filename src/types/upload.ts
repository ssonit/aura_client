import { Media } from "./pin";

export interface ImagePin {
  id: string;
}

export interface ImagePinResponse {
  data: ImagePin;
}

export interface MediaResponse {
  data: Media;
}
