const router = require("express").Router();
const Bid = require("../models/Bid");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newBid = new Bid(req.body);
  try {
    const savedBid = await newBid.save();
    res.status(200).json(savedBid);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BIDS
router.get("/", verifyToken, async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Bid.findByIdAndDelete(req.params.id);
    res.status(200).json("Bid has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedBid = await Bid.findByIdAndUpdate(
      req.params.id,
      {
        price: req.body.newPrice,
      },
      { new: true }
    );
    res.status(200).json(updatedBid);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT BIDS
router.get("/find/:productId", async (req, res) => {
  try {
    const bids = await Bid.aggregate([
      {
        $match: {
          productId: req.params.productId,
        },
      },
      {
        $group: {
          _id: { size: "$size", price: "$price" },
          quantity: { $count: {} },
        },
      },
    ]);
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER BIDS
router.get("/findUserBids/:userId", verifyToken, async (req, res) => {
  try {
    const bids = await Bid.find({ userId: req.params.userId });
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HIGHTEST BID
router.get("/highestBid/:productId/:size", async (req, res) => {
  try {
    const bids = await Bid.findOne({
      productId: req.params.productId,
      size: req.params.size,
    })
      .sort({ price: -1 })
      .limit(1);
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/highestBid/:productId", async (req, res) => {
  try {
    const bids = await Bid.findOne({
      productId: req.params.productId,
    })
      .sort({ price: -1 })
      .limit(1);
    res.status(200).json(bids);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
