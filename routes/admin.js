const express = require("express");
const adminRoute = express();
const {
  adminSignIn,
  adminAddUser,
  adminGetUser,
} = require("../controllers/adminCtrl");

adminRoute.post("/signin", adminSignIn);
adminRoute.post("/addUser", adminAddUser);
adminRoute.get("/users", adminGetUser);

module.exports = adminRoute;
