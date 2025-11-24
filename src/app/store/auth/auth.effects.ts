import { inject } from "@angular/core"
import { LoginService } from "../../services/login.service"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, exhaustMap, map, mergeMap, of, switchMap, tap } from "rxjs";
import { AuthActions } from "./auth.actions";
import { HttpErrorResponse } from '@angular/common/http';
import { ClientActions } from "../client/client.actions";
import { AdvisorActions } from "../advisor/advisor.actions";
import { ResultsActions } from "../results/results.actions";
import { Router } from "@angular/router";
import { LoginResponse, TokenPayload } from "../../models/auth";
import {jwtDecode} from "jwt-decode";


export const loginEffect = createEffect(
    (actions$ = inject(Actions), authService = inject(LoginService)) => {
        return actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ loginRequest }) =>
                authService.login$(loginRequest).pipe(
                    switchMap((loginResponse) => {
                        const loginSuccessAction = AuthActions.loginSuccess({ loginResponse });
                        const loadTypes = ResultsActions.getTypes();
                        const additionalAction =
                            loginResponse.role === 'client'
                                ? ClientActions.clientLoad()
                                : AdvisorActions.advisorLoad();

                        return of(loginSuccessAction, additionalAction, loadTypes);
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
  (actions$ = inject(Actions), authService = inject(LoginService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(AuthActions.refresh),
      mergeMap(() =>
        authService.refresh$().pipe(
          switchMap((refreshResponse) => {
            // חילוץ נתונים מה-Access Token
            const decoded: TokenPayload = jwtDecode(refreshResponse.access_token);

            const loginResponse:LoginResponse = {
              access_token: refreshResponse.access_token,
              role: decoded.role,
              token_type: 'bearer',
              user_id: +decoded.sub,
              user_name: decoded.user_name ?? '',
              advisor_id: decoded.advisor_id ?? null,
              client_id: decoded.client_id ?? null,
              email: decoded.email ?? '',
            };

            const successAction = AuthActions.loginSuccess({ loginResponse });
            const loadTypes = ResultsActions.getTypes();
            console.log(loginResponse);
            
            const roleLoad =
              decoded.role === 'client'
                ? ClientActions.clientLoad()
                : AdvisorActions.advisorLoad();

            return of(successAction, roleLoad, loadTypes);
          }),
          catchError((err: HttpErrorResponse) => {
            const currentUrl = router.url;

            return of(
              AuthActions.setRedirectURL({ url: currentUrl }),
              AuthActions.refreshFailure({
                message: err.error?.detail ?? err.message ?? 'התחברות מחדש נדרשת',
              })
            );
          })
        )
      )
    );
  },
  { functional: true }
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
                    map(() => {
                        return AuthActions.resetPasswordSuccess();
                    }),
                    catchError((err: HttpErrorResponse) => {
                        return of(AuthActions.resetPasswordFailure({
                            message: err.error?.detail ?? err.message ?? 'איפוס נכשל, נסה שוב'
                        }));
                    }),
                )
            )
        );
    },
    { functional: true }
);

