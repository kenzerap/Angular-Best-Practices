import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import * as fromRoot from '@app/store/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private store: Store<fromRoot.AppState>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkForCanActivate(route, state);
  }

  checkForCanActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.store.pipe(select(fromRoot.selectUserInfo),
      map(userInfo => {
        if (userInfo.role !== _route.data.permission) {
          this.router.navigate(['404']);
          return false;
        }

        return true;
      }),
      take(1)
    );
  }
}
