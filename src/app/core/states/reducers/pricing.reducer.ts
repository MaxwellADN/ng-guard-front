import { createReducer, on } from '@ngrx/store';
import { IPrice } from '../../../shared/models/price.interface';
import * as PriceActions from '../actions/pricing.action';

export interface PriceState {
  prices: IPrice[];
  activePrices: IPrice[];
  selectedPrice: IPrice | null;
  loading: boolean;
  error: any;
}

const initialPriceState: PriceState = {
  prices: [],
  activePrices: [],
  selectedPrice: null,
  loading: false,
  error: null,
};

export const priceReducer = createReducer(
  initialPriceState,

  // Get Price
  on(PriceActions.getPrice, (state) => ({ ...state, loading: true })),
  on(PriceActions.getPriceSuccess, (state, { price }) => ({
    ...state,
    selectedPrice: price,
    loading: false,
  })),
  on(PriceActions.getPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Active Prices
  on(PriceActions.getActivePrices, (state) => ({ ...state, loading: true })),
  on(PriceActions.getActivePricesSuccess, (state, { prices }) => ({
    ...state,
    activePrices: prices,
    loading: false,
  })),
  on(PriceActions.getActivePricesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Get Prices
  on(PriceActions.getPrices, (state) => ({ ...state, loading: true })),
  on(PriceActions.getPricesSuccess, (state, { prices }) => ({
    ...state,
    prices,
    loading: false,
  })),
  on(PriceActions.getPricesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Price
  on(PriceActions.createPrice, (state) => ({ ...state, loading: true })),
  on(PriceActions.createPriceSuccess, (state, { price }) => ({
    ...state,
    prices: [...state.prices, price],
    activePrices: [...state.activePrices, price],
    loading: false,
  })),
  on(PriceActions.createPriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Deactivate Price
  on(PriceActions.deactivatePrice, (state) => ({ ...state, loading: true })),
  on(PriceActions.deactivatePriceSuccess, (state, { id }) => ({
    ...state,
    activePrices: state.activePrices.filter((price) => price._id !== id),
    loading: false,
  })),
  on(PriceActions.deactivatePriceFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);