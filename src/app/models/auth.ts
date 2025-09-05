export type Role = 'advisor' | 'client';

export interface LoginRequest {
  email: string;
  password: string;
  role: Role;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user_id: number;
  role: Role;
  advisor_id?: number | null;
  client_id?: number | null;
  email: string;
}

export type RefreshRequest = void;

export interface RefreshResponse {
  access_token: string;
  token_type: 'bearer';
}

export interface AuthUser {
  userId: number;
  role: Role;
  advisorId?: number | null;
  clientId?: number | null;
  email: string;
}