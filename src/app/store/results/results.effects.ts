import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ResultsActions } from "./results.actions";
import { inject } from "@angular/core";
import { TypeService } from "../../services/type.service";
import { catchError, concatMap, map, of } from "rxjs";
import { AiResultsService } from "../../services/ai-results.service";

export const getTypesEffect = createEffect(
  (actions$ = inject(Actions), typeService = inject(TypeService)) => {
    return actions$.pipe(
      ofType(ResultsActions.getTypes),
      concatMap(() =>
        typeService.getTypes$().pipe(
          map((types) => ResultsActions.getTypesSuccess({ types })),
          catchError((error: { message: string }) =>
            of(ResultsActions.getTypesFailure({ message: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

// export const loadProfile = createEffect(
//   (actions$ = inject(Actions), svc = inject(AiResultsService)) => {
//     return actions$.pipe(
//       ofType(ResultsActions.loadProfile),
//       concatMap(({ testId }) =>
//         svc.getProfile$(testId).pipe(
//           map((data) => ResultsActions.loadProfileSuccess({ testId, data })),
//           catchError((err) =>
//             of(
//               ResultsActions.loadProfileFailure({
//                 testId,
//                 error: err?.error?.detail || "בקשה נכשלה",
//               })
//             )
//           )
//         )
//       )
//     );
//   }
//   ,  { functional: true }
// );

export const loadProfile = createEffect(
  (actions$ = inject(Actions), svc = inject(AiResultsService)) => {
    return actions$.pipe(
      ofType(ResultsActions.loadProfile),
      concatMap(({ testId }) =>
        svc.getProfile$(testId).pipe(
map((response) => {
  if (response?.incomplete) {
    return ResultsActions.loadProfileIncomplete({
      testId,
      message: response.message || 'המבחן טרם הושלם',
    });
  }

  return ResultsActions.loadProfileSuccess({
    testId,
    data: response,
  });
}),

          catchError((err) =>
            of(
              ResultsActions.loadProfileFailure({
                testId,
                error: err?.error?.detail || 'בקשה נכשלה',
              })
            )
          )
        )
      )
    );
  },
  { functional: true }
);
