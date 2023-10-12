const initialState = {
  inventoryItems: [],
  inventoryInput: {
    name: "",
    quantity: "",
    price: "",
  },
  editInventoryItems: false,
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
    case "EDIT_INVENTORY":
      return {
        ...state,
        editInventoryItems: action.payload,
      };
    default:
      return state;
  }
};
