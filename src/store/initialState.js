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
  }
}

export default initialState;
