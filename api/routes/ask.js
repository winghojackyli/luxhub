const router = require('express').Router();
const Ask = require('../models/Ask');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

//CREATE
router.post('/', verifyToken, async (req, res) => {
  const newAsk = new Ask(req.body);
  try {
    const savedAsk = await newAsk.save();
    res.status(200).json(savedAsk);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Ask.findByIdAndDelete(req.params.id);
    res.status(200).json('Ask has been deleted.');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ASKS
router.get('/find/:productId', async (req, res) => {
  try {
    const asks = await Ask.aggregate([
      {
        $match: {
          productId: req.params.productId,
        },
      },

      {
        $group: {
          _id: { size: '$size', price: '$price' },
          quantity: { $count: {} },
        },
      },
    ]);
    res.status(200).json(asks);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ASKS
router.get('/findUserAsks/:userId', verifyToken, async (req, res) => {
  try {
    const asks = await Ask.find({ userId: req.params.userId });
    res.status(200).json(asks);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LOWEST ASK
router.get('/lowestAsk/:productId/:size', async (req, res) => {
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
