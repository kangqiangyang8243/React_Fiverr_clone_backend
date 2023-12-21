const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const gigModels = require("../models/gigModels");
const reviewModels = require("../models/reviewModels");

// Post review
router.post("/", verifyToken, async (req, res) => {
  if (req.isSeller)
    return res.status(403).send("Sellers can't create a review!");
  // console.log(req.isSeller);
  try {
    const review = await reviewModels.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review) {
      return res
        .status(403)
        .send("You have already created a review for this gig!");
    }

    const newReivew = await reviewModels.create({
      userId: req.userId,
      gigId: req.body.gigId,
      desc: req.body.desc,
      star: req.body.star,
    });

    await gigModels.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    return res.status(201).json(newReivew);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Get review
router.get("/:gigId", async (req, res) => {
  try {
    const reviews = await reviewModels.find({ gigId: req.params.gigId });
    return res.status(201).json(reviews);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
