import { inject } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ClientHttpService } from '../../services/client-http.service'
import { AdvisorActions } from './advisor.actions'
import { catchError, concatMap, filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs'
import { AdvisorService } from '../../services/advisor.service'
import { Store } from '@ngrx/store'
import { selectClientId, selectUserId } from '../auth/auth.selectors'
import { AuthActions } from '../auth/auth.actions'
import { RegionService } from '../../services/region.service'
import { selectAdvisor } from './advisor.selectors'

const hasId = <T>(t: [T, number | undefined]): t is [T, number] =>
    t[1] !== undefined;


export const loadAdvisorEffect = createEffect(
    (actions$ = inject(Actions), advisorService = inject(AdvisorService), store = inject(Store)) => {
        return actions$.pipe(
            ofType(AdvisorActions.advisorLoad),
            withLatestFrom(store.select(selectUserId)),
            filter(hasId),
            concatMap(([_, id]) =>
                advisorService.getAdvisorById$(id).pipe(
                    concatMap((advisor) =>
                        of(
                            AdvisorActions.advisorLoadSuccess({ advisor }),
                            AdvisorActions.clientsLoad({ advisorId: advisor.id!}),
                            AdvisorActions.regionsLoad()
                        )
                    ),
                    catchError((error: { message: string }) =>
                        of(AdvisorActions.advisorLoadFailure({ message: error.message }))),
                ),
            ),
        );
    },
    { functional: true },
);


export const loadClientsEffect = createEffect(
    (actions$ = inject(Actions), clientService = inject(ClientHttpService)) => {
        return actions$.pipe(
            ofType(AdvisorActions.clientsLoad),
            concatMap(({ advisorId }) =>
                clientService.getClientsByAdvisor$(advisorId).pipe(
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

export const loadRegionsEffect = createEffect(
    (actions$ = inject(Actions), regionService = inject(RegionService)) => {
        return actions$.pipe(
            ofType(AdvisorActions.regionsLoad),
            mergeMap(() =>
                regionService.getRegions$().pipe(
                    map((regions) => AdvisorActions.regionsLoadSuccess({ regions })),
                    catchError((error: { message: string }) =>
                        of(AdvisorActions.regionsLoadFailure({ message: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true }
);


export const createClientEffect = createEffect(
    (actions$ = inject(Actions), clientService = inject(ClientHttpService),store = inject(Store)
) => {
        return actions$.pipe(
            ofType(AdvisorActions.createClient),
           withLatestFrom(store.select(selectAdvisor)), 
              mergeMap(([{ client }, advisor]) =>
                clientService.createClient$(
                    {...client,}, advisor.type_tests 
                ).pipe(
                    mergeMap((createdClient) => [
                        AdvisorActions.clientsLoad({ advisorId: advisor.id! }),
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

export const createAdvisorEffect = createEffect(
    (actions$ = inject(Actions), advisorService = inject(AdvisorService)) => {
        return actions$.pipe(
            ofType(AdvisorActions.createAdvisor),
            mergeMap(({ advisor }) =>
                advisorService.createAdvisor$(advisor).pipe(
                    switchMap((createdAdvisor) =>
                        of(
                            AdvisorActions.createAdvisorSuccess({ advisor: createdAdvisor }),
                            AuthActions.login({
                                loginRequest: {
                                    email: createdAdvisor.email,
                                    password: advisor.password,
                                    role: 'advisor',
                                },
                            }),
                        )
                    ),
                    catchError((error) =>
                        of(AdvisorActions.createAdvisorFailure({ message: error.message })),
                    ),
                ),
            ),
        );
    },
    { functional: true }
);
