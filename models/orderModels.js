const mongoose = require("mongoose");

const orderModel = new mongoose.Schema(
  {
    gigId: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: false,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    sellerId: {
      type: String,
      require: true,
    },
    buyerId: {
      type: String,
      require: true,
    },
    // after complete payment show true
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // Stripe payment number
    payment_intent: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Orders", orderModel);
