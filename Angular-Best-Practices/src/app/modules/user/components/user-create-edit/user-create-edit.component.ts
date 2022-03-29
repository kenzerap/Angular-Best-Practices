import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserActions } from '@app/modules/user/store/actions';
import { filter, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models/user.model';
import * as fromUser from '@app/modules/user/store/reducers';

@Component({
  selector: 'app-user-create-edit',
  templateUrl: './user-create-edit.component.html',
  styleUrls: ['./user-create-edit.component.scss']
})
export class UserCreateEditComponent implements OnInit, OnDestroy {

  userGuid: string;
  userDetail$: Observable<User> = this.store.pipe(select(fromUser.selectUserDetail));
  loading$: Observable<boolean> = this.store.pipe(select(fromUser.selectLoading));
  completionSubject = new Subject();

  formGroup: FormGroup = this.fb.group({
    id: [null],
    name: [null, [Validators.required]],
    phone: [null],
    email: [null, [Validators.required, Validators.email]],
    address: [null],
    dateOfBirth: [null],
    money: [null],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private store: Store<any>
  ) {
    this.activatedRoute.params.pipe(
      filter((param: Params) => !!param.userId)
    ).subscribe((param: Params) => {
      this.userGuid = param.userId;

      this.store.dispatch(UserActions.getUserDetail({ userId: this.userGuid }));
    });
  }

  ngOnInit() {
    this.userDetail$.pipe(
      takeUntil(this.completionSubject)
    ).subscribe((userDetail: User) => {
      this.formGroup.patchValue(userDetail);
    })
  }

  submit() {
    this.store.dispatch(UserActions.createUser({ user: this.formGroup.value }));
  }

  back() {
    this.router.navigate(['user']);
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.resetUserState());
    this.completionSubject.complete();
  }

}
