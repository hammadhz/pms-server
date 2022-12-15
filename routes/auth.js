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
    successRedirect: "https://pms-client-nu.vercel.app/user/dashboard",
    failureRedirect: "https://pms-client-nu.vercel.app/",
  })
);

module.exports = authRoute;
