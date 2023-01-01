const multer = require("multer");

const fileUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./imgs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileUpload });

module.exports = upload;
