import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { AuthActions } from './auth.actions';
import { AuthUser } from '../../models/auth';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { loginResponse }) => ({
    ...state,
    accessToken: loginResponse.access_token,
    isAuthenticated: true,
    user: {
      userId: loginResponse.user_id,
      role: loginResponse.role,
      advisorId: loginResponse.advisor_id ?? null,
      clientId: loginResponse.client_id ?? null,
      email: loginResponse.email
    } as AuthUser,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { message }) => ({
    ...state,
    loading: false,
    error: message,
  })),

  on(AuthActions.refresh, (state) => ({ ...state, loading: true })),
  on(AuthActions.refreshSuccess, (state, {refreshResponse }) => ({
    ...state,accessToken:refreshResponse.access_token, isAuthenticated: true, loading: false, error: null
  })),
  on(AuthActions.refreshFailure, (state, { message }) => ({
    ...state, isAuthenticated: false, user: null, loading: false, error: message
  })),

  on(AuthActions.logout, (state) => ({ ...state, loading: true })),
  on(AuthActions.logoutSuccess, (state) => ({
    ...state,accessToken:null, isAuthenticated: false, user: null, loading: false, error: null
  })),
  on(AuthActions.logoutFailure, (state, { message }) => ({
    ...state, loading: false, error: message
  })),
  on(AuthActions.forgotPassword, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.forgotPasswordSuccess, (state) => ({
    ...state, loading: false, error: null
  })),
  on(AuthActions.forgotPasswordFailure, (state, { message }) => ({
    ...state, loading: false, error: message
  })),
);
