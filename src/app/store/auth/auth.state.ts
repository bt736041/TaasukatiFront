import { AuthUser } from "../../models/auth";

export interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};
