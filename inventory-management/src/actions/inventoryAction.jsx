export const setInventoryItems = (item) => ({
    type: "SET_INVENTORY_ITEMS",
    payload: item
})

export const updateInventoryItems = (inventoryInput) => ({
    type: "UPDATE_INVENTORY_ITEMS",
    payload: inventoryInput
})