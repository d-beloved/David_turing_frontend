/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const productReducer = (
  state = initialState.product,
  action
) => {
  switch (action.type) {
    case types.FETCH_ONE_PRODUCT_LOADING:
    case types.SEARCH_PRODUCT:
    case types.CATEGORY_PRODUCTS:
    case types.DEPARTMENT_PRODUCTS:
    case types.FETCH_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.SEARCH_PRODUCT_SUCCESS:
    case types.CATEGORY_PRODUCTS_SUCCESS:
    case types.DEPARTMENT_PRODUCTS_SUCCESS:
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        oneProduct: action.payload.data
      };
    case types.FETCH_ONE_PRODUCT_ERROR:
    case types.SEARCH_PRODUCT_ERROR:
    case types.CATEGORY_PRODUCTS_ERROR:
    case types.DEPARTMENT_PRODUCTS_ERROR:
    case types.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
