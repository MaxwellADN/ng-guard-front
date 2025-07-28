import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { priceReducer, PriceState } from './pricing.reducer';
import { subscriptionReducer, SubscriptionState } from './subscription.reducer';
import { userReducer, UserState } from './user.reducer';

export interface State {
  price: PriceState;
  subscription: SubscriptionState;
  user: UserState
}

export const reducers: ActionReducerMap<State> = {
  price: priceReducer,
  subscription: subscriptionReducer,
  user: userReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
