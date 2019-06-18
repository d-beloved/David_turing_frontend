/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const fetchProductAttributeSuccess = payload => ({
  type: types.FETCH_PRODUCT_ATTRIBUTE_SUCCESS,
  payload
});

const fetchProductAttributeLoading = payload => ({
  type: types.FETCH_PRODUCT_ATTRIBUTE_LOADING,
  payload
});

const fetchProductAttributeError = payload => ({
  type: types.FETCH_PRODUCT_ATTRIBUTE_ERROR,
  payload
});

export const getProductAttribute = (id) => (dispatch) => {
  dispatch(fetchProductAttributeLoading(true));
  return axios
    .get(`${config.apiUrl}/attributes/inProduct/${id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchProductAttributeLoading(false));
        return dispatch(fetchProductAttributeSuccess(response));
      }
      return dispatch(fetchProductAttributeError(response));
    })
    .catch(error => dispatch(fetchProductAttributeError(error)));
};
