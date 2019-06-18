import { combineReducers } from 'redux';
import { allDepartmentReducer } from './departmentReducer';
import { allProductReducer, oneProductReducer } from './productReducer';
import { allCategoryReducer } from './categoryReducer';
import { attributeReducer } from './attributeReducer';

const rootReducer = combineReducers({
  department: allDepartmentReducer,
  products: allProductReducer,
  category: allCategoryReducer,
  oneProduct: oneProductReducer,
  attributes: attributeReducer
});

export default rootReducer;
