const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Item quantity is required"]
    },
    price: {
        type: Number,
        required: [true, "Item price is required"]
    }
})

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;