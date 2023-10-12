const Sale = require("../models/Sale.model");

async function addingSale(saleData) {
  try {
    const newSale = new Sale(saleData);
    const sale = await newSale.save();
    return sale;
  } catch (error) {
    throw error;
  }
}

async function getAllSales() {
  try {
    const allSales = await Sale.find({});
    return allSales;
  } catch (error) {
    throw error;
  }
}

async function deletingSales(saleId) {
  try {
    const removeSaleItem = await Sale.findByIdAndDelete({ _id: saleId });
    return removeSaleItem;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  addingSale,
  getAllSales,
  deletingSales,
};
