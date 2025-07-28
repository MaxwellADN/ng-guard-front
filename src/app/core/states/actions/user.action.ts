import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../shared/models/user.interface';

// Action to get a user by ID
export const getUser = createAction(
  '[User] Get User',
  props<{ userId: string }>()
);

export const getUserSuccess = createAction(
  '[User] Get User Success',
  props<{ user: IUser | null }>()
);

export const getUserFailure = createAction(
  '[User] Get User Failure',
  props<{ error: any }>()
);

// Action to create a new user
export const createUser = createAction(
  '[User] Create User',
  props<{ user: IUser }>()
);

export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: IUser }>()
);

export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: any }>()
);

// Action to update an existing user
export const updateUser = createAction(
  '[User] Update User',
  props<{ userId: string; user: IUser }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: IUser }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

// update user email
export const updateUserEmail = createAction(
  '[User] Update User Email',
  props<{ email: string }>()
);
export const updateUserEmailSuccess = createAction(
  '[User] Update User Email Success',
  props<{ user: IUser }>()
);
export const updateUserEmailFailure = createAction(
  '[User] Update User Email Failure',
  props<{ error: any }>()
);

// Paginated users
export const getUsersPaginated = createAction(
  '[User] Get Users Paginated',
  props<{ pagination: any }>() // Replace 'any' with your IPagination interface if available
);

export const getUsersPaginatedSuccess = createAction(
  '[User] Get Users Paginated Success',
  props<{ results: IUser[]; records: number }>()
);

export const getUsersPaginatedFailure = createAction(
  '[User] Get Users Paginated Failure',
  props<{ error: any }>()
);