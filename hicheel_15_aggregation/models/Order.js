const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerId: String,
  amount: Number,
  status: String
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
