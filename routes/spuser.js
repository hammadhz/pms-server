const express = require("express");
const spUserRoute = express.Router();
const {
  addMedia,
  getMedia,
  signIn,
  setProfile,
  getProfile,
} = require("../controllers/spuserCtrl");
const upload = require("../middleware/fileUpload");

spUserRoute.post("/media", upload.single("media"), addMedia);
spUserRoute.get("/getMedia/:id", getMedia);
spUserRoute.post("/signin", signIn);
spUserRoute.post("/profile", upload.single("profile"), setProfile);
spUserRoute.get("/profile/:id", getProfile);

module.exports = spUserRoute;
