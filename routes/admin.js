const express = require("express");
const adminRoute = express();
const {
  adminSignIn,
  adminAddUser,
  adminGetUser,
  getAdmin,
} = require("../controllers/adminCtrl");
const upload = require("../middleware/fileUpload");

adminRoute.post("/signin", adminSignIn);
adminRoute.post("/addUser", upload.single("image"), adminAddUser);
adminRoute.get("/users", adminGetUser);

module.exports = adminRoute;
