import { inject } from "@angular/core"
import { LoginService } from "../../services/login.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AuthActions } from "./auth.actions";
import { HttpErrorResponse } from '@angular/common/http';
import { ClientActions } from "../client/client.actions";
import { AdvisorActions } from "../advisor/advisor.actions";


export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ loginRequest }) =>
                authService.login$(loginRequest).pipe(
                    switchMap((loginResponse) => {
                        const loginSuccessAction = AuthActions.loginSuccess({ loginResponse });
                        const additionalAction =
                            loginResponse.role === 'client'
                                ? ClientActions.clientLoad()
                                : AdvisorActions.advisorLoad();

                        return of(loginSuccessAction, additionalAction);
                    }),
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

export const forgotPasswordEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.forgotPassword),
            mergeMap(({ email }) =>
                authService.forgotPassword$(email).pipe(
                    map(() => AuthActions.forgotPasswordSuccess()),
                    catchError((err: HttpErrorResponse) =>
                        of(AuthActions.forgotPasswordFailure({
                            message: err.error?.detail ?? err.message ?? 'שליחת אימייל נכשלה'
                        }))
                    ),
                )
            )
        );
    },
    { functional: true }
);

export const resetPasswordEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.resetPassword),
            mergeMap(({ token, newPassword }) =>
                authService.resetPassword$(token, newPassword).pipe(
                    map(() => AuthActions.resetPasswordSuccess()),
                    catchError((err: HttpErrorResponse) =>
                        of(AuthActions.resetPasswordFailure({
                            message: err.error?.detail ?? err.message ?? 'איפוס נכשל, נסה שוב'
                        }))
                    ),
                )
            )
        );
    },
    { functional: true }
);

