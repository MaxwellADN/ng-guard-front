import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.action';
import { IUser } from '../../../shared/models/user.interface';

export interface UserState {
  user: IUser | null;
  loading: boolean;
  error: any;
  users?: IUser[]; 
  usersTotal?: number; 
}

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  users: [],
  usersTotal: 0,
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

  // Paginated users
  on(UserActions.getUsersPaginated, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(UserActions.getUsersPaginatedSuccess, (state, { results, records }) => ({
    ...state,
    users: results,
    usersTotal: records,
    loading: false,
  })),
  on(UserActions.getUsersPaginatedFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);