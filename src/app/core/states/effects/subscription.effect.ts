import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import * as SubscriptionActions from '../actions/subscription.action';

@Injectable()
export class SubscriptionEffects {
  private readonly actions$ = inject(Actions);
  private readonly subscriptionService = inject(SubscriptionService);

  createStripeSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.createStripeSubscription),
      mergeMap(({ stripePriceId }) =>
        this.subscriptionService.createStripeSubscription(stripePriceId).pipe(
          map((checkoutSession) =>
            SubscriptionActions.createStripeSubscriptionSuccess({ checkoutSession })
          ),
          catchError((error) =>
            of(SubscriptionActions.createStripeSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

  updateStripeSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.updateStripeSubscription),
      mergeMap(({ stripeSubscriptionId, stripePriceId }) =>
        this.subscriptionService.updateStripeSubscription(stripeSubscriptionId, stripePriceId).pipe(
          map((subscription) =>
            SubscriptionActions.updateStripeSubscriptionSuccess({ subscription })
          ),
          catchError((error) =>
            of(SubscriptionActions.updateStripeSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

  cancelStripeSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.cancelStripeSubscription),
      mergeMap(({ stripeSubscriptionId }) =>
        this.subscriptionService.cancelStripeSubscription(stripeSubscriptionId).pipe(
          map((subscription) =>
            SubscriptionActions.cancelStripeSubscriptionSuccess({ subscription })
          ),
          catchError((error) =>
            of(SubscriptionActions.cancelStripeSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

  updatePayPalSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.updatePayPalSubscription),
      mergeMap(({ paypalAgreementId, newPaypalPlanId }) =>
        this.subscriptionService.updatePayPalSubscription(paypalAgreementId, newPaypalPlanId).pipe(
          map((subscription) =>
            SubscriptionActions.updatePayPalSubscriptionSuccess({ subscription })
          ),
          catchError((error) =>
            of(SubscriptionActions.updatePayPalSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

  cancelPayPalSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.cancelPayPalSubscription),
      mergeMap(({ paypalAgreementId }) =>
        this.subscriptionService.cancelPayPalSubscription(paypalAgreementId).pipe(
          map((subscription) =>
            SubscriptionActions.cancelPayPalSubscriptionSuccess({ subscription })
          ),
          catchError((error) =>
            of(SubscriptionActions.cancelPayPalSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

  getActiveSubscription$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SubscriptionActions.getActiveSubscription),
      mergeMap(() =>
        this.subscriptionService.getActiveSubscription().pipe(
          map((subscription) =>
            SubscriptionActions.getActiveSubscriptionSuccess({ subscription })
          ),
          catchError((error) =>
            of(SubscriptionActions.getActiveSubscriptionFailure({ error }))
          )
        )
      )
    )
  );

}