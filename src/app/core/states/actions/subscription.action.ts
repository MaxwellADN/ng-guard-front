import { createAction, props } from '@ngrx/store';
import { ISubscription } from '../../../shared/models/subscription.interface';

// Create Stripe Subscription
export const createStripeSubscription = createAction(
  '[Subscription] Create Stripe Subscription',
  props<{ stripePriceId: string }>()
);
export const createStripeSubscriptionSuccess = createAction(
  '[Subscription] Create Stripe Subscription Success',
  props<{ checkoutSession: any }>()
);
export const createStripeSubscriptionFailure = createAction(
  '[Subscription] Create Stripe Subscription Failure',
  props<{ error: any }>()
);

// Update Stripe Subscription
export const updateStripeSubscription = createAction(
  '[Subscription] Update Stripe Subscription',
  props<{ stripeSubscriptionId: string; stripePriceId: string }>()
);
export const updateStripeSubscriptionSuccess = createAction(
  '[Subscription] Update Stripe Subscription Success',
  props<{ subscription: ISubscription }>()
);
export const updateStripeSubscriptionFailure = createAction(
  '[Subscription] Update Stripe Subscription Failure',
  props<{ error: any }>()
);

// Cancel Stripe Subscription
export const cancelStripeSubscription = createAction(
  '[Subscription] Cancel Stripe Subscription',
  props<{ stripeSubscriptionId: string }>()
);
export const cancelStripeSubscriptionSuccess = createAction(
  '[Subscription] Cancel Stripe Subscription Success',
  props<{ subscription: ISubscription }>()
);
export const cancelStripeSubscriptionFailure = createAction(
  '[Subscription] Cancel Stripe Subscription Failure',
  props<{ error: any }>()
);

// Update PayPal Subscription
export const updatePayPalSubscription = createAction(
  '[Subscription] Update PayPal Subscription',
  props<{ paypalAgreementId: string; newPaypalPlanId: string }>()
);
export const updatePayPalSubscriptionSuccess = createAction(
  '[Subscription] Update PayPal Subscription Success',
  props<{ subscription: ISubscription }>()
);
export const updatePayPalSubscriptionFailure = createAction(
  '[Subscription] Update PayPal Subscription Failure',  
  props<{ error: any }>()
);

// Cancel PayPal Subscription
export const cancelPayPalSubscription = createAction(
  '[Subscription] Cancel PayPal Subscription',
  props<{ paypalAgreementId: string }>()
);
export const cancelPayPalSubscriptionSuccess = createAction(
  '[Subscription] Cancel PayPal Subscription Success',
  props<{ subscription: ISubscription }>()
);
export const cancelPayPalSubscriptionFailure = createAction(
  '[Subscription] Cancel PayPal Subscription Failure',
  props<{ error: any }>()
);

// Get Active Subscription
export const getActiveSubscription = createAction(
  '[Subscription] Get Active Subscription'
);
export const getActiveSubscriptionSuccess = createAction(
  '[Subscription] Get Active Subscription Success',
  props<{ subscription: any }>()
);
export const getActiveSubscriptionFailure = createAction(
  '[Subscription] Get Active Subscription Failure',
  props<{ error: any }>()
);