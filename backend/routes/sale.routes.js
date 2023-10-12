const express = require("express");
const saleRouter = express.Router();

const {
  addingSale,
  getAllSales,
  deletingSales,
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
