import { inject } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { OpenQuestionService } from "../../services/open-question.service"
import { catchError, exhaustMap, map, mergeMap, of, switchMap } from "rxjs"
import { OpenActions } from "./open.actions"
import { HttpErrorResponse } from "@angular/common/http"
import { ResultsActions } from "../results/results.actions"

export const StartOpenFlowEffect = createEffect(
    (actions$ = inject(Actions), openService = inject(OpenQuestionService)) => {
        return actions$.pipe(
            ofType(OpenActions.startOpenFlow),
            mergeMap(({ testId }) =>
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
    (actions$ = inject(Actions), openService = inject(OpenQuestionService)) => {
        return actions$.pipe(
            ofType(OpenActions.submitOpenAnswer),
            exhaustMap(({ answer }) =>
                openService.postAnswer$(answer).pipe(
                    switchMap((question) => {
                        const base = OpenActions.openAnswerProcessing({ question });
                        switch (question.status) {
                            case 'error':
                                return [OpenActions.openAnswerProcessing({ error: question.clarification_prompt ?? 'Error occurred' })];

                            case 'analysis_done':
                                return [base, OpenActions.startOpenFlow({ testId: answer.test_id })];

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

