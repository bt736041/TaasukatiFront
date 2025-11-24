import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 0) {
          this.snackBar.open(
            'לא ניתן לבצע את הפעולה כעת, נסה מאוחר יותר שוב',
            'סגור',
            {
              duration: 5000,
              direction: 'rtl',
              verticalPosition: 'top',
              horizontalPosition: 'center'
            }
          );
        }
        return throwError(() => error);
      })
    );
  }
}
