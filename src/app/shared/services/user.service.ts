import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {

  constructor(http: HttpClient) {
    super(http, '/users');
  }

  public get(userId: string): Observable<IUser | null> {
    return this.http.get<IUser>(`${this.apiUrl}/single/${userId}`, {
      headers: this.headers,
    });
  }

  public create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user, {
      headers: this.headers,
    });
  }

  public update(userId: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${userId}`, user, {
      headers: this.headers,
    });
  }

  public updateEmail(email: string): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/email/update`, { email }, {
      headers: this.headers,
    });
  }

  public delete(userId: string) {
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      headers: this.headers,
      observe: 'response'
    });
  }
}