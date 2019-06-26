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

const updateCustomerRequest = payload => ({
  type: types.UPDATE_CUSTOMER_ADDRESS,
  payload
});

const updateCustomerSuccess = payload => ({
  type: types.UPDATE_CUSTOMER_ADDRESS_SUCCESS,
  payload
});

const updateAddressError = payload => ({
  type: types.UPDATE_CUSTOMER_ADDRESS_ERROR,
  payload
});

const createOderRequest = payload => ({
  type: types.CREATE_ORDER,
  payload
});

const createOrderSuccess = payload => ({
  type: types.CREATE_ORDER_SUCCESS,
  payload
});

const createOrderError = payload => ({
  type: types.CREATE_ORDER_ERROR,
  payload
});

const payOrder = payload => ({
  type: types.PAY_WITH_STRIPE,
  payload
});

const payOrderSuccess = payload => ({
  type: types.PAY_WITH_STRIPE_SUCCESS,
  payload
});

const payOrderError = payload => ({
  type: types.PAY_WITH_STRIPE_ERROR,
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

export const deleteCartItem = (item_id) => async (dispatch) => {
  dispatch(deleteCartItemLoading(true));
  try {
    const cart = await (axios.delete(`${config.apiUrl}/shoppingcart/removeProduct/${item_id}`))
    dispatch(deleteCartItemLoading(false));
    dispatch(getCartProduct());
    return dispatch(deleteCartItemSuccess(cart));
  } catch(error) {
    dispatch(deleteCartItemLoading(false));
    return dispatch(deleteCartItemError(error));
  }
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

export const updateCustomerAddress = payload => dispatch => {
  dispatch(updateCustomerRequest(true));
  return axios
    .put(`${config.apiUrl}/customers/address`, payload)
    .then(response => {
      if (response.status === 200) {
        dispatch(updateCustomerRequest(false));
        return dispatch(updateCustomerSuccess(response.data));
      }
    })
    .catch(error => {
      dispatch(updateCustomerRequest(false));
      if (error.response) {
        if (error.response.status === 400) {
          return dispatch(updateAddressError(error.response.data.error.message))
        }
      }
      return dispatch(updateAddressError('Unable to update this customer at the moment'));
    })
};

export const createOrder = payload => dispatch => {
  dispatch(createOderRequest(true));
  return axios
    .post(`${config.apiUrl}/orders`, payload)
    .then(response => {
      if (response.status === 200) {
        dispatch(createOderRequest(false));
        return dispatch(createOrderSuccess(response.data));
      }
      return dispatch(createOrderError(response));
    })
    .catch(error => dispatch(createOrderError(error)));
};

export const payWithStripe = payload => dispatch => {
  dispatch(payOrder(true));
  return axios
    .post(`${config.apiUrl}/stripe/charge`, payload)
    .then(response => {
      if (response.status === 200) {
        dispatch(payOrder(false));
        return dispatch(payOrderSuccess(response.data));
      }
      return dispatch(payOrderError(response));
    })
    .catch(error => dispatch(payOrderError(error)));
};
