import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root',
})
export class UserApiService {

  private baseUrl = `${environment.apiUrl}/user`;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}`
    return this.httpClient
      .get<User[]>(url)
  }

  public getUserDetail(userId: string): Observable<User> {
    const url = `${this.baseUrl}/${userId}`
    return this.httpClient
      .get<User>(url)
  }

  public createUser(user: User): Observable<User> {
    const url = `${this.baseUrl}`
    return this.httpClient
      .post<User>(url, user)
  }

  public editUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.guid}`
    return this.httpClient
      .put<User>(url, user)
  }

  public deleteUser(userId: string): Observable<User> {
    const url = `${this.baseUrl}/${userId}`
    return this.httpClient
      .delete<User>(url)
  }

}
