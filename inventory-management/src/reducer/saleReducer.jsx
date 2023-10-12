const initialState = {
  saleItems: [],
  saleInput: {
    description: "",
    amount: "",
  },
};

export const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SALE_ITEMS":
      return {
        ...state,
        saleItems: action.payload,
      };
    case "UPDATE_SALE_INPUT":
      return {
        ...state,
        saleInput: action.payload,
      };
    default:
      return state;
  }
};
