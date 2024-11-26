import { Media } from "./pin";

export interface User {
  id: string;
  email: string;
  username: string;
  avatar_id: string;
  avatar: Media;
  bio: string;
  website: string;
  created_at: string;
  updated_at: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface PayloadToken {
  userID: string;
  exp: number;
}

export interface AuthResponse {
  data: User;
  token: Token;
}

export interface UserResponse {
  data: User;
}

export interface ListUsersResponse {
  data: User[];
  paging: {
    page: number;
    limit: number;
    total: number;
  };
  filter: any;
}
