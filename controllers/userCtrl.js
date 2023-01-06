const User = require("../models/User");
const {
  signupValidation,
  signinValidation,
} = require("../validation/userValidation");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

const signup = async (req, res) => {
  const validation = signupValidation(req.body);

  const { error } = validation;

  if (error) return res.status(400).send(error.details[0].message);

  const checkUser = await User.findOne({ email: req.body.email });
  if (checkUser) return res.status(400).send("Email Already Exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashedPassword,
  });
  try {
    const newUser = await user.save();

    const token = createToken(newUser._id, newUser.name, newUser.verified);
    res
      .status(200)
      .header("auth-token", token)
      .send({ token: token, message: "User Sign Up Successfully" });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

const signin = async (req, res) => {
  const validation = signinValidation(req.body);
  const { error } = validation;

  if (error) return res.status(400).send(error.details[0].message);

  const dbUser = await User.findOne({ email: req.body.email });
  if (!dbUser) return res.status(400).send("User Doesn't Exits!");

  const passwordCheck = await bcrypt.compare(
    req.body.password,
    dbUser.password
  );

  if (!passwordCheck)
    return res.status(400).send("Please Enter Correct Credentails");

  const token = createToken(dbUser._id, dbUser.name, dbUser.verified);

  res.status(200).header("auth-token", token).send({
    token: token,
    user: dbUser,
    message: "User Signed In Successfully!",
  });
};

module.exports = { signin, signup };
