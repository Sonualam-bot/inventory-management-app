import { setInventoryItems } from "../actions/inventoryAction";
import {
  deleteItemsFromInventory,
  fetchItemsFromInventory,
  updateItemsFromInventory,
} from "../services/inventory.services";

export const getInventoryItems = async (dispatch) => {
  try {
    const data = await fetchItemsFromInventory();
    dispatch(setInventoryItems(data));
  } catch (error) {
    console.log(error);
  }
};

export const getUpdatedInventoryItems = async (dispatch, id) => {
  try {
    const data = await deleteItemsFromInventory(id);
    if (data) {
      getInventoryItems(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEditedInventoryItems = async (dispatch, item) => {
  try {
    const data = await updateItemsFromInventory(item);
    if (data) {
      getInventoryItems(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};
