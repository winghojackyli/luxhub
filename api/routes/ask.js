const router = require("express").Router();
const Ask = require("../models/Ask");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newAsk = new Ask(req.body);
  try {
    const savedAsk = await newAsk.save();
    res.status(200).json(savedAsk);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Ask.findByIdAndDelete(req.params.id);
    res.status(200).json("Ask has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ASKS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const asks = await Ask.find({ userId: req.params.userId });
    res.status(200).json(asks);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LOWEST ASK
router.get("/lowestask/:productId/:size", async (req, res) => {
  try {
    const asks = await Ask.findOne({
      productId: req.params.productId,
      size: req.params.size,
    })
      .sort({ price: 1 })
      .limit(1);
    res.status(200).json(asks);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
