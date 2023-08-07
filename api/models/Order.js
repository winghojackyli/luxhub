const mongoose = require("mongoose");

// order is created only when there is a successful match (Bid = Ask)
const OrderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    size: { type: String },
    price: { type: Number, required: true },
    buyer: { type: String, required: true },
    seller: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
