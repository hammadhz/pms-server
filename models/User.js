const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "normal user",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  googleId: {
    type: String,
  },
  username: {
    type: String,
  },
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", UserSchema);
