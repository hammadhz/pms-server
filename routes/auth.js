const express = require("express");
const passport = require("passport");

const authRoute = express.Router();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/user/dashboard",
    failureRedirect: "http://localhost:3000/",
  })
);

module.exports = authRoute;
