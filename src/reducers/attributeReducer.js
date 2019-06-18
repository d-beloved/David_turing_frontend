/* eslint-disable import/prefer-default-export */
import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';

export const attributeReducer = (
  state = initialState.attributes,
  action
) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_ATTRIBUTE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case types.FETCH_PRODUCT_ATTRIBUTE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case types.FETCH_PRODUCT_ATTRIBUTE_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
