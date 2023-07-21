const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: String },
    size: { type: Array }, // available sizes for this product
    askPrice: { type: Number, default: 0 }, // Lowest Ask in the market (the lowest price at which buyer can buy the product immediately)
    bidPrice: { type: Number, default: 0 }, // Highest Bid in the market (the highest price at which seller can sell the product immediately)
    numSold: { type: Number, default: 0 }, // successful match
    releaseDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);

// Ask Price is price proposed by seller (the lowest price possible for a buyer to get one immediately)
// Bid Price is price propsed by buyer (the highest price possible for a seller to sell one immediately)
