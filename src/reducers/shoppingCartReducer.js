/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const cartReducer = (
  state = initialState.shoppingCart,
  action
) => {
  switch (action.type) {
    case types.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };
    case types.DELETE_CART_ITEM_LOADING:
    case types.UPDATE_CART_QUANTITY_LOADING:
    case types.FETCH_CART_PRODUCT_LOADING:
    case types.CREATE_ORDER:
    case types.EMPTY_CART_LOADING:
    case types.ADD_TO_CART_LOADING:
    case types.PAY_WITH_STRIPE:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_CART_PRODUCT_SUCCESS:
    case types.UPDATE_CART_QUANTITY_SUCCESS:
    case types.ADD_TO_CART_SUCCESS:
    case types.EMPTY_CART_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_CART_PRODUCT_ERROR:
    case types.UPDATE_CART_QUANTITY_ERROR:
    case types.DELETE_CART_ITEM_ERROR:
    case types.EMPTY_CART_ERROR:
    case types.CREATE_ORDER_ERROR:
    case types.ADD_TO_CART_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case types.DELETE_CART_ITEM_SUCCESS:
      return{
        ...state,
        deleted: action.payload
      };
    case types.PAY_WITH_STRIPE_SUCCESS:
      return {
        ...state,
        charge: action.payload,
      };
    default:
      return state;
  }
}
