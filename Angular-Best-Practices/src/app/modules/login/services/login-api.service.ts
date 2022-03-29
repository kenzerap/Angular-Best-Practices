import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class LoginApiService {

  private baseUrl = `${environment.apiUrl}/user`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public login(userName: string, passWord: string): Observable<boolean> {
    if (userName === 'admin' && passWord === '123456') {
      return of(true)
    }
    else {
      return throwError(false);
    }
  }

}
