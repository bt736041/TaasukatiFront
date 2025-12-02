
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
  user_name:string;
  role: Role;
  advisor_id?: number | null;
  client_id?: number | null;
  email: string;
}


export interface TokenPayload {
  sub: number; // או מספר – תלוי איך השרת יוצר את הטוקן
  role: 'client' | 'advisor';
  user_name: string;
  advisor_id?: number;
  client_id?: number;
  email?: string;
  [key: string]: any;
}

export type RefreshRequest = void;

export interface RefreshResponse {
  access_token: string;
  token_type: 'bearer';
}

export interface AuthUser {
  userId: number;
  userName:string;
  role: Role;
  advisorId?: number | null;
  clientId?: number | null;
  email: string;
}