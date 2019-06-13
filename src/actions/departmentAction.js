/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const fetchDepartmentSuccess = payload => ({
  type: types.FETCH_DEPARTMENT_SUCCESS,
  payload
});

const fetchDepartmentLoading = payload => ({
  type: types.FETCH_DEPARTMENT_LOADING,
  payload
});

const fetchDepartmentError = payload => ({
  type: types.FETCH_DEPARTMENT_ERROR,
  payload
});

export const getAllDepartments = () => (dispatch) => {
  dispatch(fetchDepartmentLoading(true));
  return axios
    .get(`${config.apiUrl}/departments`)
    .then(response => {
      if (response.status === 200) {
        dispatch(fetchDepartmentLoading(false));
        return dispatch(fetchDepartmentSuccess(response));
      }
      return dispatch(fetchDepartmentError(response));
    })
    .catch(error => dispatch(fetchDepartmentError(error)));
};
