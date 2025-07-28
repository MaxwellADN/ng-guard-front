import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUser } from '../models/user.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TokenUtils } from '../../core/utils/token.utils';
import { Role } from '../../core/enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiHost + '/auth';
  headers!: HttpHeaders;
  helper: JwtHelperService;
  
  constructor(private http: HttpClient) {
    this.helper = new JwtHelperService();
 }

  public register(user: IUser): Observable<{ token: string}> {
    return this.http.post<{ token: string }>(this.apiUrl+'/register', user);
  }

  public login(user: IUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl+'/login', user);
  }

  public passwordReset(email: string): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl+'/password-reset', { email });
  }

  public changePassword(newPassword: string, token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl+'/update-password', { newPassword }, { headers: { Authorization: `Bearer ${token}` } });
  }

  public sendEmailVerification(user: IUser, token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl+'/email-verification/send', { user }, { headers: { Authorization: `Bearer ${token}` } });
  }

  public verifyEmail(token: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl+'/verify-email', { }, { headers: { Authorization: `Bearer ${token}` } });
  }

  public ssoLogin(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl+'/sso-login', user);
  }

  public logout(): void {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }

  public getUserFromLocalStorage(): IUser | null {
    return TokenUtils.decodeToken(<string>localStorage.getItem('token'));
  }

  public isUserOwner(): boolean {
    const user = this.getUserFromLocalStorage();
    return user?.role === Role.OWNER;
  }
}
