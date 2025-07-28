import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  get(userId: string): Observable<IUser | null> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`, {
      headers: this.headers,
    });
  }

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user, {
      headers: this.headers,
    });
  }

  update(userId: string, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${userId}`, user, {
      headers: this.headers,
    });
  }

  updateEmail(email: string): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/email/update`, { email }, {
      headers: this.headers,
    });
  }

  getPaginated(pagination: any): Observable<{ results: IUser[]; records: number }> {
    return this.http.get<{ results: IUser[]; records: number }>(
      `${this.apiUrl}/paginate`,
      {
        params: pagination,
        headers: this.headers,
      }
    );
  }
}