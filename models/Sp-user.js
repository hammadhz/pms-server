const mongoose = require("mongoose");

const SpUser = new mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("SpUser", SpUser);
