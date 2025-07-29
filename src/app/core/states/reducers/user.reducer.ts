import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { IUser } from '../../../shared/models/user.interface';
import { IPagination } from '../../../shared/models/pagination.interface';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: any;
  users?: IUser[];
  usersTotal?: number;
  pagination?: IPagination | null;
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  users: [],
  usersTotal: 0,
  pagination: null,
};

export const userReducer = createReducer(
  initialState,

  // Handle getUser action
  on(UserActions.getUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.getUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.getUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle createUser action
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle updateUser action
  on(UserActions.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle updateUserEmail action
  on(UserActions.updateUserEmail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.updateUserEmailSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(UserActions.updateUserEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Handle deleteUser action
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users?.filter(u => u.id !== userId),
    usersTotal: (state.usersTotal ?? 0) - 1,
    loading: false,
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Paginated users
  on(UserActions.getUsersPaginated, (state, { pagination }) => ({
    ...state,
    loading: true,
    error: null,
    pagination,
  })),
  on(UserActions.getUsersPaginatedSuccess, (state, { results, records, pagination }) => ({
    ...state,
    users: results,
    usersTotal: records,
    loading: false,
    pagination,
  })),
  on(UserActions.getUsersPaginatedFailure, (state, { error, pagination }) => ({
    ...state,
    loading: false,
    error,
    pagination,
  }))
);