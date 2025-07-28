import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SubscriptionState } from '../reducers/subscription.reducer';

export const selectSubscriptionState = createFeatureSelector<SubscriptionState>('subscription');

export const selectCheckoutSession = createSelector(
  selectSubscriptionState,
  (state: SubscriptionState) => state.checkoutSession
);

export const selectActiveSubscription = createSelector(
  selectSubscriptionState,
  (state: SubscriptionState) => state.subscription
);

export const selectSubscriptionLoading = createSelector(
  selectSubscriptionState,
  (state: SubscriptionState) => state.loading
);