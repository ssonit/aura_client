import { User } from "./auth";
import { Media, Pin } from "./pin";

export interface BoardResponse {
  data: Board[];
  filter: any;
}

export interface Board {
  id: string;
  user_id: string;
  name: string;
  isPrivate: boolean;
  user: User;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface BoardPin {
  id: string;
  board_id: string;
  pin_id: string;
  user_id: string;
  board: Board;
  pin: Pin;
  media: Media;
  user: User;
  created_at: string;
  updated_at: string;
}

export interface BoardPinDetailResponse {
  data: BoardPin;
  filter: any;
}

export interface BoardPinResponse {
  data: BoardPin[];
  filter: any;
}

export interface BoardItemResponse {
  data: Board;
}
