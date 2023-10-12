const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please enter firstName" ]
    },
    lastName: {
        type: String,
        required: [true, "Please enter lastName" ]
    },
    email: {
        type: String,
        unique: [true, "Email is required" ]
    },
    password: {
        type: String,
        required: [true, 'Please enter a  password']
    },
    profilePictureUrl: String,
    address: String
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema);

module.exports = User