const User = require("../models/User");
const {
  signupValidation,
  signinValidation,
} = require("../validation/userValidation");
const bcrypt = require("bcryptjs");

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

  await user
    .save()
    .then(() => {
      res.status(200).send("User Sign Up Successfully");
      console.log("User saved");
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
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
  else return res.status(200).send("User Sign In Successfully");
};

module.exports = { signin, signup };
