import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClosedState } from "./closed.state";

export const CLOSED_FEATURE_KEY = 'closed';
const selectClosedFeature = createFeatureSelector<ClosedState>(CLOSED_FEATURE_KEY);

export const selectCurrentCategoryId = createSelector(selectClosedFeature, s => s.currentCategoryId);

export const selectCurrentQuestion = createSelector(
  selectClosedFeature,
  (s) => {
    const cid = s.currentCategoryId;
    if (cid == null) return null;

    const cat = s.byCategory[cid];
    if (!cat || !cat.currentQuestion) return null;

    return cat.currentQuestion;
  });

export const selectClosedCategories = createSelector(
  selectClosedFeature,
  s => s.categories
);

export const selectCurrentCategoryState = createSelector(
  selectClosedFeature,
  s => {
    const cid = s.currentCategoryId;
    if (cid == null) return null;
    return s.byCategory[cid] ?? null;
  }
);

export const selectCurrentChatHistory = createSelector(
  selectCurrentCategoryState,
  cat => cat?.chatHistory ?? []
);

export const selectChatHistoryByCategoryId = (categoryId: number) => createSelector(
  selectClosedFeature,
  s => s.byCategory[categoryId]?.chatHistory ?? []
);

export const selectCurrentClosedStatus = createSelector(
  selectCurrentCategoryState,
  cat => cat?.status ?? 'idle'
);

export const selectClosedLoading = createSelector(
  selectClosedFeature,
  s => s.loading
);

export const selectClosedError = createSelector(
  selectClosedFeature,
  s => s.error
);

export const selectCurrentQuestionId = createSelector(
  selectClosedFeature,
  s => {
    const cid = s.currentCategoryId;
    if (cid == null) return null;
    return s.byCategory[cid]?.currentQuestion?.id ?? null;
  }
);

export const selectCategoryById = (categoryId: number) => createSelector(
  selectClosedFeature,
  s => s.byCategory[categoryId] ?? null
);

