/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const addToCart = (
  state = initialState.shoppingCart.addToCart,
  action
) => {
  switch (action.type) {
    case types.ADD_TO_CART_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.ADD_TO_CART_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const getCartProduct = (
  state = initialState.shoppingCart.cartProducts,
  action
) => {
  switch (action.type) {
    case types.FETCH_CART_PRODUCT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_CART_PRODUCT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_CART_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const updateCartItem = (
  state = initialState.shoppingCart.updateCart,
  action
) => {
  switch (action.type) {
    case types.UPDATE_CART_QUANTITY_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.UPDATE_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.UPDATE_CART_QUANTITY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const deleteCartItem = (
  state = initialState.shoppingCart.deleteItem,
  action
) => {
  switch (action.type) {
    case types.DELETE_CART_ITEM_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.DELETE_CART_ITEM_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

export const emptyShoppingCart = (
  state = initialState.shoppingCart.emptyCart,
  action
) => {
  switch (action.type) {
    case types.EMPTY_CART_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.EMPTY_CART_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.EMPTY_CART_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
