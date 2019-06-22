/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const addToCartSuccess = payload => ({
  type: types.ADD_TO_CART_SUCCESS,
  payload
});

const addToCartLoading = payload => ({
  type: types.ADD_TO_CART_LOADING,
  payload
});

const addToCartError = payload => ({
  type: types.ADD_TO_CART_ERROR,
  payload
});

const getProductLoading = payload => ({
  type: types.FETCH_CART_PRODUCT_LOADING,
  payload
});

const getProductError = payload => ({
  type: types.FETCH_CART_PRODUCT_ERROR,
  payload
});
const getProductSuccess = payload => ({
  type: types.FETCH_CART_PRODUCT_SUCCESS,
  payload
});

const updateCartItemLoading = payload => ({
  type: types.UPDATE_CART_QUANTITY_LOADING,
  payload
});

const updateCartItemError = payload => ({
  type: types.UPDATE_CART_QUANTITY_ERROR,
  payload
});
const updateCartItemSuccess = payload => ({
  type: types.UPDATE_CART_QUANTITY_SUCCESS,
  payload
});

const deleteCartItemSuccess = payload => ({
  type: types.DELETE_CART_ITEM_SUCCESS,
  payload
});

const deleteCartItemLoading = payload => ({
  type: types.DELETE_CART_ITEM_LOADING,
  payload
});

const deleteCartItemError = payload => ({
  type: types.DELETE_CART_ITEM_ERROR,
  payload
});

const emptyCartSuccess = payload => ({
  type: types.EMPTY_CART_SUCCESS,
  payload
});

const emptyCartLoading = payload => ({
  type: types.EMPTY_CART_LOADING,
  payload
});

const emptyCartError = payload => ({
  type: types.EMPTY_CART_ERROR,
  payload
});

export const addProductToCart = (itemDetails) => (dispatch) => {
  dispatch(addToCartLoading(true));
  return axios
    .post(`${config.apiUrl}/shoppingcart/add`, itemDetails)
    .then(response => {
      if (response.status === 200) {
        dispatch(addToCartLoading(false));
        return dispatch(addToCartSuccess(response));
      }
      return dispatch(addToCartError(response));
    })
    .catch(error => dispatch(addToCartError(error)));
};

export const getCartProduct = (cartId) => (dispatch) => {
  dispatch(getProductLoading(true));
  return axios
    .get(`${config.apiUrl}/shoppingcart/${cartId}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(getProductLoading(false));
        return dispatch(getProductSuccess(response));
      }
      return dispatch(getProductError(response));
    })
    .catch(error => dispatch(getProductError(error)));
};

export const updateCartItem = (update) => (dispatch) => {
  const { item_id } = update;
  dispatch(updateCartItemLoading(true));
  return axios
    .put(`${config.apiUrl}/shoppingcart/update/${item_id}`, update)
    .then(response => {
      if (response.status === 200) {
        dispatch(updateCartItemLoading(false));
        return dispatch(updateCartItemSuccess(response));
      }
      return dispatch(updateCartItemError(response));
    })
    .catch(error => dispatch(updateCartItemError(error)));
};

export const deleteCartItem = (item_id) => (dispatch) => {
  dispatch(deleteCartItemLoading(true));
  return axios
    .delete(`${config.apiUrl}/shoppingcart/removeProduct/${item_id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(deleteCartItemLoading(false));
        return dispatch(deleteCartItemSuccess(response));
      }
      return dispatch(deleteCartItemError(response));
    })
    .catch(error => dispatch(deleteCartItemError(error)));
};

export const emptyCart = (cartId) => (dispatch) => {
  dispatch(emptyCartLoading(true));
  return axios
    .delete(`${config.apiUrl}/shoppingcart/empty/${cartId}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(emptyCartLoading(false));
        return dispatch(emptyCartSuccess(response));
      }
      return dispatch(emptyCartError(response));
    })
    .catch(error => dispatch(emptyCartError(error)));
};
