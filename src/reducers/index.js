import { combineReducers } from 'redux';
import { allDepartmentReducer } from './departmentReducer';
import { allProductReducer } from './productReducer';

const rootReducer = combineReducers({
  department: allDepartmentReducer,
  products: allProductReducer
});

export default rootReducer;
