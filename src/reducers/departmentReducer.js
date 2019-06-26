/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const allDepartmentReducer = (
  state = initialState.department,
  action
) => {
  switch (action.type) {
    case types.FETCH_ONE_DEPARTMENT_LOADING:
    case types.FETCH_DEPARTMENT_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_ONE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        department: action.payload.data
      };
    case types.FETCH_ONE_DEPARTMENT_ERROR:
    case types.FETCH_DEPARTMENT_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
