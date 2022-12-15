const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoute = require("./routes/user");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const authRoute = require("./routes/auth");
const path = require("path");

const server = express();

dotenv.config();
require("./auth/googleAuth");
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));

server.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600,
    },
  })
);

server.use(passport.initialize());
server.use(passport.session());

connectDb();

server.use(cors());
server.use("/user", userRoute);
server.use("/auth", authRoute);

server.get("/", (req, res) => {
  res.send("server running");
});

server.listen(
  process.env.PORT,
  () => `Server is running at port:${process.env.PORT}`
);
