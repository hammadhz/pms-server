const Media = require("../models/Media");
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
      console.log(data);
    })
    .catch((err) => {
      res.status(400).send({ message: "Media not added" });
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

const setProfile = async (req, res) => {
  const profile = new Profile({
    about: req.body.about,
    profile: req.file.path,
    user_id: req.body.user_id,
  });

  await profile
    .save()
    .then((data) => {
      res.status(200).send({ message: "Profile & About Added" });
    })
    .catch((err) => {
      res.status(400).send({ message: "Profile & About not added" });
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

module.exports = { addMedia, getMedia, setProfile, getProfile };
