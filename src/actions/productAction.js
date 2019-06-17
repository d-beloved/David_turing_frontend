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

export const getAllProducts = () => (dispatch) => {
  dispatch(fetchProductLoading(true));
  return axios
    .get(`${config.apiUrl}/products`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchProductLoading(false));
        return dispatch(fetchProductSuccess(response));
      }
      return dispatch(fetchProductError(response));
    })
    .catch(error => dispatch(fetchProductError(error)));
};
