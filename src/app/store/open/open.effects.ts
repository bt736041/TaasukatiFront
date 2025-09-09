import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { OpenQuestionService } from "../../services/open-question.service"
import { catchError, filter, mergeMap, of, switchMap, withLatestFrom } from "rxjs"
import { OpenActions } from "./open.actions"
import { HttpErrorResponse } from "@angular/common/http"
import { Store } from "@ngrx/store"
import { selectClientId } from "../auth/auth.selectors"
import { selectcurrentQuestionId } from "./open.selectors"
import { OpenAnswer } from "../../models/open-question"
import { selectClientTestId } from "../client/client.selectors"

const hasIds = (t: [any, number | undefined, number | undefined]): t is [any, number, number] =>
    t[1] != null && t[2] != null;

const hasTestId = <T>(t: [T, number | undefined]): t is [T, number] =>
    t[1] !== undefined;

export const StartOpenFlowEffect = createEffect(
    (actions$ = inject(Actions), openService = inject(OpenQuestionService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(OpenActions.startOpenFlow),
            withLatestFrom(store.select(selectClientTestId)),
            filter(hasTestId),
            mergeMap(([_, testId]) =>
                openService.getNewQuestion$(testId).pipe(
                    switchMap((question) => {
                        const base = OpenActions.startOpenFlowSuccess({ question });
                        if (question.status === 'error') {
                            return [OpenActions.openAnswerProcessing({ error: question.clarification_prompt ?? 'Error occurred' })];
                        }
                        return [base]
                    }),
                    catchError((err: HttpErrorResponse) =>
                        of(OpenActions.startOpenFlowFailure({
                            message: err.error?.detail ?? err.message ?? 'Starting open flow failed'
                        }))
                    ),
                ),
            ),
        );
    }
    , { functional: true }
);

export const SubmitOpenAnswerEffect = createEffect(
    (actions$ = inject(Actions), openService = inject(OpenQuestionService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(OpenActions.submitOpenAnswer),
            withLatestFrom(
                store.select(selectClientTestId),
                store.select(selectcurrentQuestionId)
            ),
            filter(hasIds),
            switchMap(([{ userAnswer }, testId, qId]) =>
                openService.postAnswer$({ test_id: testId, question_id: qId, user_answer: userAnswer } as OpenAnswer).pipe(
                    switchMap((question) => {
                        const base = OpenActions.openAnswerProcessing({ question });
                        switch (question.status) {
                            case 'error':
                                return [OpenActions.openAnswerProcessing({ error: question.clarification_prompt ?? 'Error occurred' })];

                            case 'analysis_done':
                                return [base, OpenActions.startOpenFlow()];

                            case 'question':
                            case 'clarification':
                            default:
                                return [base];
                        }
                    }),
                    catchError(err => of(OpenActions.openAnswerProcessing({ error: err.error?.detail ?? err.message ?? 'Submitting answer failed' })))
                ),
            ),
        );
    }
    , { functional: true }
);

