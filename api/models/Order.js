const mongoose = require("mongoose");

// order is created only when there is a successful match (Bid = Ask)
const OrderSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.ObjectId, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    buyer: { type: mongoose.Schema.ObjectId, required: true },
    seller: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
