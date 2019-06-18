/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const fetchCategorySuccess = payload => ({
  type: types.FETCH_CATEGORY_SUCCESS,
  payload
});

const fetchCategoryLoading = payload => ({
  type: types.FETCH_CATEGORY_LOADING,
  payload
});

const fetchCategoryError = payload => ({
  type: types.FETCH_CATEGORY_ERROR,
  payload
});

export const getAllCategories = () => (dispatch) => {
  dispatch(fetchCategoryLoading(true));
  return axios
    .get(`${config.apiUrl}/categories`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchCategoryLoading(false));
        return dispatch(fetchCategorySuccess(response));
      }
      return dispatch(fetchCategoryError(response));
    })
    .catch(error => dispatch(fetchCategoryError(error)));
};
