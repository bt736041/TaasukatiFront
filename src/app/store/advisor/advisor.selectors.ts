import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AdvisorState } from "./advisor.state";

export const ADVISOR_FEATURE_KEY = 'advisor';

export const selectAdvisorState = createFeatureSelector<AdvisorState>('advisorState');

export const selectAdvisor = createSelector(
    selectAdvisorState,
    (state: AdvisorState) => state.advisor
);

export const selectClients = createSelector(
    selectAdvisorState,
    (state: AdvisorState) => state.clients
);

export const selectRegions = createSelector(
    selectAdvisorState,
    (state: AdvisorState) => state.regions
);

export const selectLastCreatedClient = createSelector(
    selectAdvisorState,
    (state: AdvisorState) => state.lastCreatedClient
);