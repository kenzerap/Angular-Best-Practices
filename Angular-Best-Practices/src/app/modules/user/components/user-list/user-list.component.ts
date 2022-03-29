import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import * as fromUser from '@app/modules/user/store/reducers';
import { UserActions } from '@app/modules/user/store/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]> = this.store.pipe(select(fromUser.selectUsers));
  loading$: Observable<boolean> = this.store.pipe(select(fromUser.selectLoading));

  displayedColumns: string[] = ['name', 'phone', 'email', 'address', 'dateOfBirth', 'money', 'actions'];


  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.store.dispatch(UserActions.getUsers());
  }

  createUser() {
    this.router.navigate(['user', 'create']);
  }

  editUser(guid: string) {
    this.router.navigate(['user', 'edit', guid]);
  }

  deleteUser(userId: string) {
    this.store.dispatch(UserActions.deleteUser({ userId }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(UserActions.resetUserState());
  }

}
