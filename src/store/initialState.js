import isLoggedIn from '../utils/isLoggedIn';

const initialState = {
  department: {
    isLoading: false,
    error: {},
    data: []
  },

  category: {
    inDepartment: {
      isLoading: false,
      error: {},
      data: []
    }
  },

  shoppingCart: {
    cartProducts: {
      isLoading: false,
      data: [],
      error: {}
    },
    addToCart: {
      isLoading: false,
      data: [],
      error: {}
    },
    updateCart: {
      isLoading: false,
      data: [],
      error: {}
    },
    deleteItem: {
      isLoading: false,
      data: null,
      error: {}
    },
    emptyCart: {
      isLoading: false,
      data: [],
      error: {}
    }
  },

  product: {
    allProduct: {
      isLoading: false,
      data: [],
      error: {},
      count: 0
    },
    oneProduct: {
      isLoading: false,
      data: {},
      error: {}
    }
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
