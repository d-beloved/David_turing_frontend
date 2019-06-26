import { combineReducers } from 'redux';
import { allDepartmentReducer } from './departmentReducer';
import { productReducer } from './productReducer';
import { allCategoryReducer } from './categoryReducer';
import { attributeReducer } from './attributeReducer';
import { cartReducer } from './shoppingCartReducer';
import auth from './auth';

const rootReducer = combineReducers({
  department: allDepartmentReducer,
  products: productReducer,
  category: allCategoryReducer,
  attributes: attributeReducer,
  cart: cartReducer,
  auth
});

export default rootReducer;
