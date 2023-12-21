const mongoose = require("mongoose");

// conversation model for contact with seller in order page
const conversationModel = new mongoose.Schema(
  {
    //   conversation id
    id: {
      type: String,
      require: true,
      unique: true,
    },
    sellerId: {
      type: String,
      require: true,
    },
    buyerId: {
      type: String,
      require: true,
    },
    // mark read or not in messages page
    readBySeller: {
      type: Boolean,
      require: true,
    },
    readByBuyer: {
      type: Boolean,
      require: true,
    },
    lastMessage: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", conversationModel);
