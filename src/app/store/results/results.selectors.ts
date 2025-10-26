import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AiResultsState } from './results.state';

export const AI_RESULT_FEATURE_KEY = 'results';

export const selectAiResultsState = createFeatureSelector<AiResultsState>(AI_RESULT_FEATURE_KEY);

export const selectAiProfileById = (testId: number) =>
  createSelector(
    selectAiResultsState,
    (s) => s?.entities?.[testId]
  );

export const selectAiLoadingById = (testId: number) =>
  createSelector(
    selectAiResultsState,
    (s) => !!s?.loading?.[testId]
  );

export const selectAiErrorById = (testId: number) =>
  createSelector(
    selectAiResultsState,
    (s) => s?.error?.[testId]
  );

export const selectTypes = createSelector(
  selectAiResultsState,
  (state) => state.types
);

export const selectAiIncompleteById = (testId: number) =>
  createSelector(
    selectAiResultsState, 
    state => state.incomplete[testId]);

