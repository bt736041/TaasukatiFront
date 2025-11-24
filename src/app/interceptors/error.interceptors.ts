// error.interceptor.ts
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse
} from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        // 🛑 לא מציגים alert אם זו קריאת refresh
        if (req.url.includes('/auth/refresh')) {
          return of(); // מדלגים בשקט
        }

        // ✅ כל שאר הקריאות – מציגים alert
        alert('השרת לא זמין כעת. נסה שוב בעוד כמה רגעים.');

        return of(); // עוצרים את שידור השגיאה הלאה
      }

      // כל שגיאה אחרת תמשיך הלאה
      return throwError(() => err);
    })
  );
};

