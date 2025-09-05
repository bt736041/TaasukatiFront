import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ClientHttpService } from '../../services/client-http.service'
import { AdvisorActions } from './advisor.actions'
import { catchError, concatMap, map, mergeMap, of } from 'rxjs'

export const loadClientsEffect = createEffect(
    (actions$ = inject(Actions), clientService = inject(ClientHttpService)) => {
        return actions$.pipe(
            ofType(AdvisorActions.clientsLoad),
            concatMap(({ id }) =>
                clientService.getClientsByAdvisor$(id).pipe(
                    map((clients) => AdvisorActions.clientsLoadSuccess({ clients })),
                    catchError((error: { message: string }) =>
                        of(AdvisorActions.clientsLoadFailure({ message: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true },
);

export const createClientEffect = createEffect(
    (actions$ = inject(Actions), clientService = inject(ClientHttpService)) => {
        return actions$.pipe(
            ofType(AdvisorActions.createClient),
            mergeMap(({ client, test_type, advisor_id }) =>
                clientService.createClient$(client, test_type).pipe(
                    mergeMap((createdClient) => [
                        AdvisorActions.clientsLoad({ id: advisor_id }),
                        AdvisorActions.createClientSuccess({ client: createdClient }),
                    ]),
                    catchError((error) =>
                        of(AdvisorActions.createClientFailure({ message: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true }
);