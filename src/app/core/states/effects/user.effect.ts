import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../../shared/services/user.service';
import * as UserActions from '../actions/user.action';

@Injectable()
export class UserEffects {
    private readonly actions$ = inject(Actions);
    private readonly userService = inject(UserService);

  // Effect to handle getting a user by ID
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      mergeMap((action) =>
        this.userService.get(action.userId).pipe(
          map((user) => UserActions.getUserSuccess({ user })),
          catchError((error) => of(UserActions.getUserFailure({ error })))
        )
      )
    )
  );

  // Effect to handle creating a new user
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) =>
        this.userService.create(action.user).pipe(
          map((user) => UserActions.createUserSuccess({ user })),
          catchError((error) => of(UserActions.createUserFailure({ error })))
        )
      )
    )
  );

  // Effect to handle updating an existing user
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.update(action.userId, action.user).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  updateEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserEmail),
      mergeMap((action) =>
        this.userService.updateEmail(action.email).pipe(
          map((user) => UserActions.updateUserEmailSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error })))
        )
      )
    )
  );

  // Effect to handle paginated users
  getUsersPaginated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsersPaginated),
      mergeMap((action) =>
        this.userService.getPaginated(action.pagination).pipe(
          map((response) =>
            UserActions.getUsersPaginatedSuccess({
              results: response.results,
              records: response.records,
            })
          ),
          catchError((error) => of(UserActions.getUsersPaginatedFailure({ error })))
        )
      )
    )
  );
}