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
    isLoading: false,
    data: [],
    error: {},
    count: 0,
    totalAmount: 0
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
  }
}

export default initialState;
