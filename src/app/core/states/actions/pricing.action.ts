import { createAction, props } from '@ngrx/store';
import { IPrice } from '../../../shared/models/price.interface';

// Get Price
export const getPrice = createAction(
  '[Price] Get Price',
  props<{ id: string }>()
);
export const getPriceSuccess = createAction(
  '[Price] Get Price Success',
  props<{ price: IPrice }>()
);
export const getPriceFailure = createAction(
  '[Price] Get Price Failure',
  props<{ error: any }>()
);

// Get Active Prices
export const getActivePrices = createAction(
  '[Price] Get Active Prices',
  props<{ recurring: string }>()
);
export const getActivePricesSuccess = createAction(
  '[Price] Get Active Prices Success',
  props<{ prices: IPrice[] }>()
);
export const getActivePricesFailure = createAction(
  '[Price] Get Active Prices Failure',
  props<{ error: any }>()
);

// Get Prices
export const getPrices = createAction('[Price] Get Prices');
export const getPricesSuccess = createAction(
  '[Price] Get Prices Success',
  props<{ prices: IPrice[] }>()
);
export const getPricesFailure = createAction(
  '[Price] Get Prices Failure',
  props<{ error: any }>()
);

// Create Price
export const createPrice = createAction(
  '[Price] Create Price',
  props<{ price: IPrice }>()
);
export const createPriceSuccess = createAction(
  '[Price] Create Price Success',
  props<{ price: IPrice }>()
);
export const createPriceFailure = createAction(
  '[Price] Create Price Failure',
  props<{ error: any }>()
);

// Deactivate Price
export const deactivatePrice = createAction(
  '[Price] Deactivate Price',
  props<{ id: string }>()
);
export const deactivatePriceSuccess = createAction(
  '[Price] Deactivate Price Success',
  props<{ id: string }>()
);
export const deactivatePriceFailure = createAction(
  '[Price] Deactivate Price Failure',
  props<{ error: any }>()
);
