const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    email: String,
    name: String,
    country: String,
    state: String,
    city: String,
    address1: String,
    address2: String,
    postalCode: String,
    phone: String,
  },
  items: [
    {
      name: String,
      variantId: Number,
      quantity: Number,
      price: String,
    },
  ],
  total: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Orders", orderSchema);
