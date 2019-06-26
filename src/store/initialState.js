import isLoggedIn from '../utils/isLoggedIn';

const initialState = {
  department: {
    isLoading: false,
    error: {},
    data: [],
    department: {}
  },

  category: {
    inDepartment: {
      isLoading: false,
      error: {},
      data: [],
      category: {}
    }
  },

  shoppingCart: {
    isLoading: false,
    data: [],
    error: {},
    order: {},
    charge: {},
    deleted: null
  },

  product: {
    isLoading: false,
    data: [],
    error: {},
    count: 0,
    oneProduct: {}
  },

  attributes: {
    isLoading: false,
    data: [],
    error: {},
  },

  auth: {
    isAuthenticated: isLoggedIn(),
    isLoading: false,
    user: {},
    error: ''
  }
}

export default initialState;
