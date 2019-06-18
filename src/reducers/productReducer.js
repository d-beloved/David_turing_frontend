/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const allProductReducer = (
  state = initialState.product.allProduct,
  action
) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const oneProductReducer = (
  state = initialState.product.oneProduct,
  action
) => {
  switch (action.type) {
    case types.FETCH_ONE_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_ONE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
