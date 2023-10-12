const express = require("express");
const saleRouter = express.Router();

const {
  addingSale,
  getAllSales,
  deletingSales,
  updateSaleItems,
} = require("../controllers/sale.controller");

saleRouter.post("/api/sales", async (req, res) => {
  try {
    const { description, amount } = req.body;

    if (!description || !amount) {
      res.status(401).json({
        success: false,
        message: "Please add description or amount",
      });
    }

    const newSaleItem = await addingSale(req.body);

    res.status(200).json({
      success: true,
      message: "Successfully added sale",
      sale: newSaleItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add sale item",
    });
  }
});

saleRouter.get("/api/sales", async (req, res) => {
  try {
    const sales = await getAllSales();
    res.status(200).json({
      success: true,
      message: "Successfully Fetched All Sales",
      sale: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales",
    });
  }
});

saleRouter.post("/api/sales/:saleId", async (req, res) => {
  try {
    const saleId = req.params.saleId;
    const updatedSales = await updateSaleItems(saleId, req.body);

    if (!updatedSales) {
      res.status(401).json({
        success: false,
        message: "Error Fetching Sale Items",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated sale item",
      sale: updatedSales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Update Item",
    });
  }
});

saleRouter.delete("/api/sales/:saleId", async (req, res) => {
  try {
    const saleId = req.params.saleId;

    const saleItem = await deletingSales(saleId);

    if (!saleItem) {
      res.status(401).json({
        success: false,
        message: "Id not Matched",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully Deleted Sale item",
      sale: saleItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to Delete Sale item",
    });
  }
});

module.exports = saleRouter;
