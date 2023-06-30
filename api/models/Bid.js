const mongoose = require("mongoose");

// Bid is price offered by buyer (how much the buyer is willing to pay for the product)
const BidSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.ObjectId, required: true },
    size: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    buyer: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bid", BidSchema);
