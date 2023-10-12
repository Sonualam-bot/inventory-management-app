import { setSaleItems } from "../actions/saleAction";
import {
  deleteItemFromSales,
  fetchAllSales,
  updateItemFromSales,
} from "../services/sale.services";

export const getAllRecordedSales = async (dispatch) => {
  try {
    const data = await fetchAllSales();
    dispatch(setSaleItems(data));
  } catch (error) {
    console.log(error);
  }
};

export const getUpdatedSales = async (dispatch, id) => {
  try {
    const data = await deleteItemFromSales(id);
    if (data) {
      getAllRecordedSales(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateEditedSalesItems = async (dispatch, item) => {
  try {
    const data = await updateItemFromSales(item);
    if (data) {
      getAllRecordedSales(dispatch);
    }
  } catch (error) {
    console.log(error);
  }
};
