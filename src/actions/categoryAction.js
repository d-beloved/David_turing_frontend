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

const fetchOneCategorySuccess = payload => ({
  type: types.FETCH_ONE_CATEGORY_SUCCESS,
  payload
});

const fetchOneCategoryLoading = payload => ({
  type: types.FETCH_ONE_CATEGORY_LOADING,
  payload
});

const fetchOneCategoryError = payload => ({
  type: types.FETCH_ONE_CATEGORY_ERROR,
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

export const getCategory = (category_id) => (dispatch) => {
  dispatch(fetchOneCategoryLoading(true));
  return axios
    .get(`${config.apiUrl}/categories/${category_id}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchOneCategoryLoading(false));
        return dispatch(fetchOneCategorySuccess(response));
      }
      return dispatch(fetchOneCategoryError(response));
    })
    .catch(error => dispatch(fetchOneCategoryError(error)));
};
