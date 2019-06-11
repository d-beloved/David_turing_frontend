const initialState = {
  department: {
    isLoading: false,
    data: []
  },

  category: {
    inDepartment: {
      isLoading: false,
      data: []
    }
  },

  shoppingCart: {
    isLoading: false,
    data: [],
    count: 0,
    totalAmount: 0
  }
}

export default initialState;
