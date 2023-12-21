const mongoose = require("mongoose");

const reviewModel = new mongoose.Schema(
  {
    gigId: {
      type: String,
      require: true,
    },
    userId: {
      type: String,
      require: false,
    },
    star: {
      type: Number,
      require: true,
      //   choose 1-5 number to show 1-5 stars
      enum: [1, 2, 3, 4, 5],
    },
    desc: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewModel);
