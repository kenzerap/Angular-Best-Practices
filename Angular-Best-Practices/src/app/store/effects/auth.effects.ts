import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthActions } from '../actions';
import * as fromRepayment from '@app/modules/user/store/reducers';
import { Store, select } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginApiService } from '@app/modules/login/services/login-api.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(AuthActions.login),
      mergeMap(({ userName, passWord }) => {
        return this.loginApiService.login(userName, passWord).pipe(
          map(() => {
            return AuthActions.loginSuccess({ userName, passWord });
          }),
          catchError(() => of(AuthActions.loginFailed()))
        )
      })
    ));

  navigateDashboard$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        AuthActions.loginSuccess,
      ),
      tap(() => {
        this.router.navigate(['']);
      })
    ), { dispatch: false });

  loginFailed$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        AuthActions.loginFailed,
      ),
      tap(() => {
        this.snackBar.open('Username or password incorrect', null, { duration: 3000 });
      })
    ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private loginApiService: LoginApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<any>
  ) { }

}
