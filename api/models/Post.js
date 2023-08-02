const mongoose = require("mongoose");

// created by admin,showing celebrities outfit and the related products
const PostSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    img: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
