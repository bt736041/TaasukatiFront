import { createFeatureSelector, createSelector } from "@ngrx/store";
import { clientState } from "./client.state";

export const CLIENT_FEATURE_KEY = 'client';

const selectClientState = createFeatureSelector<clientState>('clientState');

export const selectClient = createSelector(
    selectClientState,
    (state: clientState) => state.client
);
export const selectCategories = createSelector(
    selectClientState,
    (state: clientState) => state.categories
);
export const selectClientError = createSelector(
    selectClientState,
    (state: clientState) => state.error
);