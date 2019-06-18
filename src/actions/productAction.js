/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const fetchProductSuccess = payload => ({
  type: types.FETCH_PRODUCT_SUCCESS,
  payload
});

const fetchProductLoading = payload => ({
  type: types.FETCH_PRODUCT_LOADING,
  payload
});

const fetchProductError = payload => ({
  type: types.FETCH_PRODUCT_ERROR,
  payload
});

const fetchOneProductSuccess = payload => ({
  type: types.FETCH_ONE_PRODUCT_SUCCESS,
  payload
});

const fetchOneProductLoading = payload => ({
  type: types.FETCH_ONE_PRODUCT_LOADING,
  payload
});

const fetchOneProductError = payload => ({
  type: types.FETCH_ONE_PRODUCT_ERROR,
  payload
});

export const getAllProducts = (page, limit) => (dispatch) => {
  dispatch(fetchProductLoading(true));
  return axios
    .get(`${config.apiUrl}/products?page=${page}&limit=${limit}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchProductLoading(false));
        return dispatch(fetchProductSuccess(response));
      }
      return dispatch(fetchProductError(response));
    })
    .catch(error => dispatch(fetchProductError(error)));
};

export const getOneProduct = (product_id) => (dispatch) => {
  const productId = Number(product_id);
  dispatch(fetchOneProductLoading(true));
  return axios
    .get(`${config.apiUrl}/products/${productId}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchOneProductLoading(false));
        return dispatch(fetchOneProductSuccess(response));
      }
      return dispatch(fetchOneProductError(response));
    })
    .catch(error => dispatch(fetchOneProductError(error)));
};