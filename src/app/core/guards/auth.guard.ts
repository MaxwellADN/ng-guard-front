import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtHelperService = new JwtHelperService();
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }

  const token = <string>localStorage.getItem('token');
  if (!token) {
    window.location.href = '/auth/login';
    return false;
  }
  if (jwtHelperService.isTokenExpired(token)) {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
    return false;
  }
  return true;
};
