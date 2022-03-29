import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';

import { select, Store } from '@ngrx/store';
import * as fromRoot from '@app/store/reducers';

@Injectable({
  providedIn: 'root',
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(private store: Store<any>) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'auth/login') {
      return next.handle(req);
    } else {
      return this.store.pipe(select(fromRoot.selectUserInfo),
        map((userInfo: any) => userInfo.token),
        mergeMap((token) => {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next.handle(req);
        })
      );
    }
  }
}
