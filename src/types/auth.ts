export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
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
