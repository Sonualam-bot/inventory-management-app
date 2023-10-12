const express = require("express");
const inventoryRouter = express.Router();

const {
  addItem,
  getAllItems,
  deleteItem,
} = require("../controllers/inventory.controller");

inventoryRouter.post("/api/items", async (req, res) => {
  try {
    const item = await addItem(req.body);
    res.status(200).json({
      success: true,
      message: "Successfully added Item",
      items: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add Item",
    });
  }
});

inventoryRouter.get("/api/items", async (req, res) => {
  try {
    const items = await getAllItems();

    if (items.length < 0) {
      res.status(401).json({
        success: false,
        message: "No Items to Fetch",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully fetched items",
        items: items,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to fetch items",
    });
  }
});

inventoryRouter.delete("/api/items/delete/:itemId", async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId);
    const itemDelete = await deleteItem(itemId);

    if (!itemDelete) {
      res.status(401).json({
        success: false,
        message: "Id not matched",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted item",
      item: itemDelete,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete item",
    });
  }
});

module.exports = inventoryRouter;
