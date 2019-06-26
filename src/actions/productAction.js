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

const fetchCategorySuccess = payload => ({
  type: types.CATEGORY_PRODUCTS_SUCCESS,
  payload
});

const fetchingCategory = payload => ({
  type: types.CATEGORY_PRODUCTS,
  payload
});

const fetchCategoryError = payload => ({
  type: types.CATEGORY_PRODUCTS_ERROR,
  payload
});

const fetchDepartmentSuccess = payload => ({
  type: types.DEPARTMENT_PRODUCTS_SUCCESS,
  payload
});

const fetchingDepartment = payload => ({
  type: types.DEPARTMENT_PRODUCTS,
  payload
});

const fetchDepartmentError = payload => ({
  type: types.DEPARTMENT_PRODUCTS_ERROR,
  payload
});

const searchingProducts = payload => ({
  type: types.SEARCH_PRODUCT,
  payload
});

const searchSuccessful = payload => ({
  type: types.SEARCH_PRODUCT_SUCCESS,
  payload
});

const searchError = payload => ({
  type: types.SEARCH_PRODUCT_ERROR,
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

export const getProductInCategory = (category_id, page, limit) => (dispatch) => {
  if (!category_id) return getAllProducts();
  dispatch(fetchingCategory(true));
  return axios
    .get(`${config.apiUrl}/products/inCategory/${category_id}?page=${page}&limit=${limit}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchingCategory(false));
        return dispatch(fetchCategorySuccess(response));
      }
      return dispatch(fetchCategoryError(response));
    })
    .catch(error => dispatch(fetchCategoryError(error)));
}

export const getProductIndepartment = (department_id, page, limit) => (dispatch) => {
  if (!department_id) return getAllProducts(page, limit);
  dispatch(fetchingDepartment(true));
  return axios
    .get(`${config.apiUrl}/products/inDepartment/${department_id}?page=${page}&limit=${limit}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchingDepartment(false));
        return dispatch(fetchDepartmentSuccess(response));
      }
      return dispatch(fetchDepartmentError(response));
    })
    .catch(error => dispatch(fetchDepartmentError(error)));
}

export const searchForProduct = (query_string, page, limit) => (dispatch) => {
  dispatch(searchingProducts(true));
  return axios
    .get(`${config.apiUrl}/products/search?query_string=${query_string}?page=${page}&limit=${limit}`)
    .then(response => {
      if (response.status === 200) {
        dispatch(searchingProducts(false));
        return dispatch(searchSuccessful(response));
      }
      return dispatch(searchError(response));
    })
    .catch(error => dispatch(searchError(error)));
}
