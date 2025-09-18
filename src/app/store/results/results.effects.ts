import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ResultsActions } from "./results.actions";
import { inject } from "@angular/core";
import { TypeService } from "../../services/type.service";
import { catchError, concatMap, map, of } from "rxjs";

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