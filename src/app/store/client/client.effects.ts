import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ClientHttpService } from "../../services/client-http.service";
import { Store } from "@ngrx/store";
import { ClientActions } from "./client.actions";
import { catchError, concatMap, filter, map, of, withLatestFrom } from "rxjs";
import { selectClientId } from "../auth/auth.selectors";

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
                    map((client) => ClientActions.clientLoadSuccess({ client })),
                    catchError((error: { message: string }) =>
                        of(ClientActions.clientLoadFailure({ message: error.message }))),
                    ),
                ),
            );
    },
    { functional: true },
);