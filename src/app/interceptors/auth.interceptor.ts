import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map, mergeMap, shareReplay, take } from 'rxjs/operators';
import { selectAccessToken } from '../store/auth/auth.selectors';
import { AuthActions } from '../store/auth/auth.actions';
import { LoginService } from '../services/login.service';

// One refresh call shared by all requests that fail with 401 at the same time.
let refreshInFlight$: Observable<string> | null = null;

const withToken = (req: HttpRequest<unknown>, token: string | null) =>
  token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const loginService = inject(LoginService);
  const router = inject(Router);

  // קריאות שלא מצמידים להן Authorization
  const isAuthUrl = req.url.includes('/auth/');

  // תמיד לשלוח cookies (בשביל refresh)
  const base = req.clone({ withCredentials: true });

  if (isAuthUrl) {
    return next(base);
  }

  const refreshToken$ = (): Observable<string> => {
    if (!refreshInFlight$) {
      refreshInFlight$ = loginService.refresh$().pipe(
        map(res => {
          store.dispatch(AuthActions.refreshSuccess({ refreshResponse: res }));
          return res.access_token;
        }),
        catchError(err => {
          store.dispatch(AuthActions.setRedirectURL({ url: router.url }));
          store.dispatch(AuthActions.refreshFailure({ message: 'יש להתחבר מחדש' }));
          return throwError(() => err);
        }),
        finalize(() => (refreshInFlight$ = null)),
        shareReplay(1),
      );
    }
    return refreshInFlight$;
  };

  return store.select(selectAccessToken).pipe(
    take(1),
    mergeMap(token =>
      next(withToken(base, token)).pipe(
        catchError((err: unknown) => {
          // The access token lives 30 minutes; renew it once and retry so a long test is not interrupted.
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return refreshToken$().pipe(
              mergeMap(newToken => next(withToken(base, newToken))),
              catchError(() => throwError(() => err)),
            );
          }
          return throwError(() => err);
        }),
      ),
    ),
  );
};
