const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    product: { type: String, required: true },
    price: { type: Number, required: true },
})

module.exports = mongoose.model("Products", productsSchema);