import { inject } from "@angular/core"
import { LoginService } from "../../services/login.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthActions } from "./auth.actions";
import { HttpErrorResponse } from '@angular/common/http';


export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ loginRequest }) =>
                authService.login$(loginRequest).pipe(
                    map((loginResponse) => AuthActions.loginSuccess({ loginResponse })),
                    catchError((err: HttpErrorResponse) =>
                        of(AuthActions.loginFailure({
                            message: err.error?.detail ?? err.message ?? 'Login failed'
                        }))

                    ),
                ),
            ),
        );
    },
    { functional: true }
);

export const refreshEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.refresh),
            mergeMap(() =>
                authService.refresh$().pipe(
                    map((refreshResponse) => AuthActions.refreshSuccess({ refreshResponse })),
                    catchError((err: HttpErrorResponse) =>
                        of(AuthActions.loginFailure({
                            message: err.error?.detail ?? err.message ?? 'Refresh failed'
                        }))
                    ),
                ),
            ),
        );
    }
    , { functional: true }
);
export const logoutEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.logout),
            mergeMap(() =>
                authService.logout$().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError((err: HttpErrorResponse) =>
                        of(AuthActions.loginFailure({
                            message: err.error?.detail ?? err.message ?? 'Logout failed'
                        }))
                    ),
                ),
            ),
        );
    }
    , { functional: true }
);