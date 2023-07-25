const mongoose = require("mongoose");

// Ask is price offered by seller (how much the seller is willing to sell for the product)
const AskSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ask", AskSchema);
