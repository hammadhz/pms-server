const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  about: {
    type: String,
  },
  profile: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
