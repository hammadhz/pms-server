const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const { addUserValidation } = require("../validation/userValidation");

const adminSignIn = async (req, res) => {
  const { name, password } = req.body;
  const adminCheck = await Admin.findOne({ name: name });
  //   if (!adminCheck) return res.status(400).send("Admin does'nt Exists!");
  if (adminCheck) {
    if (adminCheck.password !== password) {
      return res.status(400).send("Please Enter Correct Credentails");
    } else {
      const token = createToken(adminCheck._id, adminCheck.name);
      return res
        .status(200)
        .header("auth-token", token)
        .send({ token: token, message: "Admin Created" });
    }
  }
};

const adminAddUser = async (req, res) => {
  const validation = addUserValidation(req.body);

  const { error } = validation;

  if (error) return res.status(400).send(error.details[0].message);

  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("Email Already Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    verified: req.body.verified,
  });

  await user
    .save()
    .then((data) => {
      res.status(200).send({ message: "Special User Created Successfully" });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const adminGetUser = async (req, res) => {
  await User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = { adminSignIn, adminAddUser, adminGetUser };
