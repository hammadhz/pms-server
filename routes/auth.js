const express = require("express");
const passport = require("passport");
const dotenv = require("dotenv");

const authRoute = express.Router();

dotenv.config();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL + "/user/dashboard",
    failureRedirect: process.env.CLIENT_URL,
  })
);

module.exports = authRoute;
