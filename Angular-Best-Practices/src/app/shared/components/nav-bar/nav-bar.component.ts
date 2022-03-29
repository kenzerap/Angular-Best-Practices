import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Routing } from './routing.model';
import { AuthActions } from '@app/store/actions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  routings: Routing[] = [
    { name: 'Home', url: '' },
    { name: 'User', url: '/user' }
  ];

  constructor(private router: Router, private store: Store<any>) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.store.dispatch(AuthActions.clearState());
  }

}
