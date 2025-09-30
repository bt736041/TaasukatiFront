import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AiResultsState } from './results.state';


export const aiResultsFeatureKey = 'aiResults';

export const selectAiResultsState = createFeatureSelector<AiResultsState>(aiResultsFeatureKey);

export const selectAiProfileById = (testId: number) =>
  createSelector(selectAiResultsState, (s) => s.entities[testId]);

export const selectAiLoadingById = (testId: number) =>
  createSelector(selectAiResultsState, (s) => !!s.loading[testId]);

export const selectAiErrorById = (testId: number) =>
  createSelector(selectAiResultsState, (s) => s.error[testId]);

export const selectTypes = createSelector(
  selectAiResultsState,
  (state) => (state as any).types as Array<{ id: number; name: string }>
);