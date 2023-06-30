const mongoose = require("mongoose");

// created by admin,showing celebrities outfit and the related products
const PostSchema = new mongoose.Schema(
  {
    productID: { type: Array, required: true },
    img: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
