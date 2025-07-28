import { CanActivateFn } from '@angular/router';
import { TokenUtils } from '../utils/token.utils';
import { IUser } from '../../shared/models/user.interface';

export const ownerGuard: CanActivateFn = (route, state) => {
  const user: IUser = TokenUtils.decodeToken(<string>localStorage.getItem('token'));
  return user && user.role === 1;
};