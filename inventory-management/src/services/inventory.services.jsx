import axios from "axios";

const BASE_URL = "http://localhost:4000/api/v1";

export const addItemToInventory = async (newItem) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/items`, newItem);
    if (response.status === 200) {
      const data = response.data.items;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const fetchItemsFromInventory = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/items`);
    if (response.status === 200) {
      const data = response.data.items;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};

export const deleteItemsFromInventory = async (itemId) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/items/delete/${itemId}`
    );
    if (response.status === 200) {
      const data = response.data.item;
      return data;
    }
  } catch (error) {
    throw new Error(`${error.message}`);
  }
};
