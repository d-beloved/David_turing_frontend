/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const allCategoryReducer = (
  state = initialState.category.inDepartment,
  action
) => {
  switch (action.type) {
    case types.FETCH_ONE_CATEGORY_LOADING:
    case types.FETCH_CATEGORY_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_ONE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload.data
      }
    case types.FETCH_ONE_CATEGORY_ERROR:
    case types.FETCH_CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
