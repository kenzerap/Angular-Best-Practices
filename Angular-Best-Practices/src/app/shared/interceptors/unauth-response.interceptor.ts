import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthActions } from '@app/store/actions';
import * as fromRoot from '@app/store/reducers';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UnauthResponseInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<fromRoot.AppState>,
    private router: Router
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.store.dispatch(AuthActions.clearState());
            this.router.navigate(['login']);
            return EMPTY;
          }

          return throwError(err);
        })
      );
  }
}
