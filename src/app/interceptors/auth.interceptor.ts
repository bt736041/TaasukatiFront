import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../store/auth/auth.selectors';
import { take, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  // קריאות שלא מצמידים להן Authorization
  const isAuthUrl =
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/refresh');

  // תמיד לשלוח cookies (בשביל refresh)
  const base = req.clone({ withCredentials: true });

  // ל-login/refresh לא צריך Authorization
  if (isAuthUrl) {
    return next(base);
  }

  // לשאר הבקשות – מצמידים Authorization אם יש token
  return store.select(selectAccessToken).pipe(
    take(1),
    mergeMap(token => {
      const finalReq = token
        ? base.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
        : base;
      return next(finalReq);
    })
  );
};