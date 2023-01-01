const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  media: {
    type: String,
  },
  user_id: {
    type: String,
  },
});

module.exports = mongoose.model("Media", MediaSchema);
