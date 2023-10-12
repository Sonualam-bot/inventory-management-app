import { combineReducers } from "redux";
import { inventoryReducer } from "./inventoryReducer";
import { saleReducer } from "./saleReducer";

export const rootReducer = combineReducers({
  inventoryState: inventoryReducer,
  saleState: saleReducer,
});
