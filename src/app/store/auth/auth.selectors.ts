import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_FEATURE_KEY = 'auth';
export const selectAuthFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(selectAuthFeature, s => s.isAuthenticated);
export const selectAuthUser = createSelector(selectAuthFeature, s => s.user);
export const selectAuthLoading = createSelector(selectAuthFeature, s => s.loading);
export const selectAuthError = createSelector(selectAuthFeature, s => s.error);
export const selectAccessToken = createSelector(selectAuthFeature, s => s.accessToken);


export const selectRole = createSelector(selectAuthUser, u => u?.role ?? null);
export const selectAdvisorId = createSelector(selectAuthUser, u => u?.advisorId ?? null);
export const selectClientId = createSelector(selectAuthUser, u => u?.clientId ?? null);
