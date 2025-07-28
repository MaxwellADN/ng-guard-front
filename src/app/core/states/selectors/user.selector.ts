import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../reducers/user.reducer';
import { Role } from '../../enums/role.enum';

// Feature selector for the user state
export const selectUserState = createFeatureSelector<UserState>('user');

// Selector to get the user object
export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

// Selector to get the loading status
export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

// Selector to get the error
export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Selector to get paginated users
export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectUsersTotal = createSelector(
  selectUserState,
  (state: UserState) => state.usersTotal
);