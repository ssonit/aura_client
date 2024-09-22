import { User } from "./auth";

export interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  placeholder?: string;
  board_pin_id?: string;
  user_id_pin?: string;
  isAura?: boolean;
}
export type TPinCard = JSX.Element;

export interface Media {
  id: string;
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  created_at: string;
  updated_at: string;
}

export interface Pin {
  id: string;
  user_id: string;
  title: string;
  description: string;
  media_id: string;
  link_url: string;
  user: User;
  media: Media;
  isLiked: boolean;
  created_at: string;
  updated_at: string;
}

export interface PinCreated {
  title: string;
  description: string;
  media_id: string;
  link_url?: string;
  board_id: string;
}

export interface PinDetail {
  data: Pin;
}

export interface ListPinResponse {
  data: Pin[];
  paging: {
    page: number;
    limit: number;
    total: number;
  };
  filter: any;
}

export interface PinUpdate {
  title: string;
  description: string;
  link_url: string;
  board_id: string;
  board_pin_id: string;
}

export interface BoardPinModalEdit {
  user_id_pin: string;
  pinId: string;
  boardPinId: string;
  url: string;
}
