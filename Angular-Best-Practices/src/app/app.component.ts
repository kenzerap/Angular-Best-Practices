import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromAuth from '@app/store/reducers';
import { map } from 'rxjs/operators';
import { AuthActions } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-Best-Practices';
  token$: Observable<string> = this.store.pipe(select(fromAuth.selectUserInfo)).pipe(
    map(userInfo => {
      return userInfo?.token;
    })
  );

  constructor(private store: Store<any>) {
    const userInfo = {
      token: localStorage.getItem('token'),
      userName: localStorage.getItem('userName'),
      role: localStorage.getItem('role')
    }

    this.store.dispatch(AuthActions.saveUserInfo({ userInfo }));
  }
}
