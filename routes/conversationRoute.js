const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const conversationModeals = require("../models/conversationModeals");

router.post("/", verifyToken, async (req, res) => {
  try {
    const savedConversation = await conversationModeals.create({
      id: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
      sellerId: req.isSeller ? req.userId : req.body.to,
      buyerId: req.isSeller ? req.body.to : req.userId,
      readBySeller: req.isSeller,
      readByBuyer: !req.isSeller,
    });
    return res.status(201).json(savedConversation);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const conversations = await conversationModeals.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );

    return res.status(201).json(conversations);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/single/:id", verifyToken, async (req, res) => {
  try {
    const conversation = await conversationModeals.findOne({
      id: req.params.id,
    });
    if (!conversation) {
      return res.status(404).json("Not Found");
    }

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedConversation = await conversationModeals.findOneAndUpdate(
      //   id == sellerid + buyerid
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
