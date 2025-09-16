import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OpenState } from "./open.state";

export const OPEN_FEATURE_KEY = 'open';
const selectOpenFeature = createFeatureSelector<OpenState>(OPEN_FEATURE_KEY);

export const selectTestId = createSelector(selectOpenFeature, s => s.testId);
export const selectCurrentQuestion = createSelector(selectOpenFeature, s => s.currentQuestion);
export const selectChatHistory = createSelector(selectOpenFeature, s => s.chatHistory);
export const selectOpenStatus = createSelector(selectOpenFeature, s => s.status);
export const selectOpenLoading = createSelector(selectOpenFeature, s => s.loading);
export const selectOpenError = createSelector(selectOpenFeature, s => s.error);
export const selectcurrentQuestionId = createSelector(selectOpenFeature, s => s.currentQuestion?.id);
