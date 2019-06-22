/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import * as types from './actionTypes';
import config from '../config';

const signupRequest = payload => ({
  type: types.SIGN_UP_LOADING,
  payload
});

const signupSuccess = payload => ({
  type: types.SIGN_UP_SUCCESS,
  payload
});

const signupError = payload => ({
  type: types.SIGN_UP_ERROR,
  payload
});

const signinRequest = payload => ({
  type: types.SIGN_IN_LOADING,
  payload
});

const signinSuccess = payload => ({
  type: types.SIGN_IN_SUCCESS,
  payload
});

const signinError = payload => ({
  type: types.SIGN_IN_ERROR,
  payload
});

export const signupUser = (signupDetails) => (dispatch) => {
  dispatch(signupRequest(true));
  return axios
    .post(`${config.apiUrl}/customers`, signupDetails)
    .then(response => {
      if (response.status === 200) {
        dispatch(signupRequest(false));
        localStorage.setItem('token', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${
          response.accessToken
        }`;
        return dispatch(signupSuccess(response.data.customer))
      }
      return dispatch(signupError(response.error.message));
    })
    .catch(dispatch(signupError('Unable to sign up at the moment')))
};

export const signinUser = (signinDetails) => (dispatch) => {
  dispatch(signinRequest(true));
  return axios
    .post(`${config.apiUrl}/customers/login`, signinDetails)
    .then(response => {
      console.log('error', response)
      if (response.status === 200) {
        dispatch(signinRequest(false));
        localStorage.setItem('token', response.data.accessToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${
          response.accessToken
        }`;
        return dispatch(signinSuccess(response.data.customer))
      }
      return dispatch(signinError(response.data.error.message));
    })
    .catch(error => dispatch(signinError(console.log('error', error))))
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: types.LOG_OUT
  };
};

export const setLoggedInUser = () => dispatch => {
  dispatch({ type: types.FETCH_USER_PROFILE, payload: true });
  return axios
    .get(`${config.apiUrl}/customer`)
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: types.FETCH_USER_PROFILE, payload: false });
        return dispatch({ type: types.SET_LOGGED_IN_USER, payload: response.data })
      }
      return dispatch({ type: 'FETCH_USER_PROFILE_ERROR' });
    })
    .catch(dispatch({ type: types.SET_LOGGED_IN_USER, payload: {} }))
};
