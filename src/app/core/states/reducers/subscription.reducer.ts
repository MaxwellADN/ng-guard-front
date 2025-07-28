import { createReducer, on } from '@ngrx/store';
import { ISubscription } from '../../../shared/models/subscription.interface';
import * as SubscriptionActions from '../actions/subscription.action';

export interface SubscriptionState {
  subscription: ISubscription | null;
  checkoutSession: any;
  loading: boolean;
  error: any;
}

const initialSubscriptionState: SubscriptionState = {
  subscription: null,
  checkoutSession: null,
  loading: false,
  error: null,
};

export const subscriptionReducer = createReducer(
  initialSubscriptionState,

  // Create Stripe Subscription
  on(SubscriptionActions.createStripeSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.createStripeSubscriptionSuccess, (state, { checkoutSession }) => ({
    ...state,
    checkoutSession,
    loading: false,
  })),
  on(SubscriptionActions.createStripeSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Stripe Subscription
  on(SubscriptionActions.updateStripeSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.updateStripeSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    subscription,
    loading: false,
  })),
  on(SubscriptionActions.updateStripeSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Cancel Stripe Subscription
  on(SubscriptionActions.cancelStripeSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.cancelStripeSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    subscription,
    loading: false,
  })),
  on(SubscriptionActions.cancelStripeSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update PayPal Subscription
  on(SubscriptionActions.updatePayPalSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.updatePayPalSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    subscription,
    loading: false,
  })),
  on(SubscriptionActions.updatePayPalSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Cancel PayPal Subscription
  on(SubscriptionActions.cancelPayPalSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.cancelPayPalSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    subscription, 
    loading: false,
  })),  
  on(SubscriptionActions.cancelPayPalSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Active Subscription
  on(SubscriptionActions.getActiveSubscription, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SubscriptionActions.getActiveSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    subscription,
    loading: false,
  })),
  on(SubscriptionActions.getActiveSubscriptionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);