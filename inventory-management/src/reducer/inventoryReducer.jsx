const initialState = {
  inventoryItems: [],
  inventoryInput: {
    name: "",
    quantity: "",
    price: "",
  },
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INVENTORY_ITEMS":
      return {
        ...state,
        inventoryItems: action.payload,
      };
    case "UPDATE_INVENTORY_ITEMS":
      return {
        ...state,
        inventoryInput: action.payload,
      };
    default:
      return state;
  }
};
