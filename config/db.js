const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose
    .connect(
      process.env.DB_URL,
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    )
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
};

module.exports = connectDb;
