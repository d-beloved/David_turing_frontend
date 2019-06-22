import { combineReducers } from 'redux';
import { allDepartmentReducer } from './departmentReducer';
import { allProductReducer, oneProductReducer } from './productReducer';
import { allCategoryReducer } from './categoryReducer';
import { attributeReducer } from './attributeReducer';
import {
  addToCart,
  getCartProduct,
  updateCartItem,
  deleteCartItem,
  emptyShoppingCart
} from './shoppingCartReducer';
import auth from './auth';

const rootReducer = combineReducers({
  department: allDepartmentReducer,
  products: allProductReducer,
  category: allCategoryReducer,
  oneProduct: oneProductReducer,
  attributes: attributeReducer,
  addToCart,
  getCartProduct,
  updateCartItem,
  deleteCartItem,
  emptyShoppingCart,
  auth
});

export default rootReducer;
