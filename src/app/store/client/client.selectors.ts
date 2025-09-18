import { createFeatureSelector, createSelector } from "@ngrx/store";
import { clientState } from "./client.state";

export const CLIENT_FEATURE_KEY = 'client';

export const selectClientState = createFeatureSelector<clientState>(CLIENT_FEATURE_KEY);

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

export const selectTypeTest = createSelector(
    selectClientState,
    (state: clientState) => state.test_type
);