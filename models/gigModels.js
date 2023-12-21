const mongoose = require("mongoose");

const gigModel = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      require: true,
    },
    // total/star = avg rating
    totalStars: {
      type: Number,
      default: 0,
      require: false,
    },
    starNumber: {
      type: Number,
      default: 0,
    },
    cat: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    cover: {
      type: String,
      require: true,
    },
    images: {
      type: [String],
      require: false,
    },

    // price widget title
    shortTitle: {
      type: String,
      require: true,
    },
    // price widget desc
    shortDesc: {
      type: String,
      require: true,
    },
    deliveryTime: {
      type: Number,
      require: true,
    },
    revisionNumber: {
      type: Number,
      require: true,
    },
    // price widget features
    features: {
      type: [String],
      require: false,
    },
    // sales this gig how many times
    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gig", gigModel);
