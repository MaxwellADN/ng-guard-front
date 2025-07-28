import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PriceService } from '../../../shared/services/pricing.service';
import * as PriceActions from '../actions/pricing.action';

@Injectable()
export class PricingEffects {
    private readonly actions$ = inject(Actions);
    private readonly priceService = inject(PriceService);

    getPrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceActions.getPrice),
            mergeMap(({ id }) =>
                this.priceService.getPrice(id).pipe(
                    map((price) => PriceActions.getPriceSuccess({ price })),
                    catchError((error) => of(PriceActions.getPriceFailure({ error })))
                )
            )
        )
    );

    getActivePrices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceActions.getActivePrices),
            mergeMap(({ recurring }) =>
                this.priceService.getActivePrices(recurring).pipe(
                    map((prices) => PriceActions.getActivePricesSuccess({ prices })),
                    catchError((error) =>
                        of(PriceActions.getActivePricesFailure({ error }))
                    )
                )
            )
        )
    );

    getPrices$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceActions.getPrices),
            mergeMap(() =>
                this.priceService.getPrices().pipe(
                    map((prices) => PriceActions.getPricesSuccess({ prices })),
                    catchError((error) => of(PriceActions.getPricesFailure({ error })))
                )
            )
        )
    );

    createPrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceActions.createPrice),
            mergeMap(({ price }) =>
                this.priceService.createPrice(price).pipe(
                    map((createdPrice) => PriceActions.createPriceSuccess({ price: createdPrice })),
                    catchError((error) => of(PriceActions.createPriceFailure({ error })))
                )
            )
        )
    );

    deactivatePrice$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PriceActions.deactivatePrice),
            mergeMap(({ id }) =>
                this.priceService.deactivatePrice(id).pipe(
                    map(() => PriceActions.deactivatePriceSuccess({ id })),
                    catchError((error) => of(PriceActions.deactivatePriceFailure({ error })))
                )
            )
        )
    );
}