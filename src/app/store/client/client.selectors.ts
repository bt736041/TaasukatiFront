import { createFeatureSelector, createSelector } from "@ngrx/store";
import { clientState } from "./client.state";

export const CLIENT_FEATURE_KEY = 'client';

const selectClientState = createFeatureSelector<clientState>('clientState');

export const selectClient = createSelector(
    selectClientState,
    (state: clientState) => state.client
);

export const selectClientError = createSelector(
    selectClientState,
    (state: clientState) => state.error
);

export const selectClientTestId = createSelector(
    selectClientState,
    (state: clientState) => state.client?.active_test_id
);