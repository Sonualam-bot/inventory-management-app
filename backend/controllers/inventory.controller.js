const Inventory = require("../models/Inventory.model");

async function addItem(itemData) {
  try {
    const item = new Inventory(itemData);
    const addNewItem = await item.save();
    return addNewItem;
  } catch (error) {
    throw error;
  }
}

async function getAllItems() {
  try {
    const allItems = await Inventory.find({});
    return allItems;
  } catch (error) {
    throw error;
  }
}

async function deleteItem(id) {
  try {
    const deleteSelectedItem = await Inventory.findByIdAndDelete({ _id: id });
    console.log(deleteSelectedItem);
    return deleteSelectedItem;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addItem,
  getAllItems,
  deleteItem,
};
