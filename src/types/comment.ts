import { User } from "./auth";

export interface Comment {
  content: string;
  created_at: string;
  id: string;
  pin_id: string;
  updated_at: string;
  user: User;
  user_id: string;
}

export interface ListCommentsResponse {
  data: Comment[];
  paging: {
    page: number;
    limit: number;
    total: number;
  };
  filter: any;
}
