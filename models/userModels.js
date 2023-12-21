const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: false,
    },
    country: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: false,
    },
    desc: {
      type: String,
      require: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userModel);
