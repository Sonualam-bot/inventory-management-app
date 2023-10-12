export const setSaleItems = (saleItem) => ({
  type: "SET_SALE_ITEMS",
  payload: saleItem,
});

export const updateSaleItems = (saleInput) => ({
  type: "UPDATE_SALE_INPUT",
  payload: saleInput,
});
