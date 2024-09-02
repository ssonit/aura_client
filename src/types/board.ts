import { User } from "./auth";

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
  created_at: string;
  updated_at: string;
}
