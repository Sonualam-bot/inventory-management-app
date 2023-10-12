import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const addItemToSales = async (newSale) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/sales`, newSale);
    if (response.status === 200) {
      const data = response.data.sale;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const fetchAllSales = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/sales`);
    if (response.status === 200) {
      const data = response.data.sale;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteItemFromSales = async (saleId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/sales/${saleId}`);
    if (response.status === 200) {
      const data = response.data.sale;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const updateItemFromSales = async (item) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/sales/${item._id}`,
      item
    );
    if (response.status === 200) {
      const data = response.data.sale;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
