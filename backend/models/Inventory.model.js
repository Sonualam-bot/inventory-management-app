const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Item name is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Item quantity is required"],
    },
    price: {
      type: Number,
      required: [true, "Item price is required"],
    },
    category: {
      type: String,
      enum: [
        "Electronics",
        "Clothing",
        "Furniture",
        "Home Appliances",
        "Sports Equipment",
        "Books",
        "Toys",
        "Health & Beauty",
        "Jewelry",
        "Food & Beverages",
      ],
    },
  },

  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
