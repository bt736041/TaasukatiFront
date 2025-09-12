import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CategoriesService } from "../../services/categories.service";
import { ClosedActions } from "./closed.actions";
import { catchError, concatMap, filter, map, mergeMap, of, switchMap, tap, withLatestFrom } from "rxjs";
import { CloseQuestionService } from "../../services/close-question.service";
import { Store } from "@ngrx/store";
import { selectClientTestId } from "../client/client.selectors";
import { selectCurrentCategoryId, selectCurrentQuestion } from "./closed.selectors";
import { HttpErrorResponse } from "@angular/common/http";
import { OpenQuestionService } from "../../services/open-question.service";
import { OpenAnswer } from "../../models/open-question";
import { CloseAnswer, CloseQuestion } from "../../models/close-question";

const hasIds = (t: [any, number | undefined, number | null | undefined]): t is [any, number, number] =>
    t[1] != null && t[2] != null;

export const loadCategoriesEffect = createEffect(
    (actions$ = inject(Actions), categoriesService = inject(CategoriesService)) => {
        return actions$.pipe(
            ofType(ClosedActions.loadCategories),
            concatMap(() =>
                categoriesService.getCategories$().pipe(
                    map((categories) => ClosedActions.loadCategoriesSuccess({ categories })),
                    catchError((error: { message: string }) =>
                        of(ClosedActions.loadCategoriesFailure({ message: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true },

);

export const StartClosedFlowEffect = createEffect(
    (actions$ = inject(Actions), closedService = inject(CloseQuestionService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(ClosedActions.startClosedFlow),
            withLatestFrom(
                store.select(selectClientTestId),
                store.select(selectCurrentCategoryId)
            ),
            filter(hasIds),
            mergeMap(([_, testId, categoryId]) => {
                return closedService.getNewQuestion$(testId, categoryId).pipe(
                    switchMap((question) => {
                        if (question.status === 'category_completed')
                            return of(ClosedActions.closedAnswerProcessing({
                                source: 'closed',
                                categoryId: categoryId ?? undefined,
                                closedQuestion: question
                            }))
                        else
                            return of(ClosedActions.startClosedFlowSuccess({ question }));

                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(ClosedActions.startClosedFlowFailure({
                            message: err.error?.detail ?? err.message ?? 'Starting closed flow failed'
                        }))
                    }),
                )
            }),
        );
    },
    { functional: true }
);

export const SubmitClosedAnswerEffect = createEffect(
    (actions$ = inject(Actions), closedService = inject(CloseQuestionService), openService = inject(OpenQuestionService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(ClosedActions.submitClosedAnswer),

            withLatestFrom(
                store.select(selectClientTestId),
                store.select(selectCurrentCategoryId),
                store.select(selectCurrentQuestion)
            ),
            filter(([{ userAnswer }, testId, categoryId, currentQuestion]) => {
                return !!testId && !!categoryId && !!currentQuestion?.id;
            }),
            switchMap(([{ userAnswer }, testId, categoryId, currentQuestion]) => {
                const isOpen = currentQuestion?.isOpen === true;
                if (isOpen) {
                    return openService.postAnswer$({
                        test_id: testId,
                        question_id: currentQuestion.id,
                        user_answer: userAnswer
                    } as OpenAnswer).pipe(
                        switchMap((question) => {
                            const base = ClosedActions.closedAnswerProcessing({
                                source: 'open',
                                categoryId: categoryId ?? undefined,
                                openQuestion: question
                            });

                            switch (question.status) {
                                case 'error':
                                    return [ClosedActions.closedAnswerProcessing({
                                        source: 'open',
                                        error: question.clarification_prompt ?? 'Error occurred'
                                    })];

                                case 'analysis_done':
                                    return [base, ClosedActions.startClosedFlow()];

                                case 'question':
                                case 'clarification':
                                default:
                                    return [base];
                            }
                        }),
                        catchError(err => {
                            return of(ClosedActions.closedAnswerProcessing({
                                source: 'open',
                                error: err.error?.detail ?? err.message ?? 'Submitting answer failed'
                            }));
                        })
                    );
                } else {
                    return closedService.postAnswer$({
                        test_id: testId,
                        question_id: currentQuestion!.id,
                        answer_text: userAnswer
                    } as CloseAnswer).pipe(
                        switchMap((question) => {
                            const base = ClosedActions.closedAnswerProcessing({
                                source: 'closed',
                                categoryId: categoryId ?? undefined,
                                closedQuestion: question
                            });

                            switch (question.status) {
                                case 'error':
                                    return [ClosedActions.closedAnswerProcessing({
                                        source: 'closed',
                                        error: question.error_message ?? 'Error occurred'
                                    })];

                                case 'analysis_done':
                                    return [ClosedActions.startClosedFlow()];

                                case 'follow_up':
                                case 'clarification':
                                case 'question':
                                default:
                                    return [base];
                            }
                        })
                    );
                }
            })
        );
    },
    { functional: true }
);
