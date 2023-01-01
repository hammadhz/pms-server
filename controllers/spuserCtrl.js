const Media = require("../models/Media");
const SpUser = require("../models/Sp-user");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");

const addMedia = async (req, res) => {
  const media = new Media({
    text: req.body.text,
    media: req.file.path,
    user_id: req.body.user_id,
  });

  await media
    .save()
    .then((data) => {
      res.status(200).send({ message: "Media Saved!" });
    })
    .catch((err) => {
      res.status(400).send("Media not added");
    });
};

const getMedia = async (req, res) => {
  const id = req.params.id;
  await Media.find({ user_id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const signIn = async (req, res) => {
  const dbUser = await SpUser.findOne({ email: req.body.email });
  console.log(dbUser);
  if (!dbUser) return res.status(400).send("User Does'nt Exit");

  if (dbUser.password !== req.body.password)
    return res.status(400).send("Please Enter Correct Credentails");
  else console.log("matches");

  const token = jwt.sign(
    { _id: dbUser._id, name: dbUser.fullName, verified: dbUser.verified },
    process.env.TOKEN_SECRET
  );
  res
    .status(200)
    .header("auth-token", token)
    .send({ token: token, user: dbUser, message: "login done" });
};

const setProfile = async (req, res) => {
  const profile = new Profile({
    about: req.body.about,
    profile: req.file.path,
    user_id: req.body.user_id,
  });

  await profile
    .save()
    .then((data) => {
      res.status(200).send("Profile & About Added");
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err);
    });
};

const getProfile = async (req, res) => {
  const id = req.params.id;
  await Profile.find({ user_id: id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = { addMedia, getMedia, signIn, setProfile, getProfile };
