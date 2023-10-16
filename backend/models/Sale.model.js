const mongoose = require("mongoose");

const saleModel = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    amount: {
      type: Number,
      required: [true, "Sale amount is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleModel);

module.exports = Sale;
