const mongoose = require("mongoose");

// Ask is price offered by seller (how much the seller is willing to sell for the product)
const AskSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.ObjectId, required: true },
    size: { type: Number, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: mongoose.Schema.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ask", AskSchema);
