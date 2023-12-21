const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const gigModels = require("../models/gigModels");

// Post gig
router.post("/", verifyToken, async (req, res) => {
  if (!req.isSeller)
    return res.status(403).send("only sellers can create a gig!");
  // console.log(req.isSeller);
  try {
    const savedGig = await gigModels.create({
      ...req.body,
    });
    return res.status(201).json(savedGig);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/:gigId", verifyToken, async (req, res) => {
  try {
    const gig = await gigModels.findById(req.params.gigId);
    if (gig.userId !== req.userId) {
      return res.status(403).send("only can delete your own gig!");
    }

    await gigModels.findByIdAndDelete(req.params.gigId);
    return res.status(200).send("gig has been delete!");
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/single/:gigId", verifyToken, async (req, res) => {
  try {
    const gig = await gigModels.findById(req.params.gigId);
    if (!gig) {
      return res.status(404).send("Gig not found!");
    }

    return res.status(200).send(gig);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/allGigs", verifyToken, async (req, res) => {
  const q = req.query;

  const filters = {
    // userid for search single user gig post
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    // $options == ignored low or upper letter
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };

  try {
    const gigs = await gigModels.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(gigs);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
