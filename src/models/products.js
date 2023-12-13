const mongoose = require("mongoose");

// Define product schema
const productSchema = mongoose.Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

// Create Product model based on the schema
const Product = mongoose.model("Product", productSchema);

// Export the Product model
module.exports = Product;
