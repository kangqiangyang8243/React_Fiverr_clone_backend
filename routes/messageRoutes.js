const router = require("express").Router();
const verifyToken = require("../middleware/jwt");
const conversationModeals = require("../models/conversationModeals");
const messageModel = require("../models/messageModel");

router.post("/", verifyToken, async (req, res) => {
  try {
    const savedMessage = await messageModel.create({
      conversationId: req.body.conversationId,
      userId: req.userId,
      message: req.body.message,
    });

    await conversationModeals.findOneAndUpdate(
      { id: req.body.conversationId },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
          lastMessage: req.body.message,
        },
      },
      { new: true }
    );
    return res.status(201).json(savedMessage);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const messages = await messageModel.find({ conversationId: req.params.id });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
