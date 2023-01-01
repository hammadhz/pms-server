const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  name: String,
  password: String,
  type: String,
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

Admin.create({
  type: "ADMIN",
  name: "admin",
  password: "admin",
});
