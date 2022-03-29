import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UserActions } from '../actions';
import * as fromRepayment from '@app/modules/user/store/reducers';
import { Store, select } from '@ngrx/store';
import { merge, of } from 'rxjs';
import { UserApiService } from '../../services/user-api.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.getUsers),
      mergeMap(() => {
        return this.userApiService.getUsers().pipe(
          map((users: User[]) => {
            return UserActions.getUsersSuccess({ users });
          }),
          catchError(() => of(UserActions.getUsersFailed()))
        )
      })
    ));

  getUserDetail$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.getUserDetail),
      mergeMap(({ userId }) => {
        return this.userApiService.getUserDetail(userId).pipe(
          map((user: User) => {
            return UserActions.getUserDetailSuccess({ user });
          }),
          catchError(() => of(UserActions.getUserDetailFailed()))
        )
      })
    ));

  createUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) => {
        return this.userApiService.createUser(user).pipe(
          map(() => {
            this.snackBar.open('Create successfully', null, { duration: 3000 });
            return UserActions.createUserSuccess();
          }),
          catchError(() => of(UserActions.createUserFailed()))
        )
      })
    ));

  editUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.editUser),
      mergeMap(({ user }) => {
        return this.userApiService.editUser(user).pipe(
          map(() => {
            this.snackBar.open('Save successfully', null, { duration: 3000 });
            return UserActions.editUserSuccess();
          }),
          catchError(() => of(UserActions.editUserFailed()))
        )
      })
    ));

  deleteUser$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.deleteUser),
      mergeMap(({ userId }) => {
        return this.userApiService.deleteUser(userId).pipe(
          map(() => {
            this.snackBar.open('Delete successfully', null, { duration: 3000 });
            return UserActions.deleteUserSuccess();
          }),
          catchError(() => of(UserActions.deleteUserFailed()))
        )
      })
    ));

  navigateToList$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        UserActions.createUserSuccess,
        UserActions.editUserSuccess
      ),
      tap(() => {
        this.router.navigate(['user']);
      })
    ), { dispatch: false });

  deleteUserSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(UserActions.deleteUserSuccess),
      mergeMap(() => {
        return of(UserActions.getUsers());
      })
    ));

  constructor(
    private actions$: Actions,
    private userApiService: UserApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<any>
  ) { }

}
