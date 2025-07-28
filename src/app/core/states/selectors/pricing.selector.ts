import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PriceState } from '../reducers/pricing.reducer';

export const selectPriceState = createFeatureSelector<PriceState>('price');

export const selectPrices = createSelector(
  selectPriceState,
  (state) => state.prices
);

export const selectActivePrices = createSelector(
  selectPriceState,
  (state) => state.activePrices
);

export const selectPricesLoading = createSelector(
  selectPriceState,
  (state) => state.loading
);

export const selectPriceById = createSelector(
  selectPriceState,
  (state) => state.selectedPrice
);

export const selectLoading = createSelector(
  selectPriceState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectPriceState,
  (state) => state.error
);