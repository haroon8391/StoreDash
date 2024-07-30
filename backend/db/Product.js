const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    cateogry: String,
    userId: String,
    company: String,
    price: String
}, { collection: "Products" })

module.exports = mongoose.model("Products", productSchema);