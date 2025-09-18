import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientHttpService } from "../../services/client-http.service";
import { Store } from "@ngrx/store";
import { ClientActions } from "./client.actions";
import { catchError, concatMap, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { selectClientId } from "../auth/auth.selectors";
import { AdvisorService } from "../../services/advisor.service";

const hasId = <T>(t: [T, number | undefined]): t is [T, number] =>
    t[1] !== undefined;

export const loadClientEffect = createEffect(
    (actions$ = inject(Actions), clientService = inject(ClientHttpService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(ClientActions.clientLoad),
            withLatestFrom(store.select(selectClientId)),
            filter(hasId),
            concatMap(([_, id]) =>
                clientService.getClientById$(id).pipe(
                      mergeMap((client) => [
                        ClientActions.clientLoadSuccess({ client }),
                        ClientActions.getTypeTest({advisor_id: client.advisor_id})
                    ]),
                    catchError((error: { message: string }) =>
                        of(ClientActions.clientLoadFailure({ message: error.message }))),
                    ),
                ),
            );
    },
    { functional: true },
);

export const getTypeTestEffect = createEffect(
    (actions$ = inject(Actions), advisorService = inject(AdvisorService)) => {
        return actions$.pipe(
            ofType(ClientActions.getTypeTest),
            concatMap(({advisor_id})=>
                advisorService.getAdvisorById$(advisor_id).pipe(
                    map((advisor) => ClientActions.getTypeTestSuccess({ test_type: advisor.type_tests})),
                    catchError((error: { message: string }) =>
                        of(ClientActions.getTypeTestFailure({ message: error.message }))),
                )
            )
        )
    },
    { functional: true }
);
      


