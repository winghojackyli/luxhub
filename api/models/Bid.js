const mongoose = require('mongoose');

// Bid is price offered by buyer (how much the buyer is willing to pay for the product)
const BidSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    size: { type: String },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bid', BidSchema);
