const Admin = require("../models/Admin");
const SpUser = require("../models/Sp-user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminSignIn = async (req, res) => {
  const { name, password } = req.body;
  const adminCheck = await Admin.findOne({ name: name });
  console.log(adminCheck);
  //   if (!adminCheck) return res.status(400).send("Admin does'nt Exists!");
  if (adminCheck) {
    if (adminCheck.password !== password) {
      return res.status(400).send("Please Enter Correct Credentails");
    } else {
      const token = jwt.sign(
        { _id: adminCheck._id, name: adminCheck.name },
        process.env.TOKEN_SECRET,
        { expiresIn: "20s" }
      );
      return res
        .status(200)
        .header("auth-token", token)
        .send({ token: token, user: adminCheck, message: "Admin Created" });
    }
  }
};

const adminAddUser = async (req, res) => {
  const spuser = new SpUser({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  });
  await spuser
    .save()
    .then((data) => {
      res.status(200).send("Special User Created Successfully");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const adminGetUser = async (req, res) => {
  await SpUser.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getAdmin = async (req, res) => {
  await Admin.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send(err));
};

module.exports = { adminSignIn, adminAddUser, adminGetUser, getAdmin };
