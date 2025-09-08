// import { inject } from "@angular/core"
// import { OpenQuestionService } from "../../services/open-question.service"
// import { CloseActions } from "./closed.actions"
// import { HttpErrorResponse } from "@angular/common/http"
// import { ResultsActions } from "../results/results.actions"
// import { createAction, props } from "@ngrx/store"

// export const StartCloseFlowEffect = createEffect(
//     (actions$ = inject(Actions), closeService = inject(CloseQuestionService)) => {
//         return actions$.pipe(
//             ofType(CloseActions.startCloseFlow),
//             mergeMap(({ testId, categoryId}) =>
//                 closeService.getNewQuestion$(testId, categoryId ).pipe(
//                     switchMap((question) => {
//                         const base = CloseActions.startCloseFlowSuccess({ question });
//                         if (question.status === 'error') {
//                             return [CloseActions.closeAnswerProcessing({ error: question.error_message?? 'Error occurred' })];
//                         }
//                         return [base]
//                     }),
//                     catchError((err: HttpErrorResponse) =>
//                         of(CloseActions.startCloseFlowFailure({
//                             message: err.error?.detail ?? err.message ?? 'Starting close flow failed'
//                         }))
//                     ),
//                 ),
//             ),
//         );
//     }
//     , { functional: true }
// );

// export const SubmitCloseAnswerEffect = createEffect(
//     (actions$ = inject(Actions), closeService = inject(CloseQuestionService)) => {
//         return actions$.pipe(
//             ofType(CloseActions.submitCloseAnswer),
//             exhaustMap(({ answer }) =>
//                 closeService.postAnswer$(answer).pipe(
//                     switchMap((question) => {
//                         const base = CloseActions.closeAnswerProcessing({ question });
//                         switch (question.status) {
//                             case 'error':
//                                 return [CloseActions.closeAnswerProcessing({ error: question.error_message ?? 'Error occurred' })];
//                             case 'analysis_done':
//                                 return [base, CloseActions.startCloseFlow({ testId: answer.test_id , })];


//                             case 'clarification':
//                             default:
//                                 return [base];
//                         }

//                     }),
//                     catchError(err => of(OpenActions.openAnswerProcessing({ error: err.error?.detail ?? err.message ?? 'Submitting answer failed' })))
//                 ),
//             ),
//         );
//     }
//     , { functional: true }
// );

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {CloseActions}  from './closed.actions';
import * as Results from '../results/results.actions';
import { Store } from '@ngrx/store';
import { of, switchMap, catchError, withLatestFrom } from 'rxjs';
import { CloseQuestionService } from '../../services/close-question.service';

@Injectable()
export class ClosedEffects {
    constructor(private actions$: Actions, private api: CloseQuestionService, private store: Store) { }

    startCategory$ = createEffect(() => this.actions$.pipe(
        ofType(CloseActions.startClosedCategory),
        withLatestFrom(this.store.select((s: any) => s.closed.testId)),
        switchMap(([{ categoryId }, testId]) =>
            this.api.startCategory({ testId, categoryId }).pipe(
                switchMap(res => of(Closed.startClosedCategorySuccess({
                    categoryId,
                    status: res.status,
                    questionId: res.question_id,
                    questionText: res.question_text ?? res.follow_up_text,
                    clarification: res.clarification_prompt,
                }))),
                catchError(err => of(Closed.startClosedCategoryFailure({ error: err.message })))
            )
        )
    ));

    submit$ = createEffect(() => this.actions$.pipe(
        ofType(Closed.submitClosedAnswer),
        withLatestFrom(
            this.store.select((s: any) => s.closed.testId),
            this.store.select((s: any) => s.closed.currentCategoryId),
            this.store.select((s: any) => s.closed.byCategory)
        ),
        switchMap(([{ answer }, testId, categoryId, byCategory]) => {
            const q = byCategory[categoryId]?.currentQuestion;
            return this.api.answer({
                test_id: testId, question_id: q.id, answer_text: answer
            }).pipe(

                switchMap(res => {
                    const actions: any[] = [Closed.closedAnswerProcessed({
                        status: res.status,
                        categoryId,
                        questionId: res.question_id,
                        questionText: res.question_text ?? res.follow_up_text,
                        clarification: res.clarification_prompt
                    })];
                    if (res.status === 'analysis_done') {
                        actions.push(Results.loadResults({ testId }));
                    }
                    return of(...actions);
                }),
                catchError(err => of(Closed.closedAnswerProcessed({
                    status: 'error', categoryId,
                    error: err.message
                })))
            );
        })
    ));
}