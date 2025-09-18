import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ResultsState } from "./results.state";

export const RESULT_FEATURE_KEY = 'results';

export const selectClientState = createFeatureSelector<ResultsState>(RESULT_FEATURE_KEY);

export const selectTypes= createSelector(
    selectClientState,
    (state: ResultsState) => state.types
);
